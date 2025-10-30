import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to style active nav links
  const linkStyle = (path) =>
    `text-base font-medium transition-colors duration-300 ${
      scrolled
        ? location.pathname === path
          ? "text-neutral-900 font-semibold"
          : "text-neutral-800 hover:text-neutral-900"
        : location.pathname === path
        ? "text-white font-semibold"
        : "text-[#F4F4F4] hover:text-white"
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#f4f4f4] shadow-md backdrop-blur-none h-20"
          : "bg-transparent backdrop-blur h-28"
      }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-8 transition-all duration-300">
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center transition-all duration-300">
          <img
            src={
              scrolled
                ? "https://res.cloudinary.com/dczzibbkw/image/upload/v1761751962/KAZE-2_ghevj4.png"
                : "https://res.cloudinary.com/dczzibbkw/image/upload/v1761751603/KAZE-6_j0dkjc.png"
            }
            alt="KAZE Commercial Corp. logo"
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-12" : "h-16"
            }`}
          />
        </Link>

        {/* ✅ Navigation Links (React Router) */}
        <nav className="hidden gap-8 sm:flex transition-all duration-300">
          <Link to="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link to="/products" className={linkStyle("/products")}>
            Products
          </Link>
          <Link to="/quote" className={linkStyle("/quote")}>
            Quote
          </Link>
        </nav>

        {/* ✅ Button */}
        <Link
          to="/products"
          className={`rounded-xl px-6 py-3 text-sm font-semibold shadow-soft transition-all duration-300 ${
            scrolled
              ? "bg-neutral-800 text-white hover:bg-neutral-900"
              : "bg-[#f4f4f4] text-neutral-800 hover:bg-neutral-200"
          }`}
        >
          Shop Now
        </Link>
      </div>
    </header>
  );
}
