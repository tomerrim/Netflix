/* eslint-disable react/prop-types */
import "./ContentCard.scss";

export const ContentCard = ({ content }) => {
    return (
        <div className="card">
            <img src={content.imgThumb} alt={content.title} />
        </div>
    )
}