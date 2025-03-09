import { Entypo } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, View, ViewProps } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { Text } from "./Text";
import Colors from "@/constants/Colors";

type Props<T> = {
  items: { label: string; data: T }[];
  viewProps: ViewProps;
  defaultValue?: { label: string; data: T };
  onChange: (p: { data: T; label: string }) => void;
  direction?: "up" | "down";
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

          <Entypo
            name="chevron-small-down"
            size={18}
            color={Colors.light.secondaryText}
          />
        </View>
      </Pressable>

      <Animated.View
        style={[
          {
            ...(props.direction && props.direction == "up"
              ? {
                top: -4,
                transform: [{ translateY: "-100%" }],
              }
              : {
                marginTop: 4,
                top: "100%",
              }),
            width: "100%",
            position: "absolute",
            height,
            overflow: "hidden",
            borderRadius: 8,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
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
              dampingRatio: 1.0,
              duration: 100,
            });
          }}
        >
          <BottomSheetScrollView
            style={{
              backgroundColor: Colors.light.background,
              borderRadius: 10,
              paddingBottom: 6,
              maxHeight: 120,
              borderWidth: 1,
              borderColor: "#00000033",
            }}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 2 }}
          >
            {props.items.map((item, i) => (
              <Pressable
                key={i}
                style={({ pressed }) => ({
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderRadius: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: pressed ? "#fff" : "transparent",
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
