import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 14,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,

    marginBottom: 12,
    width: "80%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    marginTop: 16,
    textAlign: "center",
  },
  inputIOS: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "80%",
    color: "black",
    backgroundColor: "white",
    borderRadius: 4,
  },
  inputAndroid: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "80%",
    color: "black",
    backgroundColor: "white",
    borderRadius: 4,
  },
});

export default authStyles;
