/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { Btn } from "../Btn";
import "./TrailerCard.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/userSlice";

export const TrailerCard = ({content}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userSlice.user);
    const [play, setPlay] = useState(false);

    const isFavorite = user.favoritesList.includes(content._id);

    const handleFavoriteToggle = () => {
        dispatch(toggleFavorite(content._id));
    }

    const playTrailer = () => {
        setPlay(true);
    }
    return (
        <div className="trailerCard">
            <ReactPlayer url={content.trailer} playing={play} width={'100%'} height={'100%'}/> 
            <div className="buttons">
                <Btn onClick={playTrailer}><PlayCircleOutlineIcon/></Btn>
                <Btn onClick={handleFavoriteToggle}>
                    {isFavorite ? <CheckIcon style={{color: "red"}}/> : <AddCircleOutlineIcon />}
                    {/* <AddCircleOutlineIcon/> */}
                </Btn>
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