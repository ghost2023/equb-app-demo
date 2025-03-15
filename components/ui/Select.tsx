import { Dispatch, SetStateAction, useState } from "react";
import Colors from "@/constants/Colors";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";

type Props<ValueType> = Omit<
  DropDownPickerProps<ValueType>,
  "open" | "setOpen"
> & {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const Select = <ValueType,>({
  style,
  arrowIconStyle,
  arrowIconContainerStyle,
  dropDownContainerStyle,
  multiple,
  ...props
}: Props<ValueType>) => {
  const [open, setOpen] = useState(false);

  return (
    // @ts-ignore
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      multiple={multiple as any}
      style={[
        {
          borderColor: "#00000033",
          borderWidth: 1,
          borderRadius: 8,
          backgroundColor: Colors.light.background,
          minHeight: 40,
        },
        style,
      ]}
      arrowIconStyle={[
        {
          height: 16,
          width: 16,
          borderColor: Colors.light.secondaryText,
        },
        arrowIconStyle,
      ]}
      dropDownContainerStyle={[
        {
          borderColor: "#00000033",
          backgroundColor: Colors.light.background,
          marginVertical: 4,
          elevation: 2,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.15)",
          zIndex: 10,
        },
        dropDownContainerStyle,
      ]}
      tickIconStyle={{
        height: 16,
        width: 16,
      }}
      listItemLabelStyle={{
        fontFamily: "medium",
        fontSize: 14,
      }}
      listItemContainerStyle={{
        height: "auto",
        paddingVertical: 8,
      }}
      placeholderStyle={{
        fontFamily: "regular",
        fontSize: 14,
        color: Colors.light.secondaryText,
      }}
      {...props}
    />
  );
};

export default Select;
