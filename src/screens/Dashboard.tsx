import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Img } from '../assets/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fonts } from '../assets/fonts';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ManagerModal from '../modal/ManagerModal';
import StaffModal from '../modal/StaffModal';

interface nav {
    navigation: any,
    route: any
}

export default function Dashboard({ navigation, route }: nav) {

    const layout = useWindowDimensions();

    const [modalManager, setmodalManager] = useState<boolean>(false);
    const [managerFirstName, setmanagerFirstName] = useState<string>('');
    const [managerLastName, setmanagerLastName] = useState<string>('');
    const [mobile, setMobile] = useState<any>('');
    const [department, setDepartment] = useState<string>('IT');
    const [dob, setDOB] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [managerData, setManagerData] = useState<any[]>([]);


    const [modalStaff, setmodalStaff] = useState<boolean>(false);
    const [staffFirstName, setstaffFirstName] = useState<string>('');
    const [staffLastName, setstaffLastName] = useState<string>('');
    const [staffmobile, setstaffMobile] = useState<any>('');
    const [staffdepartment, setStaffDepartment] = useState<string>('IT');
    const [staffdob, setStaffDOB] = useState<string>('');
    const [staffGender, setStaffGender] = useState<string>('');
    const [staffData, setStaffData] = useState<any[]>([]);



    useEffect(() => {
        const checkSavedData = async () => {
            try {
                const save = await AsyncStorage.getItem('data');
                if (save) {
                    setManagerData(JSON.parse(save));
                }
                const save2 = await AsyncStorage.getItem('datastaff');
                if (save2) {
                    setStaffData(JSON.parse(save2));
                }
            } catch (error) {
                console.log('error in useEffect', error);
            }
        };
        checkSavedData();
    }, [])

    const saveData = async (item: any) => {
        try {
            await AsyncStorage.setItem('data', JSON.stringify(item));
        } catch (error) {
            console.log('Save time error', error);
        }
    };
    const saveStaffData = async (item: any) => {
        try {
            await AsyncStorage.setItem('datastaff', JSON.stringify(item));
        } catch (error) {
            console.log('Save time error', error);
        }
    };

    const submitManagerFun = (data: any) => {
        const nameRegex = /^[A-Za-z ]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        // Validation checks
        if (data.fname === '') {
            Alert.alert('Enter First Name');
        } else if (!nameRegex.test(data.fname)) {
            Alert.alert('Enter Valid First Name');
        } else if (data.lname === '') {
            Alert.alert('Enter Last Name');
        } else if (!nameRegex.test(data.lname)) {
            Alert.alert('Enter Valid Last Name');
        }
        //  else if (mobile.length === 0) {
        //     Alert.alert('Enter Mobile Number');
        // } 
        // else if (!mobileRegex.test(mobile)) {
        //     Alert.alert('Enter Valid Mobile Number');
        // } 
        else {
            const newManager = {
                firstName: data.fname,
                lastName: data.lname,
                img: Img.SPLASH_IMG,
                mob: data.mob,
                dep: data.dept,
                dob: data.dob,
                gender: data.gen,
            };


            const updatedManagerData = [
                ...managerData,
                newManager,
            ];
            setManagerData(updatedManagerData);
            saveData(updatedManagerData);


            console.log('After Updation:', updatedManagerData);


            hideModal();
            setMobile('');
            setmanagerFirstName('');
            setmanagerLastName('');
        }
    };

    const submitStaffFun = (data: any) => {
        console.log("submit time data is:-->>", data);


        const nameRegex = /^[A-Za-z ]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        // Validation checks
        if (data.fname === '') {
            Alert.alert('Enter Staff First Name');
        } else if (!nameRegex.test(data.fname)) {
            Alert.alert('Enter Valid First Name');
        } else if (data.lname === '') {
            Alert.alert('Enter Last Name');
        } else if (!nameRegex.test(data.lname)) {
            Alert.alert('Enter Valid Last Name');
        }
        //  else if (staffmobile.length === 0) {
        //     Alert.alert('Enter Mobile Number');
        // } 
        // else if (!mobileRegex.test(staffmobile)) {
        //     Alert.alert('Enter Valid Mobile Number');
        // } 
        else {
            const newStaff = {
                stafffirstName: data.fname,
                stafflastName: data.lname,
                staffimg: Img.SPLASH_IMG,
                staffmob: data.mob,
                staffdep: data.dept,
                staffdob: data.dob,
                staffgender: data.gen,
            };


            const updatedStaffData = [
                ...staffData,
                newStaff,
            ];
            setStaffData(updatedStaffData);
            saveStaffData(updatedStaffData);


            console.log('After Updation in Staff Add:', updatedStaffData);


            setmodalStaff(false);
            setstaffMobile('');
            setstaffFirstName('');
            setstaffLastName('');
            setStaffDOB('');
            setStaffGender('');
            setStaffDepartment('IT');

        }
    };


    const hideModal = () => {
        setmodalManager(!modalManager);
    }
    const hideModalStaff = () => {
        setmodalStaff(!modalStaff);
    }

    const FirstRoute = () => (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }} >

                {managerData.length > 0 ? (
                    <FlatList
                        data={managerData}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                }} onPress={() => navigation.navigate('ManagerDetails', { info: item })}>
                                <View style={styles.managerContainer} key={index}>
                                    <Image
                                        source={Img.SPLASH_IMG}
                                        style={{ height: 50, width: 50, borderRadius: 25 }}
                                    />
                                    <View>
                                        <Text
                                            style={{ color: 'black', fontSize: 16, marginLeft: 12, fontFamily: fonts.SEMIBOLD }}>
                                            Name:- {item.firstName}
                                        </Text>
                                        <Text
                                            style={{ color: 'black', fontSize: 16, marginLeft: 12, fontFamily: fonts.SEMIBOLD }}>
                                            Department:- {item.dep}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'black', fontFamily: fonts.SEMIBOLD }}>
                            No Data Found
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.fabContainer}
                    onPress={() => setmodalManager(true)}
                >
                    <Image
                        source={Img.ADD}
                        style={{ height: 40, width: 40, tintColor: 'white' }}
                    />
                </TouchableOpacity>

                <ManagerModal
                    modalVisible={modalManager}
                    hideModal={hideModal}
                    managerFirstName={managerFirstName}
                    setmanagerFirstName={setmanagerFirstName}
                    managerLastName={managerLastName}
                    setmanagerLastName={setmanagerLastName}
                    mobile={mobile}
                    setMobile={setMobile}
                    department={department}
                    setDepartment={setDepartment}
                    dob={dob}
                    setDOB={setDOB}
                    gender={gender}
                    setGender={setGender}
                    submitManagerFun={(data: any) => {
                        console.log('data', data);
                        submitManagerFun(data);
                        setmodalManager(false);
                    }}
                />

            </View>
        </SafeAreaView>
    );


    const SecondRoute = () => (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }} >

                {staffData.length > 0 ? (
                    <FlatList
                        data={staffData}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                }} onPress={() => navigation.navigate('StaffDetails', { info: item })}>
                                <View style={styles.managerContainer} key={index}>
                                    <Image
                                        source={Img.SPLASH_IMG}
                                        style={{ height: 50, width: 50, borderRadius: 25 }}
                                    />
                                    <View>
                                        <Text
                                            style={{ color: 'black', fontSize: 16, marginLeft: 12, fontFamily: fonts.SEMIBOLD }}>
                                            Staff Name:- {item.stafffirstName}
                                        </Text>
                                        <Text
                                            style={{ color: 'black', fontSize: 16, marginLeft: 12, fontFamily: fonts.SEMIBOLD }}>
                                            Staff Department:- {item.staffdep}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'black', fontFamily: fonts.SEMIBOLD }}>
                            No Data Found
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.fabContainer}
                    onPress={() => setmodalStaff(true)}
                >
                    <Image
                        source={Img.ADD}
                        style={{ height: 40, width: 40, tintColor: 'white' }}
                    />
                </TouchableOpacity>


                <StaffModal
                    modalVisibleStaff={modalStaff}
                    hideModalStaff={hideModalStaff}
                    staffFirstName={staffFirstName}
                    setstaffFirstName={setstaffFirstName}
                    staffLastName={staffLastName}
                    setstaffLastName={setstaffLastName}
                    staffmobile={staffmobile}
                    setstaffMobile={setstaffMobile}
                    staffdepartment={staffdepartment}
                    setstaffDepartment={setStaffDepartment}
                    staffdob={staffdob}
                    setstaffDOB={setStaffDOB}
                    staffgender={staffGender}
                    setstaffGender={setStaffGender}
                    submitstaffFun={(data: any) => {
                        console.log('data', data);
                        submitStaffFun(data);
                        setmodalStaff(false);
                    }}
                />


            </View>
        </SafeAreaView>
    );

    const renderScene = useMemo(() => SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    }), [FirstRoute, SecondRoute]);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Manager' },
        { key: 'second', title: 'Employee' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}

const styles = StyleSheet.create({
    fabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: '#007FFF',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalImage: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        fontFamily: fonts.SEMIBOLD
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dropdownLabel: {
        fontSize: 16,
        marginRight: 10,
        fontFamily: fonts.SEMIBOLD
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioLabel: {
        fontSize: 16,
        marginRight: 10,
        fontFamily: fonts.SEMIBOLD
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnSubmit: {
        backgroundColor: '#007FFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnCancel: {
        backgroundColor: '#B22222',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: fonts.SEMIBOLD
    },
    managerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
});
