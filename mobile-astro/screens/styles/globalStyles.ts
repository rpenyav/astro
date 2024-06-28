import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  cogButton: {
    backgroundColor: "transparent",
  },
  cogButtonContainer: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  containerdash: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
  containerinsides: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 6,
  },
  cardstylebig: {
    width: "auto",
    margin: 5,
    marginTop: 25,
  },
  welcomeTextdash: {
    flex: 1,
    textAlign: "left",
  },
  welcomeText: {
    flex: 1,
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default globalStyles;
