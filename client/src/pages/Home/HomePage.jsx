/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CardList } from "../../components/CardList";
import { setContent,setMovies, setSeries } from "../../store/contentSlice";
import { customFetch } from "../../utils/customFetch";
import { RandomContent } from "../../components/RandomContent";
import "./Home.scss";
import Title from "../../components/Title";

export const HomePage = ({contentType = "all"}) => {
  const dispatch= useDispatch();
  // const navigate = useNavigate();
  const [randomIndex, setRandomIndex] = useState(null);
  const { content, movies, series } = useSelector(state => state.contentSlice);
  const {user, isLoggedIn } = useSelector((state) => state.userSlice);
  // const [watchList, setWatchList] = useState([]);

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
      if (contentType === "movies" || contentType === "all") {
        dispatch(setMovies(allContent));
      }
      if (contentType === "series" || contentType === "all") {
        dispatch(setSeries(allContent))
      }
      updateRandomIndex(allContent.length);
    } catch (error) {
      console.log("Failed to fetch content");
    }
  }

  // const fetchWatchList = async () => {
  //   try {

  //     const response = await customFetch(`users/watchlist/${user._id}`, "GET", null, {
  //       Authorization: `Bearer ${user.token}` 
  //     });
  //     setWatchList(response);
  //   } catch (error) {
  //     console.log("Failed to fetch watch list");
  //   }
  // }

  const updateRandomIndex = (length) => {
    const randIndex = Math.floor(Math.random() * length);
    setRandomIndex(randIndex);
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log("fetch data")
      fetchAllContent();
      // fetchWatchList();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRandomIndex(content.length);
    }, 20000);

    return () => clearInterval(interval);
  },[content]);

  console.log("content type: ", contentType)
  console.log("fav list: ", user.favoritesList.length);
  console.log("watch list: ", user.watchList);

  const watchListContent = user.watchList.map(item => item.content);

  return (
    <>
    <Title title={"Netflix"}/>
    <div className="homePage">
      { content[randomIndex] && <RandomContent content={content[randomIndex]}/>}
      { isLoggedIn && user.favoritesList.length > 0 && <CardList cards={user.favoritesList} title={`${user.username}'s List`}/> }
      { isLoggedIn && user.watchList.length > 0 && <CardList cards={watchListContent} title={"Continue to Watch"}/> }
      { (contentType === "all" || !contentType) && <CardList cards={content} title={"All Content"}/> }
      { (contentType === "movies" || contentType === "all") && <CardList cards={movies} title={"All Movies"}/> }
      { (contentType === "series" || contentType === "all") && <CardList cards={series} title={"All Series"}/> }
    </div>
    </>
  );
}