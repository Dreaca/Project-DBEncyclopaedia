import { StyleSheet, View } from "react-native";
import { TextInput, Text, Button, Modal, Portal, PaperProvider } from "react-native-paper";
import { useRouter } from "expo-router";
import {useEffect, useState} from "react";
import {User} from "../models/User";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/store";
import 'react-native-get-random-values'
import {v4} from "uuid";
import {loginUser, registerUser} from "../reducers/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [registerVisible, setRegisterVisible] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isAuthenticated){
            router.push("/dashboard");
        }
    },[isAuthenticated,router]);

    async function  handleSubmit() {
        const userId:string|null = await AsyncStorage.getItem("userID");
        if (!userId){
            setRegisterVisible(true);
        }else{
            const user : User = {
                userId,
                username:userName,
                password:passWord,
            }
            dispatch(loginUser(user))
            setPassWord("");
            setUserName("");
        }


    }
    function handleRegistration(){
        const userId = `USER-${v4()}`
        if(passWord === confirmPw){
            const newUser:User = {
                userId: userId,
                username:userName,
                password:passWord,
            }
            dispatch(registerUser(newUser))

        }
        setRegisterVisible(false)
    }
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    mode="flat"
                    style={styles.textInput}
                    placeholder="User name"
                    value={userName}
                    onChangeText={(e) => setUserName(e)}
                />
                <TextInput
                    mode="flat"
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry
                    value={passWord}
                    onChangeText={(e) => setPassWord(e)}
                />
                <Button
                    style={styles.button}
                    onPress={handleSubmit}
                    mode="contained"
                >
                    Login
                </Button>
                <Button
                    style={styles.registerButton}
                    onPress={() => setRegisterVisible(true)}
                    mode="text"
                >
                    Register
                </Button>

                {/* Registration Modal */}
                <Portal>
                    <Modal visible={registerVisible} onDismiss={() => setRegisterVisible(false)} contentContainerStyle={styles.modal}>
                        <Text style={styles.modalTitle}>Register</Text>
                        <TextInput mode="flat" style={styles.textInput} placeholder="Enter username" onChangeText={(e)=>{setUserName(e)}}/>
                        <TextInput mode="flat" style={styles.textInput} placeholder="Enter password" onChangeText={(e)=>{setPassWord(e)}} secureTextEntry />
                        <TextInput mode="flat" style={styles.textInput} placeholder="Confirm password" secureTextEntry onChangeText={(e)=>{setConfirmPw(e)}} />
                        <Button style={styles.button} mode="contained" onPress={() => handleRegistration()}>
                            Register
                        </Button>
                    </Modal>
                </Portal>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 40,
        fontFamily: "Times New Roman",
    },
    textInput: {
        height: 50,
        width: "90%",
        alignSelf: "center",
        backgroundColor: 'white',
        marginBottom: 10,
    },
    button: {
        width: "50%",
        alignSelf: "center",
        marginTop: 20,
    },
    registerButton: {
        marginTop: 10,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    }
});
