require('dotenv').config();
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const { verifySocketJWT } = require('./middleware/authJwt');

const app = express();

// --------------------------------------
// Security Middlewares
// --------------------------------------
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 120
}));

// --------------------------------------
// Routes
// --------------------------------------
app.use('/api/auth', authRoutes);

// --------------------------------------
// HTTP + Socket.io Server
// --------------------------------------
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true
  }
});

// --------------------------------------
// SOCKET AUTH MIDDLEWARE
// --------------------------------------
io.use(async (socket, next) => {
  try {
    await verifySocketJWT(socket);
    next();
  } catch (err) {
    next(new Error('unauthorized'));
  }
});

// --------------------------------------
// SOCKET EVENTS
// --------------------------------------
io.on('connection', (socket) => {
  const user = socket.user;  // populated by middleware
  console.log('User connected:', user.id);

  // User room = personal inbox
  socket.join(user.id);

  // -------------------------
  // PRIVATE MESSAGE
  // -------------------------
  socket.on('private_message', async ({ toUserId, payload }) => {

    if (!toUserId || !payload) return;

    console.log(`Message from ${user.id} → ${toUserId}`);

    // Save message to DB here (ciphertext only)
    // Example:
    // await Message.create({ from: user.id, to: toUserId, content: payload });

    io.to(toUserId).emit('private_message', {
      from: user.id,
      payload
    });
  });

  // -------------------------
  // DISCONNECT
  // -------------------------
  socket.on('disconnect', () => {
    console.log('User disconnected:', user.id);
  });
});

// --------------------------------------
// START SERVER
// --------------------------------------
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log('🚀 Server running at port', PORT);
});
