import React from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace 'FontAwesome' with the appropriate icon library

const EventScreen = () => {
  const skeletonOpacity = new Animated.Value(1);

  const startSkeletonAnimation = () => {
    Animated.loop(
        Animated.sequence([
          Animated.timing(skeletonOpacity, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(skeletonOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
    ).start();
  };

  React.useEffect(() => {
    startSkeletonAnimation();
  }, []);

  return (
      <View style={styles.container}>
        <Animated.View style={[styles.skeletonCard, { opacity: skeletonOpacity }]}>
          <View style={styles.photoSkeleton} />
          <View style={styles.likeIconContainer}>
            <Icon
                name="heart"
                size={20}
                color="#C41E3A"
                style={styles.likeIcon}
            />
          </View>
          <View style={styles.textSkeleton} />
          <View style={styles.textSkeleton} />
          <View style={styles.textSkeleton} />
        </Animated.View>
        <Text style={styles.title}>No Events Found</Text>
        <Text style={styles.subtitle}>Oops! There are no events available at the moment.</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  skeletonCard: {
    width: '80%', // Adjust the width as needed
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 20,
    padding: 10,
  },
  photoSkeleton: {
    width: '100%',
    height: 150, // Adjust the height as needed
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  likeIconContainer: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  likeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textSkeleton: {
    width: '70%', // Adjust the width as needed
    height: 12, // Adjust the height as needed
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default EventScreen;
