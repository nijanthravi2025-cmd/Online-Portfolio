import React, { useState, useEffect, useRef } from "react";
import { scrollToSection } from "../utils/smoothScroll";

const navLinks = [
  { label: "Bio", id: "bio" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "work" },
  { label: "Certifications", id: "certifications" },
  { label: "Research", id: "research" },
  { label: "Projects", id: "projects" },
  { label: "Conferences", id: "conferences" },
  { label: "Workshops", id: "workshops" },
  { label: "Lectures", id: "guest-lectures" },
  { label: "Extracurriculars", id: "extracurriculars" },
  { label: "Achievements", id: "achievements" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = (e) => {
    // Stop propagation so clicking toggle doesn't trigger the click outside close handler immediately
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(targetId);
  };

  return (
    <nav className={`top-nav ${isOpen ? "is-open" : ""}`} id="mainNav" ref={navRef}>
      <div className="nav-header">
        <a
          href="#bio"
          className="nav-brand"
          id="nav-logo"
          onClick={(e) => handleLinkClick(e, "bio")}
        >
          <div className="nav-brand-logo">NR</div>
          Nijanth Ravi
        </a>

        <button
          className="menu-toggle"
          id="menuToggle"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle Navigation"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="nav-collapse-wrapper">
        <ul className="nav-links" id="navLinks">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
