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
    backgroundColor: "#ffffffff",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 25,
    marginBottom: spacing.sm,
    width: 350,
  },
  label: {
    color: colors.primary,
    textAlign: "center",
    fontWeight: "500",
    
  },
});
