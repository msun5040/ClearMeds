interface ProviderOutputProps {
  drugBrand: string;
  genericName: string;
  activeIngredients: string;
  uses: string;
  manufacturers: string;
  marketingStatus: string;
  strength: string;
}

export function ProviderResultBox(props: ProviderOutputProps) {
  const handleLearnMore = () => {
    const activeIng = props.activeIngredients.replace(/\s+/g, "-");
    window.open("https://www.drugs.com/"+ activeIng + ".html", "_blank");
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
            <div className="result-entry-text-header">Active Ingredients:</div>
            <div className="result-entry-text-body">
              {props.activeIngredients}
            </div>
          </div>
          <div className="result-entry-pair">
            <div className="result-entry-text-header">Uses:</div>
            <div className="result-entry-text-body">{props.uses}</div>
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
          <div className="result-entry-pair">
            <div className="result-entry-text-header">Strength:</div>
            <div className="result-entry-text-body">{props.strength}</div>
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
