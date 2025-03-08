import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  createShimmerPlaceholder,
  ShimmerPlaceholderProps,
} from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
function Skeleton({ style, ...props }: ShimmerPlaceholderProps) {
  return <ShimmerPlaceholder style={[style]} {...props} />;
}

export { Skeleton };
