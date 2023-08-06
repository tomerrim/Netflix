import { Link, useNavigate } from "react-router-dom";
import { NetflixLogo } from "../NetflixLogo";
import { Btn } from "../Btn";
import { useEffect, useState } from "react";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/userSlice";

const HEADER_ITEMS = [
    { title: "Movies", path: "/movies" },
    { title: "Series", path: "/series" },
]

export const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const user = useSelector(state => state.userSlice.user);
    console.log("user: ",user)

    const signOutClick = () => {
      dispatch(signOut());
      navigate("/signin");
    }

    useEffect(()=>{
      const handleScroll = () => {
        if(window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
      window.addEventListener("scroll",handleScroll)

      return () => {
        // cleanup function
        window.removeEventListener('scroll', handleScroll)
      }
    },[])

    return (
      <header className={scrolled ? "scrolled" : "top"}>
        <nav className="nav">
          <div className="wrapper">
            <div className="itemslist">
              <NetflixLogo width={160} height={50} onClick={() => navigate("/")}/>
              {HEADER_ITEMS.map((item) => (
                <div key={item.path} className="item">
                  <Link to={item.path}>{item.title}</Link>
                </div>
              ))}
            </div>
            <div className="user">
              {user && <h3>{user.username}</h3>}
              <Btn className={"signOut"} onClick={signOutClick}>Sign Out</Btn>
            </div>
          </div>
        </nav>
      </header>
    );
}