import React from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { Text } from "@/components/ui/Text";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type Transaction = {
  id: string;
  amount: number;
  method: string;
  date: string;
};

function TransactionItem({ item }: { item: Transaction }) {
  const styles = generateStyles(Colors.light);
  return (
    <View style={styles.itemContainer}>
      {/* Left side: icon + transaction details */}
      <View style={styles.leftSection}>
        <View style={styles.iconWrapper}>
          <Feather name="arrow-down" size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.amountText}>
            {item.amount.toLocaleString("en", {
              style: "currency",
              currency: "ETB",
            })}
          </Text>
          <Text style={styles.methodText}>Via {item.method}</Text>
        </View>
      </View>

      {/* Right side: date */}
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  );
}

export default function TransactionScreen() {
  const transactionQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = [
        {
          id: "1",
          amount: 100,
          method: "Paypal",
          date: "2022-01-01",
        },
        {
          id: "2",
          amount: 200,
          method: "Paypal",
          date: "2022-01-02",
        },
        {
          id: "3",
          amount: 300,
          method: "Paypal",
          date: "2022-01-03",
        },
        {
          id: "4",
          amount: 400,
          method: "Paypal",
          date: "2022-01-04",
        },
        {
          id: "5",
          amount: 500,
          method: "Paypal",
          date: "2022-01-05",
        },
      ];
      return data;
    },
  });
  const styles = generateStyles(Colors.light);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={
          transactionQuery.isSuccess
            ? transactionQuery.data
            : new Array(8).fill(0)
        }
        refreshControl={
          <RefreshControl
            refreshing={transactionQuery.isRefetching}
            onRefresh={() => transactionQuery.refetch()}
            tintColor={Colors.light.primary}
          />
        }
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.sm, gap: spacing.sm }}
        renderItem={({ item, index }) =>
          transactionQuery.isSuccess ? (
            <TransactionItem item={item} />
          ) : (
            <Skeleton
              key={index}
              style={{
                height: 60,
                width: "100%",
                borderRadius: 8,
              }}
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const generateStyles = (color: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 6,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      elevation: 2,
    },
    leftSection: {
      flexDirection: "row",
    },
    iconWrapper: {
      backgroundColor: color.primary,
      borderRadius: 24,
      padding: 8,
      marginRight: 12,
    },
    amountText: {
      fontSize: 16,
      fontWeight: "600",
    },
    methodText: {
      fontSize: 12,
      color: "#666",
    },
    dateText: {
      fontSize: 12,
      color: "#666",
    },
  });
