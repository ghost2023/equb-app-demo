import EqubCard, { EqubCardSkeleton } from "@/components/HomeEquibCard";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";

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

const CurrentEqubList = () => {
  const equbQuery = useQuery({
    queryKey: ["equb"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));

      return currentEqub;
    },
  });

  return (
    <View style={{ gap: 12 }}>
      {!equbQuery.isSuccess &&
        new Array(6)
          .fill(0)
          .map((_, index) => <EqubCardSkeleton key={index} />)}
      {equbQuery.data?.map((equb, index) => (
        <EqubCard key={index} equb={equb} />
      ))}
    </View>
  );
};

export default CurrentEqubList;
