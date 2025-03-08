import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { Skeleton } from "../ui/skeleton";

// import * as React from "react";
// import { View, useWindowDimensions } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import { Text } from "../ui/Text";
// import Colors from "@/constants/Colors";
// import { Feather } from "@expo/vector-icons";

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

export default function HomeCarousel() {
  const color = Colors["light"];
  const width = useWindowDimensions().width;

  const equbQuery = useQuery({
    queryKey: ["equb"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return currentEqub;
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
            key={index}
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
                  {equb.depositedAmount.toLocaleString("en", {
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
                  {equb.depositCycleDuration} {equb.depositCycleUnit}
                </Text>
              </View>
            </View>
          </View>
        </>
      ))}
    </ScrollView>
  );
}

// export default function HomeCarousel() {
//   const width = useWindowDimensions().width;
//   const color = Colors.light;
//
//   return (
//     <View>
//       <Carousel
//         width={width}
//         snapEnabled={true}
//         loop={false}
//         pagingEnabled={true}
//         data={currentEqub}
//         height={140}
//         renderItem={({ item }) => (
//           <View
//             key={item.id}
//             style={{
//               backgroundColor: color.background,
//               paddingInline: 12,
//               marginInline: 12,
//
//               elevation: 2,
//               borderRadius: 12,
//               position: "relative",
//             }}
//           >
//             <View style={{ alignItems: "center", gap: 2, marginVertical: 12 }}>
//               <Text
//                 style={{
//                   color: color.primary,
//                   fontWeight: 500,
//                   fontSize: 24,
//                 }}
//               >
//                 {item.totalAmount.toLocaleString("en", {
//                   currency: "ETB",
//                   style: "currency",
//                 })}
//               </Text>
//
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: 500,
//                 }}
//               >
//                 every {item.withdrawCycleDuration} {item.withdrawCycleUnit}
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 marginTop: 2,
//                 paddingVertical: 12,
//               }}
//             >
//               <View
//                 style={{ gap: 6, flexDirection: "row", alignItems: "center" }}
//               >
//                 <Feather
//                   name="download"
//                   size={12}
//                   color={color.secondaryText}
//                 />
//                 <Text
//                   style={{
//                     color: color.secondaryText,
//                     fontWeight: 500,
//                     fontSize: 12,
//                   }}
//                 >
//                   {item.depositedAmount.toLocaleString("en", {
//                     currency: "ETB",
//                     style: "currency",
//                   })}
//                 </Text>
//               </View>
//
//               <View
//                 style={{ gap: 6, flexDirection: "row", alignItems: "center" }}
//               >
//                 <Feather name="clock" size={12} color={color.secondaryText} />
//                 <Text
//                   style={{
//                     color: color.secondaryText,
//                     fontWeight: 500,
//                     fontSize: 12,
//                   }}
//                 >
//                   {item.depositCycleDuration} {item.depositCycleUnit}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }
