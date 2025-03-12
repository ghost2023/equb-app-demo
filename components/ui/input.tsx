import * as React from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

import COLORS from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Colors from "@/constants/Colors";

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
          <Text
            style={[
              {
                fontSize: 14,
                marginBottom: 2,
                color: Colors.light.secondaryText,
                fontFamily: "medium",
              },
              labelStyle,
            ]}
          >
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
                minHeight: 40,
                fontFamily: "regular",
                borderWidth: 1,
                borderRadius: 6,
                justifyContent: "center",
                textAlignVertical: "center",
                backgroundColor: isFocused
                  ? "transparent"
                  : Colors.light.background,
                borderColor: error
                  ? "#F31717"
                  : isFocused
                    ? COLORS.light.primary
                    : "#00000033",
                paddingHorizontal: 8,
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
                size={20}
                color={Colors.light.secondaryText}
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
