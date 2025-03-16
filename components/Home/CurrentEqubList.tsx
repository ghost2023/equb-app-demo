import EqubCard, { EqubCardSkeleton } from "@/components/HomeEquibCard";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";

const fakeData = [
  {
    depositAmount: 85,
    depositFrequency: 67,
    drawFrequency: 63,
    id: 83,
    members: 80,
    winningAmount: 19,
    winningFrequency: 75,
  },
  {
    depositAmount: 9,
    depositFrequency: 79,
    drawFrequency: 75,
    id: 18,
    members: 45,
    winningAmount: 39,
    winningFrequency: 78,
  },
  {
    depositAmount: 86,
    depositFrequency: 53,
    drawFrequency: 86,
    id: 74,
    members: 4,
    winningAmount: 85,
    winningFrequency: 3,
  },
  {
    depositAmount: 76,
    depositFrequency: 66,
    drawFrequency: 76,
    id: 27,
    members: 59,
    winningAmount: 25,
    winningFrequency: 75,
  },
  {
    depositAmount: 80,
    depositFrequency: 93,
    drawFrequency: 39,
    id: 34,
    members: 98,
    winningAmount: 86,
    winningFrequency: 92,
  },
  {
    depositAmount: 2,
    depositFrequency: 62,
    drawFrequency: 99,
    id: 67,
    members: 38,
    winningAmount: 29,
    winningFrequency: 31,
  },
  {
    depositAmount: 66,
    depositFrequency: 39,
    drawFrequency: 6,
    id: 60,
    members: 75,
    winningAmount: 76,
    winningFrequency: 94,
  },
  {
    depositAmount: 46,
    depositFrequency: 97,
    drawFrequency: 23,
    id: 46,
    members: 65,
    winningAmount: 13,
    winningFrequency: 26,
  },
  {
    depositAmount: 96,
    depositFrequency: 21,
    drawFrequency: 84,
    id: 90,
    members: 85,
    winningAmount: 99,
    winningFrequency: 55,
  },
  {
    depositAmount: 14,
    depositFrequency: 68,
    drawFrequency: 75,
    id: 10,
    members: 48,
    winningAmount: 99,
    winningFrequency: 63,
  },
  {
    depositAmount: 0,
    depositFrequency: 56,
    drawFrequency: 18,
    id: 57,
    members: 82,
    winningAmount: 5,
    winningFrequency: 96,
  },
  {
    depositAmount: 7,
    depositFrequency: 45,
    drawFrequency: 64,
    id: 69,
    members: 2,
    winningAmount: 20,
    winningFrequency: 96,
  },
];

const CurrentEqubList = () => {
  const equbQuery = useQuery({
    queryKey: ["equb"],
    async queryFn() {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return fakeData;
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
