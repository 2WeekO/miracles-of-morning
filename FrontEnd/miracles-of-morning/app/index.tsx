import { StyleSheet, Text, View, Image } from "react-native";
import GoogleButton from "../components/GoogleButton";
import AppButton from "../components/AppButton";
import { useNavigation } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>당신의 아침으로 기적을 만드세요</Text>
      <Image source = {require('../assets/images/logo.png')}/>
      <GoogleButton onPress={() => console.log("Google 로그인")} />

      <AppButton
        label="회원가입 하기"
        onPress={() => navigation.navigate("Signup")}
      />
      <AppButton
        label="이메일로 로그인하기"
        onPress={() => navigation.navigate("Signin")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D2028",
    flex: 1,
    
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffffff",
    marginBottom: 50,
    fontWeight: 500,
  },
  AppButton: {
    marginTop: 20,
  },
});
