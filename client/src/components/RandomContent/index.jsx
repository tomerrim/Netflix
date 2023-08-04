/* eslint-disable react/prop-types */
import "./RandomContent.scss";
import { Btn } from "../Btn";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

export const RandomContent = ({content}) => {

    const navigate = useNavigate();
    console.log("content id: ",content._id)
    const navToInfo = () => navigate(`/content/${content._id}`)

    const shorter = (item) => {
      return item && item.length > 250 ? item.substring(0, 250) + "..." : item;
    };

    const bgStyle = {
      backgroundImage: `url(${content.img})`,
      // backgroundSize: "contain", 
      // backgroundPosition: "center",
    };

    return (
      <div className="content" style={bgStyle}>
        {/* <img src={content.img} alt={content.title} className="backgroundImage"/> */}
        <img src={content.imgTitle} alt={content.title} className="imgTitle"/>
        <p>{shorter(content.description)}</p>
        <div className="line">
            <Btn className={"play"}><PlayArrowIcon/>Play</Btn>
            <Btn className={"info"} onClick={navToInfo}><InfoOutlinedIcon/>Info</Btn>
        </div>
      </div>
    );
}