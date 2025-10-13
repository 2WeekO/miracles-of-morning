import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../components/AppButton";
import layout_style from "./Style/layout_style";

export default function StartScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/start_screen_backgrounds.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={layout_style.first_screen_container}>
        <View style={{ alignItems: "center" }}>
          <Text style={layout_style.title}>Miracles of Morning</Text>
          <Text style={layout_style.subtitle}>
            기적을 만드는 아침을 경험해보세요
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <AppButton label="회원가입" onPress={() => router.push("/Auth/SignupScreen")} />
          <AppButton label="기존 계정으로 로그인" onPress={() => router.push("/Auth/SigninScreen")} />
          <Text style={layout_style.reserved_text}>ⓒ 2025, Miracles of morning.</Text>
          <Text style={layout_style.reserved_text}>All rights reserved</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
