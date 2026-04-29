import { useState, useEffect } from 'react';
import { getMovieDetails } from '../../api/omdbApi';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const MovieDetail = ({ movieId, onBack }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getMovieDetails(movieId);
        if (data.Response === 'True') {
          setDetail(data);
        } else {
          setError('No se pudo cargar la información detallada.');
        }
      } catch (err) {
        setError('Error de conexión al obtener detalles.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onBack={onBack} />;
  if (!detail) return null;

  const posterUrl = detail.Poster !== 'N/A' 
    ? detail.Poster 
    : 'https://via.placeholder.com/300x450?text=Sin+Imagen';

  // Función auxiliar para manejar datos faltantes
  const checkData = (data) => (data && data !== 'N/A' ? data : 'Dato no disponible');

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={onBack}>← Volver a resultados</button>
      <div className="detail-content">
        <img src={posterUrl} alt={`Póster de ${detail.Title}`} />
        <div className="detail-info">
          <h2>{detail.Title} ({checkData(detail.Year)})</h2>
          <p><strong>Género:</strong> {checkData(detail.Genre)}</p>
          <p><strong>Director:</strong> {checkData(detail.Director)}</p>
          <p><strong>Actores:</strong> {checkData(detail.Actors)}</p>
          <p><strong>Duración:</strong> {checkData(detail.Runtime)}</p>
          <p><strong>Idioma:</strong> {checkData(detail.Language)}</p>
          <p><strong>País:</strong> {checkData(detail.Country)}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {checkData(detail.imdbRating)}</p>
          <div className="plot">
            <h3>Sinopsis:</h3>
            <p>{checkData(detail.Plot)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};