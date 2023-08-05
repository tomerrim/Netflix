import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CardList } from "../components/CardList";
import { setContent,setMovies, setSeries } from "../store/contentSlice";
import { customFetch } from "../utils/customFetch";
import { RandomContent } from "../components/RandomContent";
import "./styles.scss";

export const HomePage = () => {
  const dispatch= useDispatch();
  const [randomIndex, setRandomIndex] = useState(null);
  const { content } = useSelector(state => state.contentSlice);

  const fetchAllContent = async () => {
    try {
      const allContent = await customFetch("content", "GET");
      //console.log("all content:", allContent)
      dispatch(setContent(allContent));
      dispatch(setMovies(allContent));
      dispatch(setSeries(allContent))
      updateRandomIndex(allContent.length);
    } catch (error) {
      console.log("Failed to fetch content");
    }
  }

  const updateRandomIndex = (length) => {
    const randIndex = Math.floor(Math.random() * length);
    setRandomIndex(randIndex);
  }

  useEffect(() => {
    console.log("fetch data")
    fetchAllContent();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRandomIndex(content.length);
    }, 20000);

    return () => clearInterval(interval);
  },[content]);

  // console.log("content: ",content);

  // const navigate = useNavigate();
  // const user = useSelector(state => state.userSlice.user);
  // useEffect(() => {
  // if (!user) {
  //     navigate("/signIn");
  // }
  // }, [user]);

  return (
    <>
    <div className="homePage">
      { content[randomIndex] && <RandomContent content={content[randomIndex]}/>}
      <CardList cards={content} title={"All Content"}/>
      <CardList cards={content} title={"All Content"}/>
    </div>
    </>
  );
}