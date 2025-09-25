import {
  ScrollView,
  View,
  Text,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import auth_style from "../Style/auth_style";
import AppButton from "@/components/AppButton";
import React, { useState } from "react";
import { signup } from "../Service/authService";
import { useRouter } from "expo-router";
import BackButton from "@/components/Backbutton";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  

  const handleSignup = async () => {
    try {
      await signup({ email, password, nickname, phoneNumber });
      Alert.alert("회원가입 성공", "로그인 화면으로 이동합니다.");
      router.push("/Auth/SigninScreen")

    } catch (err: any) {
      Alert.alert(
        "회원가입 실패",
        err.response?.data?.message || "서버 오류 발생"
      );
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
            <Text style={auth_style.title}>회원가입</Text>
          </View>
          
          <View>
            <TextInput
              style={auth_style.input}
              placeholder="이메일"
              placeholderTextColor="#ffffffff"
              keyboardType="default"
              maxLength={30}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={auth_style.input}
              placeholder="새로운 비밀번호"
              placeholderTextColor="#ffffffff"
              secureTextEntry={true}
              maxLength={20}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={auth_style.input}
              placeholder="닉네임"
              placeholderTextColor="#ffffffff"
              maxLength={10}
              value={nickname}
              onChangeText={setNickname}
            />
            <TextInput
              style={auth_style.input}
              placeholder="전화번호"
              placeholderTextColor="#ffffffff"
              keyboardType="number-pad"
              maxLength={11}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View>
            <AppButton label="가입하기" onPress={handleSignup} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
