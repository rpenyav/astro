import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Card } from "@rneui/themed";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";

type DashboardScreenNavigationProp = DrawerNavigationProp<any, "Dashboard">;

const Dashboard = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <View style={globalStyles.containerdash}>
      <GlobalHeader back={false} />

      <View style={styles.containercenter}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.navigate("Predicciones")}>
            <Card containerStyle={styles.cardstyle}>
              <Card.Title>Predicciones</Card.Title>
              <Card.Divider />
              <Icon name="globe" type="font-awesome" />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CartaAstral")}>
            <Card containerStyle={styles.cardstyle}>
              <Card.Title>Carta Astral</Card.Title>
              <Card.Divider />
              <Icon name="moon-o" type="font-awesome" />
            </Card>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Compatibilidad")}
          >
            <Card containerStyle={styles.cardstyle}>
              <Card.Title>Compatibilidad</Card.Title>
              <Card.Divider />
              <Icon name="users" type="font-awesome" />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Articulos")}>
            <Card containerStyle={styles.cardstyle}>
              <Card.Title>Artículos</Card.Title>
              <Card.Divider />
              <Icon name="newspaper-o" type="font-awesome" />
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containercenter: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  cardstyle: {
    width: 140,
    height: 120,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default Dashboard;
