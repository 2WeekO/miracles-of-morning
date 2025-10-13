import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { Platform } from "react-native";

// 기본 핸들러 (앱이 foreground일 때 알림 보이도록)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// iOS 권한 요청
export async function requestNotificationPermissions() {
  if (Platform.OS === "ios") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.warn("푸시 알림 권한이 거부되었습니다.");
    }
  }
}

// ✅ 매일 특정 시각 반복 알림 등록
export async function scheduleChallengeNotification(
  challengeId: string,
  wakeUpTime: Date
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "기상 챌린지 알림",
      body: "지금 바로 QR을 인증하세요!",
      data: { challengeId },
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DAILY,
      hour: wakeUpTime.getHours(),
      minute: wakeUpTime.getMinutes(),
    },
  });
}

// 알림 클릭 리스너 등록
export function addNotificationResponseListener(
  callback: (challengeId?: string) => void
) {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const challengeId = response.notification.request.content.data
      ?.challengeId as string | undefined;
    callback(challengeId);
  });
}
