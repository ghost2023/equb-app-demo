import DateInput from "@/components/DateInput";
import Select from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";
import { Btn } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Colors from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { useSession } from "@/context/AuthProviders";
import { toast } from "@/lib/toastStore";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().nonempty("Required"),
  lastName: z.string().nonempty("Required"),
  pinCode: z.string().nonempty("Required"),
  dateOfBirth: z.date(),
  gender: z.enum(["male", "female"]),
});

type FormData = z.infer<typeof formSchema>;
const onboarding = () => {
  const auth = useSession();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    async mutationFn() {
      await new Promise((r) => setTimeout(r, 1000));
      await auth.signup({
        date_of_birth: new Date().toISOString(),
        first_name: "John",
        last_name: "Doe",
        phone: "+251946669787",
      });
    },
    onSuccess: () => {
      toast("Saved successfully", "success");
      router.push("/");
    },
  });

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.sm,
          paddingBottom: spacing.sm,
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Sign in</Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.light.secondaryText,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          Tell us a little about yourself
        </Text>
        <View
          style={{
            gap: 16,
          }}
        >
          <View style={{ flexDirection: "row", gap: spacing.xs }}>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Input
                  label="First Name"
                  placeholder="e.g. John"
                  keyboardType="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  containerStyle={{ flex: 1 }}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Input
                  label="Last Name"
                  placeholder="e.g. Doe"
                  keyboardType="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  containerStyle={{ flex: 1 }}
                  error={fieldState.error?.message}
                />
              )}
            />
          </View>

          <Controller
            name="dateOfBirth"
            control={form.control}
            render={({ field, fieldState }) => (
              <DateInput onChange={field.onChange} />
            )}
          />

          <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
              <View style={{ zIndex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 2,
                    color: Colors.light.secondaryText,
                  }}
                >
                  Gender
                </Text>
                <Select
                  items={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  listMode="SCROLLVIEW"
                  schema={{
                    label: "label",
                    value: "value",
                  }}
                  placeholder="Gender"
                  setValue={field.onChange}
                  value={field.value}
                />
                <View style={{ overflow: "hidden" }}>
                  {fieldState.error && (
                    <Animated.Text
                      exiting={FadeOutUp}
                      entering={FadeInUp}
                      style={[
                        {
                          color: "#fc8181",
                          paddingTop: 2,
                          fontSize: 12,
                          fontFamily: "Poppins-Medium",
                        },
                      ]}
                    >
                      {fieldState.error.message}
                    </Animated.Text>
                  )}
                </View>
              </View>
            )}
          />
          <Controller
            name="pinCode"
            control={form.control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <Input
                label="PIN Code"
                placeholder="e.g. 123456"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={fieldState.error?.message}
                secureTextEntry
              />
            )}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 12,
              borderColor: "#00000033",
              backgroundColor: Colors.light.background,
              borderRadius: 6,
              gap: 6,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: Colors.light.secondaryText,
                }}
              >
                Verification
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: Colors.light.secondaryText + "c0",
                }}
              >
                Upload your National Id or Passport (only images and pdfs)
              </Text>
              <View style={{ alignItems: "center", marginTop: 16 }}>
                <Feather
                  name="upload"
                  size={36}
                  color={Colors.light.secondaryText}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Btn
          label="Save"
          style={{ marginTop: "auto" }}
          onPress={() => mutation.mutate()}
          isLoading={mutation.isPending}
        />
      </ScrollView>
    </View>
  );
};

export default onboarding;
