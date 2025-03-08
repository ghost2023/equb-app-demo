import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const upcomingPayments = [
  { amount: 100, dueDate: "Nov 2", equbName: "dolor sit amet" },
  { amount: 200, dueDate: "Tomorrow 12:00 PM", equbName: "Lorem ipsum" },
  { amount: 300, dueDate: "Today 12:00 PM", equbName: "consectetur" },
];

const currentEqub = [
  {
    id: 1,
    totalAmount: 100000,
    depositedAmount: 200,
    depositCycleDuration: 2,
    depositCycleUnit: "Days",
    withdrawCycleDuration: 2,
    withdrawCycleUnit: "Weeks",
  },
  {
    id: 2,
    totalAmount: 100000,
    depositedAmount: 200,
    depositCycleDuration: 2,
    depositCycleUnit: "Days",
    withdrawCycleDuration: 2,
    withdrawCycleUnit: "Weeks",
  },
  {
    id: 3,
    totalAmount: 100000,
    depositedAmount: 200,
    depositCycleDuration: 2,
    depositCycleUnit: "Days",
    withdrawCycleDuration: 2,
    withdrawCycleUnit: "Weeks",
  },
];

export default function TabOneScreen() {
  const color = Colors["light"];
  const width = useWindowDimensions().width;

  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
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
        <ScrollView
          contentContainerStyle={{ paddingInline: spacing.sm, gap: spacing.sm }}
          style={{ marginBlock: spacing.sm }}
          horizontal
          snapToStart
          snapToAlignment="start"
          snapToInterval={width * 0.8}
          decelerationRate={0.1}
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
        >
          {currentEqub.map((equb) => (
            <View
              key={equb.id}
              style={{
                width: width * 0.8,
                backgroundColor: color.background,
                paddingInline: 12,
                elevation: 2,
                borderRadius: 12,
                position: "relative",
              }}
            >
              <View
                style={{ alignItems: "center", gap: 2, marginVertical: 12 }}
              >
                <Text
                  style={{
                    color: color.primary,
                    fontWeight: 500,
                    fontSize: 24,
                  }}
                >
                  {equb.totalAmount.toLocaleString("en", {
                    currency: "ETB",
                    style: "currency",
                  })}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  every {equb.withdrawCycleDuration} {equb.withdrawCycleUnit}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 2,
                  paddingVertical: 12,
                }}
              >
                <View
                  style={{ gap: 6, flexDirection: "row", alignItems: "center" }}
                >
                  <Feather
                    name="download"
                    size={12}
                    color={color.secondaryText}
                  />
                  <Text
                    style={{
                      color: color.secondaryText,
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    {equb.depositedAmount.toLocaleString("en", {
                      currency: "ETB",
                      style: "currency",
                    })}
                  </Text>
                </View>

                <View
                  style={{ gap: 6, flexDirection: "row", alignItems: "center" }}
                >
                  <Feather name="clock" size={12} color={color.secondaryText} />
                  <Text
                    style={{
                      color: color.secondaryText,
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    {equb.depositCycleDuration} {equb.depositCycleUnit}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
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
          <View style={{ gap: 12 }}>
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
              fontWeight: 500,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            Running Equb
          </Text>
          <View style={{ gap: 12 }}>
            {currentEqub.map((equb, index) => (
              <EqubCard key={index} equb={equb} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const EqubCard = (props: { equb: (typeof currentEqub)[0] }) => {
  const color = Colors.light;
  return (
    <TouchableOpacity
      onPress={() => router.push(`/equb/${1}`)}
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        elevation: 2,
      }}
    >
      <View
        style={{
          gap: 12,
          flexDirection: "row",
        }}
      >
        <View>
          <MaterialCommunityIcons
            name="trophy-outline"
            size={42}
            style={{ color: color.primary }}
          />
        </View>
        <View>
          <Text style={{ color: color.text, fontSize: 16, fontWeight: 600 }}>
            {props.equb.totalAmount.toLocaleString("en", {
              currency: "ETB",
              style: "currency",
            })}
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <Feather
              name="download"
              size={12}
              color={color.secondaryText}
              style={{ color: color.primary }}
            />
            <Text
              style={{
                color: color.primary,
                fontSize: 14,
                flexShrink: 0,
                fontWeight: 500,
              }}
            >
              {props.equb.depositedAmount}
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
          <Feather name="users" size={16} color={color.secondaryText} />
          <Text
            style={{
              color: color.secondaryText,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {200}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 4 }}>
          <MaterialIcons
            name="attach-money"
            size={16}
            color={color.secondaryText}
          />
          <Text
            style={{
              color: color.secondaryText,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {(200).toLocaleString("en", {
              style: "currency",
              currency: "ETB",
            })}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Feather name="calendar" size={16} color={color.secondaryText} />
          <Text
            style={{
              color: color.secondaryText,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Nov 2
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
        padding: 12,
        borderRadius: 8,
        elevation: 2,
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
      <Text style={{ color: color.text, fontSize: 16, fontWeight: "bold" }}>
        {amount} ETB
      </Text>
    </View>
  );
};
