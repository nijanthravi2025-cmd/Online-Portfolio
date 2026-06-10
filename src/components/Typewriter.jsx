import React, { useState, useEffect } from "react";

export default function Typewriter({
  words = ["intelligent worlds.", "distributed systems.", "custom game engines.", "scalable APIs."],
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => activeWord.substring(0, prev.length + 1));
      }, typeSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delayBetween]);

  return <span className="typewriter">{currentText}</span>;
}
