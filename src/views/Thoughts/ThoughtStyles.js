// @flow
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center"
  },
  bottomAnimatedContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    width: "100%",
    zIndex: 10
  },
  bottomLoader: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    width: "35%",
    height: 40,
    paddingBottom: 10,
    alignItems: "center",
    shadowOffset: { width: 1, height: 0 },
    shadowRadius: 2,
    shadowColor: "black",
    shadowOpacity: 0.5
  }
});
