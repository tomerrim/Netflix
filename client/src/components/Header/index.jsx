import { Link } from "react-router-dom";
import "./Header.scss";
import { NetflixLogo } from "../NetflixLogo";
// import { useSelector } from "react-redux";
import { Btn } from "../Btn";
import { useEffect, useState } from "react";

const HEADER_ITEMS = [
    { title: "Movies", path: "/movies" },
    { title: "Series", path: "/series" },
]

export const Header = () => {

    const [scrolled, setScrolled] = useState(false);
    // const user = useSelector(state => state.userSlice.user);
    // console.log(user)

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
      <header className={scrolled ? "scrolled" : ""}>
        <nav className="nav">
          <div className="wrapper">
            <div className="itemslist">
              <NetflixLogo width={160} height={50}/>
              {HEADER_ITEMS.map((item) => (
                <div key={item.path} className="item">
                  <Link to={item.path}>{item.title}</Link>
                </div>
              ))}
            </div>
            <div className="user">
              {/* <h2>{user.email}</h2> */}
              <Btn className={"signOut"}>Sign Out</Btn>
            </div>
          </div>
        </nav>
      </header>
    );
}