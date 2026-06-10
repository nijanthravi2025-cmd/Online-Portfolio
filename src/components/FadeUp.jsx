import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FadeUp({ children, className = "", delay = "0s", ...props }) {
  const domRef = useRef(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    // Parse delay to seconds (e.g. "0.1s" to 0.1)
    let parsedDelay = 0;
    if (typeof delay === "string") {
      if (delay.endsWith("ms")) {
        parsedDelay = parseFloat(delay) / 1000;
      } else if (delay.endsWith("s")) {
        parsedDelay = parseFloat(delay);
      } else {
        parsedDelay = parseFloat(delay) || 0;
      }
    } else if (typeof delay === "number") {
      parsedDelay = delay;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: parsedDelay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={className}
      style={{ opacity: 0 }}
      {...props}
    >
      {children}
    </div>
  );
}

