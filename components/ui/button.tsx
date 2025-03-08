import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  TextStyle,
} from "react-native";
import { Text } from "./Text";
import Colors from "@/constants/Colors";

export type BtnProps = {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  labelStyle?: TextStyle;
  loaderSize?: number | "small" | "large";
} & PressableProps;

export const Btn = ({
  label,
  style,
  loaderSize,
  labelStyle,
  isLoading,
  disabled,
  ...props
}: BtnProps) => {
  const defaultStyles = {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
    minWidth: 140,
    backgroundColor: Colors.light.primary,
    borderWidth: 0,
    borderRadius: 6,
    height: 40,
    opacity: disabled || isLoading ? 0.75 : 1,
  };

  return (
    <Pressable
      disabled={disabled || isLoading}
      style={(res) =>
        typeof style == "function"
          ? // @ts-ignore
            { ...defaultStyles, ...style(res) }
          : // @ts-ignore
            { ...defaultStyles, ...style }
      }
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size={loaderSize} color={"white"} />
      ) : (
        <Text
          style={{
            fontWeight: 500,
            textTransform: "uppercase",
            color: "white",
            ...labelStyle,
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};
