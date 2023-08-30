import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import "./Watch.scss";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Btn";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRef, useState } from "react";
import { toggleWatchList } from "../../store/userSlice";

export const WatchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singleContent } = useSelector((state) => state.contentSlice);
    const { user } = useSelector((state) => state.userSlice);
    const [currentTime, setCurrentTime] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [hasSought, setHasSought] = useState(false);
    const playerRef = useRef(null);
    const navToInfo = () => navigate(`/content/${singleContent._id}`);

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds)
    }

    const handleVideoPause= () => {
        const stoppedAt = Math.floor(currentTime);
        const contentId = singleContent._id;
        const newWatchItem = {
            content: singleContent,
            stoppedAt,
        };
        
        dispatch(toggleWatchList({contentId, watchItem: newWatchItem}));
        setPlaying(!playing);
    }

    const handleVideoEnd = () => {
        const contentId = singleContent._id;
        dispatch(toggleWatchList({contentId, stoppedAt: "end"}));
    }

    const watchItem = user.watchList.find(item => item.content._id.toString() === singleContent._id);
    const stoppedAtForContent = watchItem ? watchItem.stoppedAt : 0;

    const handlePlayerReady = () => {
        if (!hasSought && stoppedAtForContent) {
            if(playerRef.current && playerRef.current.seekTo) {
                playerRef.current.seekTo(stoppedAtForContent, "seconds");
                setHasSought(true);
            } else {
                console.log("playerRef or playerRef.current.seekTo is not available.");
            }
        } else {
            const currentTime = playerRef.current ? playerRef.current.currentTime : 0;
            playerRef.current.seekTo(currentTime, "seconds");
        }
    }
    
    return (
      <div className="watchPage">
        <Btn onClick={navToInfo} className={"back"}>
          <ArrowBackOutlinedIcon />
        </Btn>
        <ReactPlayer
          url={singleContent.movie}
          controls={true}
          width={"100%"}
          height={"100%"}
          playing={playing}
          className={"movie"}
          ref={playerRef}
          onProgress={handleProgress}
          onPause={handleVideoPause}
          onEnded={handleVideoEnd}
          onReady={handlePlayerReady}
        />
      </div>
    );
}