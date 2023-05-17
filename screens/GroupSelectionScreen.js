import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GroupSelectionScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);

  const groups = [
    { id: 1, name: '1 Ročník_M1_A1' },
    { id: 2, name: '1 Ročník_M1_A2' },
    { id: 3, name: '1 Ročník_M2_A3' },
    { id: 4, name: '1 Ročník_M2_A4' },
    { id: 5, name: '1 Ročník_M3_A5' },
    { id: 6, name: '1 Ročník_M3_A6' },
    { id: 7, name: '1 Ročník_M4_A7' },
    { id: 8, name: '1 Ročník_M4_A8' },
    { id: 9, name: '1 Ročník_M5_A9' },
    { id: 10, name: '1 Ročník_M15_A10' },
    { id: 11, name: '1 Ročník_M6_A11' },
    { id: 12, name: '1 Ročník_M6_A12' },
    { id: 13, name: '1 Ročník_M7_A13' },
    { id: 14, name: '1 Ročník_M7_A14' },
    { id: 15, name: '1 Ročník_M8_A15' },
    { id: 16, name: '1 Ročník_M8_A16' },
    { id: 17, name: '1 Ročník_M9_A17' },
    { id: 18, name: '1 Ročník_M9_A18' },
  ];

  useEffect(() => {
    filterGroups();
  }, [searchText]);

  const navigation = useNavigation();

  const handleGroupSelect = (group) => {
    setSelectedGroup(group.name);
    navigation.navigate('Settings', { selectedGroup: group.name });
  };

  const filterGroups = () => {
    const filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredGroups(filtered);
  };

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleGroupSelect(item)}
      style={[
        styles.groupItem,
        selectedGroup === item.name && styles.selectedGroupItem,
      ]}
    >
      <Text style={styles.groupName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter Group Number"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredGroups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  groupItem: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedGroupItem: {
    backgroundColor: '#ECECEC',
  },
  groupName: {
    fontSize: 16,
  },
});

export default GroupSelectionScreen;