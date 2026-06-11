import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RainBackground from "./components/RainBackground";
import FloatingDock from "./FloatingDock";
import InteractiveCard from "./components/InteractiveCard";
import FadeUp from "./components/FadeUp";
import Typewriter from "./components/Typewriter";
import { scrollToSection } from "./utils/smoothScroll";
import { db, collection, addDoc, serverTimestamp } from "./firebase";

export default function App() {
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    if (!db) {
      console.warn("Firebase not configured. Running simulation fallback.");
      setTimeout(() => {
        setFormStatus("submitted");
        setFormData({ name: "", email: "", message: "" });
      }, 1000);
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
      });
      setFormStatus("submitted");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form to Firebase: ", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <>
      {/* Background canvas animation */}
      <RainBackground />

      {/* Sticky top navigation bar */}
      <Navbar />

      {/* Main scrolling content */}
      <main className="main-content">
        
        {/* BIO (HERO) SECTION */}
        <section id="bio" style={{ marginBottom: "8rem" }}>
          <FadeUp className="hero centered-hero">
            <div className="hero-glow"></div>
            <div className="hero-badge">VIT Vellore | B.Tech CSE '27</div>
            <h1>Hi, I'm Nijanth Ravi.</h1>
            <h2 className="hero-subtitle">
              I build <Typewriter />
            </h2>
            <p className="hero-description">
              Specializing in highly scalable backend architectures, generative AI, and immersive environments. I turn complex constraints into flawless execution.
            </p>
            <div className="cta-container centered">
              <a
                href="#work"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("work");
                }}
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Contact Me
              </a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/nijanthravi2025-cmd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </FadeUp>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education">
          <FadeUp>
            <h2 className="section-title">Education & Foundations</h2>
          </FadeUp>
          <FadeUp>
            <InteractiveCard style={{ padding: "3.5rem" }}>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-title">Vellore Institute of Technology (VIT)</div>
                  <div className="timeline-subtitle">B.Tech in Computer Science Engineering (Core) | 2023 — Present</div>
                  <div className="timeline-details">
                    <strong>The Architecture:</strong> Focused intensely on Advanced Data Structures, Operating Systems, and Machine Learning algorithms. Understanding systems down to the memory allocation layer and pushing hardware constraints to scale architectures effectively.
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-title">GTA Vidhya Mandhir (CBSE)</div>
                  <div className="timeline-subtitle">Higher Secondary Education | 12th Grade</div>
                  <div className="timeline-details">
                    <strong>The Foundation:</strong> Intensive study in advanced Mathematics and Physics. This built the critical, first-principles analytical foundation required to comprehend complex logic architectures and algorithms before writing a single line of code.
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </FadeUp>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <FadeUp>
            <h2 className="section-title">Skills</h2>
          </FadeUp>
          <div className="grid-3">
            <FadeUp delay="0.1s">
              <InteractiveCard className="small-pad">
                <div className="card-header">
                  <span className="card-title" style={{ fontSize: "1.1rem" }}>Programming Languages</span>
                </div>
                <div className="tags">
                  <span className="tag">C++</span>
                  <span className="tag">Python</span>
                  <span className="tag">CUDA C/C++</span>
                </div>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.2s">
              <InteractiveCard className="small-pad">
                <div className="card-header">
                  <span className="card-title" style={{ fontSize: "1.1rem" }}>AI &amp; Rendering</span>
                </div>
                <div className="tags">
                  <span className="tag">PyTorch</span>
                  <span className="tag">TensorFlow</span>
                  <span className="tag">Transformers</span>
                  <span className="tag">Generative AI</span>
                  <span className="tag">Vulkan</span>
                  <span className="tag">Godot Engine</span>
                </div>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.3s">
              <InteractiveCard className="small-pad">
                <div className="card-header">
                  <span className="card-title" style={{ fontSize: "1.1rem" }}>Infrastructure &amp; IoT</span>
                </div>
                <div className="tags">
                  <span className="tag">Distributed Systems</span>
                  <span className="tag">Microservices</span>
                  <span className="tag">Docker</span>
                  <span className="tag">Kubernetes</span>
                  <span className="tag">Ray</span>
                  <span className="tag">gRPC</span>
                  <span className="tag">Redis</span>
                  <span className="tag">AWS</span>
                  <span className="tag">ESP32</span>
                </div>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>

        {/* WORK & EXPERIENCE SECTION */}
        <section id="work">
          <FadeUp>
            <h2 className="section-title">Work & Industrial Experience</h2>
          </FadeUp>
          <div className="grid-2">
            <FadeUp delay="0.1s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Google</span>
                  <span className="card-subtitle">Software Engineering Intern</span>
                  <span className="card-date">Summer 2025</span>
                </div>
                <p>
                  Engineered distributed microservices to optimize indexing pipelines for Core Search Infrastructure, reducing query latency by 15%. Implemented a fault-tolerant data ingestion architecture designed to handle petabyte-scale throughput.
                </p>
                <div className="tags">
                  <span className="tag">C++</span>
                  <span className="tag">Distributed Systems</span>
                  <span className="tag">RPC</span>
                </div>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.2s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">YouTube</span>
                  <span className="card-subtitle">Backend Developer Intern</span>
                  <span className="card-date">Winter 2024</span>
                </div>
                <p>
                  Developed a high-throughput API handling millions of concurrent requests to serve tailored Shorts content. Improved cache hit ratios by 22% by designing and deploying a custom, highly-optimized caching layer.
                </p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">Redis</span>
                  <span className="tag">gRPC</span>
                </div>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.3s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Lead IoT Systems Integrator</span>
                  <span className="card-subtitle">VendorTech Solutions (Contract)</span>
                  <span className="card-date">Fall 2025</span>
                </div>
                <p>
                  Architected and deployed a fleet of fully automated vending machines across the Chennai Tech Park. Programmed ESP32 microcontrollers to interface directly with cloud inventory databases and instant UPI payment gateways.
                </p>
                <div className="tags">
                  <span className="tag">ESP32</span>
                  <span className="tag">C/C++</span>
                  <span className="tag">IoT integration</span>
                </div>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.4s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Backend Scalability Consultant</span>
                  <span className="card-subtitle">Freelance</span>
                  <span className="card-date">Spring 2025</span>
                </div>
                <p>
                  Refactored a monolithic Python backend into a highly concurrent microservice architecture for a local logistics startup, improving transaction processing speeds by over 40% during peak load times.
                </p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">Microservices</span>
                  <span className="tag">Docker</span>
                </div>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications">
          <FadeUp>
            <h2 className="section-title">Certifications & Relevant Coursework</h2>
          </FadeUp>
          <div className="grid-3">
            <FadeUp delay="0.1s">
              <InteractiveCard className="small-pad">
                <div className="card-header">
                  <span className="card-title" style={{ fontSize: "1.1rem" }}>NVIDIA DLI Certificate</span>
                </div>
                <p style={{ fontSize: "0.9rem", marginBottom: 0 }}>
                  Fundamentals of Accelerated Computing with CUDA C/C++. Mastered GPU memory management and parallel execution.
                </p>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.2s">
              <InteractiveCard className="small-pad">
                <div className="card-header">
                  <span className="card-title" style={{ fontSize: "1.1rem" }}>AWS Certified Developer</span>
                </div>
                <p style={{ fontSize: "0.9rem", marginBottom: 0 }}>
                  Proficient in deploying fault-tolerant backend infrastructures, serverless computing, and managed databases.
                </p>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.3s">
              <InteractiveCard className="small-pad">
                <div className="card-header">
                  <span className="card-title" style={{ fontSize: "1.1rem" }}>Distributed Systems Core</span>
                </div>
                <p style={{ fontSize: "0.9rem", marginBottom: 0 }}>
                  University coursework focusing on consensus algorithms (Raft/Paxos) and fault-tolerant cloud architectures.
                </p>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>

        {/* RESEARCH SECTION */}
        <section id="research">
          <FadeUp>
            <h2 className="section-title">Research</h2>
          </FadeUp>
          <div className="grid-2">
            <FadeUp delay="0.1s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Neural World Engine</span>
                </div>
                <p>
                  A generative AI world model trained on physics simulations to predict future states of interactive environments. Utilizes a custom transformer architecture to handle spatio-temporal dynamics and render predictive frames in real-time.
                </p>
                <div className="tags">
                  <span className="tag">PyTorch</span>
                  <span className="tag">CUDA</span>
                  <span className="tag">Transformers</span>
                </div>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.2s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Cognitive Model Analyzer</span>
                </div>
                <p>
                  An interpretability framework designed to visualize and analyze activation patterns inside deep neural networks during inference. Extracts feature maps to map the 'decision-making' process of black-box AI models.
                </p>
                <div className="tags">
                  <span className="tag">TensorFlow</span>
                  <span className="tag">WebGL</span>
                </div>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <FadeUp>
            <h2 className="section-title">Projects</h2>
          </FadeUp>
          <div className="grid-2">
            <FadeUp delay="0.1s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Aetherion (3D Engine)</span>
                </div>
                <p>
                  A custom-built 3D RPG environment featuring a proprietary voxel rendering pipeline and complex, state-machine driven NPC behaviors. Optimized for multi-threaded CPU processing to ensure a locked 60 FPS.
                </p>
                <div className="tags">
                  <span className="tag">C++</span>
                  <span className="tag">Vulkan</span>
                  <span className="tag">Godot Engine</span>
                </div>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.2s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Distributed LLM Pipeline</span>
                </div>
                <p>
                  A fault-tolerant, decentralized training pipeline designed to fine-tune open-weight language models across a cluster of disparate GPUs. Implements custom gradient accumulation and checkpointing.
                </p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">Ray</span>
                  <span className="tag">Kubernetes</span>
                </div>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>

        {/* CONFERENCES SECTION */}
        <section id="conferences">
          <FadeUp>
            <h2 className="section-title">Conference Presentations</h2>
          </FadeUp>
          <FadeUp>
            <InteractiveCard>
              <ul className="minimal-list">
                <li>
                  <strong>IEEE International Conference on Artificial Intelligence (ICAI) 2025</strong> Presented abstract: <em>"Predictive Rendering utilizing Spatio-Temporal Transformer Models in Real-Time Engine Environments."</em>
                </li>
                <li>
                  <strong>PyCon India 2024</strong> Lightning Talk: <em>"Decentralized Model Training: Fine-tuning Open-Weight LLMs across Disparate GPU Clusters."</em>
                </li>
              </ul>
            </InteractiveCard>
          </FadeUp>
        </section>

        {/* WORKSHOPS / SYMPOSIUMS SECTION */}
        <section id="workshops">
          <FadeUp>
            <h2 className="section-title">Workshops / Symposiums</h2>
          </FadeUp>
          <div className="grid-2">
            <FadeUp delay="0.1s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Attended</span>
                </div>
                <ul className="minimal-list">
                  <li>
                    <strong>Google Cloud Scale Infrastructure Bootcamp (2025):</strong> Intensive 3-day deep dive into managing petabyte-scale data ingestion and cluster load balancing.
                  </li>
                  <li>
                    <strong>Advanced Vulkan Rendering Workshop (2024):</strong> Masterclass on low-level graphics APIs, shader pipeline optimization, and multi-threaded CPU processing.
                  </li>
                </ul>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.2s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Organised</span>
                </div>
                <ul className="minimal-list">
                  <li>
                    <strong>VIT Hackathon Prep: Intro to ESP32 and IoT (2025):</strong> Lead organizer and primary instructor. Taught 150+ students how to interface physical hardware with cloud databases.
                  </li>
                  <li>
                    <strong>Building Custom Game Engines from Scratch (2024):</strong> Organized a hands-on workshop demonstrating the transition from Unity to writing custom core logic in C++.
                  </li>
                </ul>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>

        {/* GUEST LECTURES SECTION */}
        <section id="guest-lectures">
          <FadeUp>
            <h2 className="section-title">Invited Guest Lectures</h2>
          </FadeUp>
          <FadeUp>
            <InteractiveCard>
              <ul className="minimal-list">
                <li>
                  <strong>"Demystifying Memory Management in C++"</strong> Guest Speaker at the VIT Developer Student Club. Addressed common pitfalls in pointer arithmetic, memory leaks, and writing fault-tolerant systems for high-scale applications.
                </li>
              </ul>
            </InteractiveCard>
          </FadeUp>
        </section>

        {/* EXTRACURRICULARS SECTION */}
        <section id="extracurriculars">
          <FadeUp>
            <h2 className="section-title">Extracurriculars & Leadership</h2>
          </FadeUp>
          <div className="grid-2">
            <FadeUp delay="0.1s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Unitrix Dance Club</span>
                  <span className="card-subtitle">Active Member & Technical Lead</span>
                </div>
                <p>
                  Actively choreograph and participate in team performances. Additionally manage the technical aspects of club showcases, including custom audio synchronization software and stage lighting controllers.
                </p>
              </InteractiveCard>
            </FadeUp>
            <FadeUp delay="0.2s">
              <InteractiveCard>
                <div className="card-header">
                  <span className="card-title">Core Committee Member</span>
                  <span className="card-subtitle">VIT AI & ML Chapter</span>
                </div>
                <p>
                  Directly responsible for organizing technical curriculums, vetting guest speakers, and structuring hackathon grading rubrics for university-wide events.
                </p>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements">
          <FadeUp>
            <h2 className="section-title">Achievements & Awards</h2>
          </FadeUp>
          <FadeUp>
            <InteractiveCard>
              <ul className="minimal-list">
                <li>
                  <strong>VIT Dean's List (2023 — Present)</strong> — Top 2% academic performance across all semesters in Computer Science.
                </li>
                <li>
                  <strong>1st Place — VIT National Hackathon 2025</strong> — Built "Neural World Engine" prototype in 36 hours; judged on innovation, scalability, and real-time performance.
                </li>
                <li>
                  <strong>NVIDIA GPU Computing Excellence Award 2025</strong> — Recognized for CUDA research contributions and leadership in accelerated-computing workshops.
                </li>
                <li>
                  <strong>Best Undergraduate Paper — IEEE ICAI 2025</strong> — For "Predictive Rendering using Spatio-Temporal Transformer Models".
                </li>
                <li>
                  <strong>Google India Developer Scholarship 2024</strong> — Selected among top 500 students nationwide for exceptional backend systems work.
                </li>
                <li>
                  <strong>PyCon India Lightning Talk Award 2024</strong> — For "Decentralized LLM Training Across Disparate GPU Clusters".
                </li>
              </ul>
            </InteractiveCard>
          </FadeUp>
        </section>

        {/* BLOG SECTION */}
        <section id="blog">
          <FadeUp className="blog-container">
            <InteractiveCard className="blog-content" style={{ padding: "3.5rem" }}>
              <div className="card-header" style={{ marginBottom: "2.5rem" }}>
                <span className="card-title" style={{ fontSize: "1.6rem" }}>The Builder's Mindset</span>
                <span className="card-date" style={{ fontSize: "0.95rem" }}>Mar 11, 2026</span>
              </div>
              <p>
                I approach computer science not merely as a collection of frameworks, but as a rigorous medium for world-building. Before you can build a world, you must understand the constraints of the dirt beneath it. My foundation, rooted heavily in advanced mathematics and physics, has instilled in me a fundamental need to understand systems down to their atomic realities. I do not just want to call a high-level API; I want to command the exact cycle count of a rendering loop and master the physical memory layout of a distributed microservice.
              </p>
              <p>
                This obsession with bare-metal execution naturally evolved into a pursuit of scale. Engineering distributed C++ microservices for Google's Core Search Infrastructure and optimizing high-throughput Python APIs for YouTube taught me the unforgiving physics of petabyte-scale data. Elegant theories die quickly under strict resource constraints. Whether I am refactoring a monolithic logistics backend for a 40% speedup or bridging software to physical hardware through custom ESP32 IoT networks, the goal remains the same: architecting fault-tolerant pipelines that execute flawlessly when it matters most.
              </p>
              <p>
                My deepest technical conviction lies at the intersection of generative AI and real-time game engine architecture. Moving beyond static meshes, I am actively building systems that breathe—from engineering the Vulkan-based Aetherion 3D engine to training predictive spatio-temporal transformer models. Presenting this research at venues like IEEE ICAI and PyCon India has only reinforced my belief that the next engineering frontier requires fusing rigid, deterministic logic with autonomous, predictive frameworks.
              </p>
              <p>
                Ultimately, building intelligent systems means empowering the builders within them. Through organizing university-wide hardware workshops, structuring curriculums for the VIT AI & ML Chapter, and lecturing on the realities of C++ memory management, I strive to share this bare-metal philosophy. Great engineering is not just about writing optimal code in a vacuum; it is about bridging the gap between uncompromising hardware constraints and human potential.
              </p>
            </InteractiveCard>
          </FadeUp>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <FadeUp>
            <h2 className="section-title">Contact</h2>
          </FadeUp>
          <div className="grid-2">
            <FadeUp className="card" style={{ justifyContent: "center", backgroundColor: "transparent", border: "none", boxShadow: "none", padding: 0 }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem", lineHeight: 1.1, letterSpacing: "-0.04em", fontWeight: 500 }}>
                Let's build something.
              </div>
              <p style={{ color: "var(--text-main)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                nijanth.r.dev@gmail.com
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
                +91 9**** *****
              </p>
              <p style={{ color: "var(--text-muted)" }}>
                Chennai, Tamil Nadu, India. Available globally.
              </p>
            </FadeUp>

            <FadeUp>
              <InteractiveCard>
                <form id="contactForm" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={formStatus === "submitted" || formStatus === "submitting"}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={formStatus === "submitted" || formStatus === "submitting"}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-input"
                      placeholder="How can we collaborate?"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={formStatus === "submitted" || formStatus === "submitting"}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    id="submitBtn"
                    className="btn btn-primary"
                    disabled={formStatus === "submitted" || formStatus === "submitting"}
                    style={
                      formStatus === "submitted"
                        ? {
                            width: "100%",
                            borderRadius: "16px",
                            padding: "1.2rem",
                            backgroundColor: "#34c759",
                            color: "#fff",
                            cursor: "default",
                            transform: "none",
                          }
                        : formStatus === "error"
                        ? {
                            width: "100%",
                            borderRadius: "16px",
                            padding: "1.2rem",
                            backgroundColor: "#ff3b30",
                            color: "#fff",
                          }
                        : { width: "100%", borderRadius: "16px", padding: "1.2rem" }
                    }
                  >
                    {formStatus === "submitted"
                      ? "Message Sent ✓"
                      : formStatus === "submitting"
                      ? "Sending..."
                      : formStatus === "error"
                      ? "Error! Try Again"
                      : "Send Message"}
                  </button>
                </form>
              </InteractiveCard>
            </FadeUp>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="main-content" style={{ padding: "3rem 5%", marginTop: "4rem" }}>
        <div>© 2026 Nijanth Ravi. Handcrafted in Chennai, IN.</div>
        <div className="footer-links">
          <a href="https://github.com/nijanthravi2025-cmd" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>

      {/* Floating navigation dock overlay */}
      <FloatingDock />
    </>
  );
}