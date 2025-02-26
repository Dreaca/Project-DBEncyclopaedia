import {StyleSheet, View} from "react-native";
import {TextInput, Text, Button} from "react-native-paper";
import {useRouter} from "expo-router";
import {useState} from "react";

export default function index(){
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");

    function handleSubmit(){

        if(userName == "user"&&passWord == "1234"){
            router.push("/dashboard");
            setPassWord("")
            setUserName("")
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{textAlign:"center",fontSize:40, fontFamily:"styles new roman"}}>Login</Text>
            <TextInput mode="flat" style={styles.textInput} placeholder="User name" onChangeText={(e)=>setUserName(e)}></TextInput>
            <TextInput mode="flat" style={styles.textInput} placeholder="Password" secureTextEntry onChangeText={(e)=>setPassWord(e)}></TextInput>
            <Button style={{width:"50%",alignSelf:"center" ,marginTop:20}} onPress={handleSubmit} mode='outlined'>Login</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: "90%",
        alignItems: "center",
        marginBottom:10,
        marginTop:10,
        alignSelf:"center",
        backgroundColor:'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
