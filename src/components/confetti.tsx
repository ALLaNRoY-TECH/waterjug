"use client";

import React, { useEffect, useState, memo } from 'react';

const colors = ["#74B9FF", "#FFFF8C", "#FF6B6B", "#48C9B0"];

const ConfettiPiece = memo(({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const left = `${Math.random() * 100}vw`;
    const animationDuration = `${Math.random() * 2 + 3}s`;
    const animationDelay = `${Math.random() * 2}s`;
    const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const transform = `rotate(${Math.random() * 360}deg)`;

    setStyle({
      left,
      animationDuration,
      animationDelay,
      backgroundColor,
      transform,
    });
  }, []);

  return <div className="confetti" style={style} onAnimationEnd={onAnimationEnd} />;
});
ConfettiPiece.displayName = 'ConfettiPiece';


const Confetti = ({ count = 100 }: { count?: number }) => {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    setPieces(Array.from({ length: count }, (_, i) => i));
  }, [count]);

  const handleAnimationEnd = (idToRemove: number) => {
    setPieces(prevPieces => prevPieces.filter(id => id !== idToRemove));
  };
  
  if (pieces.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-50">
      {pieces.map((id) => (
        <ConfettiPiece key={id} onAnimationEnd={() => handleAnimationEnd(id)} />
      ))}
    </div>
  );
};

export default memo(Confetti);
