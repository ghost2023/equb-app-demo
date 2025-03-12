import { Providers } from "@/context/providers";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    regular: require("../assets/fonts/manrope/static/Manrope-Regular.ttf"),
    medium: require("../assets/fonts/manrope/static/Manrope-Medium.ttf"),
    semiBold: require("../assets/fonts/manrope/static/Manrope-SemiBold.ttf"),
    bold: require("../assets/fonts/manrope/static/Manrope-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="onboarding"
        options={{
          title: "Onboarding",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontFamily: "semiBold",
          },
        }}
      />
    </Stack>
  );
}
