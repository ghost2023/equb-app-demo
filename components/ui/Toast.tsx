import useToastStore, { Toast } from "@/lib/toastStore";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

export const ToastComponent = ({ toast }: { toast: Toast }) => {
  const toastStore = useToastStore();
  useEffect(() => {
    if (toast.timeout === Infinity) return;
    const t = setTimeout(() => {
      toastStore.remove(toast.id);
    }, toast.timeout);
    return () => {
      clearTimeout(t);
    };
  }, [toast.id, toast.timeout]);

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeInUp.easing(Easing.out(Easing.exp))}
      exiting={FadeOutUp}
      style={[
        {
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 7,
          elevation: 5,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        {toast.messageType === "success" && (
          <MaterialIcons name="check-circle" size={20} color="#61d345" />
        )}
        {toast.messageType === "error" && (
          <AntDesign name="closecircle" size={20} color="#ff4b4b" />
        )}
        <Text
          style={{
            fontSize: 14,
            color: "#434343",
            fontFamily: "Poppins-Medium",
            maxWidth: 160,
          }}
        >
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
};
