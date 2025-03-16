import {
  Dimensions,
  Keyboard,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Sheet from "./ui/Sheet";
import { Text } from "./ui/Text";
import { Btn } from "./ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import { spacing } from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/lib/toastStore";
import BottomSheet from "@gorhom/bottom-sheet";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { Feather } from "@expo/vector-icons";

type Props = {};

const ChangePhoneNumber = (props: Props) => {
  const [page, setPage] = useState(0);
  const [otpCode, setOtpCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const snapPoints = useMemo(() => [220, 320], []);
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(page * Dimensions.get("window").width * -1, {
      damping: 10,
      stiffness: 100,
      mass: 1,
      overshootClamping: true,
    });
    if (Keyboard.isVisible() && page === 0) {
      Keyboard.dismiss();
    }

    bottomSheetRef.current?.snapToIndex(page, {
      damping: 10,
      stiffness: 100,
      mass: 1,
      overshootClamping: true,
    });
  }, [page]);

  useEffect(() => {
    if (isOpen) {
      setPage(0);
      setOtpCode("");
    }
  }, [isOpen]);

  const mutation = useMutation({
    async mutationFn(otpCode: string) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (otpCode !== "000000") throw new Error("Invalid OTP");
      return { phoneNumber };
    },
    async onSuccess(data) {
      toast("Phone Number changed successfully", "success");
      bottomSheetRef.current?.close();
      setIsOpen(false);
      setPage(0);

      setOtpCode("");
    },
    onError() {
      toast("Invalid OTP", "error");
    },
  });

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
        onPress={() => setIsOpen(true)}
      >
        <Feather name="phone" size={16} color="#000" />
        <Text style={{ fontSize: 14, marginLeft: 8, fontWeight: 500 }}>
          Change Phone Number
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <Sheet
          backgroundStyle={{ backgroundColor: "#fff" }}
          snapPoints={snapPoints}
          onClose={() => setIsOpen(false)}
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
              page={page}
            />
            <Step2
              setPage={setPage}
              onSave={mutation.mutate}
              phoneNumber={phoneNumber ?? ""}
              isSubmitting={mutation.isPending}
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              page={page}
            />
          </Animated.View>
        </Sheet>
      )}
    </View>
  );
};

type StepProps = {
  page: number;
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

  useEffect(() => {
    // if (props.page === 0) phoneNumberRef.current?.();
  }, [props.page]);

  const width = useWindowDimensions().width;
  return (
    <View
      style={{
        padding: spacing.sm,
        paddingTop: 0,
        width,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 12 }}>
        Change Phone Number
      </Text>

      <View style={{ gap: spacing.xs, flex: 1 }}>
        <PhoneInput
          value={phoneNumber}
          onChangeFormattedText={(val) => setPhoneNumber(val)}
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
          label="Sent Code"
          onTouchStart={() => mutation.mutate()}
          isLoading={mutation.isPending}
          style={{ marginTop: 36, zIndex: 10 }}
        />
      </View>
    </View>
  );
}

function Step2(props: {
  page: number;
  setPage: (val: number) => void;
  onSave: (otp: string) => void;
  otpCode: string;
  setOtpCode: (val: string) => void;
  phoneNumber: string;
  isSubmitting: boolean;
}) {
  const otpInputRef = useRef<OtpInputRef>(null);
  const width = useWindowDimensions().width;

  useEffect(() => {
    otpInputRef.current?.setValue(props.otpCode);
    if (props.page === 1) otpInputRef.current?.focus();
  }, [props.page]);

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
          ref={otpInputRef}
          autoFocus={false}
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
          onTextChange={props.setOtpCode}
          onFilled={(text) => {
            props.setOtpCode(text);
            return props.onSave(text);
          }}
        />

        <View
          style={{
            marginTop: 20,
            gap: 12,
          }}
        >
          <Btn
            label="Verify"
            onPressOut={() => {
              if (props.otpCode.length !== 6)
                return toast("Please enter a valid OTP", "error");
              return props.onSave(props.otpCode);
            }}
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

export default ChangePhoneNumber;
