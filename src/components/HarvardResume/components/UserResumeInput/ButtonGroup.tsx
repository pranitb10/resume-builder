import React from "react";

interface ButtonGroupProps {
  handlePDFDownload: () => void;
  handleDOCDownload: () => void;
  updatePreview: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  handlePDFDownload,
  handleDOCDownload,
  updatePreview,
}) => {
  return (
    <div className="flex justify-between">
      <button
        className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
        type="button"
        onClick={handlePDFDownload}
      >
        Download as PDF
      </button>
      <button
        className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
        type="button"
        onClick={handleDOCDownload}
      >
        Download as DOC
      </button>
      <button
        className="p-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
        type="button"
        onClick={updatePreview}
      >
        Update Preview
      </button>
    </div>
  );
};

export default ButtonGroup;
