import useModalStore, { ModalType } from "@/lib/modalStore";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomInDown,
  withTiming,
} from "react-native-reanimated";
import { Btn } from "./button";

const myzoomout = () => {
  "worklet";
  const animations = {
    transform: [
      {
        translateY: withTiming(40, { duration: 100 }),
      },
      {
        scale: withTiming(0, { duration: 100 }),
      },
    ],
  };

  const initialValues = {
    transform: [
      {
        translateY: 0,
      },
      { scale: 1 },
    ],
  };
  return {
    initialValues,
    animations,
  };
};

export const Modal = ({ modal }: { modal: ModalType }) => {
  const modalStore = useModalStore();

  return (
    <>
      <Pressable
        onPress={() => {
          console.log("dismissable");
          if (modal.dismissable ?? true) modalStore.remove(modal.id);
        }}
        style={{
          opacity: 0.5,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 90,
        }}
      >
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn.easing(Easing.out(Easing.exp))}
          exiting={FadeOut}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
          }}
        ></Animated.View>
      </Pressable>
      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View
          entering={ZoomInDown.withInitialValues({
            transform: [{ translateY: 40 }, { scale: 0.5 }],
          }).easing(Easing.out(Easing.exp))}
          exiting={myzoomout}
          style={{}}
        >
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 20,
              backgroundColor: "white",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 7,
              elevation: 5,
            }}
          >
            {modal.icon}
            {modal.title && (
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: "center",
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                {modal.title}
              </Text>
            )}
            <Text
              style={{
                fontSize: 14,
                color: "#767676",
                textAlign: "center",
                fontFamily: "Poppins-Medium",
              }}
            >
              {modal.message}
            </Text>

            <View
              style={{
                marginTop: 16,
                gap: 4,
                flexDirection: modal.btnDirection,
              }}
            >
              {modal.actions.map((action, i) => {
                if (!("label" in action)) return action.button;

                const { style, ...props } = action.props ?? {};
                const defaultStyles = {
                  height: 36,
                  paddingVertical: 1,
                  minWidth: 0,
                  borderRadius: 8,
                  flex: modal.btnDirection == "row" ? 1 : undefined,
                };
                return (
                  <Btn
                    key={i}
                    label={action.label}
                    onPress={() => {
                      modal.onAction?.(action.action);
                      modalStore.remove(modal.id);
                    }}
                    style={(res) =>
                      typeof style == "function"
                        ? // @ts-ignore
                          { ...defaultStyles, ...style(res) }
                        : // @ts-ignore
                          { ...defaultStyles, ...style }
                    }
                    {...props}
                  />
                );
              })}
            </View>
          </View>
        </Animated.View>
      </View>
    </>
  );
};
