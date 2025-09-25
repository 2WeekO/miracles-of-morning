import { Tabs } from "expo-router";
import React from "react";

//  SVG 아이콘 불러오기 (컴포넌트처럼 사용 가능)
import ChallengeIcon from "@/assets/icons/challenge.svg";
import HomeIcon from "@/assets/icons/home.svg";
import UserIcon from "@/assets/icons/user.svg";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height:55,
        },
        tabBarActiveTintColor: "#000000ff",
        tabBarInactiveTintColor: "#bbbbbbff",
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size*1.3} height={size*1.3} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ChallengeScreen"
        options={{
          title: "챌린지",
          tabBarIcon: ({ color, size }) => (
            <ChallengeIcon width={size*1.3} height={size*1.3} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "프로필",
          tabBarIcon: ({ color, size }) => (
            <UserIcon width={size*1.3} height={size*1.3} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
