import React from "react";
import "./About.css";
import teamData from "../data/teamData";

const About = () => {
  return (
    <div className="about-page animate__animated animate__fadeInUp">
      <div className="about-container">
        <h1 className="about-title">Nuestro Equipo!</h1>
        <p className="about-description">
        Está compuesto por mecánicos de aviación experimentados, corredores astutos, despachadores eficientes y pilotos calificados, todos dedicados a hacer que la compra de tu aeronave sea 100% segura y cumpla con los más altos estándares.
        </p>
        <div className="team-container">
          {teamData.map(({ id, role, description, image }) => (
            <div className="team-member" key={id}>
              <img
                src={image}
                alt={role}
                className="team-member-image"
              />
              <h2 className="member-role">{role}</h2>
              <p className="member-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

