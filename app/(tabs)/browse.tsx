import CurrentEqubList from "@/components/Home/CurrentEqubList";
import EqubCard, { EqubCardSkeleton } from "@/components/HomeEquibCard";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Pressable, ScrollView, TextInput, View } from "react-native";

const currentEqub = [
  {
    id: 1,
    totalAmount: 100000,
    depositedAmount: 200,
    depositCycleDuration: 2,
    depositCycleUnit: "Days",
    withdrawCycleDuration: 2,
    withdrawCycleUnit: "Weeks",
    members: 10,
  },
  {
    id: 2,
    totalAmount: 100000,
    depositedAmount: 200,
    depositCycleDuration: 2,
    depositCycleUnit: "Days",
    withdrawCycleDuration: 2,
    withdrawCycleUnit: "Weeks",
    members: 10,
  },
  {
    id: 3,
    totalAmount: 100000,
    depositedAmount: 200,
    depositCycleDuration: 2,
    depositCycleUnit: "Days",
    withdrawCycleDuration: 2,
    withdrawCycleUnit: "Weeks",
    members: 10,
  },
];

export default function TabOneScreen() {
  const color = Colors["light"];

  const equbQuery = useQuery({
    queryKey: ["equb"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));

      return currentEqub;
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        position: "relative",
      }}
    >
      <View style={{ padding: spacing.sm }}>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: "#fff",
            padding: 4,
            flexDirection: "row",
            elevation: 2,
            shadowColor: "#000",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 4,
              fontSize: 14,
            }}
            placeholder="Search by depositor, amount, "
          />
          <Pressable
            style={{
              flexShrink: 0,
              backgroundColor: Colors.light.primary,
              borderRadius: 4,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Feather name="search" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          position: "relative",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.light.background,
            paddingHorizontal: spacing.sm,
          }}
        >
          <View style={{ gap: 12 }}>
            {!equbQuery.isSuccess &&
              new Array(6)
                .fill(0)
                .map((_, index) => <EqubCardSkeleton key={index} />)}
            {equbQuery.data?.map((equb, index) => (
              <EqubCard key={index} equb={equb} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
