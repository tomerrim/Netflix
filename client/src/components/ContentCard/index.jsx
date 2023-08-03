/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ContentCard.scss";

export const ContentCard = ({ content }) => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <div className={`contentCard ${isMobile ? "mobile" : "desktop"}`}>
        <img
          src={isMobile ? content.imgVertical : content.imgThumb}
          alt={content.title}
        />
      </div>
    );
}