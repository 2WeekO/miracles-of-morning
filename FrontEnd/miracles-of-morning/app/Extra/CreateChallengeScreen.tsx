import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { challengeService } from "../Service/challengeService";
import BackButton from "@/components/Backbutton";
import AppButton from "@/components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scheduleChallengeNotification } from "../lib/notifications";

export default function CreateChallengeScreen() {
  const router = useRouter();

  // ✅ 모든 state는 항상 Date 타입 유지
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [wakeUpTime, setWakeUpTime] = useState<Date>(new Date());
  const [depositAmount, setDepositAmount] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");

  const handleCreate = async () => {
    if (Number(penaltyAmount) < 1000) {
      Alert.alert("오류", "차감 금액은 최소 1000원 이상이어야 합니다.");
      return;
    }

    // ✅ 서버 전송 시에만 string 변환
    const data = {
      title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      wakeUpTime: wakeUpTime.toTimeString().slice(0, 5),
      depositAmount: Number(depositAmount),
      penaltyAmount: Number(penaltyAmount),
    };

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("로그인 필요", "챌린지를 생성하려면 먼저 로그인해야 합니다.");
        return;
      }

      // 챌린지 생성 API 호출
      await challengeService.create(data, token);

      // 알림 예약
      await scheduleChallengeNotification("single-" + Date.now(), wakeUpTime);

      Alert.alert("성공", "챌린지가 생성되었습니다!");
      router.back();
    } catch (err: any) {
      if (err.response) {
        Alert.alert(
          "실패",
          `서버 오류: ${err.response.status}\n${JSON.stringify(
            err.response.data
          )}`
        );
      } else if (err.request) {
        Alert.alert("실패", "서버 응답이 없습니다. 네트워크를 확인하세요.");
      } else {
        Alert.alert("실패", `요청 오류: ${err.message}`);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />
        <Text style={styles.title}>챌린지 만들기</Text>

        <View style={styles.card}>
          <Text style={styles.label}>챌린지 제목</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 기상 챌린지"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>시작 날짜</Text>
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={(_, date) => date && setStartDate(date)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>종료 날짜</Text>
          <DateTimePicker
            value={endDate}
            mode="date"
            onChange={(_, date) => date && setEndDate(date)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>목표 기상 시간</Text>
          <DateTimePicker
            value={wakeUpTime}
            mode="time"
            onChange={(_, date) => date && setWakeUpTime(date)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>예치금</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={depositAmount}
            onChangeText={setDepositAmount}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>차감 금액 (최소 1000)</Text>
          <TextInput
            style={styles.input}
            placeholder="1000"
            keyboardType="numeric"
            value={penaltyAmount}
            onChangeText={setPenaltyAmount}
          />
        </View>

        <View style={styles.buttonContainer}>
          <AppButton label="챌린지 생성하기" onPress={handleCreate} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#111",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#111",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
