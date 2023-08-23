import "react-multi-carousel/lib/styles.css";
/* eslint-disable react/prop-types */
import { ContentCard } from "../ContentCard";
import Carousel from "react-multi-carousel";
import "./CardList.scss";
import { convertDurationToSeconds } from "../../utils/helpers";
import { RESPONSIVE } from "../../utils/constants";

export const CardList = ({cards, title}) => {
    
    return (
      <div className="cardList">
        <h1 className="title">{title}</h1>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={RESPONSIVE}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={10000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {cards.map((card, index) => {
            let progressPrecentage = 0;
            if (title === "Continue to Watch") {
                const contentDurationSeconds = convertDurationToSeconds(card.duration);
                progressPrecentage = (card.stoppedAt / contentDurationSeconds) * 100;
            }
            return (
              <>
                {title === "Top 10" ? (
                  <div className="topRated">
                    <div className={`number ${index === 9 ? "ten" : ""}`}>
                      {index + 1}
                    </div>
                    <ContentCard content={card} isTopTen={true} key={card._id} />
                  </div>
                ) : (
                  <ContentCard content={card} key={card._id} progress={title === "Continue to Watch" ? progressPrecentage : null}/>
                )}
              </>
            )
          })}
        </Carousel>
      </div>
    );
}