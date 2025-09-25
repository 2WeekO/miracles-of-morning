import React from "react";
import { View } from "react-native";
import Header from "@/components/Header";
import ResultMessage from "@/components/ResultMessage";
import AppButton from "@/components/AppButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/Backbutton";

export default function QRResultScreen() {
  const { status } = useLocalSearchParams<{ status?: string }>();
  const router = useRouter();

  const success = status === "success";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <BackButton/>
      <Header title="인증 결과" />
      <ResultMessage
        success={success}
        message={success ? "오늘 미션 성공! 🎉" : "인증 실패 😢 다시 시도해주세요"}
      />
      <AppButton
        label="홈으로 돌아가기"
        onPress={() => router.replace("/Main/HomeScreen")}
      />
    </View>
  );
}
