import { useState } from "react";
import Logo from "../components/logo";
import OutputBox from "../components/OutputBox";
import { useNavigate } from "react-router-dom";

const ProviderOutput: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    // ** handle submission here**
  };

  return (
    <div className="form-body">
      <div className="form-side"></div>
      <div className="form-image"></div>
      <div className="form">
        Welcome Patients
        <input
          className="form-control custom-search-input"
          type="text"
          placeholder="Active Ingredients"
          onSubmit={handleSubmit}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Allergies"
          onSubmit={handleSubmit}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Additional Fields"
          onSubmit={handleSubmit}
        ></input>
        <button className="form-button" onClick={handleClickBack}>
          Back
        </button>
        <button className="form-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProviderOutput;
