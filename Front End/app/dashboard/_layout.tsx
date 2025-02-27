import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import {navigate} from "expo-router/build/global-state/routing";
// import { logoutUser  } from "../../reducers/authSlice"; // Import your logout action

export default function DashboardLayout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        // dispatch(logoutUser ()); // Dispatch your logout action
        console.log("logout");
        Alert.alert("Logged out", "You have been logged out successfully.");
    };

    return (
        <Drawer initialRouteName="books">
            <Drawer.Screen name="books" options={{ title: 'Books' }} />
        </Drawer>
    );
}