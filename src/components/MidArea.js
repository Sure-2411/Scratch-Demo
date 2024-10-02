import React, { useState } from "react";
import { useAnimation } from "framer-motion";
export default function MidArea({ handleAction }) {
  const [droppedItems, setDroppedItems] = useState([]);
  const controls = useAnimation();

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    setDroppedItems((prevItems) => [
      ...prevItems,
      { actionType: data.actionType, value: data.value },
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const playSeries = async () => {
    let currentRotate = 0; // Initialize rotate
    for (const item of droppedItems) {
      const { actionType, value } = item;
      handleAction(actionType, parseInt(value));
      // await controls.start((current) =>
      try {
        switch (actionType) {
          case "move":
            await controls.start({
              x: value * Math.cos((rotate * Math.PI) / 180),
              y: value * Math.sin((rotate * Math.PI) / 180),
              transition: { duration: 1 },
            });
            break;
          case "rightRotate":
            currentRotate += value;
            await controls.start({
              rotate: currentRotate,
              transition: { duration: 1 },
            });
            break;
          case "leftRotate":
            currentRotate -= value;
            await controls.start({
              rotate: currentRotate,
              transition: { duration: 1 },
            });
            break;
          default:
            break;
        }
      } catch (error) {}
      // })
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full h-full relative flex flex-col items-center justify-center bg-gray-100 border border-gray-300"
    >
      <div className="absolute top-10 left-[50%] translate-x-[-50%] flex justify-center items-center gap-10">
        {droppedItems.length != 0 && (
          <button
            onClick={playSeries}
            className="bg-green-600  font-semibold text-white text-center py-2 px-5 rounded"
          >
            Play
          </button>
        )}
        {droppedItems.length != 0 && (
          <button
            onClick={()=>{setDroppedItems([])}}
            className="bg-red-600 font-semibold text-white text-center py-2 px-5 rounded"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col items-center">
        {droppedItems.map((item, index) => (
          <div key={index} className="p-2 m-2 bg-blue-500 text-white rounded">
            <span>Action: {item.actionType}</span>
            <br />
            <span>Value: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
