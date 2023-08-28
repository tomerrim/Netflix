import "react-multi-carousel/lib/styles.css";
/* eslint-disable react/prop-types */
import { ContentCard } from "../ContentCard";
import Carousel from "react-multi-carousel";
import "./CardList.scss";
import { RESPONSIVE } from "../../utils/constants";
import { useSelector } from "react-redux";

export const CardList = ({cards, title}) => {
    
    const { user } = useSelector((state) => state.userSlice);
    // console.log("watch list: ", JSON.stringify(user.watchList, null, 2));

    const getProgress = (cardId) => {
      const watchItem = user.watchList.find(item => item.content._id === cardId);
      return watchItem ? watchItem.stoppedAt : null;
    }
    
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
          // containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          itemClass="carousel-item-padding-40-px"
        >
          {cards.map((card, index) => (
            <>
              {title === "Top 10" ? (
                <div className="topRated">
                  <div className={`number ${index === 9 ? "ten" : ""}`}>
                    {index + 1}
                  </div>
                  <ContentCard content={card} isTopTen={true} key={card._id} />
                </div>
              ) : (
                <ContentCard content={card} key={card._id} progress={title === "Continue to Watch" ? getProgress(card._id) : null}/>
              )}
            </>
          ))}
        </Carousel>
      </div>
    );
}