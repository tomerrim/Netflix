import { Link, useNavigate } from "react-router-dom";
import { NetflixLogo } from "../NetflixLogo";
import { Btn } from "../Btn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchBar } from "../SearchBar";
import "./Header.scss";

const HEADER_ITEMS = [
    { title: "Movies", path: "/movies" },
    { title: "Series", path: "/series" },
]

export const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector(state => state.userSlice.user);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const signOutClick = () => {
      dispatch(signOut());
      navigate("/signin");
    }

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    }

    const showSearch = () => {
      setShowSearchBar(!showSearchBar);
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
      <>
        {isMobile ? (
          <header className={scrolled ? "scrolled" : "top"}>
            <nav className="nav">
              <div className="wrapper">
                <NetflixLogo
                  width={100}
                  height={30}
                  onClick={() => navigate("/")}
                />
                <div className="search" onClick={showSearch}>
                  {showSearchBar ? <SearchBar /> : <SearchIcon />}
                </div>
                <div className="user">{user && <h3>{user.username}</h3>}</div>
                <div className="menu" onClick={toggleMenu}>
                  <MenuIcon />
                </div>
                <div className={`dropdown ${menuOpen ? "open" : ""}`}>
                  {HEADER_ITEMS.map((item) => (
                    <div key={item.path} className="item">
                      <Link to={item.path}>{item.title}</Link>
                    </div>
                  ))}
                  <Btn className={"signOut"} onClick={signOutClick}>
                    Sign Out
                  </Btn>
                </div>
              </div>
            </nav>
          </header>
        ) : (
          <header className={scrolled ? "scrolled" : "top"}>
            <nav className="nav">
              <div className="wrapper">
                <NetflixLogo
                  width={160}
                  height={50}
                  onClick={() => navigate("/")}
                />
                <div className="itemslist">
                  {HEADER_ITEMS.map((item) => (
                    <div key={item.path} className="item">
                      <Link to={item.path}>{item.title}</Link>
                    </div>
                  ))}
                </div>
                <div className="search" onClick={showSearch}>
                  {showSearchBar ? <SearchBar /> : <SearchIcon />}
                </div>
                <div className="user">
                  {user && <h3>{user.username}</h3>}
                  <Btn className={"signOut"} onClick={signOutClick}>
                    Sign Out
                  </Btn>
                </div>
              </div>
            </nav>
          </header>
        )}
      </>
    );
}