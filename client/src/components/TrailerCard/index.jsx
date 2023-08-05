/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Btn } from "../Btn";
import "./TrailerCard.scss";

export const TrailerCard = ({content}) => {
    return (
        <div className="trailerCard">
            <ReactPlayer url={content.trailer} playing={true} width={'100%'} height={'100%'}/> 
            <div className="buttons">
                <Btn><PlayCircleOutlineIcon/></Btn>
                <Btn><AddCircleOutlineIcon /></Btn>
                <Btn><ThumbDownOutlinedIcon /></Btn>
                <Btn><ThumbUpOutlinedIcon /></Btn>
            </div>
            <div className="info">
                <p>
                    {content.duration}
                    <span className="age">+{content.limit}</span> 
                    {content.year}
                </p>
                <p>{content.genre}</p>
            </div>
        </div>
    )
}