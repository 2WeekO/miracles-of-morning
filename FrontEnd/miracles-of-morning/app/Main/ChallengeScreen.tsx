import ChallengeCard from "@/components/ChallengeCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { challengeService } from "../Service/challengeService";
import { colors } from "@/constants/Colors";
import Challengebutton from "@/components/ChallengeButton";

export default function ChallengeScreen() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        const res = await challengeService.getAll(token);
        setChallenges(res.data);
      } catch (err) {
        console.error("챌린지 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* 헤더 */}
      <Text style={styles.title}>내 챌린지</Text>

      {/* 버튼 영역 */}
      <View style={styles.buttonRow}>
        <Challengebutton
          label="챌린지 만들기 (1인)"
          onPress={() => router.push("/Extra/CreateChallengeScreen")}
        />
        <Challengebutton
          label="그룹 챌린지 (참가 / 만들기)"
          onPress={() => router.push("/Extra/RoomScreen")}
        />
      </View>

      {/* 챌린지 카드 목록 */}
      <ScrollView
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
      >
        {challenges.length > 0 ? (
          challenges.map((c) => (
            <ChallengeCard
              key={c.id}
              title={c.title}
              startDate={c.startDate}
              endDate={c.endDate}
              wakeUpTime={c.wakeUpTime}
              depositAmount={c.depositAmount}
              penaltyAmount={c.penaltyAmount}
              status={c.status}
              qrCode={c.qrCode}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            아직 챌린지가 없습니다. {"\n"} 새로운 챌린지를 시작해보세요!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  challengeBtn: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyText: {
    color: "#999",
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
    lineHeight: 24,
  },
});
