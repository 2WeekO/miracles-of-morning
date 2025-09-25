import AppButton from "@/components/AppButton";
import * as FileSystem from "expo-file-system/legacy"; //  레거시 API 사용
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

interface ChallengeCardProps {
  title: string;
  startDate: string;
  endDate: string;
  wakeUpTime: string;
  depositAmount: number;
  penaltyAmount: number;
  status: "pending" | "success" | "fail";
  qrCode?: string;
}

export default function ChallengeCard({
  title,
  startDate,
  endDate,
  wakeUpTime,
  depositAmount,
  penaltyAmount,
  status,
  qrCode,
}: ChallengeCardProps) {
  const statusText =
    status === "pending" ? "진행중" : status === "success" ? "완료" : "실패";

  const handleSaveQRCode = async () => {
    if (!qrCode) return;

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한이 필요합니다.", "앱 -> 사진 권한 전체 허용 -> Allow(확인)");
        return;
      }

      const safeTitle = title.replace(/[^a-zA-Z0-9가-힣]/g, "_");
      const fileUri = `${FileSystem.cacheDirectory}${safeTitle}-qr.png`;

      // Base64 → PNG 파일 저장
      const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: "base64",
      });

      // 기본 사진첩에 저장
      await MediaLibrary.createAssetAsync(fileUri);

      Alert.alert("저장 완료", `${title} QR 코드가 사진 앱에 저장되었습니다. 실물로 출력하여 챌린지를 준비해주세요.`);
    } catch (err) {
      console.error("QR 저장 실패:", err);
      Alert.alert("오류", "QR 코드 저장에 실패했습니다.");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.info}>
        기간: {new Date(startDate).toLocaleDateString()} ~{" "}
        {new Date(endDate).toLocaleDateString()}
      </Text>
      <Text style={styles.info}>목표 시간: {wakeUpTime}</Text>
      <Text style={styles.info}>예치금: {depositAmount.toLocaleString()}원</Text>
      <Text style={styles.info}>
        실패 시 차감: {penaltyAmount.toLocaleString()}원
      </Text>

      <Text style={styles.status}>상태: {statusText}</Text>

      {qrCode && (
        <>
          <Image
            source={{ uri: qrCode }}
            style={styles.qrCode}
            resizeMode="contain"
          />
          <AppButton label="QR 코드 저장하기" onPress={handleSaveQRCode} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    height: 400
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "rgba(255, 255, 255, 1)",
    marginBottom: 10,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  info: {
    fontSize: 14,
    color: "#ffffffff",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 10,
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 15,
    alignSelf: "center",
    margin: 20
  },
});
