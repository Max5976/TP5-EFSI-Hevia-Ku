import { useState } from 'react';
import { searchMovies } from './api/omdbApi';
import { SearchBar } from './componentes/SearchBar/SearchBar';
import { MovieList } from './componentes/MovieList/MovieList';
import { MovieDetail } from './componentes/MovieDetail/MovieDetail';
import { Loader } from './componentes/Loader/Loader';
import { ErrorMessage } from './componentes/ErrorMessage/ErrorMessage';
import './index.css';

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
        <h1>Buscador de Películas</h1>
        
        {!selectedMovieId && (
          <SearchBar onSearch={handleSearch} onClear={handleClear} />
        )}

        {loading && <Loader />}
        
        {error && !selectedMovieId && <ErrorMessage message={error} />}

        {!loading && !error && !selectedMovieId && searched && movies.length === 0 && (
          <ErrorMessage message="No se encontraron películas. Prueba con otro título." />
        )}

        {!loading && !error && !selectedMovieId && movies.length > 0 && (
          <MovieList movies={movies} onSelectMovie={setSelectedMovieId} />
        )}

        {selectedMovieId && (
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