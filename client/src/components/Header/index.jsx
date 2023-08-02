import { Link } from "react-router-dom";
import "./Header.scss";
import { NetflixLogo } from "../NetflixLogo";

const HEADER_ITEMS = [
    { title: "Movies", path: "/movies" },
    { title: "Series", path: "/series" },
]

export const Header = () => {
    return (
      <header>
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
          </div>
        </nav>
      </header>
    );
}