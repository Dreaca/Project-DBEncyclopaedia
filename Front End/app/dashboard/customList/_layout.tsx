import {Stack,Tabs} from "expo-router";
import {Ionicons} from '@expo/vector-icons';

export default function CustomListsLayout(){
    return(
        <Tabs>
            <Tabs.Screen name="customLists" options={{ title: 'Custom Lists',headerShown: false ,tabBarIcon:({color,size})=>(
                <Ionicons name="menu" size={size} color={color}/>
                ),}} />
            <Tabs.Screen name="createCustomList" options={{ title: 'Create CustomList',headerShown: false,tabBarIcon:({color,size})=>(
                <Ionicons name="star" size={size} color={color}/>
                ) }} />
        </Tabs>
    )
}