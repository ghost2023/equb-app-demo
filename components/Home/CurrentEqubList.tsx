import EqubCard, { EqubCardSkeleton } from "@/components/HomeEquibCard";
import { env } from "@/lib/env";
import { Equb } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { View } from "react-native";

const CurrentEqubList = () => {
  const equbQuery = useQuery({
    queryKey: ["equb"],
    queryFn: async () => {
      const res = await axios.get(`${env.EXPO_PUBLIC_API_URL}/api/equbs`);

      return res.data as Equb[];
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
