import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MiniButton from "./MiniButton";

interface RoomCardProps {
  id: string;
  name: string;
  members: number;
  maxMembers: number;
  status: string;
  createdAt: string;
  isPrivate?: boolean; //  비공개 여부
  onJoin: (roomId: string) => void;
  roomCode: string;
}

export default function RoomCard({
  id,
  name,
  members,
  maxMembers,
  status,
  createdAt,
  isPrivate,
  onJoin,
  roomCode
}: RoomCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>상태:</Text>
        <Text style={styles.value}>
          {status === "waiting" ? "대기중" : status}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>멤버:</Text>
        <Text style={styles.value}>
          {members} / {maxMembers}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>생성일:</Text>
        <Text style={styles.value}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>
      </View>

      {isPrivate && (
        <Text style={styles.privateTag}>🔒 비공개 방</Text>
      )}

      <MiniButton label="참가" onPress={() => onJoin(roomCode)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
    marginRight: 6,
  },
  value: {
    color: "#333",
  },
  privateTag: {
    marginTop: 6,
    color: "#c62828",
    fontWeight: "bold",
  },
});
