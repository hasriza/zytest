import "react-native-gesture-handler";

import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import addUser from "./views/addUser";
import viewUsers from "./views/viewUsers";
import update from "./views/update";
import deleteUser from "./views/deleteUser";

import { setStatusBarStyle } from "expo-status-bar";

import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();

var db = SQLite.openDatabase("testDB.db");
export default function App() {
  setStatusBarStyle("inverted");

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS test(user_id INTEGER PRIMARY KEY AUTOINCREMENT, uname VARCHAR(20), contact INT(10))"
      );
    });
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="viewUsers">
        <Stack.Screen
          name="viewUsers"
          component={viewUsers}
          options={{
            title: "All Users",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="addUser"
          component={addUser}
          options={{
            title: "Register User",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="update"
          component={update}
          options={{
            title: "Update User",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="deleteUser"
          component={deleteUser}
          options={{
            title: "Delete User Confirmation",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
