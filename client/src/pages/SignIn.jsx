import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../components/Title";
import { Input } from "../components/Input";
import { Btn } from "../components/Btn";
import "./styles.scss";

export const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/users/signin", {email, password});
            console.log("data: ", data);
            navigate("/");
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
        <div className="signInPage">
            <Title title={"Sign In"} />
            <div className="signInLogo">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo" width={200} height={60}
            />
            </div>
            <div className="form">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                    placeholder={"Email"}
                    name={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    className={"signInInput"}
                    />
                    <Input
                    type={"password"}
                    placeholder={"Password"}
                    name={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Btn type={"submit"} className={"signIn"}>
                    Sign In
                    </Btn>
                    <span>
                    New to Netflix? <Link to={"/signup"}>Sign Up Now</Link>
                    </span>
                    <div style={{ paddingBottom: "10px" }}>
                    This page is protected by Google reCAPTCH to ensure youre not a
                    bot
                    </div>
                </form>
            </div>
      </div>
    );
}