/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { CardList } from "../../components/CardList";
import { getAllContent } from "../../store/contentSlice";
import { RandomContent } from "../../components/RandomContent";
import "./Home.scss";
import Title from "../../components/Title";

export const HomePage = ({contentType = "all"}) => {
  const dispatch= useDispatch();
  const [randomIndex, setRandomIndex] = useState(null);
  const { actionContent, contentForKids } = useSelector(state => state.contentSlice);
  const {user } = useSelector((state) => state.userSlice);
  const content = useSelector(state => {
    if (contentType === "series") {
      return state.contentSlice.series;
    } else if (contentType === "movies") {
      return state.contentSlice.movies;
    } else {
      return state.contentSlice.content;
    }
  });

  const fetchAllContent = async () => {
    try {
      dispatch(getAllContent());
      updateRandomIndex(content.length);
    } catch (error) {
      console.log("Failed to fetch content");
    }
  }

  const updateRandomIndex = (length) => {
    const randIndex = Math.floor(Math.random() * length);
    setRandomIndex(randIndex);
  }

  useEffect(() => {
    if (user) {
      if(content.length === 0) {
        console.log("fetch data")
        fetchAllContent();
      }
      updateRandomIndex(content.length);
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRandomIndex(content.length);
    }, 10000);

    return () => clearInterval(interval);
  },[content]);

  const watchListContent = user?.watchList.map(item => item.content);

  return (
    <>
    <Title title={"My Netflix"}/>
    <div className="homePage">
      { content[randomIndex] && <RandomContent content={content[randomIndex]}/>}
      { user && user.favoritesList.length > 0 && <CardList cards={user.favoritesList} title={`${user.username}'s List`}/> }
      { user && user.watchList.length > 0 && <CardList cards={watchListContent} title={"Continue to Watch"}/> }
      <CardList cards={content.slice(0,10)} title={"Top 10"}/>
      { 
        contentType === "movies" ? (
          <>
            <CardList cards={content} title={"All Movies"}/>
            <CardList cards={actionContent} title={"Action Movies"}/>
            {contentForKids.length > 0 && <CardList cards={contentForKids} title={"Movies for Kids"}/>}
          </>
        ) : contentType === "series" ? (
          <>
            <CardList cards={content} title={"All Series"}/>
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