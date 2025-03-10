import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientePage from './pages/ClientePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientePage />} />
      </Routes>
    </Router>
  );
}

export default App;
