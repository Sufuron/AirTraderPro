import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-container ${isVisible ? "show" : "hide"}`}>
      <nav className="navbar">
        {/* Logo redirects to Home */}
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
        Aviación360
        </Link>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/inventory" className="nav-item" onClick={() => setIsOpen(false)}>
            Inventario
          </Link>
          <Link to="/sell" className="nav-item" onClick={() => setIsOpen(false)}>
            Vender
          </Link>
          <Link to="/blog" className="nav-item" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link to="/about" className="nav-item" onClick={() => setIsOpen(false)}>
            Nosotros
          </Link>
          <Link to="/contact" className="nav-item" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
          <Link to="/login" className="login-button" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
