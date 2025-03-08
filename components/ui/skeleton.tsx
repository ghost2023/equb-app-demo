import Colors from "@/constants/Colors";
import { BORDER_RADIUS } from "@/constants/Spacing";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { useColorScheme } from "react-native";
import {
  createShimmerPlaceholder,
  ShimmerPlaceholderProps,
} from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
function Skeleton({ style, shimmerColors, ...props }: ShimmerPlaceholderProps) {
  const theme = useColorScheme();
  const colors = Colors[theme ?? "dark"];
  return (
    <ShimmerPlaceholder
      shimmerColors={
        shimmerColors ?? [colors.muted, colors.secondary, colors.muted]
      }
      style={[
        {
          borderRadius: BORDER_RADIUS.default,
        },
        style,
      ]}
      {...props}
    />
  );
}

export { Skeleton };
