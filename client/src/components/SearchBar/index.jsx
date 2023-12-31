import { useNavigate } from "react-router-dom";
import { Input } from "../Input"
import SearchIcon from "@mui/icons-material/Search";
import "./searchBar.scss";

export const SearchBar = () => {
    const navigate = useNavigate();
    const navToSearch = (e) => {
        const query = e.target.value;
        if (query === "") {
            navigate("/")
        } else {
            navigate(`/search?query=${query}`);
        }
    }

    return (
        <div className="searchBar">
            <div className="icon">
                <SearchIcon/>
            </div>
            <Input
             className={"searchInput"} 
             autoFocus={true} 
             onChange={navToSearch} 
             name={"searchBar"} 
             placeholder={"Movies, Series, Genres..."}
             />
        </div>
    )
}