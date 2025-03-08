import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import Sheet from "./ui/Sheet";
import { Text } from "./ui/Text";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Btn } from "./ui/button";
import { z } from "zod";
import { useMemo } from "react";
import { spacing } from "@/constants/Spacing";
import Colors from "@/constants/Colors";

type Props = {
  onClose?: () => void;
  onSave?: () => void;
  isOpen?: boolean;
};

const formSchema = z.object({
  cycles: z
    .string()
    .nonempty("Number of cycles is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Cycles must be a positive number",
    }),
  amount: z
    .string()
    .nonempty("Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  depositFrequency: z.string().nonempty("Deposit Frequency is required"),
});

type FormData = z.infer<typeof formSchema>;

const CreateEqubSheet = (props: Props) => {
  const snapPoints = useMemo(() => ["60%"], []);
  if (!props.isOpen) return null;
  return (
    <Sheet
      backgroundStyle={{ backgroundColor: "#fff" }}
      snapPoints={snapPoints}
      onClose={props.onClose}
    >
      <View>
        <Step1 {...props} />
      </View>
    </Sheet>
  );
};

function Step1(props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <View style={{ padding: spacing.sm, paddingTop: 0 }}>
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

        <View
          style={{
            flexDirection: "row",
            gap: spacing.sm,
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
            name="depositFrequency"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                containerStyle={{ flexGrow: 1 }}
                value={value}
                error={errors.depositFrequency?.message}
              />
            )}
          />
        </View>
        {/* Submit Button */}
        <Btn label="Next" onPress={onSubmit} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

export default CreateEqubSheet;
