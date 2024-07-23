import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomDropdownProps {
    selectedValue: string;
    onValueChange: (value: string) => void;
    options: string[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    selectedValue,
    onValueChange,
    options,
}) => {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleSelectOption = (value: string) => {
        onValueChange(value);
        setShowOptions(false);
    };

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={toggleOptions} style={styles.dropdownToggle}>
                <Text>{selectedValue}</Text>
            </TouchableOpacity>
            {showOptions && (
                <View style={styles.dropdownOptions}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSelectOption(option)}
                            style={styles.option}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
        width: '100%',
        marginVertical: 10,
    },
    dropdownToggle: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        zIndex: 1, // Ensure the dropdown toggle is above the options
    },
    dropdownOptions: {
        position: 'absolute',
        top: '100%', // Position options below the toggle button
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        zIndex: 2,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default CustomDropdown;
