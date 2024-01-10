import React from 'react'
import { ActivityIndicator, Dimensions, View, ScrollView } from 'react-native'

import Carousel from 'react-native-snap-carousel';

import { useMovies } from '../hooks/useMovies'
import { MovieCard } from '../components/MovieCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HorizontalSlider } from '../components/HorizontalSlider';

const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies()
    const { top } = useSafeAreaInsets()

    if (isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color='grey' size={ 100 } />
            </View>
        )
    }


  return (
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
  )
}
