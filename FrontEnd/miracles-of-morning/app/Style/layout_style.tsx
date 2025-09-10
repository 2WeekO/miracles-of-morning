import { StyleSheet} from "react-native";


export const layout_style = StyleSheet.create({
  first_screen_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: 540,
    maxHeight: 960,
    flex: 1,

  },
  title: {
    fontSize: 36,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 20,
    color: "#000000ff",
    marginBottom: 50,
    fontWeight: 500,
  },
  
  
});

export default layout_style;
