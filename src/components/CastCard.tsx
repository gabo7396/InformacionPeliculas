import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    actor: Cast;
}


export const CastCard = ({ actor }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`

  return (
    <View style={styles.container}>
        {
            actor.profile_path
            ?   (
                    <Image
                        source={{uri}}
                        style={styles.image}
                    />
                )
            :
                (
                    <Icon
                        name='person-circle-outline'
                        color='gray'
                        size={61}
                    />
                )
        }

        <View style={styles.actorInfo}>
            <Text style={styles.name}>
                {actor.name}
            </Text>
            <Text style={styles.character}>
                {actor.character}
            </Text>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    actorInfo: {
        marginLeft: 12,
        marginTop: 4
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 61,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10,
        marginLeft: 20,
        paddingRight: 15,
    },
    image: {
        width: 61,
        height: 61,
        borderRadius: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    character: {
        fontSize: 16,
        opacity: 0.7
    }
});