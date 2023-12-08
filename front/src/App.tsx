import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PatientInput from "./pages/PatientInput";
import ProviderInput from "./pages/ProviderInput";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Your global elements, headers, etc. can be placed here */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patientinput" element={<PatientInput />} />
          <Route path="/providerinput" element={<ProviderInput />} />
          {/*  */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
