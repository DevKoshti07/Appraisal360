import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Img } from '../assets/images';
import { fonts } from '../assets/fonts';
import CustomRadioButtons from '../components/CustomRadioButtons';
import CustomDropdown from '../components/CustomDropdown';

interface ManagerModalProps {
    modalVisible: boolean;
    hideModal: () => void;
    managerFirstName: string;
    setmanagerFirstName: (value: string) => void;
    managerLastName: string;
    setmanagerLastName: (value: string) => void;
    mobile: string;
    setMobile: (value: string) => void;
    department: string;
    setDepartment: (value: string) => void;
    dob: string;
    setDOB: (value: string) => void;
    gender: string;
    setGender: (value: string) => void;
    submitManagerFun: any;
}

const ManagerModal: React.FC<ManagerModalProps> = ({
    modalVisible,
    hideModal,
    submitManagerFun,
}) => {
    const [fname, setfname] = useState('');
    const [lname, setLname] = useState('');
    const [mob, setMob] = useState('');
    const [dept, setDept] = useState('');
    const [dob, setDOB] = useState('');
    const [gen, setGen] = useState('');

    const [selectedDept, setSelectedDept] = useState('IT');
    const departmentOptions: string[] = ['IT', 'Sales', 'Management'];

    const [selectedGender, setSelectedGender] = useState('male');
    const genderOptions: string[] = ['Male', 'Female'];

    const handleGenderChange = (value: string) => {
        setSelectedGender(value);
    };

    const handleDeptChange = (value: string) => {
        setSelectedDept(value);
    };

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={hideModal}
            transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Manager Details</Text>

                    <Image
                        source={Img.SPLASH_IMG}
                        style={styles.modalImage}
                    />

                    <TextInput
                        placeholder="First Name"
                        value={fname}
                        onChangeText={setfname}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Last Name"
                        value={lname}
                        onChangeText={setLname}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Mobile Number"
                        value={mob}
                        onChangeText={setMob}
                        style={styles.input}
                        keyboardType="phone-pad"
                        maxLength={10}
                    />

                    <TextInput
                        placeholder="Date of Birth"
                        value={dob}
                        onChangeText={setDOB}
                        style={styles.input}
                        keyboardType="numeric"
                    />

                    <CustomRadioButtons
                        value={selectedGender}
                        onValueChange={handleGenderChange}
                        options={genderOptions}
                    />


                    <CustomDropdown
                        selectedValue={selectedDept}
                        onValueChange={handleDeptChange}
                        options={departmentOptions}
                    />

                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => submitManagerFun({ fname, lname, mob, selectedDept, dob, selectedGender })}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnCancel}
                            onPress={hideModal}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        marginVertical: 15,
        fontFamily: fonts.SEMIBOLD,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dropdownLabel: {
        fontSize: 16,
        marginRight: 10,
        fontFamily: fonts.SEMIBOLD,
    },
    picker: {
        height: 50,
        width: '64%',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#ccc',
        fontFamily: fonts.SEMIBOLD,
    },
    pickerItem: {
        fontFamily: fonts.SEMIBOLD,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioLabel: {
        fontSize: 16,
        marginRight: 10,
        fontFamily: fonts.SEMIBOLD,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioText: {
        fontFamily: fonts.SEMIBOLD,
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
        fontFamily: fonts.SEMIBOLD,
    },
});

export default ManagerModal;
