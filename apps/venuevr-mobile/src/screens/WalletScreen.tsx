import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { api } from "../hooks/useApi";

export function WalletScreen() {
  const { data: entitlements } = useQuery({
    queryKey: ["entitlements"],
    queryFn: api.getEntitlements
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Entitlements</Text>
      <View style={styles.list}>
        {entitlements?.map((entitlement) => (
          <View key={entitlement} style={styles.card}>
            <Text style={styles.title}>{entitlement}</Text>
            <Text style={styles.meta}>VR access active</Text>
          </View>
        ))}
        {!entitlements?.length && <Text style={styles.meta}>No passes yet. Purchase an event to unlock.</Text>}
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
    gap: 16
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#f3f4f6"
  },
  list: {
    gap: 12
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.3)",
    backgroundColor: "#0f172a",
    padding: 18,
    gap: 6
  },
  title: {
    color: "#bbf7d0",
    fontSize: 18,
    fontWeight: "600"
  },
  meta: {
    color: "#9ca3af"
  }
});
