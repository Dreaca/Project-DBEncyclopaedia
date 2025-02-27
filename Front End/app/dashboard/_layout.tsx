import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import {navigate} from "expo-router/build/global-state/routing";
// import { logoutUser  } from "../../reducers/authSlice"; // Import your logout action

export default function DashboardLayout(){

    return (
        <Drawer initialRouteName="books">
            <Drawer.Screen name="books" options={{ title: 'Books' }} />
            <Drawer.Screen name="customList" options={{ title: 'Custom Lists'}} />
            <Drawer.Screen name="modsearch" options={{ title: 'Search Nexus'}} />
        </Drawer>
    );
}