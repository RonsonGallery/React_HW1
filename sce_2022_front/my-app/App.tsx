// import { StatusBar } from "expo-status-bar";

import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";

import AddStudent from "./app/screens/add_student"
import XmixDrix from "./app/screens/x_mix_drix"

export default function App() {
  console.log("App started");
  const handler = () => {
    console.log("text click");
  };
  return (
    <View style={styles.container}>
      <XmixDrix></XmixDrix>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    // backgroundColor: 'blue',
    alignContent: "center"
  },
});
