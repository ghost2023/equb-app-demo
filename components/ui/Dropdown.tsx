import { Entypo } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, View, ViewProps } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { Text } from "./text";

type Props<T> = {
  items: { label: string; data: T }[];
  viewProps: ViewProps;
  defaultValue?: { label: string; data: T };
  onChange: (p: { data: T; label: string }) => void;
};

const Dropdown = <T,>(props: Props<T>) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ label: string; data: T } | null>(
    props.defaultValue || null,
  );
  const height = useSharedValue(0);

  return (
    <View style={{ position: "relative", zIndex: 50 }}>
      <Pressable onPress={() => setOpen(!open)}>
        <View {...props.viewProps}>
          <Text style={{ flex: 1, fontWeight: 500 }}>
            {selected?.label || "Select an option"}
          </Text>

          <Entypo name="chevron-small-down" size={18} color="#090909" />
        </View>
      </Pressable>

      <Animated.View
        style={[
          {
            marginTop: 4,
            top: "100%",
            width: "100%",
            position: "absolute",
            height,
            overflow: "hidden",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 7,
            elevation: 2,
          },
        ]}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: open ? "auto" : 0,
          }}
          onLayout={(e) => {
            height.value = withSpring(open ? e.nativeEvent.layout.height : 0, {
              dampingRatio: 1.1,
              duration: 60,
            });
          }}
        >
          <BottomSheetScrollView
            style={{
              backgroundColor: "#eee",
              borderRadius: 10,
              paddingBottom: 10,
              maxHeight: 120,
            }}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 2 }}
          >
            {props.items.map((item, i) => (
              <Pressable
                key={i}
                style={({ pressed }) => ({
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: pressed ? "#fff8" : "#EEE",
                })}
                onPress={() => {
                  setSelected(item);
                  setOpen(false);
                  props.onChange(item);
                }}
              >
                <Text style={{ fontWeight: 500 }}>{item.label}</Text>
              </Pressable>
            ))}
          </BottomSheetScrollView>
        </View>
      </Animated.View>
    </View>
  );
};

export default Dropdown;
