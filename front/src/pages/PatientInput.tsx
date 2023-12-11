import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientInput: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/");
  };

  const [activeIngredients, setActiveIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [additionalFields, setAdditionalFields] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const dummySuggestions = [
    "Ingredient1",
    "Ingredient2",
    "Ingredient3",
    "Ingredient4",
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setActiveIngredients(userInput);

    // Filter suggestions based on user input
    const filteredSuggestions = dummySuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setActiveIngredients(suggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

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

  return (
    <div className="form-body">
      <div className="form-side"></div>
      <div className="form-patient-image"></div>
      <div className="form-text">
        <div className="text-line">Welcome Patients</div>
      </div>
      <div className="form">
        <input
          className="form-control custom-search-input"
          type="text"
          placeholder="Active Ingredients"
          value={activeIngredients}
          onChange={(e) => setActiveIngredients(e.target.value)}
        ></input>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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

export default PatientInput;
