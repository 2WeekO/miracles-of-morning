import AppButton from "@/components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, ImageBackground, ScrollView, Text, TextInput, View } from "react-native";
import { signin } from "../Service/authService";
import auth_style from "../Style/auth_style";
import { useRouter } from "expo-router";
import BackButton from "@/components/Backbutton";


export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = async () => {
  try {
    const data = await signin({ email, password });

    if (!data.success || !data.token) {
      Alert.alert("로그인 실패", data.message || "아이디/비밀번호를 확인하세요");
      return;
    }

    await AsyncStorage.setItem("token", data.token);
    router.push("/Main/HomeScreen");
  } catch (error) {
      alert("서버가 불안정합니다. 서버를 확인해주세요.");
  }
};

  return (
    <ImageBackground
      source={require("../../assets/images/start_screen_backgrounds.png")}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
      }}
      resizeMode="cover"
    >
      <ScrollView>
        
        <View style={auth_style.container}>
          <BackButton></BackButton>
          <View>
            <Text style={auth_style.title}>로그인</Text>
          </View>
          <View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={auth_style.input}
              placeholder="이메일"
              placeholderTextColor="#ffffffff"
              keyboardType="default"
              maxLength={30}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={auth_style.input}
              placeholder="비밀번호"
              placeholderTextColor="#ffffffff"
              keyboardType="default"
              secureTextEntry={true}
              maxLength={20}
            />
          </View>
          <View>
            <AppButton label="로그인" onPress={handleSignin} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
