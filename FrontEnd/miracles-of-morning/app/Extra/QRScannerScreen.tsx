import React, { useState} from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "@/components/Backbutton";
import { challengeService } from "../Service/challengeService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ✅ 챌린지 ID 전달받기

  // 권한 확인 중일 때
  if (!permission) {
    return <View />;
  }

  // 권한 없을 때
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한이 필요합니다</Text>
        <Button title="권한 허용" onPress={requestPermission} />
      </View>
    );
  }

  // ✅ QR 스캔 처리
  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("로그인이 필요합니다.");

      // ✅ 서버에 인증 요청
      await challengeService.verify(id as string, true, token);

      Alert.alert("✅ 인증 성공", `QR 코드: ${data}`);
      router.replace("./QRResultScreen?status=success");
    } catch (err: any) {
      Alert.alert("❌ 인증 실패", err.message ?? "알 수 없는 오류");
      router.replace("./QRResultScreen?status=fail");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BackButton />

      <CameraView
        style={{ flex: 1 }}
        facing="back" // ✅ 후면 카메라 사용
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.bottom}>
        <Text style={styles.text}>챌린지 QR 코드를 인식시켜주세요.</Text>
        {scanned && (
          <Button title="다시 스캔하기" onPress={() => setScanned(false)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  bottom: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
});
