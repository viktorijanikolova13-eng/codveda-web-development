import { useState } from "react";
import "./App.css";

import movie1 from "./assets/movie1.jpg";
import movie2 from "./assets/movie2.jpg";
import movie3 from "./assets/movie3.jpg";

function App() {
    const [search, setSearch] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    async function handleSearch() {
        if (search === "") {
            return;
        }

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${search}`
        );

        const data = await response.json();

        if (data.Response === "True") {
            setSearchResults(data.Search);
        } else {
            setSearchResults([]);
        }
    }

    return (
        <div className="app">

            <nav className="navbar">
                <h1>
                    <span>MOVIE</span>finder
                </h1>

                <div className="nav-links">
                    <a href="#">HOME</a>
                    <a href="#">FAVORITE</a>
                </div>
            </nav>

            <section className="search-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Find your movie......"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                </div>
            </section>

            {searchResults.length > 0 && (
                <section className="search-results">
                    <h2>Search Results</h2>

                    <div className="movie-list">

                        {searchResults.map((movie) => (
                            <div className="movie-card" key={movie.imdbID}>
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                />

                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                            </div>
                        ))}

                    </div>
                </section>
            )}

            <section className="movies-section">

                <h2>
                    If you can’t decide look for our favorite movies
                </h2>

                <div className="movie-list">

                    <div
                        className="movie-card"
                        onClick={() => setSelectedMovie("movie1")}
                    >
                        <img
                            src={movie1}
                            alt="The Shawshank Redemption"
                        />

                        <h3>The Shawshank Redemption</h3>
                        <p>1994</p>
                    </div>


                    <div
                        className="movie-card"
                        onClick={() => setSelectedMovie("movie2")}
                    >
                        <img
                            src={movie2}
                            alt="The Godfather"
                        />

                        <h3>The Godfather</h3>
                        <p>1972</p>
                    </div>


                    <div
                        className="movie-card"
                        onClick={() => setSelectedMovie("movie3")}
                    >
                        <img
                            src={movie3}
                            alt="The Dark Knight"
                        />

                        <h3>The Dark Knight</h3>
                        <p>2008</p>
                    </div>

                </div>
            </section>


            {selectedMovie === "movie1" && (
                <div className="modal">
                    <div className="modal-content">

                        <button
                            className="close-button"
                            onClick={() => setSelectedMovie(null)}
                        >
                            ×
                        </button>

                        <h2>The Shawshank Redemption</h2>
                        <p>1994</p>
                        <p>Director: Frank Darabont</p>
                        <p>Runtime: 2 hours, 22 minutes</p>

                        <p>
                            Summary: A banker is wrongly sent to prison for life.
                            He spends decades inside and builds a strong friendship
                            with a fellow inmate, holding onto hope and finding a
                            way to freedom.
                        </p>

                        <p>
                            Why it ranks high: Audiences love its powerful message
                            about hope and friendship. It holds the number one spot
                            on the IMDb Top 250 list.
                        </p>

                    </div>
                </div>
            )}


            {selectedMovie === "movie2" && (
                <div className="modal">
                    <div className="modal-content">

                        <button
                            className="close-button"
                            onClick={() => setSelectedMovie(null)}
                        >
                            ×
                        </button>

                        <h2>The Godfather</h2>
                        <p>1972</p>
                        <p>Director: Francis Ford Coppola</p>
                        <p>Runtime: 2 hours, 55 minutes</p>

                        <p>
                            Summary: An aging mafia boss transfers control of his
                            criminal empire to his reluctant youngest son. The son
                            gets pulled deeper into the dangerous world of crime
                            and family loyalty.
                        </p>

                        <p>
                            Why it ranks high: It changed the crime genre forever.
                            The acting, writing, and direction set a high standard
                            for all of cinema.
                        </p>

                    </div>
                </div>
            )}


            {selectedMovie === "movie3" && (
                <div className="modal">
                    <div className="modal-content">

                        <button
                            className="close-button"
                            onClick={() => setSelectedMovie(null)}
                        >
                            ×
                        </button>

                        <h2>The Dark Knight</h2>
                        <p>2008</p>
                        <p>Director: Christopher Nolan</p>
                        <p>Runtime: 2 hours, 32 minutes</p>

                        <p>
                            Summary: Batman fights a chaotic criminal mastermind
                            known as the Joker who wants to destroy Gotham City.
                            Batman must push his moral and physical limits to stop him.
                        </p>

                        <p>
                            Why it ranks high: It redefined superhero movies with
                            a realistic, dark tone. Heath Ledger won an Academy Award
                            for his unforgettable performance as the Joker.
                        </p>

                    </div>
                </div>
            )}

        </div>
    );
}

export default App;
