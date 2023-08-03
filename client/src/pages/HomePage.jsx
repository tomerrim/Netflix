import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    
    // const navigate = useNavigate();
    // const user = useSelector(state => state.userSlice.user);
    // useEffect(() => {
    // if (!user) {
    //     navigate("/signIn");
    // }
    // }, [user]);

    return (
      <div className="homePage">
        <h1>Welcome to my website!</h1>
      </div>
    );
}