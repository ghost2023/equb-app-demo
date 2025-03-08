import CurrentEqubList from "@/components/Home/CurrentEqubList";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { ScrollView, View } from "react-native";

export default function TabOneScreen() {
  const color = Colors["light"];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        position: "relative",
      }}
    >
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
          <CurrentEqubList />
        </View>
      </ScrollView>
    </View>
  );
}
