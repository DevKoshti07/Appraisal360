import { Alert } from "react-native"

export const showAlert = (message: string) => {
    Alert.alert(message);
}