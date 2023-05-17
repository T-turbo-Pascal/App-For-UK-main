import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AboutUsScreen = () => {
  const slogan = "Optimize your study";

  const teamMembers = [
    { name: "John Doe", position: "Project Manager" },
    { name: "Jane Smith", position: "Software Engineer" },
    { name: "Michael Johnson", position: "UI/UX Designer" },
    { name: "Sarah Thompson", position: "Marketing Specialist" },
    { name: "David Brown", position: "Data Analyst" },
    { name: "Emily Wilson", position: "Quality Assurance" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDoUK team</Text>
      <Text style={styles.slogan}>{slogan}</Text>

      <ScrollView horizontal={true} style={styles.carousel}>
        {teamMembers.map((member, index) => (
          <View style={styles.carouselItem} key={index}>
            <Image
              source={{ uri: `https://picsum.photos/id/${index + 10}/200/300` }}
              style={styles.carouselImage}
            />
            <Text style={styles.carouselText}>{member.name}</Text>
            <Text style={styles.carouselText}>{member.position}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.description}>
        Our team is passionate about creating a user-friendly platform that enhances your daily routines and brings convenience to your fingertips.
      </Text>

      <View style={styles.buttonContainer}>
        {/* <SocialButton
          name="logo-twitter"
          color="#1DA1F2"
          url="https://www.twitter.com/"
        /> */}
        {/* Add more social buttons as needed */}
      </View>
    </View>
  );
};

const SocialButton = ({ name, color, url }) => (
  <Text style={[styles.socialButton, { backgroundColor: color }]}>
    <Ionicons name={name} size={20} color="#FFFFFF" />
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  slogan: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    color: "#C41E3A",
  },
  carousel: {
    marginBottom: 10,
  },
  carouselItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  carouselImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  carouselText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 20,
    marginVertical: 20,
    color: '#555555',
    fontStyle: 'normal',
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
  },
});

export default AboutUsScreen;
