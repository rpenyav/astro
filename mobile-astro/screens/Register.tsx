import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { Input, Button, ListItem, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";
import authStyles from "./styles/authStyles";
import { register } from "../services/authService";
import { ZodiacSignCode, zodiacSignLiterals } from "../constants/zodiacSigns";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [zodiacSign, setZodiacSign] = useState<ZodiacSignCode | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async () => {
    if (birthDate && zodiacSign) {
      try {
        await register(
          name,
          email,
          password,
          birthDate.toISOString(),
          zodiacSign as string
        );
        navigation.navigate("Login");
        Toast.show({
          type: "success",
          text1: "Registro Exitoso",
          text2: "Te has registrado exitosamente. Por favor, inicia sesión.",
        });
      } catch (error) {
        console.error("Error registrando:", error);
        Toast.show({
          type: "error",
          text1: "Error de Registro",
          text2: "No se pudo registrar. Por favor, intenta nuevamente.",
        });
      }
    } else {
      console.error(
        "La fecha de nacimiento y el signo zodiacal son obligatorios."
      );
      Toast.show({
        type: "error",
        text1: "Información Faltante",
        text2: "Por favor, completa todos los campos.",
      });
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  const renderItem = ({ item }: { item: ZodiacSignCode }) => (
    <ListItem
      onPress={() => {
        setZodiacSign(item);
        setShowModal(false);
      }}
      bottomDivider
    >
      <ListItem.Content>
        <ListItem.Title>{zodiacSignLiterals[item].es}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={authStyles.container}>
      <Image
        source={require("../assets/logotipo-astro.png")}
        style={authStyles.logo}
      />
      <Input
        placeholder="Nombre"
        value={name}
        onChangeText={(text: string) => setName(text)}
        containerStyle={authStyles.input}
      />
      <Input
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        containerStyle={authStyles.input}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={authStyles.input}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Input
          placeholder="Fecha de Nacimiento"
          value={birthDate ? birthDate.toISOString().split("T")[0] : ""}
          editable={false}
          containerStyle={authStyles.input}
          rightIcon={<Icon name="calendar" type="font-awesome" />}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthDate || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        style={[authStyles.input, authStyles.picker]}
        onPress={() => setShowModal(true)}
      >
        <Text>
          {zodiacSign
            ? zodiacSignLiterals[zodiacSign].es
            : "Selecciona tu Signo Zodiacal"}
        </Text>
      </TouchableOpacity>
      <Modal visible={showModal} transparent>
        <View style={authStyles.modalContainer}>
          <View style={authStyles.modalContent}>
            <FlatList
              data={Object.values(ZodiacSignCode)}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
            <Button title="Cerrar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>

      <Button
        onPress={handleRegister}
        title="Registrar"
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(90, 154, 230, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />

      <Text
        style={authStyles.link}
        onPress={() => navigation.navigate("Login")}
      >
        ¿Ya tienes una cuenta? Inicia sesión aquí
      </Text>
    </View>
  );
};

export default Register;
