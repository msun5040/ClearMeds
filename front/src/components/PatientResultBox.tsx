interface PatientOutputProps {
  drugBrand: string;
  genericName: string;
  activeIngredients: string;
  uses: string;
  manufacturers: string;
  marketingStatus: string;
}

export function PatientResultBox(props: PatientOutputProps) {
  return (
    <div className="result-box">
      <div className="result-entry-title">{props.drugBrand}</div>
      <div className="result-entry-subtitle">{props.genericName}</div>
      <div className="result-entry-text-header">Active Ingredients:</div>
      <div className="result-entry-text-body">{props.activeIngredients}</div>
      <div className="result-entry-text-header">Uses:</div>
      <div className="result-entry-text-body">{props.uses}</div>
      <div className="result-entry-text-header">Manufacturers:</div>
      <div className="result-entry-text-body">{props.manufacturers}</div>
      <div className="result-entry-text-header">Marketing Status:</div>
      <div className="result-entry-text-body">{props.marketingStatus}</div>
      <div className="patient-output-learnmore-container">
        <button className="patient-output-learnmore">Learn More</button>
      </div>
    </div>
  );
}

