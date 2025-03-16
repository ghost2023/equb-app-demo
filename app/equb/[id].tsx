import React, { useMemo, useState } from "react";
import { Text } from "@/components/ui/Text";
import { View, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import Progress from "@/components/ui/Progress";
import { Btn } from "@/components/ui/button";
import { format } from "date-fns";
import { spacing } from "@/constants/Spacing";
import { formatDays } from "@/lib/misc";
import { Feather } from "@expo/vector-icons";
import Sheet from "@/components/ui/Sheet";

const cycles = [
  {
    date: "2022-01-01",
  },
  {
    date: "2022-02-02",
  },
  {
    date: "2022-03-03",
  },
  {
    date: "2022-10-04",
  },
  {
    date: "2022-10-05",
  },
];

export default function EquibPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const snapPoints = useMemo(() => [560], []);
  const color = Colors.light;

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
        <ScrollView style={styles.content}>
          <View style={{ paddingVertical: 12, alignItems: "center" }}>
            <Text style={{ fontWeight: 600, fontSize: 14 }}>Winning</Text>
            <Text
              style={{
                color: Colors.light.primary,
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              {(20000).toLocaleString("en", {
                style: "currency",
                currency: "ETB",
              })}
            </Text>
          </View>
          <View
            style={[
              styles.card,
              { paddingVertical: 8, gap: 8, marginBottom: 16 },
            ]}
          >
            <View style={styles.detailsRow}>
              <View style={styles.detailsRowLabel}>
                <Feather name="download" size={16} />
                <Text style={styles.detailsRowLabelText}>Deposit amount</Text>
              </View>
              <Text style={styles.detailsRowValue}>ETB 2,000</Text>
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.detailsRowLabel}>
                <Feather name="clock" size={16} />
                <Text style={styles.detailsRowLabelText}>
                  Deposit frequency
                </Text>
              </View>
              <Text style={styles.detailsRowValue}>{formatDays(20)}</Text>
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.detailsRowLabel}>
                <Feather name="users" size={16} />
                <Text style={styles.detailsRowLabelText}>Members</Text>
              </View>
              <Text style={styles.detailsRowValue}>20</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text
              style={{
                color: color.secondaryText,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Progress
            </Text>

            <View
              style={{
                marginTop: 8,
                marginBottom: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontWeight: 500, color: color.secondaryText }}>
                <Text
                  style={{ fontWeight: 600, color: color.text, fontSize: 18 }}
                >
                  6
                </Text>{" "}
                / 12 Cycles
              </Text>

              <Text style={{ fontWeight: 500, color: color.secondaryText }}>
                4 Months left
              </Text>
            </View>
            <Progress value={0.6} containerStyle={{ marginBottom: 4 }} />
          </View>
          <Text style={styles.sectionTitle}>Current Cycle</Text>
          <View style={styles.card}>
            <Text
              style={{
                color: color.secondaryText,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Due Date
            </Text>

            <View
              style={{
                marginBottom: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{ fontWeight: 500, color: color.text, fontSize: 18 }}
              >
                In 3 Days
              </Text>
            </View>
            <Btn label="Deposit" />
          </View>
          <Text style={styles.sectionTitle}>Previous Cycles</Text>
          {cycles.map((cycle, index) => (
            <View key={index} style={[styles.card, { paddingVertical: 6 }]}>
              <View
                style={{
                  alignItems: "flex-start",
                  marginVertical: 6,
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    color: color.secondaryText,
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  Deposited on
                </Text>
                <Text
                  style={{ color: "black", fontWeight: "500", fontSize: 16 }}
                >
                  {format(new Date(cycle.date), "MMM dd")}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <Btn
          label="Join"
          style={{ margin: spacing.sm }}
          onPressIn={() => setSheetOpen(true)}
        />
        {sheetOpen && (
          <Sheet
            backgroundStyle={{ backgroundColor: "#fff" }}
            snapPoints={snapPoints}
            enableDynamicSizing
            onClose={() => setSheetOpen(false)}
          >
            <View style={{ padding: spacing.sm, paddingTop: 0 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Terms and Conditions
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginVertical: 12,
                  lineHeight: 20,
                  fontWeight: 500,
                  color: Colors.light.secondaryText,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget lacus in libero posuere ultrices. Sed eget lacus in libero
                posuere ultrices. Sed eget lacus in libero posuere ultrices. Sed
                eget lacus in libero posuere ultrices. Sed eget lacus in libero
                posuere ultrices. Sed eget lacus in libero posuere ultrices. Sed
                eget lacus in libero posuere ultrices. Sed eget lacus in libero
                posuere ultrices. Sed eget lacus in libero posuere ultrices. Sed
                eget lacus in libero posuere ultrices. Sed eget lacus in libero
                posuere ultrices. Sed eget lacus in libero posuere ultrices. Sed
                eget lacus in libero posuere ultrices. Sed eget lacus in libero
                posuere ultrices. Sed eget lacus{" "}
              </Text>
              <View>
                <Btn
                  label="Accept"
                  style={{ marginTop: 24 }}
                  onPressIn={() => setSheetOpen(false)}
                />
              </View>
            </View>
          </Sheet>
        )}
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
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsRowLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailsRowLabelText: {
    fontSize: 14,
    fontWeight: 500,
    color: Colors.light.secondaryText,
  },
  detailsRowValue: {
    fontSize: 16,
    color: "black",
    fontWeight: 600,
  },
  progressBar: { height: 8, borderRadius: 4 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 8,
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: { marginRight: 6 },
  rowText: { color: "#6b7280", fontSize: 14 },
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
