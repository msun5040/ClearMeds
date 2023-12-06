import { useState } from "react";
import Logo from "../components/logo";
import OutputBox from "../components/OutputBox";

const PatientInput: React.FC = () => {
  return (
    <div className="form-body">
      <div className="form-side"></div>
      <div className="form-image"></div>
      <div className="form">
        Welcome Patients
        <input
          className="form-control"
          type="text"
          placeholder="Active Ingredients"
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Allergies"
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Additional Fields"
        ></input>
      </div>
    </div>
  );
};

export default PatientInput;
