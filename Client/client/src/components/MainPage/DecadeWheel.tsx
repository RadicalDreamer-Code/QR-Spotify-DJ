import React, { useState } from 'react';
import './Circle.css'; // Import CSS file for styling

const DecadeWheel = () => {
  const [selectedSection, setSelectedSection] = useState(0); // State to track the selected section

  // Function to handle selection of a section
  const selectSection = (sectionIndex: number) => {
    setSelectedSection(sectionIndex);
  };

  return (
    <div className="circle">
      {/* Generate 7 sections */}
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className={`section ${selectedSection === index ? 'selected' : ''}`}
          onClick={() => selectSection(index)}
        >
          Section {index + 1}
        </div>
      ))}
    </div>
  );
};

export default DecadeWheel;
