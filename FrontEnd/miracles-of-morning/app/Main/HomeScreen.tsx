import AppButton from "@/components/AppButton";
import BalanceCard from "@/components/BalanceCard";
import { colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { challengeService } from "../Service/challengeService";
import { roomService } from "../Service/roomService";

export default function HomeScreen() {
  const [todayChallenge, setTodayChallenge] = useState<any>(null);
  const [myChallenges, setMyChallenges] = useState<any[]>([]);
  const [myRooms, setMyRooms] = useState<any[]>([]);
  const [successRate, setSuccessRate] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        // ✅ 1인 챌린지 불러오기
        const challengeRes = await challengeService.getAll(token);
        const challenges = challengeRes.data || [];
        setMyChallenges(challenges);

        if (challenges.length > 0) {
          // 오늘의 챌린지는 첫 번째 챌린지로 가정
          setTodayChallenge(challenges[0]);

          // 통계 (예시: 성공/실패 값이 있다고 가정)
          const successCount = challenges.filter((c: any) => c.status === "success").length;
          const failCount = challenges.filter((c: any) => c.status === "fail").length;
          const totalCount = successCount + failCount;

          setTotalDays(successCount);
          setSuccessRate(totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0);

          setBalance(
            challenges.reduce((sum: number, c: any) => sum + (c.depositAmount ?? 0), 0)
          );
        }

        // ✅ 그룹 챌린지 방 불러오기
        const roomRes = await roomService.getAll(token);
        setMyRooms(roomRes.data || []);
      } catch (err) {
        console.error("홈 데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 상단 날짜 */}
        <Text style={styles.date}>
          {new Date().toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={styles.subtitle}>Good Morning</Text>

        {/* 오늘의 챌린지 */}
        <View style={[styles.card, { backgroundColor: "#4E4376" }]}>
          <Text style={styles.cardTitle}>오늘의 챌린지</Text>
          {todayChallenge ? (
            <>
              <Text style={styles.cardSubtitle}>{todayChallenge.title}</Text>
              <AppButton
                label="인증하기"
                onPress={() => router.push(`/Extra/QRScannerScreen?id=${todayChallenge.id}`)}
              />
            </>
          ) : (
            <Text style={styles.cardSubtitle}>오늘은 챌린지가 없습니다.</Text>
          )}
        </View>

        {/* 1인 챌린지 목록 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>내 챌린지</Text>
          {myChallenges.length > 0 ? (
            myChallenges.map((challenge) => (
              <View key={challenge.id} style={styles.challengeItem}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeInfo}>
                  {challenge.startDate} ~ {challenge.endDate}
                </Text>
                <AppButton
                  label="인증하기"
                  onPress={() => router.push(`/Extra/QRScannerScreen?id=${challenge.id}`)}
                />
              </View>
            ))
          ) : (
            <Text style={styles.cardSubtitle}>참여 중인 챌린지가 없습니다.</Text>
          )}
        </View>

        {/* 그룹 챌린지 목록 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>그룹 챌린지</Text>
          {myRooms.length > 0 ? (
            myRooms.map((room) => (
              <View key={room.id} style={styles.challengeItem}>
                <Text style={styles.challengeTitle}>{room.title}</Text>
                <Text style={styles.challengeInfo}>
                  참가자 {room.members?.length ?? 0} / {room.maxParticipants}
                </Text>
                <AppButton
                  label="입장하기"
                  onPress={() =>
                    router.push({ pathname: "/Extra/RoomDetailScreen", params: { id: room.id } })
                  }
                />
              </View>
            ))
          ) : (
            <Text style={styles.cardSubtitle}>참여 중인 그룹 챌린지가 없습니다.</Text>
          )}
        </View>

        {/* 통계 카드 */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: "#4E4376" }]}>
            <Text style={styles.statTitle}>성공률</Text>
            <Text style={styles.statValue}>{successRate}%</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#372F6B" }]}>
            <Text style={styles.statTitle}>누적 성공 일수</Text>
            <Text style={styles.statValue}>{totalDays}일</Text>
          </View>
        </View>

        {/* 잔액 */}
        <BalanceCard balance={balance} />

        {/* 주간 그래프 자리 */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>주간 성과</Text>
          <Text style={styles.chartPlaceholder}>📈 주간 성과 차트를 준비 중입니다.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  date: { fontSize: 18, color: "#414141ff", marginBottom: 4 },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1582c2ff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(0, 170, 51, 1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  cardSubtitle: { fontSize: 14, color: "#ececece0", marginBottom: 12 },
  challengeItem: {
    backgroundColor: "#ffffff20",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  challengeTitle: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  challengeInfo: { fontSize: 12, color: "#ddd", marginBottom: 6 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  statCard: { flex: 1, marginHorizontal: 5, borderRadius: 16, padding: 20 },
  statTitle: { fontSize: 14, color: "#B0B0C3" },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 8,
  },
  chartCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  chartPlaceholder: { color: "#B0B0C3", marginTop: 20 },
});
