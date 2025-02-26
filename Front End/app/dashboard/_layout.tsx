
import {Drawer} from "expo-router/drawer";



export default function DashboardLayout(){

    return (
        <Drawer initialRouteName="books">
            <Drawer.Screen name="books" options={{title: 'Books'}}/>
        </Drawer>
    )
}