import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  async function tetchMoviesHandler() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) throw new Error("Somethign went wrong!");

      const data = await response.json();

      const transformedMovies = data.results.map(movies => {
        return {
          id: movies.episode_id,
          title: movies.title,
          openingText: movies.opening_crawl,
          releaseDate: movies.release_date
        }
      });

      setMovies(transformedMovies);

    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={tetchMoviesHandler} disabled={loading}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && !error && <p>Failed no movies!</p>}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
