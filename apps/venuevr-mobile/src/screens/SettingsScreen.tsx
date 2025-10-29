import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import { api } from "../hooks/useApi";

export function SettingsScreen() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: api.getProfile
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile?.email ?? "guest@sportsvr.local"}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Roles</Text>
          <Text style={styles.value}>{profile?.roles?.join(", ") ?? "fan_user"}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.value}>Event reminders</Text>
          <Switch value />
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Sponsor offers</Text>
          <Switch value={false} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070a0f"
  },
  content: {
    padding: 24,
    gap: 24
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#f3f4f6"
  },
  section: {
    gap: 16
  },
  sectionTitle: {
    fontSize: 16,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1.2
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    backgroundColor: "#0f172a",
    padding: 16,
    gap: 6
  },
  label: {
    color: "#9ca3af",
    fontSize: 12,
    letterSpacing: 1.1,
    textTransform: "uppercase"
  },
  value: {
    color: "#f9fafb",
    fontSize: 16
  },
  row: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    backgroundColor: "#0f172a",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
