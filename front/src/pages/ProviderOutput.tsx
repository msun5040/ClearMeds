import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProviderResultBox} from "../components/ProviderResultBox"

const PatientOutput: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { activeIngredients, allergies, additionalFields } =
    location.state || {};

  const handleClickBack = () => {
    navigate("/providerinput");
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

  // const renderResults = () => {
  //   if (results.length <= 4) {
  //     return (
  //       <div className="result-panel-container">
  //         {results.map((result, index) => (
  //           <ResultBox key={index} {...result} />
  //         ))}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <div className="result-panel-container">
  //           {results.slice(0, 4).map((result, index) => (
  //             <ResultBox key={index} {...result} />
  //           ))}
  //         </div>
  //         <button className="more-results-buttons">See more results</button>
  //       </>
  //     );
  //   }
  // };

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleShowMoreResults = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + itemsPerPage);
  };

  const renderResults = () => {
    return (
      <>
        <div className="result-panel-container">
          {results
            .slice(startIndex, startIndex + itemsPerPage)
            .map((result, index) => (
              <ProviderResultBox key={index} {...result} />
            ))}
        </div>
        {startIndex + itemsPerPage < results.length && (
          <button className="form-button" onClick={handleShowMoreResults}>
            See more results
          </button>
        )}
        <button className="form-button" onClick={handleClickBack}>
          Back
        </button>
      </>
    );
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
