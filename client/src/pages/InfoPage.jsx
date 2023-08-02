/* eslint-disable react/prop-types */
import { Btn } from "../components/Btn";
export const InfoPage = ({ content }) => {
    return (
      <div className="infoPage">
        <img src={content.imgVertical} alt={content.title} />
        <div className="information">
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <span>Type: {content.isSeries ? "Series" : "Movie"}</span>
            <span>Year: {content.year}</span>
            <span>Duration: {content.duration}</span>
            <span>Age restriction: {content.limit}+</span>
            <span>Genre: {content.genre}</span>
            <Btn className={"play"}>Play</Btn>
        </div>
      </div>
    );
}