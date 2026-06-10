import React, { useRef } from "react";

export default function InteractiveCard({ children, className = "", style = {}, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`card interactive ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {children}
    </div>
  );
}
