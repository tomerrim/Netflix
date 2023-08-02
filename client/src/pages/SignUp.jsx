import { Link } from "react-router-dom"
import { Btn } from "../components/Btn"
import { Input } from "../components/Input"
import Title from "../components/Title"

export const SignUp = () => {
    return (
        <div className="signUpPage">
            <Title title={"Sign Up"}/>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h3>Watch anywhere, cancel anytime.</h3>
            <p className="text-center">Ready to watch? Enter your email to create or restart your membership</p>
            <form className="signUpForm">
                <Input className={"signUpInput"} placeholder={"Email Address"}/>
                <Btn type={"submit"} className={"signUpBtn"}>Submit</Btn>
            </form>
            <span>Already have an account? <Link to={"/signin"}>Sign In here!</Link></span>
        </div>
    )
}