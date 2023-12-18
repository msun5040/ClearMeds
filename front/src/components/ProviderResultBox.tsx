interface DrugInfo {
  drugBrand: string;
  genericName: string;
  product_ndc: string;
  activeIngredients: string;
  route: string;
  manufacturers: string;
  marketingStatus: string;
}

export function ProviderResultBox(props: DrugInfo) {
  const handleLearnMore = () => {
    window.open("https://www.drugs.com/"+ props.activeIngredients + ".html", "_blank");
  };
  return (
    <div className="provider-result-box">
      <div className="provider-column-container">
        <div className="provider-column-left">
          <div className="result-entry-title">{props.drugBrand}</div>
          <div className="result-entry-subtitle">{props.genericName}</div>
        </div>
        <div className="provider-column">
          <div className="result-entry-pair">
            <div className="result-entry-text-header">Product NDC:</div>
            <div className="result-entry-text-body">{props.product_ndc}</div>
          </div>
          <div className="result-entry-pair">
            <div className="result-entry-text-header">Active Ingredients:</div>
            <div className="result-entry-text-body">
              {props.activeIngredients}
            </div>
          </div>
          <div className="result-entry-pair">
            <div className="result-entry-text-header">Route:</div>
            <div className="result-entry-text-body">
              {props.route}
            </div>
          </div>
          <div className="result-entry-pair">
            <div className="result-entry-text-header">Manufacturers:</div>
            <div className="result-entry-text-body">{props.manufacturers}</div>
          </div>
          <div className="result-entry-pair">
            <div className="result-entry-text-header">Marketing Status:</div>
            <div className="result-entry-text-body">
              {props.marketingStatus}
            </div>
          </div>
        </div>
        <div className="provider-column">
          <div className="patient-output-learnmore-container">
            <button
              className="patient-output-learnmore"
              onClick={handleLearnMore}
            >
              Learn More{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
