import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../assets/fonts';

interface nav {
  title: string,
  onPress: any
}

const CustomButton = ({ title, onPress }: nav) => (
  <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  </View>
);

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    height: 60,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#0F69F1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.SEMIBOLD
  },
});
