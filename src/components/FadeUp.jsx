import React, { useEffect, useRef, useState } from "react";

export default function FadeUp({ children, className = "", delay = "0s", ...props }) {
  const domRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-up ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: delay }}
      {...props}
    >
      {children}
    </div>
  );
}
