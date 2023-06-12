import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/categories" element={<Home />} />
          <Route path="/account" element={<Home />} />
          <Route path="/cart" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
