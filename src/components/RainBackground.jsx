import React, { useEffect, useRef } from "react";

export default function RainBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let raindrops = [];
    let animationFrameId;

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initRain();
    };

    class Raindrop {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 8 + 12;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.y += this.speed;
        if (this.y > height) {
          this.reset();
          this.y = 0;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    const initRain = () => {
      raindrops = [];
      const dropCount = Math.floor(width / 5);
      for (let i = 0; i < dropCount; i++) {
        raindrops.push(new Raindrop());
      }
    };

    const animateRain = () => {
      ctx.clearRect(0, 0, width, height);
      raindrops.forEach((drop) => {
        drop.update();
        drop.draw();
      });
      animationFrameId = requestAnimationFrame(animateRain);
    };

    window.addEventListener("resize", resize);
    initRain();
    animateRain();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="rain-canvas" ref={canvasRef} />;
}
