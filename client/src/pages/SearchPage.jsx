import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { useState } from "react";

const FILTERS = [
    "All Genres",
    "Action",
    "Comedy",
    "Fantasy",
    "Detective",
    "Horror",
    "Animation"
];

export const SearchPage = () => {
    const navigate = useNavigate();
    const { movies, series } = useSelector(state => state.contentSlice);
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