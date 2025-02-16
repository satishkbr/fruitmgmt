import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
