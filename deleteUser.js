import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Button,
  Text,
} from "react-native";
import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("testDB.db");
const deleteUser = ({ navigation, route }) => {
  let { uid, uname } = route.params;
  let userId = JSON.stringify(uid);
  let userName = JSON.stringify(uname);
  let delUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM test WHERE user_id = ? ",
        [userId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "User Deleted!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("viewUsers"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Deletion Failed");
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
              <Text>Are you sure you want to delete user {userName}?</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingTop: 30,
                }}
              >
                <Button title="Confirm" onPress={delUser} />
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

export default deleteUser;
