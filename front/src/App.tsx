import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PatientInput from "./pages/PatientInput";
import ProviderInput from "./pages/ProviderInput";
import ProviderOutput from "./pages/ProviderOutput";
import PatientOutput from "./pages/PatientOutput";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patientinput" element={<PatientInput />} />
          <Route path="/providerinput" element={<ProviderInput />} />
          <Route path="/provideroutput" element={<ProviderOutput />} />
          <Route path="/patientoutput" element={<PatientOutput />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
