import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import { Card, Text } from "@rneui/themed";

import { RouteProp, useRoute } from "@react-navigation/native";
import { fetchContentById } from "../services/contentService";
import { Content } from "../interfaces/content";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";

type ArticuloDetalleRouteProp = RouteProp<{ params: { id: string } }, "params">;

const ArticuloDetalle = () => {
  const route = useRoute<ArticuloDetalleRouteProp>();
  const { id } = route.params;
  const [content, setContent] = useState<Content | null>(null);
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

      {content && (
        <Card containerStyle={styles.cardstylebig}>
          <Card.Title>{content.title}</Card.Title>
          <Card.Divider />{" "}
          <Image
            source={{
              uri: `${content.imatge}`,
            }}
            style={styles.imatge}
          />
          <Text>{content.body}</Text>
          {content.author && <Text>Author: {content.author}</Text>}
          {content.tags && <Text>Tags: {content.tags.join(", ")}</Text>}
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imatge: {
    width: "100%",
    height: 200,

    marginBottom: 4,
    marginTop: 4,
  },

  cardstylebig: {
    marginBottom: 16,
  },
});

export default ArticuloDetalle;
