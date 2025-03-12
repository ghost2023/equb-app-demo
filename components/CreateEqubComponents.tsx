import {
  Dimensions,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import Sheet from "./ui/Sheet";
import { Text } from "./ui/Text";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Btn } from "./ui/button";
import { z } from "zod";
import { useMemo, useRef, useState } from "react";
import { spacing } from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/lib/toastStore";
import BottomSheet from "@gorhom/bottom-sheet";
import Dropdown from "./ui/Dropdown";

type Props = {
  onClose?: () => void;
  onSave?: () => void;
  isOpen?: boolean;
};

const timeUnits = ["Day", "Week", "Month"] as const;

const formSchema = z.object({
  cycles: z
    .string()
    .nonempty("Required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Invalid",
    }),
  amount: z
    .string()
    .nonempty("Required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Invalid",
    }),
  depositFrequency: z.string().nonempty("Required"),
  depositFrequencyUnit: z.enum(timeUnits).default("Day"),
});

type FormData = z.infer<typeof formSchema>;

const CreateEqubSheet = (props: Props) => {
  const [step1Data, setStep1Data] = useState<FormData | undefined>();
  const snapPoints = useMemo(() => [360, 420], []);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const translateX = useSharedValue(0);
  const setPage = (val: number) => {
    translateX.value = withSpring(val * Dimensions.get("window").width * -1, {
      damping: 10,
      stiffness: 100,
      mass: 1,
      overshootClamping: true,
    });
  };

  const mutation = useMutation({
    async mutationFn(terms: string) {
      console.log({ terms, ...step1Data });
    },
    onSuccess: () => {
      toast("Saved successfully", "success");
      bottomSheetRef.current?.close();
      props.onClose?.();
    },
  });

  if (!props.isOpen) return null;
  return (
    <Sheet
      backgroundStyle={{ backgroundColor: "#fff" }}
      snapPoints={snapPoints}
      onClose={props.onClose}
      ref={bottomSheetRef}
      enablePanDownToClose={false}
      viewProps={{ style: { flex: 1 } }}
    >
      <Animated.View
        style={{ flexDirection: "row", transform: [{ translateX }], flex: 1 }}
      >
        <Step1
          onSave={(data) => {
            setPage(1);
            return setStep1Data(data);
          }}
        />
        <Step2
          setPage={setPage}
          onSave={mutation.mutate}
          isSubmitting={mutation.isPending}
        />
      </Animated.View>
    </Sheet>
  );
};

type StepProps = {
  onSave: (data: FormData) => void;
};

function Step1(props: StepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = handleSubmit((data) => {
    props.onSave(data);
  });
  const width = useWindowDimensions().width;
  console.log(errors);
  return (
    <View style={{ padding: spacing.sm, paddingTop: 0, width }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Create Your Equib</Text>
      <Text
        style={{
          fontSize: 14,
          color: Colors.light.secondaryText,
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        Start your savings journey with friends and family
      </Text>
      <View style={{ gap: spacing.xs }}>
        <Controller
          name="cycles"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Number of cycles"
              placeholder="e.g. 5"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.cycles?.message}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Amount"
              placeholder="e.g. 1000"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.amount?.message}
            />
          )}
        />

        <View>
          <View
            style={{
              flexDirection: "row",
              gap: spacing.xs,
              alignItems: "flex-end",
            }}
          >
            <Controller
              name="depositFrequency"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Deposit Frequency"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  containerStyle={{ flexGrow: 1 }}
                  error={errors.depositFrequency?.message}
                />
              )}
            />

            <Controller
              name="depositFrequencyUnit"
              control={control}
              render={({ field }) => (
                <View
                  style={{
                    flex: 1,
                    paddingTop: 18,
                    flexShrink: 0,
                    minWidth: 100,
                    width: "100%",
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                  }}
                >
                  <Dropdown
                    value={field.value}
                    schema={{
                      label: "label",
                      value: "value",
                    }}
                    placeholder="Select Duration"
                    setValue={(v) => field.onChange(v(field.value))}
                    items={timeUnits.map((unit) => ({
                      label: unit,
                      value: unit,
                    }))}
                  />
                </View>
              )}
            />
          </View>
        </View>

        {/* Submit Button */}
        <Btn label="Next" onTouchStart={onSubmit} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

function Step2(props: {
  setPage: (val: number) => void;
  onSave: (val: string) => void;
  isSubmitting: boolean;
}) {
  const [terms, setTerms] = useState("");
  const width = useWindowDimensions().width;
  return (
    <View style={{ padding: spacing.sm, paddingTop: 0, width }}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 16 }}>
        Create Your Equib
      </Text>
      <View style={{ gap: spacing.xs }}>
        <Input
          label="Terms and Conditions"
          onChangeText={setTerms}
          textAlignVertical="top"
          multiline
          style={{ height: 200 }}
        />
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPressIn={() => props.setPage(0)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#00000033",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: Colors.light.secondaryText,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <Btn
            label="Save"
            onPressOut={() => props.onSave(terms)}
            isLoading={props.isSubmitting}
          />
        </View>
      </View>
    </View>
  );
}

export default CreateEqubSheet;
