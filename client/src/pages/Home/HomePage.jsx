import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CardList } from "../../components/CardList";
import { setContent,setMovies, setSeries } from "../../store/contentSlice";
import { customFetch } from "../../utils/customFetch";
import { RandomContent } from "../../components/RandomContent";
import "./Home.scss";
import Title from "../../components/Title";

export const HomePage = () => {
  const dispatch= useDispatch();
  // const navigate = useNavigate();
  const [randomIndex, setRandomIndex] = useState(null);
  const { content, movies, series } = useSelector(state => state.contentSlice);
  const {user, isLoggedIn } = useSelector((state) => state.userSlice);


  // console.log(user);
  // let data;

  // if (contentType === "movies") {
  //   data = movies;
  // } else if (contentType === "series") {
  //   data = series;
  // } else {
  //   data = content;
  // }

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

  return (
    <>
    <Title title={"Netflix"}/>
    <div className="homePage">
      { content[randomIndex] && <RandomContent content={content[randomIndex]}/>}
      { isLoggedIn && user.favoritesList.length > 0 && <CardList cards={user.favoritesList} title={`${user.username}'s List`}/> }
      { isLoggedIn && user.watchList.length > 0 && <CardList cards={user.watchList} title={"Watch List"}/> }
      <CardList cards={content} title={"All Content"}/>
      <CardList cards={movies} title={"All Movies"}/>
      <CardList cards={series} title={"All Series"}/>
    </div>
    </>
  );
}