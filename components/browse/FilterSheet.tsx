import { Slider } from "@miblanchard/react-native-slider";
import Sheet from "@/components/ui/Sheet";
import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";
import { Btn } from "@/components/ui/button";
import { SortableField, timeUnits } from "./browse.misc";
import Dropdown from "../ui/Dropdown";

type Props = {
  onClose?: () => void;
  onSave?: () => void;
  isOpen?: boolean;
  sortField: SortableField | undefined;
  setSortField: React.Dispatch<React.SetStateAction<SortableField | undefined>>;
};

function FilterSheet(props: Props) {
  const [filterSheet, setFilterSheet] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [range, setRange] = useState([1000, 1_000_000]);
  const [frequencyDuration, setFrequencyDuration] = useState("Days");
  const [frequency, setFrequency] = useState(0);
  const [depositRange, setDepositRange] = useState([100, 10_000]);
  const snapPoints = useMemo(() => [420], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const color = Colors["light"];
  const styles = useMemo(() => stylesGenerator(color), [color]);
  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by depositor, amount, "
          />
          <Pressable style={styles.searchButton}>
            <Feather name="search" size={16} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.filterSortContainer}>
          <Dropdown
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            trigger={(isOpen) => (
              <View
                style={[
                  styles.sortButton,
                  { backgroundColor: isOpen ? "#fff" : "transparent" },
                ]}
              >
                <MaterialCommunityIcons
                  name="sort"
                  size={20}
                  color={"#3E3E3E"}
                />
                <Text style={styles.filterText}>Sort</Text>
              </View>
            )}
          >
            <View style={styles.dropdownContent}>
              {[
                "Depositor",
                "Amount",
                "DepositFrequency",
                "WinningFrequency",
              ].map((field, i) => (
                <TouchableOpacity
                  onPress={() => {
                    setDropdownOpen(false);
                    if (field === props.sortField)
                      props.setSortField(undefined);
                    else props.setSortField(field as SortableField);
                  }}
                  key={i}
                  style={[
                    styles.sortField,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",

                      backgroundColor:
                        field === props.sortField
                          ? color.secondary
                          : "transparent",
                    },
                  ]}
                >
                  <Text style={{ fontSize: 14 }}>{field}</Text>
                  {field === props.sortField && (
                    <Feather
                      name="check"
                      size={16}
                      color={color.secondaryText}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Dropdown>

          <TouchableOpacity
            onPress={() => setFilterSheet(true)}
            style={styles.filterButton}
          >
            <Feather name="filter" size={20} color={"#3E3E3E"} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      {filterSheet && (
        <Sheet
          backgroundStyle={{ backgroundColor: "#fff" }}
          snapPoints={snapPoints}
          onClose={props.onClose}
          ref={bottomSheetRef}
          viewProps={{ style: { flex: 1 } }}
        >
          <View style={filterSheetStyles.container}>
            <View style={filterSheetStyles.header}>
              <Text style={filterSheetStyles.headerText}>Filters</Text>
              <TouchableOpacity
                style={filterSheetStyles.resetButton}
                onPress={() => console.log("reset")}
              >
                <Feather
                  name="x"
                  size={20}
                  color={Colors.light.secondaryText}
                />
                <Text style={filterSheetStyles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={filterSheetStyles.filterOptionContainer}>
              <View style={filterSheetStyles.filterOption}>
                <Text style={filterSheetStyles.filterOptionLabel}>
                  Winning Amount
                </Text>
                <Slider
                  thumbTintColor={Colors.light.primary}
                  minimumTrackTintColor={Colors.light.primary}
                  maximumTrackTintColor={"#EDEEF1"}
                  value={range}
                  onSlidingComplete={setRange}
                  containerStyle={{
                    height: 30,
                  }}
                  thumbStyle={{
                    height: 24,
                    width: 24,
                    borderRadius: 20,
                    elevation: 2,
                  }}
                  trackStyle={{
                    height: 6,
                    borderRadius: 6,
                  }}
                  step={1000}
                  minimumValue={1000}
                  maximumValue={1_000_000}
                />

                <View style={filterSheetStyles.amountInputContainer}>
                  <Input
                    containerStyle={filterSheetStyles.amountInput}
                    value={range[0].toString()}
                    placeholder="From"
                    style={{ fontSize: 12 }}
                  />
                  <Input
                    containerStyle={filterSheetStyles.amountInput}
                    placeholder="To"
                    value={range[1].toString()}
                    style={{ fontSize: 12 }}
                  />
                </View>
              </View>
              <View style={filterSheetStyles.filterOption}>
                <Text style={filterSheetStyles.filterOptionLabel}>
                  Deposit Amount
                </Text>
                <Slider
                  thumbTintColor={Colors.light.primary}
                  minimumTrackTintColor={Colors.light.primary}
                  maximumTrackTintColor={"#EDEEF1"}
                  containerStyle={{
                    height: 30,
                  }}
                  value={depositRange}
                  onSlidingComplete={setDepositRange}
                  thumbStyle={{
                    height: 24,
                    width: 24,
                    borderRadius: 20,
                    elevation: 2,
                  }}
                  trackStyle={{
                    height: 6,
                    borderRadius: 6,
                  }}
                  step={100}
                  minimumValue={100}
                  maximumValue={10_000}
                />

                <View style={filterSheetStyles.amountInputContainer}>
                  <Input
                    containerStyle={filterSheetStyles.amountInput}
                    value={depositRange[0].toString()}
                    placeholder="From"
                    style={{ fontSize: 12 }}
                  />
                  <Input
                    containerStyle={filterSheetStyles.amountInput}
                    placeholder="To"
                    value={depositRange[1].toString()}
                    style={{ fontSize: 12 }}
                  />
                </View>
              </View>
              <View style={filterSheetStyles.depositFrequencyContainer}>
                <Input
                  label="Deposit Frequency"
                  keyboardType="numeric"
                  onChangeText={(v) => setFrequency(Number(v))}
                  value={frequency.toString()}
                  containerStyle={filterSheetStyles.depositFrequencyInput}
                />

                <View style={filterSheetStyles.selectContainer}>
                  <Select
                    value={frequencyDuration}
                    schema={{
                      label: "label",
                      value: "value",
                    }}
                    placeholder="Select Duration"
                    setValue={setFrequencyDuration}
                    items={timeUnits.map((unit) => ({
                      label: unit,
                      value: unit,
                    }))}
                  />
                </View>
              </View>
            </View>

            <Btn label="Save" style={{ marginTop: "auto" }} />
          </View>
        </Sheet>
      )}
    </View>
  );
}

export default FilterSheet;

const stylesGenerator = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      position: "relative",
    },
    searchContainer: {
      padding: spacing.sm,
      paddingBottom: 4,
    },
    searchInputContainer: {
      borderRadius: 8,
      backgroundColor: "#fff",
      padding: 4,
      flexDirection: "row",
      elevation: 2,
      shadowColor: "#000",
    },
    searchInput: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 4,
      fontSize: 14,
    },
    searchButton: {
      flexShrink: 0,
      backgroundColor: colors.primary,
      borderRadius: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    filterSortContainer: {
      flexDirection: "row",
      gap: 16,
      paddingTop: spacing.xs,
      marginBottom: 6,
    },
    filterButton: {
      flexDirection: "row",
      gap: 4,
      paddingVertical: 4,
    },
    sortButton: {
      flexDirection: "row",
      gap: 4,
      paddingVertical: 4,
      borderRadius: 8,
      paddingRight: 4,
    },
    filterText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#3E3E3E",
    },
    dropdownContent: {
      backgroundColor: "white",
      position: "relative",
      borderRadius: 8,
      minWidth: 160,
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.15)",
      elevation: 3,
      padding: 4,
    },
    sortField: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 6,
    },
  });

const filterSheetStyles = StyleSheet.create({
  container: {
    gap: 12,
    padding: spacing.sm,
    paddingTop: 0,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
  },
  resetButton: {
    flexDirection: "row",
    gap: 4,
  },
  resetText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  filterOptionContainer: {
    gap: 16,
  },
  filterOption: {},
  filterOptionLabel: {
    fontSize: 14,
    marginBottom: 2,
    color: Colors.light.secondaryText,
    fontWeight: "500",
  },
  amountInputContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  amountInput: {
    flex: 1,
    maxWidth: 100,
    minHeight: 0,
    height: 36,
  },
  depositFrequencyContainer: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "flex-end",
  },
  depositFrequencyInput: {
    flexGrow: 1,
  },
  selectContainer: {
    flex: 1,
    paddingTop: 18,
    flexShrink: 0,
    minWidth: 100,
    width: "100%",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
});
