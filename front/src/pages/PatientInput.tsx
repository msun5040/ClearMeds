import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buildTrie,
  findSuggestions,
  collectSuggestions,
} from "../components/trie";
import medicationTrie from "../components/medicationList";

interface disclaimerProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientInput: React.FC<disclaimerProps> = ({
  showAlert,
  setShowAlert,
}) => {
  const navigate = useNavigate();

  const handleClickBack = (alertValue: boolean) => {
    setShowAlert(true);
    navigate("/");
  };

  const [activeIngredients, setActiveIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [additionalFields, setAdditionalFields] = useState("");
  const [activeIngredientsSuggestions, setActiveIngredientsSuggestions] =
    useState<string[]>([]);
  const [allergiesSuggestions, setAllergiesSuggestions] = useState<string[]>(
    []
  );
  const [additionalFieldsSuggestions, setAdditionalFieldsSuggestions] =
    useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const suggestionListRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    suggestionsFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const userInput = event.target.value;
    setFunction(userInput);

    const suggestions = findSuggestions(medicationTrie, userInput);
    suggestionsFunction(suggestions);

    setActiveSuggestionIndex(0);
  };

  const handleSuggestionClick = (
    suggestion: string,
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    setSuggestionsFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFunction(suggestion);
    setSuggestionsFunction([]);
  };

  const handleSubmit = () => {
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

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setActiveIngredientsSuggestions([]);
      setAllergiesSuggestions([]);
      setAdditionalFieldsSuggestions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (activeIngredientsSuggestions.length > 0 && activeSuggestionIndex !== -1) {
        event.preventDefault();
        const selectedSuggestion = activeIngredientsSuggestions[activeSuggestionIndex];
        setActiveIngredients(selectedSuggestion);
        setActiveIngredientsSuggestions([]);
      } else if (allergiesSuggestions.length > 0 && activeSuggestionIndex !== -1) {
        event.preventDefault();
        const selectedSuggestion = allergiesSuggestions[activeSuggestionIndex];
        setAllergies(selectedSuggestion);
        setAllergiesSuggestions([]);
      } else {
        handleSubmit();
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (activeSuggestionIndex < activeIngredientsSuggestions.length - 1) {
        console.log("in active")
        setActiveSuggestionIndex((prevIndex) => prevIndex + 1);
        scrollIntoViewDown(activeIngredientsSuggestions);
      } else if (activeSuggestionIndex < allergiesSuggestions.length - 1) {
        console.log("in allergies")
        setActiveSuggestionIndex((prevIndex) => prevIndex + 1);
        scrollIntoViewDown(allergiesSuggestions);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex((prevIndex) => prevIndex - 1);
        scrollIntoViewUp(activeIngredientsSuggestions);
      } else if (activeSuggestionIndex === 0 && allergiesSuggestions.length > 0) {
        setActiveSuggestionIndex(allergiesSuggestions.length - 1);
        scrollIntoViewUp(allergiesSuggestions);
      }
    }
  };

  const scrollIntoViewUp = (suggestions: string[]) => {
    if (suggestionListRef.current && activeSuggestionIndex !== -1) {
      const selectedElement = suggestionListRef.current.children[activeSuggestionIndex] as HTMLElement;
  
      const listRect = suggestionListRef.current.getBoundingClientRect();
      const itemRect = selectedElement.getBoundingClientRect();
  
      if (itemRect.bottom > listRect.bottom) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "end" });
      } else if (itemRect.top < listRect.top) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  const scrollIntoViewDown = (suggestions: string[]) => {
    if (suggestionListRef.current && activeSuggestionIndex !== -1) {
      const selectedElement = suggestionListRef.current.children[activeSuggestionIndex] as HTMLElement;
  
      const listRect = suggestionListRef.current.getBoundingClientRect();
      const itemRect = selectedElement.getBoundingClientRect();
  
      if (itemRect.bottom > listRect.bottom) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (itemRect.top < listRect.top) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
      <div className="form-patient-image"></div>
      <div className="form-text">
        <div className="text-line">Welcome Patients</div>
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
            onKeyDown={handleKeyDown}
          />
          {activeIngredientsSuggestions.length > 0 && (
            <ul ref={suggestionListRef}>
              {activeIngredientsSuggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(
                    suggestion,
                    setActiveIngredients,
                    setActiveIngredientsSuggestions
                  )}
                  className={index === activeSuggestionIndex ? "selected" : ""}
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
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          {allergiesSuggestions.length > 0 && (
            <ul ref={suggestionListRef}>
              {allergiesSuggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion,
                      setAllergies,
                      setAllergiesSuggestions
                    )
                  }
                  className={index === activeSuggestionIndex ? "selected" : ""}
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
            placeholder="Additional Fields"
            value={additionalFields}
            onChange={(e) =>
              handleInputChange(
                e,
                setAdditionalFields,
                setAdditionalFieldsSuggestions
              )
            }
          />
          {additionalFieldsSuggestions.length > 0 && (
            <ul>
              {additionalFieldsSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion,
                      setAdditionalFields,
                      setAdditionalFieldsSuggestions
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
          <button
            className="form-button"
            onClick={() => handleClickBack(showAlert)}
          >
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

export default PatientInput;
