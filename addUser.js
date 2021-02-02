import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("testDB.db");

const addUser = ({ navigation }) => {
  let [uname, setUname] = useState("");
  let [contact, setContact] = useState("");

  let regUser = () => {
    if (!uname) {
      alert("Please fill Name!");
      return;
    }
    if (!contact) {
      alert("Please fill Contact!");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO test (uname, contact) VALUES (?,?)",
        [uname, contact],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "You are Registered Successfully",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("viewUsers"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Registration Failed");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <TextInput
                placeholder="Enter Name"
                onChangeText={(uname) => setUname(uname)}
                style={{ padding: 10 }}
              />
              <TextInput
                placeholder="Enter Contact"
                onChangeText={(contact) => setContact(contact)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingTop: 30,
                }}
              >
                <Button title="Submit" onPress={regUser} />
                <Button
                  title="Cancel"
                  onPress={() => {
                    navigation.navigate("viewUsers");
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default addUser;
