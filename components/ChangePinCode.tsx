import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "./ui/Text";
import Sheet from "./ui/Sheet";
import { spacing } from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import { Btn } from "./ui/button";
import { OtpInput } from "react-native-otp-entry";
import { toast } from "@/lib/toastStore";

const ChangePinCode = () => {
  const snapPoints = useMemo(() => [360], []);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const onSave = (otp: string) => {
    setSheetOpen(false);
    toast("Pin code changed", "success");
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
        onPress={() => setSheetOpen(true)}
      >
        <Feather name="lock" size={16} color="#000" />
        <Text style={{ fontSize: 14, marginLeft: 8, fontWeight: 500 }}>
          Change Pin Number
        </Text>
      </TouchableOpacity>
      {sheetOpen && (
        <Sheet
          backgroundStyle={{ backgroundColor: "#fff" }}
          snapPoints={snapPoints}
          enableDynamicSizing
          onClose={() => setSheetOpen(false)}
        >
          <View style={{ padding: spacing.sm, paddingTop: 0 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Change Pin Code
            </Text>
            <Text
              style={{
                marginTop: 8,
                marginBottom: 18,
                fontWeight: 500,
                color: Colors.light.secondaryText,
              }}
            >
              We have sent a verification code to your phone number.
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
                onTextChange={setOtpCode}
                onFilled={(text) => {
                  setOtpCode(text);
                  onSave(otpCode);
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
                    if (otpCode.length !== 6)
                      return toast("Please enter a valid OTP", "error");
                    return onSave(otpCode);
                  }}
                // isLoading={props.isSubmitting}
                />
              </View>
            </View>
          </View>
        </Sheet>
      )}
    </View>
  );
};

export default ChangePinCode;
