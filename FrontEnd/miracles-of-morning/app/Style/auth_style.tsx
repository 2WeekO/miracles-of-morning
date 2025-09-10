import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const auth_style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    maxWidth: 540,
    maxHeight: 960,
    flex: 1,
    
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
  },
  input:{
    color: colors.black,
    width: 300,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 16
  }
});

export default auth_style;