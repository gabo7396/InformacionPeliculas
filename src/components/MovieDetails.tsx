import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface'
import  Icon  from 'react-native-vector-icons/Ionicons';
import currencyFormater from 'currency-formatter'
import { CastCard } from './CastCard';


interface Props {
    movieFull: MovieFull,
    cast: Cast[]
}


export const MovieDetails = ({ movieFull, cast}: Props) => {


  return (
    <>
        <View style={{
            marginHorizontal: 20
        }}>

            {/* Detalles */}
            <View style= {{
                flexDirection: 'row'
            }}>
                <Icon
                    name="star-outline"
                    color='grey'
                    size={16}
                />

                <Text> {movieFull.vote_average}</Text>
                <Text style={{marginLeft: 5}}>
                     - {
                        movieFull.genres.map(gen => gen.name).join(', ')
                    }
                </Text>
            </View>


            {/* Sinopsis */}
            
            <Text style={styles.title}>
                Sinopsis
            </Text>
            <Text style={{fontSize: 16}}>
                {
                    movieFull.overview === ''
                    ? 'No indicada'
                    : movieFull.overview
                }
            </Text>

            {/* Sinopsis */}
            
            <Text style={styles.title}>
                Presupuesto
            </Text>
            <Text style={{fontSize: 18}}>
                {
                    movieFull.budget == 0
                    ? 'No indicado'
                    : currencyFormater.format(movieFull.budget, {code: 'USD'})
                }
            </Text>


        </View>

        {/* Reparto */}
        <View style={{marginTop: 10, marginBottom: 25}}>
            <Text style={{...styles.title, marginHorizontal: 20}}>Actores</Text>
            {/* <CastCard actor={cast[0]} /> */}

            <FlatList
                data={cast}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CastCard actor={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatStyle}
            />


        </View>
    </>
  )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 23,
        marginTop: 10,
        fontWeight: 'bold'
    },
    flatStyle: {
        marginTop: 10,
        height: 80
    }
});