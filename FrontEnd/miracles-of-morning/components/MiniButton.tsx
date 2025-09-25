import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
import { spacing } from "../constants/Spacing";

interface MiniButtonProps {
  readonly label: string;
  readonly onPress?: () => void;
}

export default function MiniButton({ label, onPress }: MiniButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(13, 81, 158, 0.68)",
    margin: "auto",
    width:100,
    borderRadius: 25,
    padding: 10,

  },
  label: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "500",

  },
});
