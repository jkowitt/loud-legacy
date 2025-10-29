import { useQuery } from "@tanstack/react-query";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { api } from "../hooks/useApi";

export function EventsScreen() {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["events"],
    queryFn: api.getEvents
  });

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.container}
      data={data ?? []}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} tintColor="#3b82f6" />}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.league}>{item.league}</Text>
          <Text style={styles.matchup}>
            {item.home_team} vs {item.away_team}
          </Text>
          <Text style={styles.meta}>{new Date(item.start_time).toLocaleString()}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text style={styles.meta}>No events yet. Refresh after scheduling.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#070a0f"
  },
  container: {
    padding: 24,
    gap: 16
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.2)",
    backgroundColor: "#0f172a",
    padding: 18,
    gap: 10
  },
  league: {
    fontSize: 12,
    color: "#93c5fd",
    letterSpacing: 1.4
  },
  matchup: {
    fontSize: 20,
    fontWeight: "600",
    color: "#f9fafb"
  },
  meta: {
    color: "#9ca3af"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8
  },
  secondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.3)"
  },
  secondaryText: {
    color: "#e5e7eb",
    fontWeight: "500"
  },
  primaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#3b82f6"
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600"
  },
  empty: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    padding: 24,
    alignItems: "center",
    marginTop: 24
  }
});
