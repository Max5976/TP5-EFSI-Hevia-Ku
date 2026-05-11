import { useState } from 'react';
import { searchMovies } from './api/omdbApi';
import { SearchBar } from './componentes/SearchBar/SearchBar';
import { MovieList } from './componentes/MovieList/MovieList';
import { MovieDetail } from './componentes/MovieDetail/MovieDetail';
import { Loader } from './componentes/Loader/Loader';
import { ErrorMessage } from './componentes/ErrorMessage/ErrorMessage';
import './index.css';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searched, setSearched] = useState(false); 

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setSelectedMovieId(null); 
    setSearched(true);

    try {
      const data = await searchMovies(query);
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error === 'Movie not found!' ? 'No se encontraron resultados para tu búsqueda.' : data.Error);
      }
    } catch (err) {
      setError('Ocurrió un error al conectar con el servidor.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMovies([]);
    setError('');
    setSearched(false);
    setSelectedMovieId(null);
  };

  return (
    <>
      <div className="app-container">
        {!selectedMovieId ? (
          <div className="home-panel">
            <header className="site-masthead" aria-label="Encabezado principal">
              <h1 className="app-title">Buscador de películas</h1>
              <p className="masthead-tagline">Títulos y series en un solo lugar</p>
            </header>

            <SearchBar onSearch={handleSearch} onClear={handleClear} />

            <div className="home-panel-main">
              {loading && <Loader />}

              {error && <ErrorMessage message={error} />}

              {!loading && !error && searched && movies.length === 0 && (
                <ErrorMessage message="No se encontraron películas. Prueba con otro título." />
              )}

              {!loading && !error && !searched && (
                <div className="home-welcome">
                  <h2>¡Bienvenido!</h2>
                  <p>Busca tus películas y series favoritas aquí</p>
                  <p className="welcome-hint">
                    Prueba buscando: &quot;Inception&quot;, &quot;Breaking Bad&quot;, &quot;Titanic&quot;...
                  </p>
                </div>
              )}

              {!loading && !error && movies.length > 0 && (
                <MovieList movies={movies} onSelectMovie={setSelectedMovieId} />
              )}
            </div>
          </div>
        ) : (
          <MovieDetail
            movieId={selectedMovieId}
            onBack={() => setSelectedMovieId(null)}
          />
        )}
      </div>
    </>
  );
}

export default App;