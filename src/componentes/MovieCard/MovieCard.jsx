import './MovieCard.css';

export const MovieCard = ({ movie, onSelect }) => {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=Sin+Imagen';

  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <img src={posterUrl} alt={`Póster de ${movie.Title}`} />
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
<<<<<<< HEAD
        <p className="movie-card-meta">{movie.Year} • {movie.Type}</p>
=======
        <p>{movie.Year} • {movie.Type}</p>
>>>>>>> 9c379b75dd216fac25133aebf0c399ca3c2ebc51
      </div>
    </div>
  );
};