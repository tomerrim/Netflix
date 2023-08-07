/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ContentCard.scss";
import { TrailerCard } from "../TrailerCard";

export const ContentCard = ({ content }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isHovered, setIsHovered] = useState(false);

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
      <div className={`contentCard ${isMobile ? "mobile" : "desktop"}`}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}
       >
        {isHovered ? (
          <TrailerCard content={content}/>
          ) : (
            <img
            src={isMobile ? content.imgVertical : content.imgThumb}
            alt={content.title}
            />
          )}
      </div>
    );
}