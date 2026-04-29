import api from './api';

export const searchMovies = async (query) => {
  const response = await api.get('', {
    params: { s: query } 
  });
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await api.get('', {
    params: { i: id, plot: 'full' }
  });
  return response.data;
};