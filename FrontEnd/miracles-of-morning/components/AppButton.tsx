import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
import { spacing } from "../constants/Spacing";

interface AppButtonProps {
  readonly label: string;
  readonly onPress?: () => void;
}

export default function AppButton({ label, onPress }: AppButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 25,
    marginBottom: spacing.sm,
    width: "auto",
    marginLeft: 20,
    marginRight:20
  },
  label: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "500",

  },
});
