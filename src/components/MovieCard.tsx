import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Movie } from '../interfaces/movieInterface'
import { CommonActions, useNavigation } from '@react-navigation/native';


interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

export const MovieCard = ({ movie, height=420, width=300 }: Props) => {
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const navigation = useNavigation()

  return (
    <TouchableOpacity 
        onPress={() => navigation.dispatch(
            CommonActions.navigate({name: 'DetailScreen', params: movie})
        )}
        style={{
            width,
            height,
            marginHorizontal: 2,
            paddingBottom: 20,
            paddingHorizontal: 7
        }}
        activeOpacity={0.85}
    >
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{uri}}
            />
        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10,
    }
});