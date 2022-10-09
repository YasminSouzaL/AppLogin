import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth } from '../firebase';

const HomeScreen = () => {
    const navigation = useNavigation()

    const handleSingOut = () => {
        auth
        .singOut()
        .then(() => {
            navigation.replace("Login")
        })
        .cath(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSingOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#49efb5',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})