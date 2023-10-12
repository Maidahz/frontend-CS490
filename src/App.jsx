import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import CustomersPage from './pages/CustomersPage';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/homepage" element={<HomePage />} />
        <Route path="/moviespage" element={<MoviesPage />} />
        <Route path="/customerspage" element={<CustomersPage />} />
        <Route path="*" element={<HomePage />} /> 
        
        
      </Routes>
    </Router>
  );
}

export default App;
