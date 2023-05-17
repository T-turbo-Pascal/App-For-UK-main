import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

const TodoScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Todo Screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
})
export default TodoScreen


