import React from "react";
import { Text } from "@/components/ui/Text";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // Icons
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import Progress from "@/components/ui/Progress";
import { Image } from "expo-image";

export default function EquibPage() {
  const color = Colors.light;

  const cycles = [
    {
      cycle: 1,
      status: "Completed",
      winner: "John Doe",
      amount: 2000,
      date: "2023-05-01",
    },
    {
      cycle: 2,
      status: "Current",
      winner: "Pending",
      amount: 2000,
      date: "2023-06-01",
    },
    {
      cycle: 3,
      status: "Upcoming",
      winner: "TBD",
      amount: 2000,
      date: "2023-07-01",
    },
  ];

  return (
    <>
      <Stack.Screen
        name="equb/[id]"
        options={{
          title: "Family Savings Equib",
          headerShadowVisible: false,
          headerBackground: () => (
            <View style={{ backgroundColor: "#f3f4f6" }} />
          ),
        }}
      />
      <View style={styles.container}>
        {/* Header */}

        {/* Main Content */}
        <ScrollView style={styles.content}>
          {/* Card 1 */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 8 }}>
              <Image
                source={"https://picsum.photos/100"}
                style={{ width: 56, height: 56, borderRadius: 8 }}
              />
              <Text style={styles.cardTitle}>Family Savings Equib</Text>
            </View>
            <Text style={styles.cardText}>
              A group savings plan for our extended family to help with big
              expenses and emergencies.
            </Text>
            <View style={[styles.row, { marginTop: 12 }]}>
              <Feather
                name="users"
                size={16}
                color="#6b7280"
                style={styles.icon}
              />
              <Text style={styles.rowText}>12 members</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Current Cycle</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Total Contributed</Text>
            <Text style={styles.amountText}>$1,2600</Text>
            <Progress value={0.6} containerStyle={{ marginBottom: 4 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.cardText}>60% of target</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  marginTop: 2,
                }}
              >
                <Text
                  style={{
                    color: color.secondaryText,
                    fontWeight: 500,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 600,
                      color: color.tint,
                    }}
                  >
                    {4}{" "}
                  </Text>
                  /{10} cycles
                </Text>
              </View>
            </View>
          </View>

          {/* Lottery Cycles */}
          <Text style={styles.sectionTitle}>Previous Cycles</Text>
          {cycles.toReversed().map((cycle, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={{ fontWeight: 500, color: color.secondaryText }}>
                  Winner
                </Text>
                <Text>{cycle.cycle}</Text>
              </View>

              <View
                style={[
                  styles.row,
                  {
                    alignItems: "flex-start",
                    marginVertical: 6,
                    gap: 10,
                  },
                ]}
              >
                <Image
                  source={"https://picsum.photos/200"}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                  }}
                />
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 16 }}
                >
                  {cycle.winner}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.row}>
                  <Feather
                    name="calendar"
                    size={16}
                    color="#6b7280"
                    style={styles.icon}
                  />
                  <Text style={styles.rowText}>{cycle.date}</Text>
                </View>
                <View style={[styles.row, styles.rightAligned]}>
                  <Feather
                    name="dollar-sign"
                    size={16}
                    color="#6b7280"
                    style={styles.icon}
                  />
                  <Text style={styles.rowText}>{cycle.amount}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button}>
          <Feather
            name="plus-circle"
            size={18}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  content: { paddingHorizontal: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  cardText: { color: "#6b7280", fontSize: 14 },
  amountText: { fontSize: 18, fontWeight: "bold", marginVertical: 8 },
  progressBar: { height: 8, borderRadius: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 12,
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: { marginRight: 6 },
  rowText: { color: "#6b7280", fontSize: 14 },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rightAligned: { justifyContent: "flex-end" },
  statusBadge: { padding: 4, borderRadius: 50 },
  completed: { backgroundColor: "#e8f5e9" },
  current: { backgroundColor: "#e3f2fd" },
  upcoming: { backgroundColor: "#f5f5f5" },
  button: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  buttonText: { color: "white", fontWeight: "bold", marginLeft: 4 },
  outlineButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2196f3",
  },
  buttonTextOutline: { color: "#2196f3", fontWeight: "bold", marginRight: 8 },
});
