const jwt = require('jsonwebtoken');

async function verifySocketJWT(socket) {
  // Expect token in auth payload: socket.auth = { token: '...' }
  const token = socket.handshake.auth && socket.handshake.auth.token;
  if (!token) throw new Error('no token');
  const data = jwt.verify(token, process.env.JWT_SECRET);
  socket.user = { id: data.id, username: data.username }; // attach user
}

module.exports = { verifySocketJWT };
