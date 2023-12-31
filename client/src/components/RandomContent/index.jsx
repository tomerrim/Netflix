/* eslint-disable react/prop-types */
import "./RandomContent.scss";
import { Btn } from "../Btn";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleContent } from "../../store/contentSlice";
import { shorter } from "../../utils/helpers";

export const RandomContent = ({content}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //console.log("content id: ",content._id)
    const navToInfo = () => {
      dispatch(setSingleContent(content));  
      navigate(`/content/${content._id}`);
    };
    const navToWatch = () => {
      dispatch(setSingleContent(content));
      navigate(`/content/${content._id}/movie`);
    }

    const bgStyle = {
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(${content.img})`,
    };

    return (
      <div className="content" style={bgStyle}>
        {/* <img src={content.img} alt={content.title} className="backgroundImage"/> */}
        <img src={content.imgTitle} alt={content.title} className="imgTitle"/>
        <p>{shorter(content.description)}</p>
        <div className="line">
            <Btn className={"play"} onClick={navToWatch}><PlayArrowIcon/>Play</Btn>
            <Btn className={"info"} onClick={navToInfo}><InfoOutlinedIcon/>Info</Btn>
            <div className="age">+{content.limit}</div>
        </div>
      </div>
    );
}