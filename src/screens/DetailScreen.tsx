import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../navigation/Navigation';
import { ScrollView } from 'react-native-gesture-handler';

import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeigth = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route, navigation}: Props) => {

  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const {isLoading, cast, movieFull} = useMovieDetails(movie.id)

  return (
    <ScrollView>
      <View style={ styles.imageContainer }>
        <View style={styles.imageBorder}>
          <Image
                  style={styles.image}
                  source={{uri}}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
        {
          isLoading
          ? <ActivityIndicator size={35} color='grey' style={{marginTop: 20}} />
          : <MovieDetails movieFull={movieFull!} cast={cast} />
        }


        {/* Botón para cerrar */}

        <TouchableOpacity
          style={styles.backButtom}
          onPress={() => navigation.pop()}
        >
          <Icon
            name='arrow-back-outline'
            size={50}
            color='#FCFCFC'
            style={styles.backIcon}
          />
        </TouchableOpacity>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  backButtom:{
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 10,
    left: 10,
    shadowColor: "#ADADAD",
      shadowOffset: {
          width: 0,
          height: 10,
      },
      shadowOpacity: 0.24,
      shadowRadius: 7,
    borderRadius: 100
  },
  backIcon: {
    zIndex: 999,
    elevation: 9,
  },
  image: {
      flex: 1
  },
  imageContainer: {
      width: '100%',
      height: screenHeigth * 0.7,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 10,
      },
      shadowOpacity: 0.24,
      shadowRadius: 7,
      elevation: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
        
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subTitle: {
    fontSize: 17,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});