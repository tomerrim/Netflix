/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Btn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { customFetch } from "../../utils/customFetch";
import { setSingleContent } from "../../store/contentSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./Info.scss";

export const InfoPage = () => {
  const { singleContent } = useSelector(state => state.contentSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const navToWatch = () => navigate(`/content/${singleContent._id}/movie`);

  useEffect(() => {
    dispatch(setSingleContent(singleContent));
    console.log("single content: ", singleContent);
  },[singleContent, dispatch]);

  return (
    <div className="infoPage">
      {singleContent && (
        <>
          <img src={singleContent.imgVertical} alt={singleContent.title} />
          <div className="information">
            <h1>{singleContent.title}</h1>
            <p>{singleContent.description}</p>
            <div className="details">
              <span>Type: {singleContent.isSeries ? "Series" : "Movie"}</span>
              <span>Year: {singleContent.year}</span>
              <span>Duration: {singleContent.duration}</span>
              <span>Age restriction: {singleContent.limit}+</span>
              <span>Genre: {singleContent.genre}</span>
              <Btn className={"play"} onClick={navToWatch}> <PlayArrowIcon/> Play </Btn>
            </div>
          </div>
        </>
      )}
    </div>
  );
}