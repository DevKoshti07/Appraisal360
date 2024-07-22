// CustomTextInput.js

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Img } from '../assets/images';
import { fonts } from '../assets/fonts';

interface nav {
  value: any,
  placeholder: any,
  onChangeText: any,
  secureTextEntry?: any
}

const CustomTextInput = ({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
}: nav) => {
  const [text, setText] = useState(value);

  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleChangeText = (text: string) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="black"
        onChangeText={handleChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={isPasswordVisible}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={togglePasswordVisibility}>
          <Image
            source={
              isPasswordVisible
                ? Img.EYE_OFF
                : Img.EYE_ON
            }
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: fonts.SEMIBOLD,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'black',
  },
  toggleButton: {
    position: 'absolute',
    right: 28,
    top: 22,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    tintColor: '#0F69F1',
  },
});

export default CustomTextInput;
