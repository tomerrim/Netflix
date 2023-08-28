/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CardList } from "../../components/CardList";
import { setActionContent, setContent,setContentForKids,setMovies, setSeries } from "../../store/contentSlice";
import { customFetch } from "../../utils/customFetch";
import { RandomContent } from "../../components/RandomContent";
import "./Home.scss";
import Title from "../../components/Title";

export const HomePage = ({contentType = "all"}) => {
  const dispatch= useDispatch();
  // const navigate = useNavigate();
  const [randomIndex, setRandomIndex] = useState(null);
  const { content, movies, series, actionContent, contentForKids } = useSelector(state => state.contentSlice);
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
      // dispatch(setContent(allContent));
      if (contentType === "movies" || contentType === "all") {
        dispatch(setMovies(allContent));
        updateRandomIndex(movies.length);
        dispatch(setActionContent(movies));
        dispatch(setContentForKids(movies));
      }
      if (contentType === "series" || contentType === "all") {
        dispatch(setSeries(allContent))
        updateRandomIndex(series.length);
        dispatch(setActionContent(series));
        dispatch(setContentForKids(series));
      }
      if (contentType === "all") {
        dispatch(setContent(allContent));
        updateRandomIndex(allContent.length);
        dispatch(setActionContent(allContent));
        dispatch(setContentForKids(allContent));
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
      if(content.length === 0) {
        console.log("fetch data")
        fetchAllContent();
      }
      updateRandomIndex(content.length);
      // fetchWatchList();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRandomIndex(content.length);
    }, 10000);

    return () => clearInterval(interval);
  },[content]);

  // console.log("content type: ", contentType)
  // console.log("fav list: ", user.favoritesList.length);
  // console.log("watch list: ", user.watchList);

  const watchListContent = user?.watchList.map(item => item.content);

  return (
    <>
    <Title title={"My Netflix"}/>
    <div className="homePage">
      { content[randomIndex] && <RandomContent content={content[randomIndex]}/>}
      { isLoggedIn && user.favoritesList.length > 0 && <CardList cards={user.favoritesList} title={`${user.username}'s List`}/> }
      { isLoggedIn && user.watchList.length > 0 && <CardList cards={watchListContent} title={"Continue to Watch"}/> }
      <CardList cards={content.slice(0,10)} title={"Top 10"}/>
      {/* { (contentType === "all" || !contentType) && <CardList cards={content} title={"All Content"}/> } */}
      { 
        contentType === "movies" ? (
          <>
            <CardList cards={movies} title={"All Movies"}/>
            <CardList cards={actionContent} title={"Action Movies"}/>
            {contentForKids.length > 0 && <CardList cards={contentForKids} title={"Movies for Kids"}/>}
          </>
        ) : contentType === "series" ? (
          <>
            <CardList cards={series} title={"All Series"}/>
            <CardList cards={actionContent} title={"Action Series"}/>
            {contentForKids.length > 0 && <CardList cards={contentForKids} title={"Series for Kids"}/>}
          </>
        ) : contentType === "all" && (
          <>
            <CardList cards={content} title={"All Content"}/>
            <CardList cards={actionContent} title={"Action"}/>
            {contentForKids.length > 0 && <CardList cards={contentForKids} title={"For Kids"}/>}
          </>
        )
      }
    </div>
    </>
  );
}