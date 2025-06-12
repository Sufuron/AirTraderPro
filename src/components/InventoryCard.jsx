import React from "react";
import "./InventoryCard.css";

const InventoryCard = ({ plane, onClick }) => {
  const imageUrl = plane.imageUrls && plane.imageUrls.length > 0
    ? plane.imageUrls[0]
    : plane.image;

  return (
    <div className="inventory-summary-card" onClick={() => onClick(plane)}>
      <div className="summary-card-image-wrapper">
        <img src={imageUrl} alt={plane.title} className="summary-card-image" />
      </div>
      <div className="summary-card-content">
        <h2 className="summary-card-title">
          <span className="summary-card-year">{plane.year}</span> {plane.title}
        </h2>
        <p className="summary-card-price">{plane.price}</p>
        <p className="summary-card-total-hours">
          <strong>Total Horas:</strong> {plane.totalHours || plane.totalTime}
        </p>
        <p className="summary-card-description">{plane.description}</p>
      </div>
    </div>
  );
};

export default InventoryCard;
