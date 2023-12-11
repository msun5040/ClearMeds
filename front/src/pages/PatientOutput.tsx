import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PatientOutput: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { activeIngredients, allergies, additionalFields } =
    location.state || {};

  const handleClickBack = () => {
    navigate("/patientinput");
  };

  const handleSubmit = () => {
    // ** handle submission here**
  };

  return (
    <div className="result-body">
      <div className="text-line">Search Results</div>
      <div className="result-container">
        <div className="result-box"></div>
        <div className="result-box"></div>
        <div className="result-box"></div>
        <div className="result-box"></div>
      </div>
      <p>Active Ingredients: {activeIngredients}</p>
      <p>Allergies: {allergies}</p>
      <p>Additional Fields: {additionalFields}</p>
    </div>
  );
};

export default PatientOutput;
