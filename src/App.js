import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])

  function tetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/')
      .then(response => {
        return response.json();
      }).then(data => {
        const transformedMovies = data.results.map(movies => {
          return {
            id: movies.episode_id,
            title: movies.title,
            openingText: movies.opening_crawl,
            releaseDate: movies.release_date
          }
        })
        setMovies(transformedMovies)
      })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={tetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
