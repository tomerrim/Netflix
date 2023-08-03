/* eslint-disable react/prop-types */
import "./RandomContent.scss";
import { Btn } from "../Btn";

export const RandomContent = ({content}) => {

    const bgStyle = {
      backgroundImage: `url(${content.img})`,
      backgroundSize: "cover", 
      backgroundPosition: "center",
    };

    return (
      <div className="content" style={bgStyle}>
        <img src={content.imgTitle} alt={content.title} className="imgTitle"/>
        <p>{content.description}</p>
        <div className="line">
            <Btn className={"play"}>Play</Btn>
            <Btn className={"info"}>Info</Btn>
        </div>
      </div>
    );
}