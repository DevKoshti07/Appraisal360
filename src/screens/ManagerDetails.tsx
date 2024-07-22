import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { fonts } from '../assets/fonts'
import { Img } from '../assets/images';

interface rou {
    navigation: any
    route: any
}

const TEXT_LABELS: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    mob: 'Mobile Number',
    dob: 'Date of Birth',
    gender: 'Gender',
};

export default function ManagerDetails({ navigation, route }: rou) {

    let { info } = route.params

    useEffect(() => {
        console.log("route value", info);

    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, borderWidth: 1, borderColor: '#ccc', flexDirection: 'row', alignItems: 'center' }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={Img.BACK} style={{ height: 40, width: 40, marginLeft: 10, justifyContent: 'center' }} />
                </Pressable>
                <Text style={{ fontFamily: fonts.BOLD, fontSize: 20, color: 'black', marginLeft: 10 }}>{info.firstName}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.managerContainer}>
                    <Image
                        source={Img.SPLASH_IMG}
                        style={{ height: 50, width: 50, borderRadius: 25, alignSelf: 'flex-start' }}
                    />
                    <View>
                        {Object.keys(TEXT_LABELS).map(key => (
                            <View key={key}>
                                <Text style={styles.label}>
                                    {TEXT_LABELS[key]}:
                                </Text>
                                <Text style={styles.value}>
                                    {info[key]}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: fonts.SEMIBOLD }}>
                    Employee List
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    managerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    label: {
        color: 'black',
        fontSize: 16,
        marginLeft: 12,
        fontFamily: fonts.SEMIBOLD,
    },
    value: {
        color: 'black',
        fontSize: 16,
        marginLeft: 12,
        marginBottom: 10,
        fontFamily: fonts.REGULAR,
    },
})