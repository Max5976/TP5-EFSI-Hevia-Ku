import { MovieCard } from '../MovieCard/MovieCard';
import './MovieList.css';

export const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onSelect={onSelectMovie} />
      ))}
    </div>
  );
};