import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const upcomingPayments = [
  { amount: 100, dueDate: "Nov 2", equbName: "dolor sit amet" },
  { amount: 200, dueDate: "Tomorrow 12:00 PM", equbName: "Lorem ipsum" },
  { amount: 300, dueDate: "Today 12:00 PM", equbName: "consectetur" },
];

const currentEqub = [
  {
    name: "Monthly Savings Group",
    amountPerCycle: 100,
    members: 12,
    currentCycle: 3,
    totalCycle: 10,
    cycleEndDate: "Nov 2",
    image: "https://picsum.photos/100",
  },
  {
    name: "Holiday Fund",
    amountPerCycle: 300,
    members: 8,
    totalCycle: 13,
    currentCycle: 5,
    cycleEndDate: "Dec 15",
    image: "https://picsum.photos/100/100",
  },
  {
    name: "Wedding Contribution",
    amountPerCycle: 200,
    members: 10,
    currentCycle: 2,
    totalCycle: 6,
    cycleEndDate: "Jan 2",
    image: "https://picsum.photos/140/100",
  },
];

export default function TabOneScreen() {
  const color = Colors["light"];
  const [showAmount, setShowAmount] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          backgroundColor: color.primary,
          position: "relative",
        }}
      >
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            backgroundColor: color.primary,
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
              <Text style={{ color: color.primaryText }}>
                Hello, <Text style={{ fontWeight: 600 }}>John</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowAmount(!showAmount)}>
              <Feather
                name={showAmount ? "eye-off" : "eye"}
                size={24}
                color={color.primaryText}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 160,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: color.primaryText,
                fontSize: 14,
                opacity: 80,
                fontWeight: "500",
              }}
            >
              Saved
            </Text>
            <Text
              style={{
                color: color.primaryText,
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              {showAmount ? (
                "420,690"
              ) : (
                <Text style={{ verticalAlign: "middle" }}>******</Text>
              )}{" "}
              <Text style={{ fontSize: 18 }}>ETB</Text>
            </Text>
            <View
              style={{
                marginTop: spacing.sm,
                alignSelf: "stretch",
                backgroundColor: "#FFFFFF20",
                borderRadius: spacing.xs,
                borderWidth: 1,
                marginHorizontal: spacing.sm,
                borderColor: "#FFFFFF30",
                padding: 6,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: color.primaryText,
                  }}
                >
                  12
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFFB0",
                    fontWeight: 600,
                  }}
                >
                  Completed
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: color.primaryText,
                  }}
                >
                  6
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFFB0",
                    fontWeight: 600,
                  }}
                >
                  Running
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: color.primaryText,
                  }}
                >
                  8
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFFB0",
                    fontWeight: 600,
                  }}
                >
                  Upcoming
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: color.background,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: spacing.sm,
          }}
        >
          <Text
            style={{
              color: color.text,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Upcoming Payments
          </Text>
          <View style={{ gap: 8 }}>
            {upcomingPayments.map((payment, index) => (
              <UpcomingPayment
                equbName={payment.equbName}
                key={index}
                amount={payment.amount}
                dueDate={payment.dueDate}
              />
            ))}
          </View>

          <Text
            style={{
              color: color.text,
              fontWeight: 600,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            Running Equb
          </Text>
          <View style={{ gap: 8 }}>
            {currentEqub.map((equb, index) => (
              <EqubCard key={index} {...equb} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const EqubCard = ({
  name,
  amountPerCycle,
  members,
  currentCycle,
  totalCycle,
  image,
  cycleEndDate,
}: {
  image: string;
  name: string;
  amountPerCycle: number;
  members: number;
  currentCycle: number;
  totalCycle: number;
  cycleEndDate: string;
}) => {
  const color = Colors.light;
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.border,
      }}
    >
      <View
        style={{
          gap: 6,
          flexDirection: "row",
        }}
      >
        <Image
          source={image}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View>
          <Text style={{ color: color.text, fontSize: 18, fontWeight: "bold" }}>
            {name}
          </Text>

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
                  color: color.text,

                  fontWeight: 600,
                }}
              >
                {currentCycle}
              </Text>
              /{totalCycle} cycles
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: 4,
            flexDirection: "row",
          }}
        >
          <Feather name="users" size={16} color={color.tint} />
          <Text
            style={{
              color: color.secondaryText,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {members}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 4 }}>
          <MaterialIcons name="attach-money" size={16} color={color.tint} />
          <Text
            style={{
              color: color.secondaryText,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {amountPerCycle} ETB
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Feather name="calendar" size={16} color={color.tint} />
          <Text
            style={{
              color: color.secondaryText,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {cycleEndDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

const UpcomingPayment = ({
  amount,
  dueDate,
  equbName,
}: {
  amount: number;
  equbName: string;
  dueDate: string;
}) => {
  const color = Colors["light"];
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Text style={{ fontSize: 14, color: color.secondaryText }}>
          {equbName}
        </Text>

        <Text style={{ color: color.secondaryText, fontSize: 12 }}>
          {dueDate}
        </Text>
      </View>
      <Text style={{ color: color.text, fontSize: 20, fontWeight: "bold" }}>
        {amount} ETB
      </Text>
    </View>
  );
};
