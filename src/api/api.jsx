import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: 'bb792b79'
  }
});

export default api;