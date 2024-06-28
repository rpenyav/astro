import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Card, Text } from "@rneui/themed";
import GlobalHeader from "../components/GlobalHeader";
import globalStyles from "./styles/globalStyles";
import { useAuth } from "../contexts/authContext";
import { getHoroscopeBySignCode } from "../services/horoscopeService";
import { Prediction } from "../interfaces/prediction";

const Predicciones = () => {
  const { user } = useAuth();
  const [horoscope, setHoroscope] = useState<{
    daily: Prediction | null;
    weekly: Prediction | null;
    monthly: Prediction | null;
  }>({
    daily: null,
    weekly: null,
    monthly: null,
  });
  const [loadingHoroscope, setLoadingHoroscope] = useState(true);

  useEffect(() => {
    const fetchHoroscope = async () => {
      if (user?.zodiacSignCode) {
        try {
          const horoscopeData = await getHoroscopeBySignCode(
            user.zodiacSignCode
          );
          setHoroscope(horoscopeData);
        } catch (error) {
          console.error("Failed to fetch horoscope:", error);
        } finally {
          setLoadingHoroscope(false);
        }
      }
    };

    fetchHoroscope();
  }, [user?.zodiacSignCode]);

  if (loadingHoroscope) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={globalStyles.containerdash}>
      <GlobalHeader />
      <Card containerStyle={globalStyles.cardstylebig}>
        <Card.Title>Predicciones Diarias</Card.Title>
        <Card.Divider />
        <Text>
          {horoscope.daily
            ? horoscope.daily.prediction
            : "No hay predicción diaria disponible aún."}
        </Text>
      </Card>
      <Card containerStyle={globalStyles.cardstylebig}>
        <Card.Title>Predicciones Semanales</Card.Title>
        <Card.Divider />
        <Text>
          {horoscope.weekly
            ? horoscope.weekly.prediction
            : "No hay predicción semanal disponible aún."}
        </Text>
      </Card>
      <Card containerStyle={globalStyles.cardstylebig}>
        <Card.Title>Predicciones Mensuales</Card.Title>
        <Card.Divider />
        <Text>
          {horoscope.monthly
            ? horoscope.monthly.prediction
            : "No hay predicción mensual disponible aún."}
        </Text>
      </Card>
    </View>
  );
};

export default Predicciones;
