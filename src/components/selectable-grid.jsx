import { useCallback, useState } from "react";

/* eslint-disable react/prop-types */
const SelectableGrid = ({ rows = 10, cols = 10 }) => {
  console.log("selectable grid");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const handleMouseUp = () => {};
  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };
  const handleMouseEnter = useCallback(
    (boxNumber) => {
      if (isMouseDown) {
        const startBox = selectedBoxes[0];
        const endBox = boxNumber;

        const startRow = Math.floor((startBox - 1) / cols); //23-1/10=2
        const endRow = Math.floor((endBox - 1) / cols); //44-1/10=4
        const startCols = (startBox - 1) % cols;
        const endCols = (endBox - 1) % cols;

        const minCols = Math.min(startCols, endCols);
        const maxCols = Math.max(startBox, endCols);
        const minRows = Math.min(startRow, endRow);
        const maxRows = Math.max(startRow, endRow);

        console.log(minCols, maxCols);
        console.log(minRows, maxRows);

        const selectedArray = [];
        for (let row = minRows; row <= maxRows; row++) {
          for (let col = minCols; col <= maxCols; col++) {
            selectedArray.push(row * cols + col + 1);
          }
        }
        setSelectedBoxes(selectedArray);
      }
    },
    [isMouseDown]
  );
  return (
    <div
      className="grid"
      style={{ "--rows": rows, "--cols": cols }}
      onMouseUp={handleMouseUp()}
    >
      {[...Array(rows * cols).keys()].map((_, i) => (
        <div
          key={i}
          className={`box ${selectedBoxes.includes(i + 1) ? "selected" : ""}`}
          onMouseDown={() => handleMouseDown(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;
