import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import BackButton from "@/components/Backbutton";

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) {
    // 카메라 권한 상태를 불러오는 중
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한이 필요합니다</Text>
        <Button title="권한 허용" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    // 여기서 data를 서버에 인증 요청 → 결과 페이지로 이동
    if (data === "success") {
      router.replace("./QRResultScreen?status=success");
    } else {
      router.replace("./QRResultScreen?status=fail");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BackButton></BackButton>
      
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={handleBarCodeScanned}
        
      />
      <View style={{padding: 20, alignItems:"center", backgroundColor: "transparant"}}>
        <Text >챌린지 QR코드를 인식 시켜주세요.</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
