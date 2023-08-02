/* eslint-disable react/prop-types */
import "./RandomContent.scss";
import { Btn } from "./Btn";

export const RandomContent = ({content}) => {

    return (
      <div className="content">
        <img src={content.imgTitle} alt={content.title} />
        <p>{content.description}</p>
        <div className="line">
            <Btn className={"play"}>Play</Btn>
            <Btn className={"info"}>Info</Btn>
        </div>
      </div>
    );
}