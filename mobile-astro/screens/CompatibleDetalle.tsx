// src/screens/CompatibleDetalle.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Text } from "@rneui/themed";
import { RouteProp, useRoute } from "@react-navigation/native";
import { fetchContentById } from "../services/compatibilityService";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";
import { Compatibility } from "../interfaces/compatibility";
import { ZodiacSignCode, zodiacSignLiterals } from "../constants/zodiacSigns";

type CompatibleDetalleRouteProp = RouteProp<
  { params: { id: string } },
  "params"
>;

const CompatibleDetalle = () => {
  const route = useRoute<CompatibleDetalleRouteProp>();
  const { id } = route.params;
  const [content, setContent] = useState<Compatibility | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchContentById(id);
        setContent(data);
      } catch (error) {
        setError("Failed to fetch content.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
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
        {content && (
          <Card containerStyle={styles.cardstylebig}>
            <Card.Title>
              {zodiacSignLiterals[content.sign1 as ZodiacSignCode]?.es} con{" "}
              {zodiacSignLiterals[content.sign2 as ZodiacSignCode]?.es}
            </Card.Title>
            <Card.Divider />
            <Text>Amor: {content.love}</Text>
            <Text>Amistad: {content.friendship}</Text>
            <Text>Negocios: {content.business}</Text>
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

export default CompatibleDetalle;
