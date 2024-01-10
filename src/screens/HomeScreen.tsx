import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, View, ScrollView } from 'react-native'

import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors'

import { useMovies } from '../hooks/useMovies'
import { MovieCard } from '../components/MovieCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getPImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies()
    const { top } = useSafeAreaInsets()

    const {setMainColors, setMainPrevColors} = useContext(GradientContext)

    const getPoterColors = async (index: number) => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

        const [primary = 'green', secondary = 'orange'] = await getPImageColors(uri)

        setMainColors({primary, secondary})
    }

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPoterColors(0)
        }
    }, [nowPlaying])
    

    if (isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color='grey' size={ 100 } />
            </View>
        )
    }


  return (
    <GradientBackground>
        <ScrollView>
            <View style={{marginTop: top + 20}}>
                
                {/* Main carousel */}
                <View style={{ height: 440 }}>
                    <Carousel
                        data={nowPlaying}
                        renderItem={( {item}: any ) => <MovieCard movie={item} />}
                        sliderWidth={ windowWidth }
                        itemWidth={ 300 }
                        inactiveSlideOpacity={0.95}
                        onSnapToItem={index => {
                            getPoterColors(index)
                        }}
                    />
                </View>

                {/* popular movies */}

                <HorizontalSlider
                    movies={popular}
                    title='Peliculas populares'
                />

                <HorizontalSlider
                    movies={topRated}
                    title='Mejor valoradas'
                />

                <HorizontalSlider
                    movies={upcoming}
                    title='Próximamente'
                />


            </View>
        </ScrollView>
    </GradientBackground>
  )
}
