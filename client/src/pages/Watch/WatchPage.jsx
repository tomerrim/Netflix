import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import "./Watch.scss";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Btn";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export const WatchPage = () => {
    const navigate = useNavigate();
    const { singleContent } = useSelector((state) => state.contentSlice);
    const navToInfo = () => navigate(`/content/${singleContent._id}`);

    return (
        <div className="watchPage">
            <Btn onClick={navToInfo} className={"back"}><ArrowBackOutlinedIcon/></Btn>
            <ReactPlayer url={singleContent.movie} controls={true} width={"100%"} height={"100%"} playing={"true"} className ={"movie"}/>
        </div>
    )
}