import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";

import { api } from "../hooks/useApi";

export function HomeScreen() {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: api.getEvents
  });
  const { data: catalog } = useQuery({
    queryKey: ["catalog"],
    queryFn: api.getCatalog
  });
  const featured = events?.[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Featured Event</Text>
      {featured ? (
        <LinearGradient colors={["#1f2a46", "#0e1528"]} style={styles.hero}>
          <Text style={styles.league}>{featured.league}</Text>
          <Text style={styles.matchup}>
            {featured.home_team} vs {featured.away_team}
          </Text>
          <Text style={styles.meta}>{new Date(featured.start_time).toLocaleString()}</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryText}>Open in VR</Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.meta}>No events scheduled yet.</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.heading}>Offers</Text>
        {catalog?.map((item) => (
          <View key={item.product_id} style={styles.offerCard}>
            <Text style={styles.offerTitle}>{item.name}</Text>
            <Text style={styles.offerPrice}>{formatPrice(item.price_cents, item.currency)}</Text>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Purchase</Text>
            </TouchableOpacity>
          </View>
        ))}
        {!catalog?.length && <Text style={styles.meta}>Catalog loading...</Text>}
      </View>
    </ScrollView>
  );
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(cents / 100);
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
    fontSize: 20,
    fontWeight: "600",
    color: "#f3f4f6",
    marginBottom: 8
  },
  league: {
    fontSize: 12,
    color: "#93c5fd",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  hero: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.4)",
    gap: 12
  },
  matchup: {
    fontSize: 24,
    color: "#f9fafb",
    fontWeight: "700"
  },
  meta: {
    color: "#9ca3af"
  },
  placeholder: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    alignItems: "center"
  },
  primaryButton: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    alignItems: "center"
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600"
  },
  section: {
    gap: 16
  },
  offerCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    padding: 16,
    backgroundColor: "#0f172a",
    gap: 8
  },
  offerTitle: {
    color: "#f9fafb",
    fontSize: 18,
    fontWeight: "600"
  },
  offerPrice: {
    color: "#facc15",
    fontSize: 16,
    fontWeight: "500"
  },
  secondaryButton: {
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.6)",
    paddingVertical: 10,
    alignItems: "center"
  },
  secondaryText: {
    color: "#93c5fd",
    fontWeight: "600"
  }
});
