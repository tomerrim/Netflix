import "react-multi-carousel/lib/styles.css";
/* eslint-disable react/prop-types */
import { ContentCard } from "../ContentCard";
import Carousel from "react-multi-carousel";
import "./CardList.scss";
import { RESPONSIVE } from "../../utils/constants";
import { useSelector } from "react-redux";
import { Fragment } from "react";

export const CardList = ({cards, title}) => {
    
    const { user } = useSelector((state) => state.userSlice);
    
    const getProgress = (cardId) => {
      const watchItem = user.watchList.find(item => item.content._id === cardId);
      const stoppedAtForContent = watchItem ? watchItem.stoppedAt : 0;
      const totalDurationForContent = watchItem ? watchItem.totalDuration : 1;
      return (stoppedAtForContent / totalDurationForContent) * 100;
    }
    
    return (
      <div className="cardList">
        <h1 className="title">{title}</h1>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={RESPONSIVE}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={10000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          // containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          className="carousel"
          itemClass="carousel-item"
        >
          {cards.map((card, index) => (
            <Fragment key={index}>
              {title === "Top 10" ? (
                <div className="topRated" >
                  <div className={`number ${index === 9 ? "ten" : ""}`}>
                    {index + 1}
                  </div>
                  <ContentCard content={card} isTopTen={true} />
                </div>
              ) : (
                <ContentCard content={card} progress={title === "Continue to Watch" ? getProgress(card._id) : null}/>
              )}
            </Fragment>
          ))}
        </Carousel>
      </div>
    );
}