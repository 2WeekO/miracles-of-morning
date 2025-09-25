import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppButton from "./AppButton";

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>내 예치금</Text>
      <Text style={styles.balance}>{balance.toLocaleString()}원</Text>
      <AppButton label="충전하기" onPress={() => ({})}></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
  },
  label: {
    alignSelf: "center",
    fontSize: 14,
    color: "#333",
  },
  balance: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    margin: 20
  },
});
