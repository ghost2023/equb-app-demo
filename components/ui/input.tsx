import * as React from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

import { COLORS } from "@/lib/constants";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

type Props = {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
};

const Input = React.forwardRef<TextInput, TextInputProps & Props>(
  (
    {
      label,
      error,
      style,
      errorStyle,
      labelStyle,
      containerStyle,
      secureTextEntry,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(secureTextEntry);

    return (
      <View style={[containerStyle]}>
        {label && (
          <Text style={[{ fontFamily: "Poppins-Medium" }, labelStyle]}>
            {label}
          </Text>
        )}
        <View style={{ position: "relative" }}>
          <TextInput
            ref={ref}
            secureTextEntry={showPassword}
            placeholderTextColor={"#525252"}
            style={[
              {
                minHeight: 48,
                fontFamily: "Poppins-Regular",
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: "center",
                textAlignVertical: "center",
                backgroundColor: isFocused ? "transparent" : "#EEEEEE",
                borderColor: error
                  ? "#feb2b2"
                  : isFocused
                    ? COLORS.primary
                    : "#E5E7EB",
                paddingHorizontal: 14,
                fontSize: 14,
              },
              style,
            ]}
            onFocus={(e) => {
              setFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              if (onBlur) onBlur(e);
            }}
            selectionColor={"#444444"}
            {...props}
          />
          {secureTextEntry && (
            <Pressable
              style={{
                right: 12,
                top: "50%",
                position: "absolute",
                transform: [{ translateY: -10 }],
              }}
              hitSlop={20}
              onPress={() => setShowPassword((p) => !p)}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="#718096"
              />
            </Pressable>
          )}
        </View>
        <View style={{ overflow: "hidden" }}>
          {error && (
            <Animated.Text
              exiting={FadeOutUp}
              entering={FadeInUp}
              style={[
                {
                  color: "#fc8181",
                  paddingTop: 2,
                  fontSize: 12,
                  fontFamily: "Poppins-Medium",
                },
                ,
                errorStyle,
              ]}
            >
              {error}
            </Animated.Text>
          )}
        </View>
      </View>
    );
  },
);

Input.displayName = "Input";

export { Input };
