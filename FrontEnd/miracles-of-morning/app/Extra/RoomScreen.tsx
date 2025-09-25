import BackButton from "@/components/Backbutton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { socket } from "../lib/socket";
import { roomService } from "../Service/roomService";

export default function RoomListScreen() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ JWT에서 로그인 유저 ID 추출
  const getUserId = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.id;
    } catch (err: any) {
      console.error("❌ 토큰 디코드 실패:", err);
      Alert.alert("오류", `토큰 디코드 실패: ${err.message}`);
      return null;
    }
  };

  // ✅ 초기 로딩 (REST API)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await roomService.getAll(token ?? undefined);
        setRooms(res.data || []);
      } catch (err: any) {
        Alert.alert("방 목록 불러오기 실패", err.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // ✅ 실시간 업데이트 (WebSocket)
  useEffect(() => {
    socket.on("room:created", (room) => setRooms((prev) => [room, ...prev]));
    socket.on("room:updated", (room) =>
      setRooms((prev) => prev.map((r) => (r.id === room.id ? room : r)))
    );

    return () => {
      socket.off("room:created");
      socket.off("room:updated");
    };
  }, []);

  // ✅ 방 참가 + 상세 화면 이동
  const handleJoin = async (roomId: string) => {
    try {
      const userId = await getUserId();
      if (!userId) {
        Alert.alert("로그인 필요", "참가하려면 먼저 로그인하세요.");
        return;
      }
      socket.emit("room:join", { roomId, userId });

      router.push({
        pathname: "/Extra/RoomDetailScreen",
        params: { id: roomId },
      });
    } catch (err: any) {
      Alert.alert("방 참가 실패", err.message ?? "알 수 없는 오류");
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4F46E5" />;
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>그룹 챌린지 방 목록</Text>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleJoin(item.id)}
          >
            <Text style={styles.roomName}>{item.title}</Text>
            
            <Text style={styles.subText}>목표 시간: {item.wakeUpTime}</Text>
            <Text style={styles.subText}>예치금: {item.depositAmount}원</Text>
            <Text style={styles.subText}>차감 금액: {item.penaltyAmount}원</Text>
            <Text style={styles.subText}>
              참가자 {item.members?.length ?? 0} / {item.maxParticipants}
            </Text>
            <Text style={styles.subText}>
              {item.isPrivate ? "비공개 방" : "공개 방"}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => router.push("/Extra/CreateRoomScreen")}
      >
        <Text style={styles.buttonText}>+ 새 방 만들기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffffffff" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#000000ff"
  },
  card: {
    backgroundColor: "#000000ff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  roomName: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
    color: "#91d3ffff"
  },
  subText: {
    fontSize: 14,
    color: "#d4d4d4ff",
    marginTop: 4
  },
  button: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButton: { backgroundColor: "#000000ff" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
