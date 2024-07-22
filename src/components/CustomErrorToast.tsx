import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface nav {
    text1: any,
    text2: any
}

const CustomErrorToast = ({ text1, text2 }: nav) => (
    <View style={styles.container}>
        <Text style={styles.text}>{text1}</Text>
        {text2 && <Text style={styles.subText}>{text2}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    subText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 8
    }
});

export default CustomErrorToast;
