import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useAnimation } from "framer-motion";

export default function App() {
  const [catSayHi, setCatSayHi] = useState(false);
  const [dogSayHi, setDogSayHi] = useState(false);
  const [move, setMove] = useState(0);
  const [moveY, setMoveY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [collision, setCollision] = useState(false);
  const [catDirection, setCatDirection] = useState(1);
  const [dogDirection, setDogDirection] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMove = (move) => {
    setMove((prevMove) => prevMove + move);
  };
  const handleMoveY = (move) => {
    // console.log("moveY", move);
    setMoveY((prevMove) => prevMove + move);
  };
  const handleRightRotate = (move) => {
    setRotate((prevMove) => prevMove + move);
  };
  const handleLeftRotate = (move) => {
    setRotate((prevMove) => prevMove - move);
  };
  const handlePosition = (newX, newY) => {
    setMove(0);
    setMoveY(0);
    if (collision) {
      setCatDirection((prev) => -prev); // Reverse direction
      setDogDirection((prev) => -prev); // Reverse direction
      setCollision(false);
    }
    setPosition({ x: newX, y: newY });
  };
  const handleAction = (actionType, value) => {
    console.log(actionType);

    switch (actionType) {
      case "move":
        handleMove(value);
        break;
      case "moveY":
        handleMoveY(value);
        break;
      case "rightRotate":
        handleRightRotate(value);
        break;
      case "leftRotate":
        handleLeftRotate(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            handleMove={handleMove}
            handleMoveY={handleMoveY}
            handleRightRotate={handleRightRotate}
            handleLeftRotate={handleLeftRotate}
            handlePosition={handlePosition}
            catSayHi={catSayHi}
            setCatSayHi={setCatSayHi}
            dogSayHi={dogSayHi}
            setDogSayHi={setDogSayHi}
          />
          <MidArea handleAction={handleAction} />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            catSayHi={catSayHi}
            dogSayHi={dogSayHi}
            move={move}
            moveY={moveY}
            setMove={setMove}
            setMoveY={setMoveY}
            rotate={rotate}
            position={position}
            controls={controls}
            catDirection={catDirection}
            dogDirection={dogDirection}
            setCatDirection={setCatDirection}
            setDogDirection={setDogDirection}
            setCollision={setCollision}
          />
        </div>
      </div>
    </div>
  );
}
