import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import "./Watch.scss";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Btn";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { customFetch } from "../../utils/customFetch";
import { useState } from "react";

export const WatchPage = () => {
    const navigate = useNavigate();
    const { singleContent } = useSelector((state) => state.contentSlice);
    const { user } = useSelector((state) => state.userSlice);
    const [currentTime, setCurrentTime] = useState(0);
    const navToInfo = () => navigate(`/content/${singleContent._id}`);

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds)
    }

    const handleVideoPause= () => {
        const stoppedAt = Math.floor(currentTime);
        const userId = user._id;
        const contentId = singleContent._id;
        customFetch(
          "users/watchList/add",
          "POST",
          JSON.stringify({ userId, contentId, stoppedAt }),
          { "Content-Type": "application/json" }
        );
    }

    return (
        <div className="watchPage">
            <Btn onClick={navToInfo} className={"back"}><ArrowBackOutlinedIcon/></Btn>
            <ReactPlayer
             url={singleContent.movie}
             controls={true}
             width={"100%"} 
             height={"100%"} 
             playing={"true"} 
             className ={"movie"}
             onProgress={handleProgress}
             onPause={handleVideoPause}
             />
        </div>
    )
}