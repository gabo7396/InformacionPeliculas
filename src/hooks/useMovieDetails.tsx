import { useEffect, useState } from "react";
import movieAPI from "../api/movieAPI";
import { MovieFull } from "../interfaces/movieInterface";
import { Cast, CreditsResponse } from "../interfaces/creditsInterface";

interface MovieDetails {
    cast: Cast[];
    isLoading: boolean;
    movieFull?: MovieFull; 
}

export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetails>({
        cast: [],
        isLoading: true,
        movieFull: undefined
    });

    const getMovieDetails = async() => {
        const movieDetailPromise = movieAPI.get<MovieFull>(`/${movieId}`);
        const movieCastPromise = movieAPI.get<CreditsResponse>(`/${movieId}/credits`);
        
        const [ movieDetailResponse, movieCastResponse] = await Promise.all([
            movieDetailPromise,
            movieCastPromise
        ])

        setState({
            cast: movieCastResponse.data.cast,
            isLoading: false,
            movieFull: movieDetailResponse.data
        })
    }

    useEffect(() => {
      getMovieDetails()
    }, [])
    
    return {
        ...state
    }

}
