import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { ReactNode } from "react";
import Portal from "./Portal";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";

interface Props extends BottomSheetProps {
  viewProps?: Omit<BottomSheetViewProps, "children">;
  children: ReactNode[] | ReactNode | null;
  backdropStyle?: BottomSheetBackdropProps["style"];
}

export default function Sheet({
  backdropStyle,
  snapPoints = ["20%"],
  children,
  viewProps,
  ...rest
}: Props) {
  const theme = useColorScheme();
  const colors = Colors["light"];

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      style={[props.style, { flex: 1 }, backdropStyle]}
      opacity={0.7}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  );

  return (
    <Portal name="bottom-sheet">
      <BottomSheet
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        index={0}
        handleIndicatorStyle={{
          backgroundColor: "#D9D9D9",
          width: 60,
          height: 6,
        }}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
        {...rest}
      >
        <BottomSheetView {...viewProps}>{children}</BottomSheetView>
      </BottomSheet>
    </Portal>
  );
}
