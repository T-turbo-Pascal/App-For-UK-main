import React, { useState, useMemo } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const faculties = [
  {
    name: "Lekárska fakulta",
    latitude: 48.1508809697235,
    longitude: 17.12088759224802,
    address: "Špitálska 24, 813 72 Bratislava",
  },
  {
    name: "Právnická fakulta",
    latitude: 48.141351269023815,
    longitude: 17.115775893342278,
    address: "Šafárikovo námestie 6, 811 02 Bratislava",
  },
  {
    name: "Filozofická fakulta",
    latitude: 48.14303944237916,
    longitude: 17.114135436613928,
    address: "Štúrova 9, 811 02 Staré Mesto",
  },
  {
    name: "Prírodovedecká fakulta",
    latitude: 48.15023760338953,
    longitude: 17.07182442803302,
    address: "Ilkovičova 3278/6, 841 04 Karlova Ves",
  },
  {
    name: "Pedagogická fakulta",
    latitude: 48.165963122773846,
    longitude: 17.125490864919225,
    address: "Račianska 59, 813 34 Nové Mesto",
  },
  {
    name: "Farmaceutická fakulta",
    latitude: 48.16010441956466, 
    longitude: 17.13389726443718,
    address: "Odbojárov 65, 831 04 Nové Mesto",
  },
  {
    name: "Fakulta telesnej výchovy a športu",
    latitude: 48.14478918268629, 
    longitude: 17.078936706562935,
    address: "Nábrežie armádneho generála Ludvíka Svobodu 9, 811 02 Staré Mesto",
  },
  {
    name: "Jesseniova lekárska fakulta",
    latitude: 48.150830864221, 
    longitude: 17.120866131904442,
    address: "Špitálska 24, 813 72 Bratislava",
  },
  {
    name: "Fakulta matematiky, fyziky a informatiky",
    latitude: 48.15129158543998,
    longitude: 17.070108006262902,
    address: "Mlynská dolina, 842 48 Bratislava",
  },
  {
    name: "Rímskokatolícka cyrilometodská bohoslovecká fakulta",
    latitude: 48.14258623217666, 
    longitude: 17.10509379492417,
    address: "Kapitulská 26, 811 01 Staré Mesto",
  },
  {
    name: "Evanjelická bohoslovecká fakulta",
    latitude: 48.148472,
    longitude: 17.115461,
    address: "Bartókova 8, 811 02 Staré Mesto",
  },
  {
    name: "Fakulta managementu",
    latitude: 48.16019355896918,
    longitude: 17.134446853372616,
    address: "Odbojárov 10, 820 05 Bratislava",
  },
  {
    name: "Fakulta sociálnych a ekonomických vied",
    latitude: 48.15039988373933, 
    longitude: 17.17407366877982,
    address: "Mlynské luhy 4, 821 05 Bratislava",
  },
  

];

const CampusMapScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaculties = useMemo(() => {
    return faculties.filter((faculty) =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCardPress = (faculty) => {
    navigation.navigate("ItineraryMapScreen", { faculty });
  };

  const handleSearch = () => {
    // think about it 
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.1497,
          longitude: 17.1077,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filteredFaculties.map((faculty) => (
          <Marker
            key={faculty.name}
            coordinate={{
              latitude: faculty.latitude,
              longitude: faculty.longitude,
            }}
            pinColor="#C41E3A"
          >
            <Callout tooltip>
              <TouchableOpacity
                style={styles.callout}
                onPress={() => handleCardPress(faculty)}
              >
                <View style={styles.card}>
                  <Text style={styles.facultyName}>{faculty.name}</Text>
                  <Text style={styles.address}>{faculty.address}</Text>
                </View>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {/* <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <AntDesign name="search1" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a faculty"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    width: 200,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  facultyName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    marginBottom: 5,
  },
  searchButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  searchBar: {
    position: "absolute",
    top: 20,
    left: 20,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 10,
    zIndex: 1,
    elevation: 2,
  },
  searchInput: {
    height: 40,
  },
});

export default CampusMapScreen;
