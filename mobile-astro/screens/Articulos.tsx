// Articulos.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Card, Text } from "@rneui/themed";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";
import { fetchContents } from "../services/contentService";
import { Content } from "../interfaces/content";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";

const Articulos = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadContents = async () => {
      try {
        const data = await fetchContents(page, pageSize);
        setContents(data.list);
      } catch (error) {
        setError("Failed to fetch contents.");
      } finally {
        setLoading(false);
      }
    };

    loadContents();
  }, [page, pageSize]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={globalStyles.containerdash}>
      <GlobalHeader />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={contents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ArticuloDetalle", { id: item._id })
              }
            >
              <Card containerStyle={globalStyles.cardstylebig}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Divider />
                <Image
                  source={{
                    uri: `${item.imatge}`,
                  }}
                  style={styles.imatge}
                />

                <Text>{item.body}</Text>
                {item.author && <Text>Author: {item.author}</Text>}
                {item.tags && <Text>Tags: {item.tags.join(", ")}</Text>}
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
                disabled={contents.length < pageSize}
              />
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imatge: {
    width: "100%",
    height: 120,

    marginBottom: 4,
    marginTop: 4,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default Articulos;
