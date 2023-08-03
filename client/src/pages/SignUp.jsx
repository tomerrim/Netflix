import { Link } from "react-router-dom"
import { Btn } from "../components/Btn"
import { Input } from "../components/Input"
import Title from "../components/Title"
import  { createUser } from "../store/signUpSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSignedUp, loading, error } = useSelector(state => state.userSlice);

    if(isSignedUp) {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // try {
        //     dispatch(createUser({}))
        // } catch (error) {
            
        // }


    }

    return (
        <div className="signUpPage">
            <Title title={"Sign Up"}/>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h3>Watch anywhere, cancel anytime.</h3>
            <p className="text-center">Ready to watch? Enter your email to create or restart your membership</p>
            <form className="signUpForm" onSubmit={handleSubmit}>
                <Input className={"signUpInput"} placeholder={"Email Address"}/>
                <Input type={"password"} className={"signUpInput"} placeholder={"Password"}/>
                
                <Btn type={"submit"} className={"signUpBtn"}>Submit</Btn>
            </form>
            <span>Already have an account? <Link to={"/signin"}>Sign In here!</Link></span>
        </div>
    )
}