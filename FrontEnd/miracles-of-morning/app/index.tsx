import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { requestNotificationPermissions, addNotificationResponseListener } from "./lib/notifications";
import StartScreen from "./StartScreen";



export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // 권한 요청
    requestNotificationPermissions();

    // 알림 클릭 → QRScannerScreen 이동
    const sub = addNotificationResponseListener((challengeId) => {
      if (challengeId) {
        router.push(`/Extra/QRScannerScreen?id=${challengeId}`);
      }
    });

    return () => sub.remove();
  }, []);

  return <StartScreen />;
}
