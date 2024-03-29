import { useEffect } from "react";
import { useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(FEATURED_API)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
        });
    }, []);

    function handleOnSubmit(e) {
        e.preventDefault();

        if (searchTerm) {
            fetch(SEARCH_API + searchTerm)
            .then((res) => res.json())
            .then((data) => {
            setMovies(data.results);

            setSearchTerm("");
        });
        }
    }

    function handleOnChange(e) {
        setSearchTerm(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <header>
                    <input
                        className="search"
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                </header>
            </form>
            <div className="movie-container">
                {movies.length > 0 &&
                    movies.map((movie) => {
                        return <Movie key={movie.id} {...movie} />;
                    })}
            </div>
        </>
    );
}

export default App;
