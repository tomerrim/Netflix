/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ContentCard.scss";
import { TrailerCard } from "../TrailerCard";
import { useNavigate } from "react-router-dom";

export const ContentCard = ({ content }) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isHovered, setIsHovered] = useState(false);

    const navToInfo = () => navigate(`/content/${content._id}`);

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
       onClick={navToInfo}>
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