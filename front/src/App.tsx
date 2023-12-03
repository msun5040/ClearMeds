import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Your global elements, headers, etc. can be placed here */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes/components as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;