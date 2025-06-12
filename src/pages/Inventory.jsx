import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Inventory.css";
import InventoryCard from "../components/InventoryCard";
import planesData from "../data/planesData";
import { getPlanes } from "../utils/firestore";

const Inventory = () => {
  const [planes, setPlanes] = useState([]);
  const [selectedPlane, setSelectedPlane] = useState(null);

  useEffect(() => {
  getPlanes()
      .then((apiPlanes) => setPlanes([...planesData, ...apiPlanes]))
      .catch((err) => {
        console.error('Error fetching planes:', err);
        setPlanes(planesData);
      });
  }, []);

  const closeModal = () => setSelectedPlane(null);

  return (
    <div className="inventory-page">
      <div className="inventory-container">
        <h1 className="inventory-title">Aeronaves</h1>
        <div className="inventory-cards">
          {planes.map((plane) => (
            <InventoryCard
              key={plane.id}
              plane={plane}
              onClick={setSelectedPlane}
            />
          ))}
        </div>
      </div>

      {selectedPlane && (
        <div className="modal-overlay animate__animated animate__fadeInUp" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>

            <div className="modal-content-top">
            <div className="modal-content-left">
  <img
    src={selectedPlane.imageUrls ? selectedPlane.imageUrls[0] : selectedPlane.image}
    alt={selectedPlane.title}
    className="modal-image"
  />
</div>
              <div className="modal-content-right">
                <h2 className="plane-title">{selectedPlane.title}</h2>
                <p className="plane-price"><strong>Precio:</strong> {selectedPlane.price}</p>
                <p className="plane-year"><strong>Año:</strong> {selectedPlane.year}</p>
                <Link to="/contact" className="contact-us-button">Contáctanos</Link>
              </div>
            </div>

            <div className="modal-details">
              <div className="plane-section">
                <h3 className="section-title">General</h3>
                <ul>
                  <li><strong>Tipo:</strong> {selectedPlane.aircraftType}</li>
                  <li><strong>Condición:</strong> {selectedPlane.condition}</li>
                  <li><strong>Matrícula:</strong> {selectedPlane.registration}</li>
                  <li><strong>Fabricante:</strong> {selectedPlane.manufacturer}</li>
                  <li><strong>Modelo:</strong> {selectedPlane.model}</li>
                  <li><strong>Serie:</strong> {selectedPlane.serialNumber}</li>
                </ul>
              </div>

              <div className="plane-section">
                <h3 className="section-title">Estructura</h3>
                <ul>
                  <li><strong>Horas Totales:</strong> {selectedPlane.totalTime}</li>
                  <li><strong>Notas:</strong> {selectedPlane.airframeNotes}</li>
                </ul>
              </div>

              <div className="plane-section">
                <h3 className="section-title">Motor</h3>
                <ul>
                  <li><strong>Motor:</strong> {selectedPlane.engineMakeModel}</li>
                  <li><strong>Serie Motor:</strong> {selectedPlane.engineSerial}</li>
                  <li><strong>Horas Motor:</strong> {selectedPlane.engineTime}</li>
                  <li><strong>TBO Motor:</strong> {selectedPlane.engineTBO}</li>
                </ul>
              </div>

              <div className="plane-section">
                <h3 className="section-title">Descripción</h3>
                <p>{selectedPlane.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
