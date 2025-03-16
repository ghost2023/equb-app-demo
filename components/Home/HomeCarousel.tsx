import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { formatDays } from "@/lib/misc";

const fakeData = [
  {
    depositAmount: 46,
    depositFrequency: 25,
    drawFrequency: 97,
    id: 0,
    members: 40,
    winningAmount: 58,
    winningFrequency: 44,
  },
  {
    depositAmount: 86,
    depositFrequency: 97,
    drawFrequency: 17,
    id: 39,
    members: 35,
    winningAmount: 19,
    winningFrequency: 37,
  },
  {
    depositAmount: 99,
    depositFrequency: 52,
    drawFrequency: 8,
    id: 32,
    members: 81,
    winningAmount: 37,
    winningFrequency: 66,
  },
  {
    depositAmount: 38,
    depositFrequency: 59,
    drawFrequency: 17,
    id: 68,
    members: 43,
    winningAmount: 95,
    winningFrequency: 79,
  },
];

export default function HomeCarousel() {
  const color = Colors["light"];
  const width = useWindowDimensions().width;

  const equbQuery = useQuery({
    queryKey: ["equb"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return fakeData;
    },
  });

  return (
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
      {!equbQuery.isSuccess &&
        new Array(6).fill(0).map((_, index) => (
          <Skeleton
            key={index + "222"}
            style={{
              width: width * 0.8,
              height: "100%",
              minHeight: 120,
              backgroundColor: color.background,
              paddingInline: 12,
              elevation: 2,
              borderRadius: 12,
              position: "relative",
            }}
          />
        ))}
      {equbQuery.data?.map((equb) => (
        <>
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
            <View style={{ alignItems: "center", gap: 2, marginVertical: 12 }}>
              <Text
                style={{
                  color: color.primary,
                  fontWeight: 500,
                  fontSize: 24,
                }}
              >
                {equb.winningAmount.toLocaleString("en", {
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
                every {formatDays(equb.winningFrequency)}
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
                style={{
                  gap: 6,
                  flexDirection: "row",
                  alignItems: "center",
                }}
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
                  {equb.depositAmount.toLocaleString("en", {
                    currency: "ETB",
                    style: "currency",
                  })}
                </Text>
              </View>

              <View
                style={{
                  gap: 6,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Feather name="clock" size={12} color={color.secondaryText} />
                <Text
                  style={{
                    color: color.secondaryText,
                    fontWeight: 500,
                    fontSize: 12,
                  }}
                >
                  {formatDays(equb.depositFrequency)}
                </Text>
              </View>
            </View>
          </View>
        </>
      ))}
    </ScrollView>
  );
}
