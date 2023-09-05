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
    const [duration, setDuration] = useState(0);
    const [hasEnded, setHasEnded] = useState(false);
    const playerRef = useRef(null);

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds)
    }

    const handleVideoPause= () => {
        const stoppedAt = Math.floor(currentTime);
        const contentId = singleContent._id;
        const newWatchItem = {
            content: singleContent,
            stoppedAt,
            totalDuration: duration,
        };
        
        dispatch(toggleWatchList({contentId, watchItem: newWatchItem}));
        setPlaying(!playing);
    }

    const handleVideoEnd = () => {
        console.log("Video Ended. Attempting to remove from watchList");
        const contentId = singleContent._id;
        dispatch(toggleWatchList({contentId, stoppedAt: -1}));
        setHasEnded(true); 
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
    
    const navToInfo = () => {
        if(!hasEnded) {
            console.log("saved the video")
            handleVideoPause();
        }
        navigate(`/content/${singleContent._id}`);
    };

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
          onDuration={handleDuration}
        />
      </div>
    );
}