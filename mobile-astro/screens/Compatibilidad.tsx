// src/screens/Compatibilidad.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card, Text } from "@rneui/themed";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";
import { useAuth } from "../contexts/authContext";
import { getCompatibilitiesBySign } from "../services/compatibilityService";
import { Compatibility } from "../interfaces/compatibility";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import { ZodiacSignCode, zodiacSignLiterals } from "../constants/zodiacSigns";

const Compatibilidad = () => {
  const { user } = useAuth();
  const [compatibilities, setCompatibilities] = useState<Compatibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCompatibilities = async () => {
      if (user?.zodiacSignCode) {
        try {
          const data = await getCompatibilitiesBySign(
            user.zodiacSignCode,
            page,
            pageSize
          );
          setCompatibilities(data.list);
        } catch (error) {
          setError("Failed to fetch compatibilities.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompatibilities();
  }, [user?.zodiacSignCode, page, pageSize]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={[globalStyles.containerdash, styles.container]}>
      <GlobalHeader />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={compatibilities}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CompatibleDetalle", { id: item._id })
              }
            >
              <Card containerStyle={globalStyles.cardstylebig}>
                <Card.Title>
                  {zodiacSignLiterals[item.sign1 as ZodiacSignCode]?.es} con{" "}
                  {zodiacSignLiterals[item.sign2 as ZodiacSignCode]?.es}
                </Card.Title>
                <Card.Divider />
                <Text>Amor: {item.love}</Text>
                <Text>Amistad: {item.friendship}</Text>
                <Text>Negocios: {item.business}</Text>
              </Card>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.paginationContainer}>
              <Button
                title="Previous"
                onPress={() => setPage(page - 1)}
                disabled={page === 1}
              />
              <Button
                title="Next"
                onPress={() => setPage(page + 1)}
                disabled={compatibilities.length < pageSize}
              />
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    height: Dimensions.get("window").height,
    paddingBottom: 80,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default Compatibilidad;
