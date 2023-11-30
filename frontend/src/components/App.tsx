import React, { useState } from "react";
import "../styles/App.css";
import REPL from "./REPL";
import HelpScreen from "./HelpScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  let [isHelpScreenOpen, setIsHelpScreenOpen] = useState(false);
  let toggleHelpScreen = () => {
    setIsHelpScreenOpen(!isHelpScreenOpen);
  };

  return (
    <div id="content">
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-caption">
                <h1 className="page-title">The ClearRx Project</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-section">
        <div className="container">
          <div className="card-block bg-white mb30">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section-title mb-0">
                  <h2>Form to be filled by the user.</h2>
                  <p>
                    Insert drug name: 
                    Insert allergies: {" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-section">
        <div className="container">
          <div className="card-block bg-white mb30">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section-title mb-0">
                  <h2>Results.</h2>
                  <p>
                    Our approach is very simple: we define your problem and give
                    the best solution.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert in the middle of the page */}

      {/* {isHelpScreenOpen && <HelpScreen />} */}
      <REPL />
    </div>
  );
}

export default App;
