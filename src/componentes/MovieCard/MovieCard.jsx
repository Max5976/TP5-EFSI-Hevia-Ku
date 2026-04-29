export const MovieCard = ({ movie, onSelect }) => {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=Sin+Imagen';

  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <img src={posterUrl} alt={`Póster de ${movie.Title}`} />
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year} • {movie.Type}</p>
      </div>
    </div>
  );
};