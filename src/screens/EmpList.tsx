import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Img } from '../assets/images';
import { fonts } from '../assets/fonts';
import Slider from '@react-native-community/slider';

interface Employee {
    staffId: string;
    stafffirstName: string;
    staffdep: string;
    rating: number;
    desc: string;
    nameReviwer: string;
}

interface EmpListProps {
    navigation: any
    route: any
}

export default function EmpList({ navigation, route }: EmpListProps) {
    let { name } = route.params;

    const [staff, setStaff] = useState<Employee[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const save2 = await AsyncStorage.getItem('datastaff');
        if (save2) {
            const parsedData = JSON.parse(save2) as Employee[];
            console.log("getData in useEffect:-->>", parsedData, name);
            setStaff(parsedData);
        }
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('datastaff', JSON.stringify(staff));
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
        }
    };

    const onRatingChange = (val: number, index: number) => {
        const updatedStaff = [...staff];
        updatedStaff[index].rating = val;
        // if (updatedStaff[index].nameReviwer === name) {
        //     updatedStaff[index].nameReviwer = name;
        // }
        setStaff(updatedStaff);
        saveData();
    };

    const onDescChange = (text: string, index: number) => {
        const updatedStaff = [...staff];
        updatedStaff[index].desc = text;
        // if (updatedStaff[index].nameReviwer === name) {
        //     updatedStaff[index].nameReviwer = name;
        // }
        setStaff(updatedStaff);
        saveData();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={staff}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                        }}>
                        <View style={styles.managerContainer}>
                            <Image
                                source={Img.SPLASH_IMG}
                                style={{ height: 50, width: 50, borderRadius: 25 }}
                            />
                            <View style={{ borderRightWidth: 1, borderRightColor: '#ccc', marginLeft: 12 }} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={{ color: 'black', fontSize: 16, fontFamily: fonts.SEMIBOLD }}>
                                    Employee Name: {item.stafffirstName}
                                </Text>
                                <Text style={{ color: 'black', fontSize: 16, fontFamily: fonts.SEMIBOLD }}>
                                    Staff Department: {item.staffdep}
                                </Text>
                                <Slider
                                    style={{ width: 200, height: 40 }}
                                    minimumValue={1}
                                    maximumValue={5}
                                    minimumTrackTintColor="#6cbc6c"
                                    maximumTrackTintColor="#000000"
                                    // value={item.nameReviwer === name ? item.rating : 1}
                                    value={item.rating}
                                    onValueChange={(val) => onRatingChange(val, index)}
                                />
                                <Text style={{ color: 'black', fontSize: 16, fontFamily: fonts.SEMIBOLD }}>
                                    {/* Rating: {item.nameReviwer === name ? item.rating : ''} */}
                                    Rating: {item.rating}

                                </Text>
                                <TextInput
                                    placeholder='Enter Review Description'
                                    // value={item.nameReviwer === name ? item.desc : ''}
                                    value={item.desc}
                                    onChangeText={(text) => onDescChange(text, index)}
                                    multiline={true}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.staffId}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    managerContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    input: {
        height: 80,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        fontFamily: fonts.SEMIBOLD,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: 'black',
    },
});
