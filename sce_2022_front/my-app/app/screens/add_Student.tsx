import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Alert,
  Dimensions,
  StatusBar,
  TextInput,
} from "react-native";

export type Props = {
  name: string;
};

const AddStudent: FC = () => {
  console.log("App started");
  const handler = () => {
    console.log("text click");
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/avatar.jpeg')}
        style={styles.image}></Image>
      <TextInput style={styles.textInput}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="name"
        keyboardType="default"></TextInput>
      <TextInput style={styles.textInput}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="ID"
        keyboardType="default"></TextInput>
      <TextInput style={styles.textInput}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="address"
        keyboardType="default"></TextInput>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}
        >
          <Text>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}
        >
          <Text>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    alignContent: "center"
  },
  image: {
    marginTop: StatusBar.currentHeight,
    width: '100%',
    height: Dimensions.get('window').width * 0.56,
    resizeMode: "contain",
    backgroundColor: 'white',
  },

  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 12,
    flex: 1,
  }
});

export default AddStudent;