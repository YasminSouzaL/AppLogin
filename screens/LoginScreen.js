import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Text, StyleSheet, TextInput,View, TouchableOpacity, Image} from 'react-native';
import { auth,db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import logo from '../assets/logo.png';
import fundo from '../assets/fundo_tela.jpg';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isDriver, setIsDriver] = React.useState(false);

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate("Home")
            }
        });
        return unsubscribe;
    }, []);

    const handleSingUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            console.log("Logged in")
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                isDriver: isDriver,
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Image source={logo} style={styles.imagem}/>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={text =>setEmail(text)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Senha"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>    
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSingUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>    
                </TouchableOpacity>
                
                <Button onPress={() => setIsDriver(!isDriver)} style={styles.button}>
                        <ButtonText>Tipo de Usuário: {isDriver ? 'Motorista' : 'Passageiro'}</ButtonText>
                </Button>
            </View>

        </KeyboardAvoidingView>
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    imagem: {
        width: '100%',
        padding: 5,
        marginTop: 5
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: '#49efb5',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#49efb5',
        borderWidth: 2,
    },
    buttonOutlineText:{
        color: '#49efb5',
        fontWeight: '700',
        fontSize: 16,
    }
})