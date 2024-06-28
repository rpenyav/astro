import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Card, Text } from "@rneui/themed";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";
import { useAuth } from "../contexts/authContext";
import { fetchAstroCharts } from "../services/astroChartService";
import { AstroChart } from "../interfaces/astrochart";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";

const CartaAstral = () => {
  const { user } = useAuth();
  const [astroCharts, setAstroCharts] = useState<AstroChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadAstroCharts = async () => {
      if (user?._id) {
        try {
          const astroData = await fetchAstroCharts(user._id, page, pageSize);
          setAstroCharts(astroData.list);
        } catch (error) {
          console.error("Failed to fetch astro charts:", error);
          setError("Failed to fetch astro charts.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadAstroCharts();
  }, [user?._id, page, pageSize]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={globalStyles.containerdash}>
      <GlobalHeader />
      <FlatList
        data={astroCharts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CartaAstralDetalle", { id: item._id })
            }
          >
            <Card containerStyle={globalStyles.cardstylebig}>
              <Card.Title>Carta Astral</Card.Title>
              <Card.Divider />
              <Text>Date of Birth: {item.dateOfBirth}</Text>
              <Text>Time of Birth: {item.timeOfBirth}</Text>
              <Text>Place of Birth: {item.placeOfBirth}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
      <View style={globalStyles.paginationContainer}>
        <Button
          title="Previous"
          onPress={() => setPage(page - 1)}
          disabled={page === 1}
        />
        <Button
          title="Next"
          onPress={() => setPage(page + 1)}
          disabled={astroCharts.length < pageSize}
        />
      </View>
    </View>
  );
};

export default CartaAstral;
