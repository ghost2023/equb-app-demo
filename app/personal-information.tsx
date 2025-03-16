import { Text } from "@/components/ui/Text";
import { Btn } from "@/components/ui/button";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { Link, router } from "expo-router";
import {
  Linking,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

const OnboardingData = () => {
  // Dummy data for demonstration
  const data = {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    pinCode: "123456",
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.sm,
          paddingBottom: spacing.sm,
          flexGrow: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: Colors.light.secondaryText,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          Here's your personal information. Please verify that all the details
          are correct.
        </Text>
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: "row", gap: spacing.xs }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 2,
                  color: Colors.light.secondaryText,
                }}
              >
                First Name
              </Text>
              <Text style={inputStyle}>{data.firstName}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 2,
                  color: Colors.light.secondaryText,
                }}
              >
                Last Name
              </Text>
              <Text style={inputStyle}>{data.lastName}</Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 2,
                color: Colors.light.secondaryText,
              }}
            >
              Date of Birth
            </Text>
            <Text style={inputStyle}>
              {format(new Date(data.dateOfBirth), "d LLL yyyy")}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 2,
                color: Colors.light.secondaryText,
              }}
            >
              Gender
            </Text>
            <Text style={inputStyle}>{data.gender}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 12,
            borderColor: Colors.light.border,
            borderWidth: 1,
            borderRadius: 6,
            alignItems: "center",
            marginTop: "auto",
            gap: 12,
            flexDirection: "row",
            marginBottom: spacing.sm,
          }}
          onPress={() => Linking.openURL("https://www.google.com")}
        >
          <Feather
            name="download"
            size={20}
            color={Colors.light.secondaryText}
          />
          <Text
            style={{ color: Colors.light.secondaryText, fontWeight: "600" }}
          >
            Download verification document
          </Text>
        </TouchableOpacity>
        <Btn
          onPress={() => router.push("/edit-personal")}
          label="Update Profile"
        />
      </ScrollView>
    </View>
  );
};

const inputStyle: TextStyle = {
  minHeight: 40,
  fontFamily: "regular",
  borderWidth: 1,
  borderRadius: 6,
  justifyContent: "center",
  textAlignVertical: "center",
  backgroundColor: Colors.light.background,
  borderColor: "#00000033",
  paddingHorizontal: 8,
  fontSize: 14,
};

export default OnboardingData;
