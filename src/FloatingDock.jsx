import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  GraduationCap,
  CodeXml,
  FolderKanban,
  Contact,
  Sun,
  Moon,
  Award,
} from "lucide-react";
import { scrollToSection } from "./utils/smoothScroll";
import "./FloatingDock.css";

/* ========================================
  DOCK ITEMS
  ========================================
*/
const dockItems = [
  { label: "Home", target: "bio", icon: Home },
  { label: "Education", target: "education", icon: GraduationCap },
  { label: "Skills", target: "skills", icon: User },
  { label: "Experience", target: "work", icon: FolderKanban },
  { label: "Projects", target: "projects", icon: CodeXml },
  { label: "Achievements", target: "achievements", icon: Award },
  { label: "Contact", target: "contact", icon: Contact },
];

export default function FloatingDock() {
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("isLightMode");
      return savedTheme ? JSON.parse(savedTheme) : false;
    }
    return false;
  });

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const iconColor = isLightMode ? "black" : "white";

  // Sync theme with document class
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
    localStorage.setItem("isLightMode", JSON.stringify(isLightMode));
  }, [isLightMode]);

  // Scroll detection to hide/show dock
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleItemClick = (e, targetId) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <div className={`dock-container ${isVisible ? "is-visible" : "is-hidden"}`}>
      <div className="content">
        {dockItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <a
              href={`#${item.target}`}
              className="icon-wrapper"
              key={index}
              onClick={(e) => handleItemClick(e, item.target)}
            >
              <IconComponent className="icons" color={iconColor} size={32} />
              <span className="tooltip">{item.label}</span>
            </a>
          );
        })}

        {/* Vertical divider */}
        <div className="dock-divider"></div>

        {/* Live Theme Toggle Icon */}
        <button
          className="icon-wrapper theme-toggle-btn"
          onClick={() => setIsLightMode((prev) => !prev)}
          title="Toggle Theme (Or press D)"
          aria-label="Toggle Theme"
        >
          {isLightMode ? (
            <Moon className="icons" color="black" size={32} />
          ) : (
            <Sun className="icons" color="white" size={32} />
          )}
          <span className="tooltip">
            {isLightMode ? "Dark Mode" : "Light Mode"}
          </span>
        </button>
      </div>
    </div>
  );
}
