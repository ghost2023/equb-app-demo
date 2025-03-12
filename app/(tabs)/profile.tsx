import AuthSheet from "@/components/AuthSheet";
import { Text } from "@/components/ui/Text";
import { Btn } from "@/components/ui/button";
import Colors from "@/constants/Colors";
import { useSession } from "@/context/AuthProviders";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const links = [
  {
    name: "Personal Information",
    icon: <Feather name="user" size={16} color="#000" />,
    href: "personal-information",
  },
  {
    name: "Transaction History",
    icon: <Feather name="credit-card" size={16} color="#000" />,
    href: "transaction-history",
  },
  {
    name: "Settings",
    icon: <Feather name="settings" size={16} color="#000" />,
    href: "settings",
  },
  {
    name: "Change Phone Number",
    icon: <Feather name="phone" size={16} color="#000" />,
    href: "change-phone-number",
  },
  {
    name: "Change Pin Number",
    icon: <Feather name="lock" size={16} color="#000" />,
    href: "change-pin",
  },
];

export default function ProfilePage() {
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  if (session) {
    return <ProfileAuthPage />;
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>
          Login to see your profile
        </Text>
        <Btn label="Login" onPress={() => setIsOpen(true)} />
      </View>
      <AuthSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </View>
  );
}
function ProfileAuthPage() {
  const auth = useSession();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://picsum.photos/100" }}
              style={styles.profileImage}
            />
          </View>
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </View>
        <View style={[styles.buttonGroup, { paddingHorizontal: 12, gap: 8 }]}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Overview</Text>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: Colors.light.secondaryText,
              }}
            >
              Equib Joined
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 600 }}>20</Text>
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: Colors.light.secondaryText,
              }}
            >
              Amount Contributed
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 600 }}>
              {(23000).toLocaleString("en", {
                style: "currency",
                currency: "ETB",
              })}
            </Text>
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: Colors.light.secondaryText,
              }}
            >
              Total Payout
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 600 }}>
              {(96000).toLocaleString("en", {
                style: "currency",
                currency: "ETB",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          {links.map((link) => (
            <TouchableOpacity
              key={link.name}
              style={styles.outlineButton}
              onPress={() => console.log(link.href)}
            >
              {link.icon}
              <Text style={styles.buttonText}>{link.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={auth.logout}
          style={[styles.outlineButton, styles.logoutButton]}
        >
          <Feather
            name="log-out"
            size={20}
            color="#F31717"
            style={styles.icon}
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { paddingHorizontal: 16, paddingTop: 24, flex: 1 },
  profileSection: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  profileImageContainer: { position: "relative" },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  profileName: { fontSize: 20, fontWeight: 600 },
  profileEmail: { color: Colors.light.secondaryText, fontWeight: 500 },
  buttonGroup: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 2,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
  },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  icon: { marginRight: 8 },
  buttonText: { fontSize: 14, marginLeft: 8, fontWeight: 500 },
  logoutButton: {
    borderColor: "#fff",
    borderRadius: 8,
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingVertical: 8,
    marginTop: "auto",
    elevation: 2,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
    marginBottom: 16,
  },
  logoutText: { color: "#F31717" },
});
