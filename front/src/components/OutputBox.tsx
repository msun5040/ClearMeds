import React, { useEffect } from "react";

export default function OutputBox() {
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
        <button className="user-selector-button">Button1</button>
        <button className="user-selector-button">Button2</button>
      </div>
    </div>
  );
}
