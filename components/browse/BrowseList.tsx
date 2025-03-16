import EqubCard, { EqubCardSkeleton } from "@/components/HomeEquibCard";
import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { View, RefreshControl, FlatList } from "react-native";
import { Equb } from "@/lib/types";
import { SortableField, stylesGenerator } from "./browse.misc";

const fakeData = [
  {
    depositAmount: 28,
    depositFrequency: 0,
    drawFrequency: 67,
    id: 33,
    members: 73,
    winningAmount: 78,
    winningFrequency: 36,
  },
  {
    depositAmount: 56,
    depositFrequency: 29,
    drawFrequency: 24,
    id: 76,
    members: 48,
    winningAmount: 30,
    winningFrequency: 2,
  },
  {
    depositAmount: 96,
    depositFrequency: 88,
    drawFrequency: 91,
    id: 94,
    members: 33,
    winningAmount: 54,
    winningFrequency: 84,
  },
  {
    depositAmount: 15,
    depositFrequency: 61,
    drawFrequency: 97,
    id: 78,
    members: 73,
    winningAmount: 65,
    winningFrequency: 29,
  },
  {
    depositAmount: 93,
    depositFrequency: 41,
    drawFrequency: 0,
    id: 83,
    members: 96,
    winningAmount: 94,
    winningFrequency: 8,
  },
  {
    depositAmount: 45,
    depositFrequency: 51,
    drawFrequency: 72,
    id: 99,
    members: 31,
    winningAmount: 93,
    winningFrequency: 55,
  },
  {
    depositAmount: 47,
    depositFrequency: 90,
    drawFrequency: 66,
    id: 90,
    members: 37,
    winningAmount: 67,
    winningFrequency: 40,
  },
];

type Props = {
  sortField: SortableField | undefined;
  setSortField: React.Dispatch<React.SetStateAction<SortableField | undefined>>;
};

export default function BrowseList(props: Props) {
  const color = Colors["light"];
  const equbQuery = useInfiniteQuery({
    queryKey: ["browse"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return fakeData as Equb[];
    },
    getNextPageParam: (_, pages) => pages.length,
    initialPageParam: 0,
  });
  const styles = useMemo(() => stylesGenerator(color), [color]);

  return (
    <FlatList
      data={
        equbQuery.isSuccess ? equbQuery.data.pages.flat() : new Array(8).fill(0)
      }
      onEndReachedThreshold={2}
      onEndReached={() => {
        if (equbQuery.hasNextPage) equbQuery.fetchNextPage();
      }}
      style={styles.flatList}
      contentContainerStyle={styles.flatListContent}
      renderItem={({ item, index }) =>
        equbQuery.isSuccess ? (
          <EqubCard key={item.id} equb={item} />
        ) : (
          <EqubCardSkeleton key={index} />
        )
      }
      refreshControl={
        <RefreshControl
          refreshing={equbQuery.isRefetching}
          onRefresh={() => equbQuery.refetch()}
          tintColor={color.primary}
        />
      }
      ListFooterComponent={
        equbQuery.hasNextPage ? (
          <View style={styles.listFooter}>
            {new Array(4).fill(0).map((_, index) => (
              <EqubCardSkeleton key={index} />
            ))}
          </View>
        ) : (
          <View style={styles.noEquibsContainer}>
            <Text style={styles.noEquibsText}>No Equibs Found</Text>
          </View>
        )
      }
    />
  );
}
