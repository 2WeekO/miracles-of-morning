import BackButton from "@/components/Backbutton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  ScrollView
} from "react-native";
import { socket } from "../lib/socket";


export default function CreateRoomScreen() {
  const [title, setTitle] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState(new Date()); //  Date 객체 사용
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [depositAmount, setDepositAmount] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("5");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const getUserId = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.id;
    } catch {
      return null;
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("오류", "방 제목을 입력하세요.");
      return;
    }

    const userId = await getUserId();
    if (!userId) {
      Alert.alert("로그인 필요", "로그인 후 이용 가능합니다.");
      return;
    }

    const formattedTime = wakeUpTime.toTimeString().slice(0, 5); // "HH:mm"

    socket.emit("room:create", {
      title,
      maxParticipants: Number(maxParticipants),
      hostId: userId,
      wakeUpTime: formattedTime,
      depositAmount: Number(depositAmount),
      penaltyAmount: Number(penaltyAmount),
      isPrivate,
      password: isPrivate ? password : null,
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <BackButton></BackButton>
      <ScrollView style={styles.container}>

        <Text style={styles.label}>방 제목</Text>
        <TextInput
          style={styles.input}
          placeholder="방 제목"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>목표 기상 시간</Text>
        <Button
          title={wakeUpTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          onPress={() => setShowTimePicker(true)}
        />
        {showTimePicker && (
          <DateTimePicker
            value={wakeUpTime}
            mode="time"
            is24Hour
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowTimePicker(false);
              if (date) setWakeUpTime(date);
            }}
          />
        )}

        <Text style={styles.label}>예치금</Text>
        <TextInput
          style={styles.input}
          placeholder="예치금"
          keyboardType="numeric"
          value={depositAmount}
          onChangeText={setDepositAmount}
        />

        <Text style={styles.label}>차감 금액</Text>
        <TextInput
          style={styles.input}
          placeholder="차감 금액"
          keyboardType="numeric"
          value={penaltyAmount}
          onChangeText={setPenaltyAmount}
        />

        <Text style={styles.label}>최대 인원</Text>
        <TextInput
          style={styles.input}
          placeholder="최대 인원"
          keyboardType="numeric"
          value={maxParticipants}
          onChangeText={setMaxParticipants}
        />

        <View style={styles.row}>
          <Text style={styles.label}>비공개 방</Text>
          <Switch value={isPrivate} onValueChange={setIsPrivate} />
        </View>

        {isPrivate && (
          <>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </>
        )}

        <Button title="방 만들기" onPress={handleCreate} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
});
