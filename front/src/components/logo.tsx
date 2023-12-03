import capsule from "./capsule.svg";

const logo = () => {
  return (
    <div className="logo-container">
      <svg width="75" height="75" viewBox="0 0 150 150">
        <image href={capsule} width="150" height="150" />
      </svg>
      <div className="logo-text">
        <span className="logo-text-line">The ClearRx</span>
        <span className="logo-text-line">Project</span>
      </div>
    </div>
  );
};

export default logo;
