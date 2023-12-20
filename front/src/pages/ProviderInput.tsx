import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buildTrie,
  findSuggestions,
  collectSuggestions,
} from "../components/trie";
import medicationTrie from "../components/medicationList";

interface disclaimerProps {
  showAlert : boolean
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderInput: React.FC<disclaimerProps> = ({ showAlert, setShowAlert }) => {
  const navigate = useNavigate();

  const handleClickBack = (alertValue: boolean) => {
    setShowAlert(true)
    navigate("/");
  };

  const [activeIngredients, setActiveIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [marketingFields, setMarketingFields] = useState("");
  const [activeIngredientsSuggestions, setActiveIngredientsSuggestions] =
    useState<string[]>([]);
  const [allergiesSuggestions, setAllergiesSuggestions] = useState<string[]>(
    []
  );
  const [marketingFieldsSuggestions, setMarketingFieldsSuggestions] =
    useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const marketingSuggestions = [
    "Prescription",
    "Discontinued",
    "Over-the-Counter",
    "None (Tentative Approval)"
  ];

  const marketingTrie = buildTrie(marketingSuggestions);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    suggestionsFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const userInput = event.target.value;
    setFunction(userInput);

    let suggestions = findSuggestions(medicationTrie, userInput);
    if (setFunction == setMarketingFields){
      suggestions = findSuggestions(marketingTrie, userInput);
    }
    else{
      suggestions = findSuggestions(medicationTrie, userInput);
    }
    suggestionsFunction(suggestions);
  };

  const handleSuggestionClick = (
    suggestion: string,
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    setSuggestionsFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFunction(suggestion);
    setSuggestionsFunction([]); // Clear suggestions when a suggestion is clicked
  };

  const handleSubmit = () => {
    navigate("/provideroutput", {
      state: {
        activeIngredients,
        allergies,
        marketingFields,
      },
    });
    setActiveIngredients("");
    setAllergies("");
    setMarketingFields("");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setAllergiesSuggestions([]);
      setActiveIngredientsSuggestions([]);
      setMarketingFieldsSuggestions([]);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-body">
      <div className="form-side"></div>
      <div className="form-provider-image"></div>
      <div className="form-text">
        <div className="text-line">Welcome Providers</div>
      </div>
      <div className="form">
        <div className="suggestions-container">
          <input
            type="text"
            className="form-control"
            placeholder="Active Ingredients"
            value={activeIngredients}
            onChange={(e) =>
              handleInputChange(
                e,
                setActiveIngredients,
                setActiveIngredientsSuggestions
              )
            }
            ref={inputRef}
          />
          {activeIngredientsSuggestions.length > 0 && (
            <ul>
              {activeIngredientsSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion,
                      setActiveIngredients,
                      setActiveIngredientsSuggestions
                    )
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="suggestions-container">
          <input
            type="text"
            className="form-control"
            placeholder="Allergies"
            value={allergies}
            onChange={(e) =>
              handleInputChange(e, setAllergies, setAllergiesSuggestions)
            }
          />
          {allergiesSuggestions.length > 0 && (
            <ul>
              {allergiesSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion,
                      setAllergies,
                      setAllergiesSuggestions
                    )
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="suggestions-container">
          <input
            type="text"
            className="form-control"
            placeholder="Marketing Status"
            value={marketingFields}
            onChange={(e) =>
              handleInputChange(
                e,
                setMarketingFields,
                setMarketingFieldsSuggestions
              )
            }
          />
          {marketingFieldsSuggestions.length > 0 && (
            <ul>
              {marketingFieldsSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion,
                      setMarketingFields,
                      setMarketingFieldsSuggestions
                    )
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="input-button-container">
          <button className="form-button" onClick={() => handleClickBack(showAlert)}>
            Back
          </button>
          <button className="form-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderInput;