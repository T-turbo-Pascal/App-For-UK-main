import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Icon from 'react-native-vector-icons/FontAwesome';

const LeaveFeedbackScreen = () => {
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const inputRef = useRef(null);

  const sendFeedback = () => {
    MailComposer.composeAsync({
      recipients: ['feedback.todouk@gmail.com'],
      subject: 'Feedback',
      body: text
    });
    setText('');
    setCharacterCount(0);
    Keyboard.dismiss();
  }

  const handleChangeText = (value) => {
    const count = value.length;
    setCharacterCount(count);
    if (count > 300) {
      return;
    }
    setText(value);
  }

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key == "Enter") {
      Keyboard.dismiss();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          placeholder="Leave your feedback here"
          value={text}
          onChangeText={handleChangeText}
          onKeyPress={handleKeyPress}
          style={styles.input}
          multiline={true}
          numberOfLines={6}
          maxLength={300}
        />
        <Text style={styles.characterCount}>{characterCount}/300 characters</Text>
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, !text && styles.disabledButtonContainer]}
        onPress={sendFeedback}
        disabled={!text}
      >
        <Icon name="envelope-o" size={16} color="#fff" style={styles.buttonIcon} />
        <Text style={[styles.buttonText, !text && styles.disabledButtonText]}>Send Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#C41E3A',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  disabledButtonContainer: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  disabledButtonText: {
    color: '#999',
  },
  characterCount: {
    fontSize: 12,
    color: '#ccc',
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default LeaveFeedbackScreen;