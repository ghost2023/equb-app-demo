import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://picsum.photos/100" }}
              style={styles.profileImage}
            />
            <View
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: Colors.light.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="edit-2" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: Colors.light.secondaryText,
              }}
            >
              Account Balance
            </Text>
            <TouchableOpacity style={{}}>
              <Feather name="plus" color={Colors.light.primary} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.balanceText}>$2,500</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={{ fontWeight: 500 }}>Equib Participation</Text>
          <View style={{ marginTop: 8 }}>
            <View style={styles.participationRow}>
              <Text style={styles.participationLabel}>Active Equibs</Text>
              <Text style={styles.participationValue}>2</Text>
            </View>
            <View style={styles.participationRow}>
              <Text style={styles.participationLabel}>Total Contributed</Text>
              <Text style={styles.participationValue}>$3,600</Text>
            </View>
            <View style={styles.participationRow}>
              <Text style={styles.participationLabel}>Payouts Received</Text>
              <Text style={styles.participationValue}>$2,000</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.outlineButton}>
            <Feather name="user" size={20} color="#000" style={styles.icon} />
            <Text style={styles.buttonText}>Personal Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButton}>
            <Feather
              name="credit-card"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Payment Methods</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton}>
            <Feather
              name="settings"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.outlineButton, styles.logoutButton]}>
            <Feather
              name="log-out"
              size={20}
              color="#FF0000"
              style={styles.icon}
            />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { paddingHorizontal: 16, paddingTop: 24 },
  profileSection: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
  },
  profileImageContainer: { position: "relative" },
  profileImage: { width: 120, height: 120 },
  profileName: { fontSize: 20, fontWeight: 600 },
  profileEmail: { color: Colors.light.secondaryText },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 1,
  },
  cardTitle: {},
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceText: { fontSize: 24, fontWeight: 600 },
  buttonGroup: { marginBottom: 16 },
  outlineButton: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  icon: { marginRight: 8 },
  buttonText: { fontSize: 14 },
  logoutButton: { borderColor: "#EF4444" },
  logoutText: { color: "#EF4444" },
  participationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  participationLabel: { color: "#6B7280" },
  participationValue: { fontWeight: "500" },
});
