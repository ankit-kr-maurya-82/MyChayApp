// App.jsx
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* This content (like a header/footer) will show on EVERY page */}
      {/* <header>My App Navigation</header> */}
      
      {/* The component for the matched route (Login, Register, Home) renders here */}
      <main>
        <Outlet />
      </main>
      
      {/* <footer>© 2025</footer> */}
    </div>
  );
}

export default App;