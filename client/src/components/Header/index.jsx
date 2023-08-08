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
                  {menuOpen ? (
                  <>
                    <div className="">
                      {HEADER_ITEMS.map((item) => (
                        <div key={item.path} className="item">
                          <Link to={item.path}>{item.title}</Link>
                        </div>
                      ))}
                    </div>
                    <Btn className={"signOut"} onClick={signOutClick}>
                      Sign Out
                    </Btn>
                  </> 
                  ) : ( 
                   <MenuIcon/>
                  )}
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

// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Menu,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
//   Button,
//   Typography,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { signOut } from "../../store/userSlice";
// import { NetflixLogo } from "../NetflixLogo";
// import { SearchBar } from "../SearchBar";
// import { Btn } from "../Btn";
// import "./Header.scss";
// // ... other imports ...

// const HEADER_ITEMS = [
//     { title: "Movies", path: "/movies" },
//     { title: "Series", path: "/series" },
// ]

// export const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const user = useSelector((state) => state.userSlice.user);
//   const [showSearchBar, setShowSearchBar] = useState(false);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const signOutClick = () => {
//     dispatch(signOut());
//     navigate("/signin");
//   };

//   const showSearch = () => {
//     setShowSearchBar(!showSearchBar);
//   };

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
//       <Toolbar>
//         <div style={{paddingTop: 15}}>
//           <NetflixLogo width={160} height={50} onClick={() => navigate("/")} />
//         </div>
//         {isMobile ? (
//           <>
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="search"
//               onClick={showSearch}
//             >
//               {showSearchBar ? <SearchBar /> : <SearchIcon />}
//             </IconButton>
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={handleMenu}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="simple-menu"
//               anchorEl={anchorEl}
//               keepMounted
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//               sx={{
//                 backgroundColor: "black",
//                 color: "white",
//               }}
//             >
//               {HEADER_ITEMS.map((item) => (
//                 <MenuItem key={item.path} onClick={() => navigate(item.path)}>
//                   {item.title}
//                 </MenuItem>
//               ))}
//               {user && <MenuItem>{user.username}</MenuItem>}
//               <MenuItem onClick={signOutClick}>Sign Out</MenuItem>
//             </Menu>
//           </>
//         ) : (
//           <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//             <div style={{paddingTop: 10}}>
//               {HEADER_ITEMS.map((item) => (
//                 <Button
//                 color="inherit"
//                 key={item.path}
//                 onClick={() => navigate(item.path)}
//                 >
//                   {item.title}
//                 </Button>
//               ))}
//               <IconButton color="inherit" onClick={showSearch}>
//                 {showSearchBar ? <SearchBar /> : <SearchIcon />}
//               </IconButton>
//             </div>
//             <div style={{display: "flex", alignItems: "center", margin: 5}}>
//               {user && <Typography variant="h6">{user.username}</Typography>}
//               <Btn className={"signOut"} onClick={signOutClick}>
//                 Sign Out
//               </Btn>
//             </div>
//           </div>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };
