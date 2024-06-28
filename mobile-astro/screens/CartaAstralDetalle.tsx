import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Text } from "@rneui/themed";
import { RouteProp, useRoute } from "@react-navigation/native";
import { fetchAstroChartById } from "../services/astroChartService";
import { AstroChart } from "../interfaces/astrochart";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";

type CartaAstralDetalleRouteProp = RouteProp<
  { params: { id: string } },
  "params"
>;

const CartaAstralDetalle = () => {
  const route = useRoute<CartaAstralDetalleRouteProp>();
  const { id } = route.params;
  const [astroChart, setAstroChart] = useState<AstroChart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAstroChart = async () => {
      try {
        const data = await fetchAstroChartById(id);
        setAstroChart(data);
      } catch (error) {
        setError("Failed to fetch astro chart.");
      } finally {
        setLoading(false);
      }
    };

    loadAstroChart();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={globalStyles.containerdash}>
      <GlobalHeader />
      <View style={styles.container}>
        {astroChart && (
          <Card containerStyle={styles.cardstylebig}>
            <Card.Title>Carta Astral</Card.Title>
            <Card.Divider />
            <Text>Date of Birth: {astroChart.dateOfBirth}</Text>
            <Text>Time of Birth: {astroChart.timeOfBirth}</Text>
            <Text>Place of Birth: {astroChart.placeOfBirth}</Text>
            <Text>Chart Data: {JSON.stringify(astroChart.chartData)}</Text>
          </Card>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardstylebig: {
    marginBottom: 16,
  },
});

export default CartaAstralDetalle;
