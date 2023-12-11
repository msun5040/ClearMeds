import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProviderInput: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/");
  };

  const [activeIngredients, setActiveIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [additionalFields, setAdditionalFields] = useState("");

  const handleSubmit = () => {
    console.log("Active Ingredients:", activeIngredients);
    console.log("Allergies:", allergies);
    console.log("Additional Fields:", additionalFields);

    navigate("/patientoutput", {
      state: {
        activeIngredients,
        allergies,
        additionalFields,
      },
    });

    setActiveIngredients("");
    setAllergies("");
    setAdditionalFields("");
  };
  //https://accessiblemeds.org/sites/default/files/2020-03/About-us-generic-medicines-header.jpg
  return (
    <div className="form-body">
      <div className="form-side"></div>
      <div className="form-provider-image"></div>
      <div className="form-text">
        <div className="text-line">Welcome Providers</div>
      </div>
      <div className="form">
        <input
          className="form-control custom-search-input"
          type="text"
          placeholder="Active Ingredients"
          value={activeIngredients}
          onChange={(e) => setActiveIngredients(e.target.value)}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Additional Fields"
          value={additionalFields}
          onChange={(e) => setAdditionalFields(e.target.value)}
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

export default ProviderInput;
