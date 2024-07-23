import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Img } from '../assets/images'
import { useSelector } from 'react-redux'

interface navi {
  navigation: any
}

export default function SplashScreen({ navigation }: navi) {

  const check = useSelector((state: any) => state.auth.isLogged)
  console.log("check is:-->>", check);


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      if (check == false) {
        setTimeout(() => {
          navigation.navigate('AuthNavigation')
        }, 2000)
      }
      else {
        setTimeout(() => {
          navigation.navigate('DrawerNavigator');
        }, 2000);
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