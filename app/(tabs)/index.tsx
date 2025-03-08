import CreateEqubSheet from "@/components/CreateEqubComponents";
import CurrentEqubList from "@/components/Home/CurrentEqubList";
import HomeCarousel from "@/components/Home/HomeCarousel";
import UpcomingPaymentList from "@/components/Home/UpcomingPaymentList";
import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function TabOneScreen() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const color = Colors["light"];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        position: "relative",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 240,
            backgroundColor: color.primary,
          }}
        />
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            padding: spacing.sm,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.xs,
              }}
            >
              <Image
                source={"https://picsum.photos/200"}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 20,
                }}
              />
              <Text style={{ color: color.primaryText, fontWeight: 600 }}>
                LOGO
              </Text>
            </View>
          </View>
        </View>
        <HomeCarousel />
        <View
          style={{
            backgroundColor: "#F3F4F6",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: spacing.sm,
          }}
        >
          <Text
            style={{
              color: color.text,
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            Upcoming Payments
          </Text>
          <UpcomingPaymentList />

          <Text
            style={{
              color: color.text,
              fontWeight: 500,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            Running Equb
          </Text>
          <CurrentEqubList />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          zIndex: 2,
          height: 60,
          width: 60,
          elevation: 3,
          shadowColor: "#000",
          borderRadius: 30,
          justifyContent: "center",
          backgroundColor: Colors["light"].primary,
        }}
        onPress={() => setIsFormOpen(true)}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="plus" size={18} color="white" />
          <Text style={{ color: "white", fontSize: 14, fontWeight: 700 }}>
            Equb
          </Text>
        </View>
      </TouchableOpacity>
      <CreateEqubSheet
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </View>
  );
}
