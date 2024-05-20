import React from "react";

interface SaveResult {
  error: boolean;
}

const SaveResult: React.FC<SaveResult> = ({ error }) => {
  return (
    <div
      className={`save-result-container ${
        error ? "save-error" : "save-success"
      }`}
    >
      <p className="save-container-text">
        {error ? "Cannot save flow!" : "Flow Saved!"}
      </p>
    </div>
  );
};

export default SaveResult;
