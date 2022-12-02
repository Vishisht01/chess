import React, { useState } from "react";
import "./Chessboard.css";

export default function Chessboard() {
  const [pos, setPos] = useState();
  const [currLoc, setCurrLoc] = useState([]);

  const onTileClick = (position) => {
    const img = document.createElement("img");
    img.src = "./Knight.png";
    img.id = `img_${position}`;
    img.className = "knight";
    if (pos !== undefined) {
      const im = document.getElementById(`img_${pos}`);
      document.getElementById(`${pos}`).removeChild(im);
    }
    document.getElementById(`${position}`).appendChild(img);
    calculateCombinations(position);
    setPos(position);
  };

  const calculateCombinations = (position) => {
    const modifiers = [
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: -1, y: 2 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
      { x: -1, y: -2 },
      { x: 1, y: -2 },
      { x: 2, y: -1 },
    ];
    const cX = position % 8;
    const cY = Math.floor(position / 8);

    const locations = modifiers
      .map((item) => {
        if (
          cX + item.x >= 0 &&
          cX + item.x < 8 &&
          cY + item.y >= 0 &&
          cY + item.y < 8
        ) {
          return cX + item.x + (cY + item.y) * 8;
        }
      })
      .filter((item) => item !== undefined);

    currLoc.map((loc) => {
      const im = document.getElementById(`loc_${loc}`);
      document.getElementById(`${loc}`).removeChild(im);
    });

    locations.map((loc) => {
      const img = document.createElement("img");
      img.src = "./positions.png";
      img.id = `loc_${loc}`;
      img.className = "knight";
      document.getElementById(`${loc}`).appendChild(img);
    });

    setCurrLoc(locations);
  };

  const renderBoard = () => {
    const positions = [];
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 8; i++) {
        const num = j + i + 2;
        // const dis = [horizontalAxis[i], verticalAxis[j]];
        if (num % 2 === 0) {
          positions.push(
            <div
              key={`${i + j * 8}`}
              id={`${i + j * 8}`}
              className="tile black_tile"
              onClick={() => {
                onTileClick(i + j * 8);
              }}
            ></div>
          );
        } else {
          positions.push(
            <div
              key={`${i + j * 8}`}
              id={`${i + j * 8}`}
              className="tile white_tile"
              onClick={() => {
                onTileClick(i + j * 8);
              }}
            ></div>
          );
        }
      }
    }
    return positions;
  };

  return <div className="board">{renderBoard()}</div>;
}
