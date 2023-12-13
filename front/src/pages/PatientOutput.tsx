import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultBox } from "../components/ResultBox";

const PatientOutput: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { activeIngredients, allergies, additionalFields } =
    location.state || {};

  const handleClickBack = () => {
    navigate("/patientinput");
  };

  const results = [
    {
      drugBrand: "Drug 1",
      genericName: "Aceto",
      activeIngredients: "Acetomenaphin",
      uses: "cures the plague",
      manufacturers: "Johnson & Johnson",
      marketingStatus: "Discontinued",
    },
    {
      drugBrand: "Drug 2",
      genericName: "Acetoman",
      activeIngredients: "Acetomenaphin",
      uses: "cures the plague",
      manufacturers: "CVS",
      marketingStatus: "In Stock",
    },
    {
      drugBrand: "Drug 3",
      genericName: "Acetoman2",
      activeIngredients: "Acetomenaphin",
      uses: "cures the plague",
      manufacturers: "CVSII",
      marketingStatus: "In Stock",
    },
    {
      drugBrand: "Drug 4",
      genericName: "Asetoman",
      activeIngredients: "Acetomenaphin",
      uses: "cures the plague",
      manufacturers: "Drugs R Us",
      marketingStatus: "In Stock",
    },
    {
      drugBrand: "Drug 5",
      genericName: "Acetoman2",
      activeIngredients: "Acetomenaphin",
      uses: "cures the plague",
      manufacturers: "Free Drugs",
      marketingStatus: "In Stock",
    },
  ];

  const renderResults = () => {
    if (results.length <= 4) {
      return results.map((result, index) => (
        <ResultBox
          key={index}
          {...result}
        />
      ));
    } else {
      return (
        <>
          {results.slice(0, 4).map((result, index) => (
            <ResultBox
              key={index}
              {...result}
            />
          ))}
          <div>There are more results than displayed.</div>
        </>
      );
    }
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

      <div className="result-container">{renderResults()}</div>
    </div>
  );
};

export default PatientOutput;
