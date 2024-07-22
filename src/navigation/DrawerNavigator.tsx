import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props: any) => {
    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Logout',
                onPress: () => {
                    AsyncStorage.removeItem('userNameCommon');
                    AsyncStorage.removeItem('passwordCommon');
                    AsyncStorage.removeItem('data');
                    AsyncStorage.removeItem('datastaff');

                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'AuthNavigation' }],
                    });
                },
            },
        ]);
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={handleLogout}
                inactiveTintColor="#000000"
                inactiveBackgroundColor="#ffffff"
                labelStyle={{ fontSize: 16 }}
            />
        </DrawerContentScrollView>
    );
};

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({});
