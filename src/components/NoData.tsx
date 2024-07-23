import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../assets/fonts'

export default function NoData() {
    return (
        <View
            style={styles.container}>
            <Text style={styles.txt}>
                No Data Found
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 18,
        color: 'black',
        fontFamily: fonts.SEMIBOLD
    }
})