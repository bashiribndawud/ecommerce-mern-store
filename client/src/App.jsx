import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails"
import axios from "axios";
import ProductPage from './pages/ProductPage';


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Home />} />
          <Route path="/account" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
