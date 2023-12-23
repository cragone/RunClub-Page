import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes for other pages if needed */}
      </Routes>
    </Router>
  );
}

export default App; // This should be the only default export in App.jsx
