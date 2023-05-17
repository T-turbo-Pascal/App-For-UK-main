import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const WeekPicker = ({ selectedDay, onSelectDay }) => {
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
    return (
      <SafeAreaView style={[styles.container, { position: 'absolute', top: 20 }]}>
        {schedule.map((item, index) => (
          <TouchableOpacity
            key={item.day}
            style={[
              styles.dayButton,
              selectedDay === item.day && styles.selectedDayButton,
            ]}
            onPress={() => onSelectDay(item.day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === item.day && styles.selectedDayButtonText,
              ]}
            >
              {daysOfWeek[index]}
            </Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    dayButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginHorizontal: 5,
      }, 
  })

export default WeekPicker;