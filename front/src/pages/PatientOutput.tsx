import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultBox from "../components/ResultBox";

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
      <div className="output-title">Search Results</div>
      <div className="search-summary">
        Active Ingredients: {activeIngredients}
      </div>
      <div className="search-summary">Allergies: {allergies}</div>
      <div className="search-summary">
        Additional Fields: {additionalFields}
      </div>

      <div className="result-container">
        {/* Result 1 */}
        <ResultBox
          drugBrand = {"Drug 1"}
          genericName = {"Aceto"}
          activeIngredients = {"Acetomenaphin"}
          uses = {"cures the plague"}
          manufacturers = {"Johnson & Johnson"}
          marketingStatus = {"Discontinued"}
        />
        {/* Result 2 */}
        <div className="result-box">
          <div className="result-entry-title">Drug Brand 1</div>
          <div className="result-entry-subtitle">Generic name</div>
          <div className="result-entry-text-header">Active Ingredients:</div>
          <div className="result-entry-text-body">Ibuprofen</div>
          <div className="result-entry-text-header">Uses:</div>
          <div className="result-entry-text-body">anit-sick</div>
          <div className="result-entry-text-header">Manufacturers:</div>
          <div className="result-entry-text-body">Johnson & Johnson</div>
          <div className="result-entry-text-header">Marketing Status:</div>
          <div className="result-entry-text-body">
            Discontinued aklsdjalkdjadklajdakldjalkdsjakldjaiodjaldakldjalkdsa
          </div>
          <div className="patient-output-learnmore-container">
            <button className="patient-output-learnmore"> yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOutput;
