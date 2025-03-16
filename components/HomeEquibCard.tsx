import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Skeleton } from "./ui/skeleton";
import { Equb } from "@/lib/types";
import { formatDays } from "@/lib/misc";

const EqubCard = (props: { equb: Equb }) => {
  const color = Colors.light;
  return (
    <TouchableOpacity
      onPress={() => router.push(`/equb/${1}`)}
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        elevation: 2,
      }}
    >
      <View
        style={{
          gap: 8,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderColor: "#D6D6D6",
            borderWidth: 1,
            borderRadius: 4,
            width: 72,
            height: 72,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eee",
          }}
        >
          <MaterialCommunityIcons
            name="trophy-outline"
            size={32}
            style={{ color: color.primary }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={{ color: color.text, fontSize: 16, fontWeight: 600 }}>
              {props.equb.winningAmount.toLocaleString("en", {
                currency: "ETB",
                style: "currency",
              })}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 4,
                marginTop: 2,
                alignItems: "center",
              }}
            >
              <Feather
                name="download"
                size={12}
                color={color.secondaryText}
                style={{ color: color.primary }}
              />
              <Text
                style={{
                  color: color.primary,
                  fontSize: 14,
                  flexShrink: 0,
                  fontWeight: 500,
                }}
              >
                {props.equb.depositAmount}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
              alignSelf: "stretch",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Feather name="users" size={12} color={color.secondaryText} />
              <Text
                style={{
                  color: color.secondaryText,
                  fontSize: 14,
                }}
              >
                {props.equb.members}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <Feather name="calendar" size={12} color={color.secondaryText} />
              <Text
                style={{
                  color: color.secondaryText,
                  fontSize: 14,
                }}
              >
                {formatDays(props.equb.winningFrequency)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Feather name="repeat" size={12} color={color.secondaryText} />
              <Text
                style={{
                  color: color.secondaryText,
                  fontSize: 14,
                }}
              >
                {formatDays(props.equb.depositFrequency)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const EqubCardSkeleton = () => {
  return (
    <Skeleton
      style={{
        height: 100,
        width: "100%",
        borderRadius: 8,
      }}
    />
  );
};

export default EqubCard;
