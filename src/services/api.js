import axios from 'axios';

//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=7ca61eb25c2fe7d86411a9a6e0c9ad00&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
