"use client";

import { motion } from "framer-motion";

export const Star = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: [0, 1, 0],
        rotate: 360,
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
    />
  );
};

export const AnimatedSquare = ({ size, color, initialPosition }: {
  size: string;
  color: string;
  initialPosition: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}) => {
  return (
    <motion.div
      initial={{ 
        ...initialPosition,
        opacity: 0,
        rotate: 0
      }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        rotate: 360,
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className={`absolute ${size} bg-gradient-to-br ${color} rounded-3xl blur-3xl`}
    />
  );
};

export const BackgroundSquares = () => {
  const squareSize = 80;
  const gridSize = 5;
  const totalWidth = squareSize * gridSize;
  const totalHeight = squareSize * gridSize;

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <div 
        className="relative"
        style={{
          width: `${totalWidth}px`,
          height: `${totalHeight}px`,
        }}
      >
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-3xl"
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              borderRadius: '12px',
              left: `${(index % gridSize) * squareSize}px`,
              top: `${Math.floor(index / gridSize) * squareSize}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}; 