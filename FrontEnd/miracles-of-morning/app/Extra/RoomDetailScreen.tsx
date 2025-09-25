import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { roomService } from "../Service/roomService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { socket } from "../lib/socket"; // ✅ 소켓 연결

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUserId = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.id;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("로그인 필요", "로그인 후 이용 가능합니다.");
          setLoading(false);
          return;
        }
        const uid = await fetchUserId();
        setUserId(uid);

        const res = await roomService.getById(id as string, token);
        setRoom(res.data);
      } catch (err: any) {
        Alert.alert("방 상세 조회 실패", err.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4F46E5" />;
  }

  if (!room) {
    return (
      <View style={styles.center}>
        <BackButton />
        <Text style={styles.error}>방 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const isHost = room.host?.id === userId;

  // ✅ 버튼 핸들러
  const handleStart = () => {
    socket.emit("room:start", { roomId: room.id });
    Alert.alert("시작", "챌린지가 시작됩니다.");
  };

  const handleEnd = () => {
    socket.emit("room:end", { roomId: room.id });
    router.back()
    Alert.alert("종료", "챌린지가 종료됩니다.");
  };

  const handleReady = () => {
    socket.emit("room:ready", { roomId: room.id, userId });
    Alert.alert("준비 완료", "준비 상태로 전환되었습니다.");
  };

  const handleLeave = () => {
    socket.emit("room:leave", { roomId: room.id, userId });
    router.back()
    Alert.alert("퇴장", "방에서 나갔습니다.");
  };

  return (
    <View style={styles.container}>
      

      {/* 방 정보 카드 */}
      <View style={styles.card}>
        <Text style={styles.title}>{room.title}</Text>
        <Text style={styles.subText}>방 ID: {room.id}</Text>
        <Text style={styles.subText}>상태: {room.status}</Text>
        <Text style={styles.subText}>
          참가자 {room.members?.length ?? 0} / {room.maxParticipants}
        </Text>
        <Text style={styles.subText}>방장: {room.host?.nickname ?? "알 수 없음"}</Text>

        {/* 추가된 속성들 */}
        <Text style={styles.subText}>⏰ 목표 기상 시간: {room.wakeUpTime}</Text>
        <Text style={styles.subText}>💰 예치금: {room.depositAmount}원</Text>
        <Text style={styles.subText}>⚠️ 차감 금액: {room.penaltyAmount}원</Text>
        <Text style={styles.subText}>
          🔒 공개 여부: {room.isPrivate ? "비공개" : "공개"}
        </Text>
        {room.isPrivate && <Text style={styles.subText}>비밀번호: ******</Text>}
      </View>

      {/* 참가자 목록 */}
      <Text style={styles.sectionTitle}>👥 참가자</Text>
      <FlatList
        data={room.members || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberCard}>
            <Text style={styles.memberName}>{item.user?.nickname ?? "알 수 없음"}</Text>
            <Text style={styles.memberSub}>
              {new Date(item.joinedAt).toLocaleString()}
            </Text>
          </View>
        )}
      />

      {/* 버튼 */}
      {isHost ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={handleEnd}
          >
            <Text style={styles.buttonText}>종료하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleReady}
          >
            <Text style={styles.buttonText}>준비하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={handleLeave}
          >
            <Text style={styles.buttonText}>나가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#111827" },
  subText: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#374151",
  },
  memberCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  memberName: { fontSize: 16, fontWeight: "500", color: "#111827" },
  memberSub: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButton: { backgroundColor: "#4F46E5" },
  dangerButton: { backgroundColor: "#EF4444" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  error: { fontSize: 16, color: "red" },
});
