import "react-multi-carousel/lib/styles.css";
/* eslint-disable react/prop-types */
import { ContentCard } from "../ContentCard";
import Carousel from "react-multi-carousel";
import "./CardList.scss";

export const CardList = ({cards, title}) => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 8,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
        },
    };

    return (
        <div className="cardList">
            <h1 className="title">{title}</h1>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
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
                {cards.map((card) => (
                    <ContentCard content={card} key={card._id}/>
                ))}
            </Carousel>
        </div>
    );
}