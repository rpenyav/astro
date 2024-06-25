import React from "react";
import "./LoaderComponent.css";

const LoaderComponent: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoaderComponent;
