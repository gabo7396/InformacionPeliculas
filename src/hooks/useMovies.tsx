import React, { useEffect, useState } from 'react'
import movieAPI from '../api/movieAPI'
import { Movie, MovieAPIResponse } from '../interfaces/movieInterface';


interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}


export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    })

    const getMovies = async () => {
        const nowPlayingPromise = movieAPI.get<MovieAPIResponse>('/now_playing')
        const popularPromise    = movieAPI.get<MovieAPIResponse>('/popular')
        const topRatedPromise   = movieAPI.get<MovieAPIResponse>('/top_rated')
        const upcomingPromise   = movieAPI.get<MovieAPIResponse>('/upcoming')
        
        const response = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);
        
        setMoviesState({
            nowPlaying: response[0].data.results,
            popular:    response[1].data.results,
            topRated:   response[2].data.results,
            upcoming:   response[3].data.results,
        })

        setIsLoading(false)
    }
    
    useEffect(() => {
        getMovies()
    }, [])
    


    return {
        ...moviesState,
        isLoading
    }
}
