import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CardList } from "../components/CardList";
import { Header } from "../components/Header";
import { setContent } from "../store/contentSlice";
import { customFetch } from "../utils/customFetch";
import { RandomContent } from "../components/RandomContent";

export const HomePage = () => {
  const dispatch= useDispatch();

  const fetchAllContent = async () => {
    try {
      const allContent = await customFetch("content", "GET");
      console.log("all content:", allContent)
      dispatch(setContent(allContent));
    } catch (error) {
      console.log("Failed to fetch content");
    }
  }

  useEffect(() => {
    fetchAllContent();
  }, []);

  const content = useSelector(state => state.contentSlice.content);
  console.log("content: ",content);

  // const navigate = useNavigate();
  // const user = useSelector(state => state.userSlice.user);
  // useEffect(() => {
  // if (!user) {
  //     navigate("/signIn");
  // }
  // }, [user]);

  return (
    <>
    <Header/>
    <div className="homePage">
      {/* <h1>Welcome to my website!</h1> */}
      {content && <RandomContent content={content[0]}/>}
      <CardList cards={content} title={"All Content"}/>
    </div>
    </>
  );
}