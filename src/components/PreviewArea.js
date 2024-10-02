import React, { useEffect, useState, useRef } from "react";
import CatSprite from "./CatSprite";
import { motion } from "framer-motion";
import DogSprite from "./DogSprite";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Draggable from "react-draggable";

export default function PreviewArea({
  catSayHi,
  dogSayHi,
  move,
  moveY,
  setMove,
  setMoveY,
  rotate,
  position,
  controls,
  catDirection,
  dogDirection,
  setCatDirection,
  setDogDirection,
  setCollision,
}) {
  const [catProps, setCatProps] = useState({ x: move, y: moveY });
  const [latestX, setLatestX] = useState(move);
  const [latestY, setLatestY] = useState(moveY);


  const [isDogVisible, setDog] = useState(false);

  const [dogProps, setDogProps] = useState({ x: -move, y: moveY });
  const [hasCollided, setHasCollided] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    setCatProps({ x: move, y: moveY });
    setDogProps({ x: -move, y: moveY });
  }, [move, moveY]);

  const handleCatDrag = (e, data) => {
    setIsDragging(true);
    setCatProps({ x: data.x, y: data.y });
    setMove(data.x)
    setMoveY(data.y);
  };

  const handleDogDrag = (e, data) => {
    setIsDragging(true);
    setDogProps({ x: data.x, y: data.y });
    // setMove(data.x)
    // setMoveY(data.y);
  };
  const handleStopDrag = () => {
    setIsDragging(false);
  };

  const angleInRadians = (rotate * Math.PI) / 180;
  const moveXCat =
    catDirection * Math.abs(catProps.x) * Math.cos(angleInRadians);
  const moveYCat =
    catDirection * Math.abs(catProps.y)

  const moveXDog =
    dogDirection * Math.abs(dogProps.x) * Math.cos(angleInRadians);
  const moveYDog =
    dogDirection * Math.abs(dogProps.y) * Math.sin(angleInRadians);

  const getBoundaries = () => {
    const previewArea = previewRef.current?.getBoundingClientRect();
    if (!previewArea) {
      return false; // No boundaries if the element is not found
    }
    return {
      minX: 0,
      minY: 0,
      maxX: previewArea.width,
      maxY: previewArea.height,
    };
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  // Constrain movement within the boundaries

  const constrainedCatX = clamp(latestX, 0, getBoundaries().maxX - 100); // assuming 100 is the width of the sprite
  const constrainedCatY = clamp(latestY, 0, getBoundaries().maxY - 180); // assuming 100 is the height of the sprite

  const boundaries = getBoundaries();

  const constrainedDogX = clamp(latestX, 0, getBoundaries().maxX - 100);

  const constrainedDogY = clamp(latestY, 0, getBoundaries().maxY - 180); 

  const checkCollision = () => {
    // console.log("cat");
    const cat = document.getElementById("catSprite")?.getBoundingClientRect();
    const dog = document.getElementById("dogSprite")?.getBoundingClientRect();
    if (!cat || !dog) {
      return false; // No collision if elements are not found
    }
    return !(
      cat.right < dog.left ||
      cat.left > dog.right ||
      cat.bottom < dog.top ||
      cat.top > dog.bottom
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkCollision() && !hasCollided) {
        setHasCollided(true);
        setCollision(true);
        setCatDirection((prev) => -prev); // Reverse direction
        setDogDirection((prev) => -prev); // Reverse direction
      } else if (!checkCollision() && hasCollided) {
        setHasCollided(false); // Reset collision state if they are no longer colliding
      }
    }, 50); // Check collision every 50ms

    return () => clearInterval(interval);
  }, [hasCollided]);

  const defaultAnimation = {
    x: -constrainedDogX,
    y: constrainedDogY,
    scale: 1,
    rotate: rotate,
  };

  // Logic to track the latest update between position.x and moveXCat
  useEffect(() => {
    if (position.x !== latestX || position.y !== latestY) {
      setLatestX(position.x);
    }
  }, [position.x]);

  useEffect(() => {
    if (moveXCat !== latestX) {
      setLatestX(moveXCat);
    }
  }, [moveXCat]);
  // Logic to track the latest update between position.x and moveXCat
  useEffect(() => {
    if (position.x !== latestX || position.y !== latestY) {
      setLatestY(position.y);
    }
  }, [position.y]);

  useEffect(() => {
    if (moveYCat !== latestY) {
      setLatestY(moveYCat);
    }
  }, [moveYCat]);

  return (
    <div className="flex flex-col w-full" ref={previewRef}>
      <div className="relative h-full py-10">
        <Draggable
          position={{ x: catProps.x, y: catProps.y }}
          onDrag={handleCatDrag}
          onStop={handleStopDrag}
          bounds="parent"
        >
          <motion.div
            animate={{
              x: constrainedCatX,
              y: constrainedCatY, //This doesn't work
              // y: catProps.y,
              scale: 1,
              rotate: rotate,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 cursor-move"
          >
            {catSayHi && (
              <div class="cartoon">
                <div class="bubble left-28 b r hb">
                  Hi...
                  {/* <br />I guess... */}
                </div>
              </div>
            )}
            <CatSprite />
          </motion.div>
        </Draggable>
        {isDogVisible && (
          <Draggable
            position={{ x: dogProps.x, y: dogProps.y }}
            onDrag={handleDogDrag}
            onStop={handleStopDrag}
            bounds="parent" // Constrain dragging within parent
          >
            <motion.div
              animate={defaultAnimation}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 cursor-move"
            >
              {dogSayHi && (
                <div class="cartoon">
                  <div class="bubble left-16 b r hb">
                    Hi...
                    {/* <br />I guess... */}
                  </div>
                </div>
              )}
              <DogSprite />
            </motion.div>
          </Draggable>
        )}
      </div>
      <div className="absolute bottom-0 -z-50 p-10 w-96">
        <div
          onClick={() => {
            setDog(!isDogVisible);
          }}
          className="shadow bg-gray-100 w-5 h-5 rounded-lg cursor-pointer p-10 flex justify-center items-center"
        >
          <AddBoxIcon />
        </div>
      </div>
    </div>
  );
}
