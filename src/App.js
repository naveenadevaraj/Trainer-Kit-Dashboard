import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Basic from './Basic/Basic';
import Advanced from './Advanced/Advanced';
import Intermediate from './Intermediate/Intermediate';
import './App.css';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/basic/*" element={<Basic />} />
        <Route path="/intermediate/*" element={<Intermediate />} />
        <Route path="/advanced/*" element={<Advanced />} />
      </Routes>
    </Router>
    </div>
  );
}
export default App;
