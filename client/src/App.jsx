// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Global Layout
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import ProductsPage from "./pages/ProductsPage.jsx"; // 🛍️ add this file
import ProductInfo from "./pages/ProductInfo.jsx";



export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-white">
        {/* ✅ Navbar appears on all pages */}
        <Navbar />

        {/* ✅ Main content changes per route */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductInfo />} />
          </Routes>
        </main>

        {/* ✅ Footer stays consistent */}
        <Footer />
      </div>
    </Router>
  );
}
