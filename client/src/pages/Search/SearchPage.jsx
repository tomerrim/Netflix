import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import "./Search.scss";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { FILTERS } from "../../utils/constants";

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { movies, series } = useSelector(state => state.contentSlice);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [filteredSeries, setFilteredSeries] = useState(series);

    const filterBy = (filter) => {
        if (filter === "All Genres") {
            setFilteredMovies(movies);
            setFilteredSeries(series);
        } else {
            setFilteredMovies(movies.filter((m) => m.genre === filter));
            setFilteredSeries(series.filter((s) => s.genre === filter));
        }   
    }

    useEffect(() => {
        const { query } = queryString.parse(location.search);
        setSearchQuery(query || "");
    }, [location.search]);

    useEffect(() => {
        const query = searchQuery.toLowerCase();

        if(query === "") {
            setFilteredMovies(movies);
            setFilteredSeries(series);
        } else {
            const filterString = content =>
             content.title.toLowerCase().includes(query) ||
             content.year.includes(query) ||
             content.limit.toLowerCase().includes(query) ||
             content.genre.toLowerCase().includes(query);

            setFilteredMovies(movies.filter(filterString));
            setFilteredSeries(series.filter(filterString));
        }
    },[searchQuery, movies, series])

    return (
        <div className="searchPage">
            <div className="filter">
                <ul>
                    {FILTERS.map((filter) =>(
                        <li key={filter} onClick={() => filterBy(filter)}>{filter}</li>
                    ))}
                </ul>
            </div>
            <div className="searchedItems">
                <h2>Movies</h2>
                <div className="items">
                    {filteredMovies.map((m) => (
                        <div key={m._id} className="item" onClick={() => navigate(`/content/${m._id}`)}>
                            <img src={m.img} alt={m.title} />
                        </div>
                    ))}
                </div>
                <h2>Series</h2>
                <div className="items">
                    {filteredSeries.map((s) => (
                        <div key={s._id} className="item" onClick={() => navigate(`/content/${s._id}`)}>
                            <img src={s.img} alt={s.title} width={100} height={100}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}