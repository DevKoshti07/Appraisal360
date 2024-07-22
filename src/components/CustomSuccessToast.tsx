import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../assets/fonts';

interface nav {
    text1: any,
    text2: any
}

const CustomSuccessToast = ({ text1, text2 }: nav) => (
    <View style={styles.container}>
        <Text style={styles.text}>{text1}</Text>
        {text2 && <Text style={styles.subText}>{text2}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        width: '100%',
        borderRadius: 8,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: '#fff',
        fontFamily: fonts.REGULAR
    },
    subText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 8,
        fontFamily: fonts.REGULAR
    }
});

export default CustomSuccessToast;
