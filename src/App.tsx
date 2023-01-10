import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu  from './components/Menu'
import Aeroport from './components/Aeroport';
import Vol from './components/Vol';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Detailvol from './components/Detailvol';
function App() {
  return (
    <div className="App">
      <Menu></Menu>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Routes>
            <Route path="/" element={<Aeroport />} />
            <Route path="/findfly" element={<Vol />} />
            <Route path="/findfly/detail" element={<Detailvol />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
