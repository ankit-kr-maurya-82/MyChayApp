import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Route, 
  createRoutesFromElements 
} from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ChatPage from './pages/ChatPage.jsx';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      {/* App Layout Routes */}
      <Route path="/" element={<App />}>
        <Route index element={<h1>Welcome Home!</h1>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Full-Screen Chat Route (not inside App) */}
      <Route path="/chat" element={<ChatPage />} />

      {/* 404 */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />

    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
