import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Img } from '../assets/images';
import { fonts } from '../assets/fonts';

export default function Profile() {
    const [userName, setUserName] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [rememberMe, setRememberMe] = useState<any>('');

    useEffect(() => {
        const checkSavedData = async () => {
            try {

                const storedRemember = await AsyncStorage.getItem('remembertracker');

                console.log("Stored username, password, and remember me:", storedRemember);
                if (storedRemember == null) {
                    const storedUserNameCommon = await AsyncStorage.getItem('userNameCommon');
                    const storedPasswordCommon = await AsyncStorage.getItem('passwordCommon');
                    console.log("remember not ticked", storedUserNameCommon, storedUserNameCommon);
                    setUserName(storedUserNameCommon);
                    setPassword(storedPasswordCommon);
                    setRememberMe('No')

                }
                else {
                    const storedUserName = await AsyncStorage.getItem('userName');
                    const storedPassword = await AsyncStorage.getItem('password');
                    console.log("remember ticked", storedUserName, storedUserName);
                    setUserName(storedUserName);
                    setPassword(storedPassword);
                    setRememberMe('Yes');
                }

            } catch (error) {
                console.log('Error in useEffect:', error);
            }
        };

        checkSavedData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={Img.SPLASH_IMG} style={styles.profileImage} />
            </View>
            <View style={{ borderBottomWidth: 1, borderBlockColor: '#ccc', marginTop: 10 }} />
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.labelText}>Email:</Text>
                    <Text style={styles.valueText}>{userName}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.labelText}>Password:</Text>
                    <Text style={styles.valueText}>{password}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.labelText}>Remember Me Status:</Text>
                    <Text style={styles.valueText}>{rememberMe}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    profileImage: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderRadius: 75,
    },
    detailsContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    labelText: {
        fontSize: 16,
        fontFamily: fonts.BOLD,
        marginRight: 10,
        color: 'black'
    },
    valueText: {
        fontSize: 16,
        color: 'black',
        fontFamily: fonts.SEMIBOLD
    },
});
