import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroClientePage from './pages/CadastroClientePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="cadastro-clientes-react/cadastro" element={<CadastroClientePage />} />
      </Routes>
    </Router>
  );
}

export default App;