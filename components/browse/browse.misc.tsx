import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { StyleSheet } from "react-native";

export const timeUnits = ["Day", "Week", "Month"] as const;

export const stylesGenerator = (colors: typeof Colors.light) =>
  StyleSheet.create({
    flatList: {
      paddingBottom: spacing.md,
    },
    flatListContent: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.sm,
      gap: 12,
    },
    listFooter: {
      gap: 12,
    },
    noEquibsContainer: {
      marginVertical: 12,
      alignItems: "center",
    },
    noEquibsText: {
      fontSize: 14,
      color: colors.text,
    },
  });

export type SortableField =
  | "Depositor"
  | "Amount"
  | "DepositFrequency"
  | "WinningFrequency";
