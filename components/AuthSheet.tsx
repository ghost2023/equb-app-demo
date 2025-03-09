import {
  Dimensions,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Sheet from "./ui/Sheet";
import { Text } from "./ui/Text";
import { Btn } from "./ui/button";
import { useMemo, useRef, useState } from "react";
import { spacing } from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/lib/toastStore";
import BottomSheet from "@gorhom/bottom-sheet";
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";

type Props = {
  onClose?: () => void;
  onSave?: () => void;
  isOpen?: boolean;
};

const AuthSheet = (props: Props) => {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const snapPoints = useMemo(() => [240, 320], []);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const translateX = useSharedValue(0);
  const setPage = (val: number) => {
    translateX.value = withSpring(val * Dimensions.get("window").width * -1, {
      damping: 10,
      stiffness: 100,
      mass: 1,
      overshootClamping: true,
    });
    bottomSheetRef.current?.snapToIndex(val, {
      damping: 10,
      stiffness: 100,
      mass: 1,
      overshootClamping: true,
    });
  };

  const mutation = useMutation({
    async mutationFn(terms: string) {
      console.log({ terms, phoneNumber });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      toast("Welcome", "success");
      bottomSheetRef.current?.close();
      props.onClose?.();
      router.push("/onboarding");
      setPage(0);
    },
  });

  if (!props.isOpen) return null;
  return (
    <Sheet
      backgroundStyle={{ backgroundColor: "#fff" }}
      snapPoints={snapPoints}
      onClose={props.onClose}
      ref={bottomSheetRef}
      viewProps={{ style: { flex: 1 } }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX }],
        }}
      >
        <Step1
          onSave={(data) => {
            setPage(1);
            return setPhoneNumber(data);
          }}
        />
        <Step2
          setPage={setPage}
          onSave={mutation.mutate}
          phoneNumber={phoneNumber ?? ""}
          isSubmitting={mutation.isPending}
        />
      </Animated.View>
    </Sheet>
  );
};

type StepProps = {
  onSave: (data: string) => void;
};

function Step1(props: StepProps) {
  const phoneNumberRef = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const mutation = useMutation({
    async mutationFn() {
      if (!phoneNumber) {
        toast("Phone number is required", "error");
        return;
      }
      if (!phoneNumberRef.current?.isValidNumber(phoneNumber)) {
        toast("Invalid phone number", "error");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      props.onSave(phoneNumber);
    },
  });
  const width = useWindowDimensions().width;
  return (
    <View
      style={{
        padding: spacing.sm,
        paddingTop: 0,
        width,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Sign in</Text>
      <Text
        style={{
          fontSize: 14,
          color: Colors.light.secondaryText,
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        Start your savings journey with friends and family
      </Text>
      <View style={{ gap: spacing.xs, flex: 1 }}>
        <PhoneInput
          value={phoneNumber}
          onChangeText={(val) => setPhoneNumber(val)}
          placeholder="Enter your phone number"
          autoFocus={true}
          textInputStyle={{
            fontFamily: "medium",
            padding: 0,
            height: "auto",
            minHeight: 0,
            margin: 0,
          }}
          ref={phoneNumberRef}
          textContainerStyle={{
            borderRadius: 8,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "#00000033",
            backgroundColor: Colors.light.background,
          }}
          flagButtonStyle={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#00000033",
            backgroundColor: Colors.light.background,
          }}
          textInputProps={{
            placeholder: "912345678",
          }}
          defaultCode="ET"
          containerStyle={{
            gap: 8,
            padding: 0,
            width: "auto",
          }}
        />
        <Btn
          label="Register"
          onTouchStart={() => mutation.mutate()}
          isLoading={mutation.isPending}
          style={{ marginTop: 36, zIndex: 10 }}
        />
      </View>
    </View>
  );
}

function Step2(props: {
  setPage: (val: number) => void;
  onSave: (val: string) => void;
  phoneNumber: string;
  isSubmitting: boolean;
}) {
  const [otpCode, setOtpCode] = useState("");
  const width = useWindowDimensions().width;
  return (
    <View style={{ padding: spacing.sm, paddingTop: 0, width }}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 16 }}>
        Verify Your Phone
      </Text>
      <Text
        style={{
          fontSize: 14,
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        We have sent a verification code to your phone number.
        <Text
          style={{
            fontWeight: 600,
          }}
        >
          {"  " + props.phoneNumber}
        </Text>
      </Text>
      <View style={{ gap: spacing.xs }}>
        <OtpInput
          numberOfDigits={6}
          theme={{
            containerStyle: {
              gap: 8,
            },
            pinCodeContainerStyle: {
              borderRadius: 8,
              height: 48,
              paddingHorizontal: 0,
              width: "auto",
              flex: 1,
              paddingVertical: 0,
              backgroundColor: Colors.light.background,
            },
            pinCodeTextStyle: {
              alignItems: "center",
              fontFamily: "semiBold",
              fontSize: 22,
            },
          }}
          onTextChange={(text) => setOtpCode(text)}
          onFilled={() => props.onSave(otpCode)}
        />

        <View
          style={{
            marginTop: 20,
            gap: 12,
          }}
        >
          <Btn
            label="Verify"
            onPressOut={() => props.onSave(otpCode)}
            isLoading={props.isSubmitting}
          />

          <TouchableOpacity
            onPressIn={() => props.setPage(0)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#00000033",
              borderRadius: 6,
              flexShrink: 0,
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: Colors.light.secondaryText,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AuthSheet;
