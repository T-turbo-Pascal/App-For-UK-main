import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const TEACHERS = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Mary Johnson' },
    { id: '3', name: 'David Brown' },
    { id: '4', name: 'Karen Davis' },
    { id: '5', name: 'Michael Wilson' },
    { id: '6', name: 'Samantha Lee' },
    { id: '7', name: 'Robert Garcia' },
    { id: '8', name: 'Julia Hernandez' },
    { id: '9', name: 'Thomas Moore' },
    { id: '10', name: 'Elizabeth Jones' },
];

const TeachersScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (text) => {
        setSearchTerm(text);
    };

    const filteredTeachers = TEACHERS.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                onChangeText={handleSearch}
                placeholder="Search for teachers"
                value={searchTerm}
            />
            <FlatList
                data={filteredTeachers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default TeachersScreen;
