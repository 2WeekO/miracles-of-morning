import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ResultMessageProps {
  success: boolean;
  message: string;
}

export default function ResultMessage({ success, message }: ResultMessageProps) {
  return (
    <View style={[styles.container, success ? styles.success : styles.fail]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  success: {
    backgroundColor: "#C8E6C9",
  },
  fail: {
    backgroundColor: "#FFCDD2",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
