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
    // thin: require("../assets/fonts/static/Montserrat-Thin.ttf"),
    // extraLight: require("../assets/fonts/static/Montserrat-ExtraLight.ttf"),
    // light: require("../assets/fonts/static/Montserrat-Light.ttf"),
    regular: require("../assets/fonts/manrope/static/Manrope-Regular.ttf"),
    medium: require("../assets/fonts/manrope/static/Manrope-Medium.ttf"),
    semiBold: require("../assets/fonts/manrope/static/Manrope-SemiBold.ttf"),
    bold: require("../assets/fonts/manrope/static/Manrope-Bold.ttf"),
    // extraBold: require("../assets/fonts/static/Montserrat-ExtraBold.ttf"),
    // black: require("../assets/fonts/static/Montserrat-Black.ttf"),

    // thinItalic: require("../assets/fonts/static/Montserrat-ThinItalic.ttf"),
    // extraLightItalic: require("../assets/fonts/static/Montserrat-ExtraLightItalic.ttf"),
    // lightItalic: require("../assets/fonts/static/Montserrat-LightItalic.ttf"),
    // italic: require("../assets/fonts/manrope/static/Manrope-Italic.ttf"),
    // mediumItalic: require("../assets/fonts/manrope/static/Manrope-MediumItalic.ttf"),
    // semiBoldItalic: require("../assets/fonts/manrope/static/Manrope-SemiBoldItalic.ttf"),
    // boldItalic: require("../assets/fonts/manrope/static/Manrope-BoldItalic.ttf"),
    // extraBoldItalic: require("../assets/fonts/static/Montserrat-ExtraBoldItalic.ttf"),
    // blackItalic: require("../assets/fonts/static/Montserrat-BlackItalic.ttf"),
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
