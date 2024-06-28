import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useAuth } from "../contexts/authContext";

const InsideDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dazfoa93m/image/upload/v1718278205/sample.jpg",
          }}
          style={styles.backgroundImage}
        />
        <Image
          source={{
            uri: "https://res.cloudinary.com/dazfoa93m/image/upload/v1718888735/q52sf5xw0tir9wz8f7kh.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Dashboard"
          onPress={() => props.navigation.navigate("Dashboard")}
        />
        <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate("Profile")}
        />
        <DrawerItem
          label="Logout"
          onPress={() => {
            logout();
            props.navigation.navigate("Login");
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    paddingBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#fff",
  },
});

export default InsideDrawerContent;
