import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Route, 
  createRoutesFromElements 
} from 'react-router-dom';

// 1. Import your components
import App from './App.jsx';
import Login from './pages/Login.jsx'; // Assuming your Login component is here
import Register from './pages/Register.jsx'; // Assuming your Register component is here
import Chat from './pages/Chat.jsx'; // Assuming your Register component is here
import './index.css';

// 2. Define the routing structure
// createRoutesFromElements is a clean way to define routes using JSX
const router = createBrowserRouter(
  createRoutesFromElements(
    // The main layout component (can be App or a dedicated Layout)
    <Route path="/" element={<App />}>
      {/* 3. Define the specific routes */}
      
      {/* Route for the Login component */}
      <Route path="/login" element={<Login />} />
      
      {/* Route for the Register component */}
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      
      {/* Define an index route or homepage if needed */}
      <Route index element={<h1>Welcome Home!</h1>} />
      
      {/* Add a Catch-all 404 Route */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
      
    </Route>
  )
);

// 4. Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Use the RouterProvider to make routing accessible throughout the app */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);