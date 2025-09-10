import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { colors } from "../constants/Colors";
import { spacing } from "../constants/Spacing";

interface GoogleButtonProps {
  onPress?: () => void;
}

export default function GoogleButton({ onPress }: GoogleButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("./../assets/images/google_logo.png")}
        style={styles.icon}
      />
      <Text style={styles.label}>Google 로그인</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: colors.google,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 25,
    marginBottom: spacing.sm,
    width: 250,
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: spacing.sm,
    
  },
  label: {
    color: colors.googleText,
    fontWeight: "600",
  },
});
