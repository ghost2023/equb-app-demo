import { useEffect, useState } from "react";
import { Pressable, View, ViewProps } from "react-native";
import Animated, { Easing, withTiming } from "react-native-reanimated";

type Props = {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  containerProps?: ViewProps;
  triggerProps?: ViewProps;
  dropdownProps?: ViewProps;
  children?: React.ReactNode | React.ReactNode[];
  trigger: (isOpen: boolean) => React.ReactNode;
};

const Dropdown = (props: Props) => {
  const [isOpen, setOpen] = useState(props.open ?? false);

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, [props.open]);

  const { style: containerStyle, ...restContainerProps } =
    props.containerProps ?? {};

  const { style: dropdownStyle, ...restDropdownProps } =
    props.dropdownProps ?? {};
  return (
    <View
      style={[{ position: "relative", zIndex: 50 }, containerStyle]}
      {...restContainerProps}
    >
      <Pressable onPress={() => {
        if (props.onOpenChange) props.onOpenChange(!isOpen);
        else setOpen(!isOpen);
      }} {...props.triggerProps}>
        {props.trigger(isOpen)}
      </Pressable>

      {isOpen && (
        <Animated.View
          style={[
            {
              marginTop: 4,
              top: "100%",
              width: "100%",
              position: "absolute",
              borderRadius: 8,
              transformOrigin: "top",
            },
            dropdownStyle,
          ]}
          entering={myzoomin}
          exiting={myzoomout}
          {...restDropdownProps}
        >
          {props.children}
        </Animated.View>
      )}
    </View>
  );
};

export default Dropdown;

const animationDuration = 100;
const myzoomout = () => {
  "worklet";
  const animations = {
    transform: [
      {
        scaleY: withTiming(0, {
          duration: animationDuration,
          easing: Easing.out(Easing.ease),
        }),
      },
    ],
    opacity: withTiming(0, {
      duration: animationDuration,
      easing: Easing.out(Easing.ease),
    }),
  };

  const initialValues = {
    transform: [{ scaleY: 1 }],
    opacity: 1,
  };
  return {
    initialValues,
    animations,
  };
};

const myzoomin = () => {
  "worklet";
  const animations = {
    transform: [
      {
        scaleY: withTiming(1, {
          duration: animationDuration,
          easing: Easing.out(Easing.ease),
        }),
      },
    ],

    opacity: withTiming(1, {
      duration: animationDuration,
      easing: Easing.out(Easing.ease),
    }),
  };

  const initialValues = {
    transform: [{ scaleY: 0 }],
    opacity: 0,
  };
  return {
    initialValues,
    animations,
  };
};
