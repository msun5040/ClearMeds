import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OutputBox() {
  const navigate = useNavigate();

  const location = useLocation();
  const { showAlert } =
    location.state || {};

  const handleClickPatient = () => {
    if (showAlert) {
      navigate("/patientinput");
    } else {
      console.log("Please accept the disclaimer before proceeding.");
    }
  };

  const handleClickProvider = () => {
    if (showAlert) {
      navigate("/providerinput");
    } else {
      console.log("Please accept the disclaimer before proceeding.");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const textBox = document.getElementById("text-box");
      if (textBox) {
        const width = textBox.offsetWidth;
        const height = textBox.offsetHeight;

        const fontSize = Math.min(width * 0.05, height * 0.05); // Adjust the multiplier as needed

        const textLines = textBox.querySelectorAll<HTMLElement>(
          ".text-line, .text-line-bold"
        );
        textLines.forEach((line) => {
          line.style.fontSize = `${fontSize}px`;
        });
      }
    };

    handleResize(); // Set font size on initial render

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="output-box">
      <div className="text-box">
        <div className="text-line">Clear Answers,</div>
        <div className="text-line"> Informed Decisions,</div>
        <div className="text-line-bold"> Healthy Lives.</div>
      </div>
      <div className="user-selector-container">
      <button className="user-selector-button" onClick={handleClickPatient}>
        Patients Start Here
      </button>
      <button className="user-selector-button" onClick={handleClickProvider}>
        Providers Start Here
      </button>
      </div>
      
    </div>
  );
}
