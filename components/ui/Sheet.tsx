import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef } from "react";
import Portal from "./Portal";
import Colors from "@/constants/Colors";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";

interface Props extends BottomSheetProps {
  viewProps?: Omit<BottomSheetViewProps, "children">;
  children: ReactNode[] | ReactNode | null;
  backdropStyle?: BottomSheetBackdropProps["style"];
}

const Sheet = forwardRef<BottomSheet, Props>(
  ({ backdropStyle, children, viewProps, ...rest }, ref) => {
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
          ref={ref}
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
  },
);

export default Sheet;
