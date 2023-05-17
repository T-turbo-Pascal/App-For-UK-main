import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const menuItems = [
  { key: 'Account Login', title: 'Account Login', icon: 'login' },
  { key: 'Campus Map', title: 'Campus Map', icon: 'map' },
  { key: 'Leave Feedback', title: 'Leave Feedback', icon: 'message-bulleted' },
  { key: 'Settings', title: 'Settings', icon: 'cog' },
  { key: 'About Us', title: 'About Us', icon: 'information' },
];

function MenuScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(item.key)}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={item.icon} size={24} color="#C41E3A" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.text}>{item.title}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#4A4A4A" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={menuItems} 
        renderItem={renderItem}
        keyExtractor={item => item.key}
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  list: {
    paddingHorizontal: 0,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#1D1D1D',
    fontWeight: 'bold',
  },
  listContentContainer: {
    paddingTop: 20,
  },
});

export default MenuScreen;
