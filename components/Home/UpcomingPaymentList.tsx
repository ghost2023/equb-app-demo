import Colors from "@/constants/Colors";
import { View } from "react-native";
import { Text } from "../ui/Text";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const upcomingPayments = [
  { amount: 100, dueDate: "Nov 2", equbName: "dolor sit amet" },
  { amount: 200, dueDate: "Tomorrow 12:00 PM", equbName: "Lorem ipsum" },
];

const UpcomingPaymentList = () => {
  const paymentQuery = useQuery({
    queryKey: ["upcomingPayment"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));

      return upcomingPayments;
    },
  });

  return (
    <View style={{ gap: 12 }}>
      {!paymentQuery.isSuccess &&
        new Array(2).fill(0).map((_, index) => (
          <Skeleton
            style={{
              width: "100%",
              height: 56,

              borderRadius: 8,
            }}
            key={index}
          />
        ))}
      {upcomingPayments.map((payment, index) => (
        <UpcomingPayment
          equbName={payment.equbName}
          key={index}
          amount={payment.amount}
          dueDate={payment.dueDate}
        />
      ))}
    </View>
  );
};

export default UpcomingPaymentList;

const UpcomingPayment = ({
  amount,
  dueDate,
  equbName,
}: {
  amount: number;
  equbName: string;
  dueDate: string;
}) => {
  const color = Colors["light"];
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Text style={{ fontSize: 14, color: color.secondaryText }}>
          {equbName}
        </Text>

        <Text style={{ color: color.secondaryText, fontSize: 12 }}>
          {dueDate}
        </Text>
      </View>
      <Text style={{ color: color.text, fontSize: 16, fontWeight: "bold" }}>
        {amount} ETB
      </Text>
    </View>
  );
};
