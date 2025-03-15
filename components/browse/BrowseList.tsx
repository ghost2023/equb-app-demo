import EqubCard, { EqubCardSkeleton } from "@/components/HomeEquibCard";
import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { View, RefreshControl, FlatList } from "react-native";
import axios, { AxiosError } from "axios";
import { env } from "@/lib/env";
import { Equb } from "@/lib/types";
import { SortableField, stylesGenerator } from "./browse.misc";

type Props = {
  sortField: SortableField | undefined;
  setSortField: React.Dispatch<React.SetStateAction<SortableField | undefined>>;
};

export default function BrowseList(props: Props) {
  const color = Colors["light"];
  const equbQuery = useInfiniteQuery<Equb[], AxiosError>({
    queryKey: ["browse"],
    queryFn: async () => {
      const res = await axios.get(`${env.EXPO_PUBLIC_API_URL}/api/equbs`);
      return res.data;
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
