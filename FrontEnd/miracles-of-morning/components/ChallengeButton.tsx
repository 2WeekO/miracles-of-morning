import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { spacing } from "../constants/Spacing";

interface ChallengeButtonProps {
  readonly label: string;
  readonly onPress?: () => void;
}

export default function Challengebutton({label , onPress}: ChallengeButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderRadius: 25,
    marginBottom: spacing.sm,
    width: 170,
    height: 100,
    padding: 20,

    
  },
  label: {
    color: "#76ff6aff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",

  },
});