import axios from 'axios'

const movieAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'bccb69e890c049e02e49d40a76564ffa',
        language: 'es-ES'
    }
});

export default movieAPI;