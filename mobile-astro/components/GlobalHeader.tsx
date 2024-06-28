import React from "react";
import { Button, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import globalStyles from "../screens/styles/globalStyles";
import { useAuth } from "../contexts/authContext";

type DrawerButtonNavigationProp = DrawerNavigationProp<any, any>;

interface GlobalHeaderProps {
  back?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ back = true }) => {
  const { user } = useAuth();
  const navigation = useNavigation<DrawerButtonNavigationProp>();

  return (
    <View style={globalStyles.header}>
      {back ? (
        <Button
          onPress={() => navigation.goBack()}
          icon={{
            name: "arrow-left",
            type: "font-awesome",
            size: 25,
            color: "black",
          }}
          buttonStyle={{
            backgroundColor: "transparent",
          }}
          containerStyle={{
            marginHorizontal: 0,
            marginVertical: 0,
          }}
        />
      ) : null}
      <Text
        style={back ? globalStyles.welcomeText : globalStyles.welcomeTextdash}
      >
        Welcome, {user?.email}
      </Text>
      <Button
        onPress={() => navigation.openDrawer()}
        icon={{
          name: "bars",
          type: "font-awesome",
          size: 25,
          color: "black",
        }}
        buttonStyle={{
          backgroundColor: "transparent",
        }}
        containerStyle={{
          marginHorizontal: 0,
          marginVertical: 0,
        }}
      />
    </View>
  );
};

export default GlobalHeader;
