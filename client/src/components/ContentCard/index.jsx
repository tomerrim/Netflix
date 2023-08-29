/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ContentCard.scss";
import { TrailerCard } from "../TrailerCard";
import { useNavigate } from "react-router-dom";

export const ContentCard = ({ content, progress = 0, isTopTen = false }) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isTablet, setIsTablet] =  useState(window.innerWidth <= 1150);
    const [isHovered, setIsHovered] = useState(false);

    const navToInfo = () => navigate(`/content/${content._id}`);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
        }else if (window.innerWidth <= 1150) {
          setIsTablet(true);
        } else {
          setIsMobile(false);
          setIsTablet(false);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    return (
      <div className={`contentCard ${isMobile ? "mobile" : isTablet ? "tablet" : "desktop"}`}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}
       onClick={(e) => {
        if(e.target === e.currentTarget) {
          setIsHovered(false);
        }
       }}
       >
        {isHovered && !isMobile ? (
          <TrailerCard content={content}/>
          ) : (
            <>
              <img
              src={isMobile || isTopTen ? content.imgVertical : content.imgThumb}
              alt={content.title}
              onClick={navToInfo}
              />
              {progress > 0 && (
                <div className="progressContainer">
                  <div className="progressBar" style={{width: `${progress}%`, backgroundColor: 'red'}}></div>
                </div>
                )}
            </>
          )}
      </div>
    );
}