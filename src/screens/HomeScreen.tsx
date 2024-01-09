import React from 'react'
import { ActivityIndicator, Dimensions, View, FlatList, Text, ScrollView } from 'react-native'

import Carousel from 'react-native-snap-carousel';

import { useMovies } from '../hooks/useMovies'
import { MovieCard } from '../components/MovieCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HorizontalSlider } from '../components/HorizontalSlider';

const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {

    const { moviesNowPlaying, isLoading } = useMovies()
    const { top } = useSafeAreaInsets()

    if (isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color='red' size={ 100 } />
            </View>
        )
    }


  return (
    <ScrollView>
        <View style={{marginTop: top + 20}}>
            
            {/* Main carousel */}
            <View style={{ height: 440 }}>
                <Carousel
                    data={moviesNowPlaying}
                    renderItem={( {item}: any ) => <MovieCard movie={item} />}
                    sliderWidth={ windowWidth }
                    itemWidth={ 300 }
                    inactiveSlideOpacity={0.95}
                />
            </View>

            {/* popular movies */}

            <HorizontalSlider
                movies={moviesNowPlaying}
                title='Popular Movies'
            />


        </View>
    </ScrollView>
  )
}
