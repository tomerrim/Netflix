import { Link } from "react-router-dom"
import { Btn } from "../../components/Btn"
import { Input } from "../../components/Input"
import Title from "../../components/Title"
import  { createUser } from "../../store/signUpSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { NetflixLogo } from "../../components/NetflixLogo"
import "./SignUp.scss";

export const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSignedUp, error } = useSelector(state => state.userSlice);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    if(isSignedUp) {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(createUser({email, password, username}));
            navigate("/signin");
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div className="signUpPage">
        <Title title={"Sign Up"} />
        <NetflixLogo className={"signInLogo"} width={200} height={60} />
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h3>Watch anywhere, cancel anytime.</h3>
        <p className="text-center">
          Ready to watch? Enter your email to create or restart your membership
        </p>
        <form className="signUpForm" onSubmit={handleSubmit}>
          <Input 
            className={"signUpInput"} 
            placeholder={"Username"}
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            className={"signUpInput"}
            placeholder={"Email Address"}
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type={"password"}
            className={"signUpInput"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Btn type={"submit"} className={"signUpBtn"}>
            Submit
          </Btn>
        </form>
        {error && <div className="error">{error}</div>}
        <span>
          Already have an account? <Link to={"/signin"}>Sign In here!</Link>
        </span>
      </div>
    );
}