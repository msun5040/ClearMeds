import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProviderResultBox} from "../components/ProviderResultBox"

interface DrugInfo {
  drugBrand: string;
  genericName: string;
  product_ndc: string;
  activeIngredients: string;
  route: string;
  manufacturers: string;
  marketingStatus: string;
}

const PatientOutput: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { activeIngredients, allergies, marketingFields } =
    location.state || {};

  const handleClickBack = () => {
    if (startIndex >= itemsPerPage) {
      setStartIndex((prevStartIndex) => prevStartIndex - itemsPerPage);
    } else {
      navigate("/providerinput");
    }
  };
  const [parsedResults, setParsedResults] = useState<DrugInfo[]>([]);

  async function getResult(
    activeIngredients: string,
    allergies: string
  ): Promise<DrugInfo[]> {
    const fetch1 = await fetch(
      "http://localhost:3232/search_active_ingredient?active_ingredient=" +
        activeIngredients +
        "&allergy_ingredient=" +
        allergies
    );

    const json1 = await fetch1.json();
    const api_call_result = await json1["results"];

    console.log("api result", api_call_result);

    if (api_call_result) {
      return api_call_result.map((result: any) => {
        return {
          drugBrand: result.brand_name[0],
          genericName: result.generic_name[0],
          product_ndc: result.product_ndc,
          activeIngredients: result.active_ingredients,
          route: result.route,
          manufacturers: result.manufacturer_name,
          marketingStatus: result.marketing_status,
        };
      });
    } else {
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResult(activeIngredients, allergies);
        setParsedResults(result);
        console.log(parsedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeIngredients, allergies]);

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleShowMoreResults = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + itemsPerPage);
  };

  const renderResults = () => {
    return (
      <>
        <div className="result-panel-container">
          {parsedResults
            .slice(startIndex, startIndex + itemsPerPage)
            .map((parsedResults, index) => (
              <ProviderResultBox key={index} {...parsedResults} />
            ))}
        </div>
        {startIndex + itemsPerPage < parsedResults.length && (
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
        Marketing Status: {marketingFields}
      </div>

      <div className="result-container">{renderResults()}</div>
    </div>
  );
};
export default PatientOutput;
