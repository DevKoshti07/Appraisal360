import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomRadioButtonsProps {
    value: string;
    onValueChange: (value: string) => void;
    options: string[];
}

const CustomRadioButtons: React.FC<CustomRadioButtonsProps> = ({
    value,
    onValueChange,
    options,
}) => {
    return (
        <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Gender:</Text>
            <View style={styles.radioButtonContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onValueChange(option)}
                        style={styles.radioButton}>
                        <View
                            style={[
                                styles.radioCircle,
                                { backgroundColor: value === option ? '#007AFF' : '#fff' },
                            ]}
                        >
                            {value === option && <View style={styles.selectedRb} />}
                        </View>
                        <Text style={styles.radioText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
    radioText: {
        marginLeft: 5,
    },
});

export default CustomRadioButtons;
