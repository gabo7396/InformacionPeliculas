import React, { useEffect, useState } from 'react'
import movieAPI from '../api/movieAPI'
import { Movie, MovieAPIResponse } from '../interfaces/movieInterface'

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [moviesNowPlaying, setMoviesNowPlaying] = useState<Movie[]>([])

    const getMovies = async () => {
        const response = await movieAPI.get<MovieAPIResponse>('/now_playing')
        setMoviesNowPlaying(response.data.results)

        setIsLoading(false)
    }
    
    useEffect(() => {
        getMovies()
    }, [])
    


    return {
        moviesNowPlaying,
        isLoading
    }
}
