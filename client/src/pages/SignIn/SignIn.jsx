import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { Input } from "../../components/Input";
import { Btn } from "../../components/Btn";
import "./SignIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchuser } from "../../store/userSlice";
import { NetflixLogo } from "../../components/NetflixLogo";

export const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {user, error, loading} = useSelector(state => state.userSlice);
    // const error = useSelector(state => state.userSlice.error);
    // const loading = useSelector(state => state.userSlice.loading);

    useEffect(() => {
        if(user) {
            navigate("/")
        } else if (error) {
            console.log("Error: ", error)
        }
    },[navigate, user, error])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
              const action = await dispatch(fetchuser({email, password}));
              if(fetchuser.fulfilled.match(action)) {
                navigate("/");
              } else {
                console.log("Failed to sign in:", action.error.message);
              }
            } else {
                console.log("Please enter valid email or password")
            }

        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
      <div className="signInPage">
        <Title title={"Sign In"} />
        <NetflixLogo className={"signInLogo"} width={200} height={60} />
        <div className="form">
          {error && <div className="error">{error}</div>}
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type={"email"}
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
          {loading && <div>Loading...</div>}
        </div>
      </div>
    );
}