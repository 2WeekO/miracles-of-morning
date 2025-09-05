import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React from "react";

export default function StartScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Start' }} />
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ThemedText type="title">Miracles of Morning</ThemedText>
      </ThemedView>
    </>
  );
}