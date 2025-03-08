import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container"> {/* Matches Navbar */}
      <footer className="footer"> {/* Styled like Navbar */}
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-logo">
            <h2>Air Trader</h2>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <Link to="/inventory" className="footer-item">Inventorio</Link>
            <Link to="/about" className="footer-item">Acerca de nosotros</Link>
            <Link to="/contact" className="footer-item">Contacto</Link>
          </div>

          {/* Social Media Links */}
          <div className="footer-socials">
            <a href="#" className="social-icon">📘</a> {/* Facebook */}
            <a href="#" className="social-icon">🐦</a> {/* Twitter */}
            <a href="#" className="social-icon">📷</a> {/* Instagram */}
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AirTraderPro. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
