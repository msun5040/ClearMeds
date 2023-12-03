import { useState } from "react";
import Logo from "../components/logo";
import OutputBox from "../components/OutputBox";

const Home: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);

  const handleAccept = () => {
    setShowAlert(false);
  };

  return (
      <div className="body">
        <div className="App-logo">
          <Logo />
        </div>

        <OutputBox></OutputBox>

        {showAlert && (
          <div className="alert-container">
            <div className="alert alert-warning" role="alert">
              <div className="alert-text">
                <strong>Disclaimer: Not Medical Advice</strong>
                <br></br>
                The information provided on this website is for general
                informational purposes only. It is not a substitute for
                professional medical advice, diagnosis, or treatment. Always
                seek the advice of your physician or other qualified health
                provider with any questions you may have regarding a medical
                condition.
              </div>
              <div className="accept-button-container">
                <button
                  type="button"
                  className="accept-button"
                  onClick={handleAccept}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Home;
