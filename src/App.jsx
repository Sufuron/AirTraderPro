import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Services from "./components/Services";
import BlogPreview from "./components/BlogPreview"; // Blog preview on home
import BlogPage from "./pages/BlogPage"; // Full blog page
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SellAircraft from "./pages/SellAircraft";
import Inventory from "./pages/Inventory";
import ScrollToTop from "./components/ScrollToTop";

import Admin from "./pages/Admin";

// Home page grouping (includes BlogPreview)
const Home = () => (
  <>
    <Header />
    <Services />
    <BlogPreview />
  </>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} /> {/* Dedicated Blog Page */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/sell" element={<SellAircraft />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

