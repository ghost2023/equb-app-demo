import Colors from "@/constants/Colors";
import { View } from "react-native";
import BrowseList from "@/components/browse/BrowseList";
import FilterSheet from "@/components/browse/FilterSheet";
import { useState } from "react";
import { SortableField } from "@/components/browse/browse.misc";

export default function TabOneScreen() {
  const color = Colors["light"];
  const [sortField, setSortField] = useState<SortableField>();
  const x = { sortField, setSortField };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        position: "relative",
      }}
    >
      <FilterSheet {...{ sortField, setSortField }} />
      <BrowseList {...{ sortField, setSortField }} />
    </View>
  );
}
