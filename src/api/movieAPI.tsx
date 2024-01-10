import axios from 'axios'

const movieAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'adb4695cea279c606129db753206a628',
        language: 'es-ES'
    }
});

export default movieAPI;