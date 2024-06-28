import { Card } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";

const Profile = () => {
  return (
    <View style={globalStyles.containerdash}>
      <GlobalHeader />

      <Card containerStyle={globalStyles.cardstylebig}>
        <Card.Title>Profile</Card.Title>
        <Card.Divider />
        <Text>Perfil del usuario</Text>
      </Card>
    </View>
  );
};

export default Profile;
