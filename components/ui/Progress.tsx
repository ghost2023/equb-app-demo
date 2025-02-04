import Colors from "@/constants/Colors";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  value: number;
  containerStyle?: StyleProp<ViewStyle>;
  progressStyle?: any;
};

const Progress = (props: Props) => {
  const color = Colors.light;

  return (
    <View
      style={[
        {
          borderRadius: 10,
          height: 12,
          backgroundColor: "#e0e0e0",
          overflow: "hidden",
        },
        props.containerStyle,
      ]}
    >
      <View
        style={[
          {
            width: `${props.value * 100}%`,
            height: "100%",
            borderRadius: 10,
            backgroundColor: color.primary,
          },
          props.progressStyle,
        ]}
      ></View>
    </View>
  );
};

export default Progress;
