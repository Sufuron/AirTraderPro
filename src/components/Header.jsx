import "./Header.css";
import planeImage from "../assets/img/plane.jpg"; // Make sure the path is correct

const Header = () => {
  return (
    <header className="header">
      <img src={planeImage} alt="Plane" className="header-image" />
      <div className="header-overlay animate__animated animate__backInLeft">
        <h1 className="header-title">Air Trader Pro</h1>
        <p className="header-subtitle">Encuentra la aeronave perfecta para tus necesidades.</p>
      </div>
    </header>
  );
};

export default Header;
