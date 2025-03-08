// src/components/Services.jsx
import { Link } from "react-router-dom";
import "./Services.css";
import servicesData from "../data/servicesData";

const Services = () => {
  return (
    <section className="services">
      <h2 className="services-title">Nuestros Servicios</h2>
      <div className="services-container">
        {servicesData.map((service, index) => (
          <Link key={index} to={service.link} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
