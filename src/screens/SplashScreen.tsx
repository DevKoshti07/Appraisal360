import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Img } from '../assets/images'

interface navi {
  navigation: any
}

export default function SplashScreen({ navigation }: navi) {

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const res = await AsyncStorage.getItem('isLogged')
      console.log("response is", res);

      if (res == null) {
        setTimeout(() => {
          navigation.navigate('AuthNavigation')
        }, 2000)
      }
      else {
        navigation.navigate('DrawerNavigator');
      }

    } catch (error) {
      console.log("error in getData time:-->", error);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={Img.SPLASH_IMG} style={{ height: 100, width: 100 }} />
    </View>
  )
}

const styles = StyleSheet.create({

})