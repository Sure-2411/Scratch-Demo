import React, { useRef, useState } from "react";
import Icon from "./Icon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export default function Sidebar({
  handleMove,
  handleMoveY,
  handleRightRotate,
  handleLeftRotate,
  handlePosition,
  catSayHi,
  setCatSayHi,
  dogSayHi,
  setDogSayHi
}) {
  const [move, setMove] = useState(10);
  const [moveY, setMoveY] = useState(10);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rightRotate, setRightRotate] = useState(15);
  const [leftRotate, setLeftRotate] = useState(15);

  const [isPlayingMove, setIsPlayingMove] = useState(false);
  const [isPlayingMoveY, setIsPlayingMoveY] = useState(false);
  const [isPlayingRightRotate, setIsPlayingRightRotate] = useState(false);
  const [isPlayingLeftRotate, setIsPlayingLeftRotate] = useState(false);

  const animationMoveRef = useRef();
  const animationRightRotateRef = useRef();
  const animationLeftRotateRef = useRef();

  // Move Animation Handlers
  const playMoveAnimation = () => {
    setIsPlayingMove(true);
    const animate = () => {
      handleMove(parseInt(move) || 0);
      animationMoveRef.current = requestAnimationFrame(animate);
    };
    animationMoveRef.current = requestAnimationFrame(animate);
  };

  const stopMoveAnimation = () => {
    setIsPlayingMove(false);
    cancelAnimationFrame(animationMoveRef.current);
  };

  const playMoveYAnimation = () => {
    setIsPlayingMoveY(true);
    const animate = () => {
      handleMoveY(parseInt(moveY) || 0);
      animationMoveRef.current = requestAnimationFrame(animate);
    };
    animationMoveRef.current = requestAnimationFrame(animate);
  };

  const stopMoveYAnimation = () => {
    setIsPlayingMoveY(false);
    cancelAnimationFrame(animationMoveRef.current);
  };

  // Right Rotate Animation Handlers
  const playRightRotateAnimation = () => {
    setIsPlayingRightRotate(true);
    const animate = () => {
      handleRightRotate(parseInt(rightRotate) || 0);
      animationRightRotateRef.current = requestAnimationFrame(animate);
    };
    animationRightRotateRef.current = requestAnimationFrame(animate);
  };

  const stopRightRotateAnimation = () => {
    setIsPlayingRightRotate(false);
    cancelAnimationFrame(animationRightRotateRef.current);
  };

  // Left Rotate Animation Handlers
  const playLeftRotateAnimation = () => {
    setIsPlayingLeftRotate(true);
    const animate = () => {
      handleLeftRotate(parseInt(leftRotate) || 0);
      animationLeftRotateRef.current = requestAnimationFrame(animate);
    };
    animationLeftRotateRef.current = requestAnimationFrame(animate);
  };

  const stopLeftRotateAnimation = () => {
    setIsPlayingLeftRotate(false);
    cancelAnimationFrame(animationLeftRotateRef.current);
  };

  const handleMoveChange = (e) => {
    const newValue = e.target.value;
    if (/^-?\d*$/.test(newValue)) {
      setMove(newValue);
    }
  };
  const handleMoveYChange = (e) => {
    const newValue = e.target.value;
    if (/^-?\d*$/.test(newValue)) {
      setMoveY(newValue);
    }
  };
  const handleXChange = (e) => {
    setX(e.target.value);
  };

  const handleYChange = (e) => {
    setY(e.target.value);
  };

  const handleRightChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setRightRotate(newValue);
    }
  };
  const handleLeftChange = (e) => {
    const newValue = e.target.value;
    // Check if newValue is a valid number or an empty string
    if (/^\d*$/.test(newValue)) {
      setLeftRotate(newValue);
    }
  };

  const handleDragStart = (e, actionType, value) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ actionType, value })
    );
  };

  return (
    <div className="w-68 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      {/* Move Animation */}
      <div
        onClick={() => {
          handleMove(parseInt(move) || 0);
        }}
        draggable
        onDragStart={(e) => handleDragStart(e, "move", move)}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        <span>Move X Axis</span>
        <input
          type="number"
          value={move}
          onClick={(e) => e.stopPropagation()}
          onChange={handleMoveChange}
          className="w-8 rounded-xl pl-1 mx-1 outline-none border-none text-black"
        />
        <span>steps</span>
        <PlayArrowIcon
          onClick={playMoveAnimation}
          className={`mx-2 ${isPlayingMove ? "text-gray-400" : "text-white"}`}
        />
        <StopIcon
          onClick={stopMoveAnimation}
          className={`mx-2 ${!isPlayingMove ? "text-gray-400" : "text-white"}`}
        />
      </div>
      <div
        onClick={() => {
          handleMoveY(parseInt(moveY) || 0);
        }}
        draggable
        onDragStart={(e) => handleDragStart(e, "moveY", moveY)}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        <span>Move Y Axis</span>
        <input
          type="number"
          value={moveY}
          onClick={(e) => e.stopPropagation()}
          onChange={handleMoveYChange}
          className="w-8 rounded-xl pl-1 mx-1 outline-none border-none text-black"
        />
        <span>steps</span>
        <PlayArrowIcon
          onClick={playMoveYAnimation}
          className={`mx-2 ${isPlayingMoveY ? "text-gray-400" : "text-white"}`}
        />
        <StopIcon
          onClick={stopMoveYAnimation}
          className={`mx-2 ${!isPlayingMoveY ? "text-gray-400" : "text-white"}`}
        />
      </div>

      {/* Right Rotate Animation */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "rightRotate", rightRotate)}
        onClick={() => {
          handleRightRotate(parseInt(rightRotate) || 0);
        }}
        className="flex flex-row justify-center items-center flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        <span>Turn</span>
        <Icon name="redo" size={15} className="text-white mx-2" />
        <input
          type="number"
          value={rightRotate}
          onClick={(e) => e.stopPropagation()}
          onChange={handleRightChange}
          className="w-8 rounded-xl pl-1 mx-1 outline-none border-none text-black"
        />
        <span>degrees</span>
        <PlayArrowIcon
          onClick={playRightRotateAnimation}
          className={`mx-2 ${
            isPlayingRightRotate ? "text-gray-400" : "text-white"
          }`}
        />
        <StopIcon
          onClick={stopRightRotateAnimation}
          className={`mx-2 ${
            !isPlayingRightRotate ? "text-gray-400" : "text-white"
          }`}
        />
      </div>

      {/* Left Rotate Animation */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "leftRotate", leftRotate)}
        onClick={() => {
          handleLeftRotate(parseInt(leftRotate) || 0);
        }}
        className="flex flex-row justify-center items-center flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        <span>Turn</span>
        <Icon name="undo" size={15} className="text-white mx-2" />
        <input
          type="number"
          value={leftRotate}
          onClick={(e) => e.stopPropagation()}
          onChange={handleLeftChange}
          className="w-8 rounded-xl pl-1 mx-1 outline-none border-none text-black"
        />
        <span>degrees</span>
        <PlayArrowIcon
          onClick={playLeftRotateAnimation}
          className={`mx-2 ${
            isPlayingLeftRotate ? "text-gray-400" : "text-white"
          }`}
        />
        <StopIcon
          onClick={stopLeftRotateAnimation}
          className={`mx-2 ${
            !isPlayingLeftRotate ? "text-gray-400" : "text-white"
          }`}
        />
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "position")}
        onClick={() => handlePosition(parseInt(x), parseInt(y))}
        className="flex flex-row justify-center items-center flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        <span className="px-1">Goto</span>

        <span>x:</span>
        <input
          type="number"
          value={x}
          onClick={(e) => e.stopPropagation()} // Prevents click event from reaching the div
          onChange={handleXChange}
          className="w-8 rounded-xl pl-1 mx-1 outline-none border-none text-black"
        />
        <span>y:</span>
        <input
          type="number"
          value={y}
          onClick={(e) => e.stopPropagation()}
          onChange={handleYChange}
          className="w-8 rounded-xl pl-1 mx-1 outline-none border-none text-black"
        />
        <span className="px-1">position</span>
      </div>
      <button
        onClick={() => {
          setCatSayHi(!catSayHi);
        }}
        className=" bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        Make Cat Say Hi
      </button>
      <button
        onClick={() => {
          setDogSayHi(!dogSayHi);
        }}
        className=" bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        Make Dog Say Hi
      </button>
    </div>
  );
}
