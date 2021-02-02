import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Button, Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import { Table, Row, Rows } from "react-native-table-component";

var db = SQLite.openDatabase("testDB.db");

const viewUsers = ({ navigation }) => {
  let [usersList, setList] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM test", null, (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          const x = Object.values(results.rows.item(i));
          const uid = x[0];
          const uname = x[1];
          x.push(
            <Button
              title="Edit"
              color="green"
              onPress={() => {
                navigation.navigate("update", { uid });
              }}
            />,
            <Button
              title="Delete"
              color="red"
              onPress={() => {
                navigation.navigate("deleteUser", { uid, uname });
              }}
            />
          );
          temp.push(x);
        }
        setList(temp);
      });
    });
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={["UID", "Username", "Contact", "Edit", "Delete"]}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={usersList} textStyle={styles.text} />
          </Table>
        </View>
        <Button
          title="Add new User"
          onPress={() => {
            navigation.navigate("addUser");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});

export default viewUsers;
