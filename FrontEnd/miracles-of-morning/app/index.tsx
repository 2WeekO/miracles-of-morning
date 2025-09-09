import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import GoogleButton from "../components/GoogleButton";

type RootStackParamList = {
  SignupPage: undefined;
  SigninPage: undefined;
  // 다른 페이지가 있다면 여기에 추가하세요
};

export default function Page() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>당신의 아침으로 기적을 만드세요</Text>
      <Image source = {require('../assets/images/logo.png')}/>
      <GoogleButton onPress={() => console.log("Google 로그인")} />
        
        <AppButton
          label="회원가입 하기"
          onPress={() => navigation.navigate("Auth/SignupPage")}
        />
        <AppButton
          label="이메일로 로그인하기"
          onPress={() => navigation.navigate("Auth/SigninPage")}
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
