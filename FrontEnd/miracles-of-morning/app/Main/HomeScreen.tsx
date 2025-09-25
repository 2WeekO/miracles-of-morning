import AppButton from "@/components/AppButton";
import BalanceCard from "@/components/BalanceCard";
import { colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [todayChallenge, setTodayChallenge] = useState<any>(null);
  const [successRate, setSuccessRate] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        //  내가 참여 중인 챌린지 가져오기 (in_progress 우선)
        const res = await groupChallengeService.getAll("in_progress", token);
        if (res.data.length > 0) {
          const challenge = res.data[0]; // 첫 번째 챌린지를 오늘의 챌린지로 가정
          setTodayChallenge(challenge);

          //  내 참가 기록 가져오기
          const manage = challenge.participants.find(
            (p: any) => p.user.id === challenge.owner.id || p.user.id === challenge.userId
          );

          if (manage) {
            const successCount = manage.successCount;
            const failCount = manage.failCount;
            const totalCount = successCount + failCount;

            setTotalDays(successCount);
            setSuccessRate(totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0);

            setBalance(manage.remainingDeposit);
          }
        }
      } catch (err) {
        console.error("홈 데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{ flex: 1 , backgroundColor:colors.white}}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* 상단 날짜 */}
        <Text style={styles.date}>
          {new Date().toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={styles.subtitle}>Good Morning</Text>

        {/* 오늘의 미션 카드 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>오늘의 챌린지</Text>
          <Text style={styles.cardSubtitle}>
            {todayChallenge?.title || "참여 중인 챌린지가 없습니다."}
          </Text>
          {todayChallenge && (
            <AppButton
              label="인증하기"
              onPress={() => router.push("/Extra/QRScannerScreen")}
            />
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
          <Text style={styles.chartPlaceholder}>
            📈 주간 성과 차트를 준비 중입니다.
          </Text>
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
    color: "#ffffffff",
    marginBottom: 6,
  },
  cardSubtitle: { fontSize: 14, color: "#ececece0", marginBottom: 12 },
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
