import React, { useRef, useEffect, useState } from "react";
import "./CardsPage.css";

const CardsPage = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const totalScroll = section.scrollHeight - window.innerHeight;

      const scrolled = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="cards-outer" ref={sectionRef}>
      <div className="cards-inner">
        <div
          className="cards-row"
          style={{ transform: `translateX(-${progress * (6 - 1) * 550}px)` }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card">
              <h2>Card {i + 1}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
