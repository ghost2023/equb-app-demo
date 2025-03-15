import { useState } from "react";
import { Text, TextInput, TextStyle } from "react-native";

import COLORS from "@/constants/Colors";
import { View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { z } from "zod";
import Select from "./ui/Select";

type Props = {
  onChange: (val: string) => void;
  error?: string;
};

const formData = z
  .object({
    day: z.number().min(1).max(31),
    month: z.number().min(0).max(11),
    year: z
      .number()
      .min(1930)
      .max(new Date().getFullYear() - 18),
  })
  .refine((val) => val.day && val.month && val.year, {
    message: "Invalid",
  })
  .refine((val) => new Date(val.year, val.month, val.day).getTime() > 0, {
    message: "Invalid",
  });

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateInput = (props: Props) => {
  const [isDayFocused, setDayFocused] = useState(false);
  const [isYearFocused, setIsYearFocused] = useState(false);

  const [month, setMonth] = useState<number>();

  return (
    <View>
      <Text
        style={[
          {
            fontSize: 14,
            marginBottom: 2,
            color: Colors.light.secondaryText,
            fontFamily: "medium",
          },
        ]}
      >
        Date of Birth
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          placeholderTextColor={"#525252"}
          style={getInputStyle(isDayFocused, props.error)}
          onFocus={() => setDayFocused(true)}
          onBlur={() => setDayFocused(false)}
          placeholder="DD"
          selectionColor={"#444444"}
        />

        <Select
          value={month}
          schema={{
            label: "label",
            value: "value",
          }}
          placeholder="Month"
          listMode="SCROLLVIEW"
          setValue={setMonth}
          containerStyle={{ flex: 1, minWidth: 40 }}
          items={months.map((month, index) => ({
            label: month,
            value: index,
          }))}
        />

        <TextInput
          placeholderTextColor={"#525252"}
          style={getInputStyle(isYearFocused, props.error)}
          onFocus={() => setIsYearFocused(true)}
          onBlur={() => setIsYearFocused(false)}
          selectionColor={"#444444"}
          placeholder="YYYY"
        />
      </View>
      <View style={{ overflow: "hidden" }}>
        {props.error && (
          <Animated.Text
            exiting={FadeOutUp}
            entering={FadeInUp}
            style={{
              color: "#fc8181",
              paddingTop: 2,
              fontSize: 12,
              fontFamily: "Poppins-Medium",
            }}
          >
            {props.error}
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

function getInputStyle(isFocused: boolean, error?: string) {
  return {
    minHeight: 40,
    fontFamily: "regular",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    textAlignVertical: "center",
    backgroundColor: isFocused ? "transparent" : Colors.light.background,
    borderColor: error
      ? "#F31717"
      : isFocused
        ? COLORS.light.primary
        : "#00000033",
    paddingHorizontal: 8,
    fontSize: 14,
    flex: 1,
  } as TextStyle;
}

export default DateInput;
