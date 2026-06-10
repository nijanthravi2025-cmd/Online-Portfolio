import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

export default function RainBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let activeCanvas = null;
    let isLight = document.documentElement.classList.contains("light-mode");
    let themeObserver;
    let resizeHandler;
    let cleanUpActiveTheme = null;

    function initTheme() {
      // 1. Clean up previous theme rendering
      if (cleanUpActiveTheme) {
        cleanUpActiveTheme();
        cleanUpActiveTheme = null;
      }
      container.innerHTML = "";

      // 2. Setup active theme
      if (isLight) {
        cleanUpActiveTheme = initIridescence();
      } else {
        cleanUpActiveTheme = initRain();
      }
    }

    // ----------------------------------------------------
    // LIGHT MODE: IRIDESCENCE WEBGL SHADER (via OGL)
    // ----------------------------------------------------
    function initIridescence() {
      const renderer = new Renderer({ alpha: true, depth: false });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0); // transparent background

      const canvas = gl.canvas;
      canvas.id = "rain-canvas"; // Keep the ID for CSS styling (z-index, fixed)
      container.appendChild(canvas);
      activeCanvas = canvas;

      // Mouse tracking on window level to support click-through canvas
      let mousePos = { x: 0.5, y: 0.5 };
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = (e.clientX - rect.left) / rect.width;
        mousePos.y = 1.0 - (e.clientY - rect.top) / rect.height;
        if (program) {
          program.uniforms.uMouse.value[0] = mousePos.x;
          program.uniforms.uMouse.value[1] = mousePos.y;
        }
      };
      
      window.addEventListener("mousemove", handleMouseMove);

      const vertexShader = `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0, 1);
        }
      `;

      const fragmentShader = `
        precision highp float;
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uResolution;
        uniform vec2 uMouse;
        uniform float uAmplitude;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          float mr = min(uResolution.x, uResolution.y);
          vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
          uv += (uMouse - vec2(0.5)) * uAmplitude;
          float d = -uTime * 0.5 * uSpeed;
          float a = 0.0;
          for (float i = 0.0; i < 8.0; ++i) {
            a += cos(i - d - a * uv.x);
            d += sin(uv.y * i + a);
          }
          d += uTime * 0.5 * uSpeed;
          vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
          col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
          gl_FragColor = vec4(col, 0.45); // Transparent iridescent shimmer
        }
      `;

      let program;
      function resize() {
        if (!container || !renderer) return;
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        if (program) {
          program.uniforms.uResolution.value = new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          );
        }
      }
      
      resize();
      resizeHandler = resize;
      window.addEventListener("resize", resizeHandler, false);

      const geometry = new Triangle(gl);
      const peachColor = [1.0, 0.72, 0.55]; // Shimmers beautifully around soft peach tones

      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(...peachColor) },
          uResolution: {
            value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
          },
          uMouse: { value: new Float32Array([mousePos.x, mousePos.y]) },
          uAmplitude: { value: 0.15 },
          uSpeed: { value: 0.8 }
        }
      });

      const mesh = new Mesh(gl, { geometry, program });
      let animeId;

      function update(t) {
        animeId = requestAnimationFrame(update);
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: mesh });
      }
      animeId = requestAnimationFrame(update);

      return () => {
        cancelAnimationFrame(animeId);
        window.removeEventListener("mousemove", handleMouseMove);
        if (resizeHandler) {
          window.removeEventListener("resize", resizeHandler);
        }
        if (canvas.parentNode) {
          container.removeChild(canvas);
        }
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    // ----------------------------------------------------
    // DARK MODE: FALLING RAINDROPS (2D canvas)
    // ----------------------------------------------------
    function initRain() {
      const canvas = document.createElement("canvas");
      canvas.id = "rain-canvas";
      container.appendChild(canvas);
      activeCanvas = canvas;

      const ctx = canvas.getContext("2d");
      if (!ctx) return () => {};

      let width = (canvas.width = container.offsetWidth);
      let height = (canvas.height = container.offsetHeight);
      let raindrops = [];
      let animeId;

      const resize = () => {
        width = canvas.width = container.offsetWidth;
        height = canvas.height = container.offsetHeight;
        initRaindrops();
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

      function initRaindrops() {
        raindrops = [];
        const dropCount = Math.floor(width / 5);
        for (let i = 0; i < dropCount; i++) {
          raindrops.push(new Raindrop());
        }
      }

      function updateAndDraw() {
        ctx.clearRect(0, 0, width, height);
        raindrops.forEach((drop) => {
          drop.update();
          drop.draw();
        });
        animeId = requestAnimationFrame(updateAndDraw);
      }

      resizeHandler = resize;
      window.addEventListener("resize", resizeHandler);
      initRaindrops();
      updateAndDraw();

      return () => {
        cancelAnimationFrame(animeId);
        if (resizeHandler) {
          window.removeEventListener("resize", resizeHandler);
        }
        if (canvas.parentNode) {
          container.removeChild(canvas);
        }
      };
    }

    // ----------------------------------------------------
    // LISTENERS & OBSERVERS
    // ----------------------------------------------------
    themeObserver = new MutationObserver(() => {
      const isCurrentlyLight = document.documentElement.classList.contains("light-mode");
      if (isCurrentlyLight !== isLight) {
        isLight = isCurrentlyLight;
        initTheme();
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    initTheme();

    return () => {
      themeObserver.disconnect();
      if (cleanUpActiveTheme) {
        cleanUpActiveTheme();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
