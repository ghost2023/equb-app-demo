import { Text as RNText, TextProps } from "react-native";

const fonts = {
  thin: "thin",
  light: "light",
  regular: "regular",
  medium: "medium",
  semibold: "semiBold",
  bold: "bold",
  extrabold: "extraBold",
  black: "black",
  "100": "thin",
  "200": "extraLight",
  "300": "light",
  "400": "regular",
  "500": "semiBold",
  "600": "bold",
  "700": "extraBold",
  "800": "black",
};

// thin: require("../assets/fonts/static/Montserrat-Thin.ttf"),
// extraLight: require("../assets/fonts/static/Montserrat-ExtraLight.ttf"),
// light: require("../assets/fonts/static/Montserrat-Light.ttf"),
// regular: require("../assets/fonts/static/Montserrat-Regular.ttf"),
// medium: require("../assets/fonts/static/Montserrat-Medium.ttf"),
// semiBold: require("../assets/fonts/static/Montserrat-SemiBold.ttf"),
// bold: require("../assets/fonts/static/Montserrat-Bold.ttf"),
// extraBold: require("../assets/fonts/static/Montserrat-ExtraBold.ttf"),
// black: require("../assets/fonts/static/Montserrat-Black.ttf"),

const italics = {
  thin: "thinItalic",
  light: "lightItalic",
  regular: "italic",
  medium: "mediumItalic",
  semibold: "semiBoldItalic",
  bold: "boldItalic",
  extrabold: "extraBoldItalic",
  black: "blackItalic",
  "100": "thinItalic",
  "200": "extraLightItalic",
  "300": "lightItalic",
  "400": "italic",
  "500": "semiboldItalic",
  "600": "boldItalic",
  "700": "extraboldItalic",
  "800": "blackItalic",

  // thinItalic: require("../assets/fonts/static/Montserrat-ThinItalic.ttf"),
  // extraLightItalic: require("../assets/fonts/static/Montserrat-ExtraLightItalic.ttf"),
  // lightItalic: require("../assets/fonts/static/Montserrat-LightItalic.ttf"),
  // italic: require("../assets/fonts/static/Montserrat-Italic.ttf"),
  // mediumItalic: require("../assets/fonts/static/Montserrat-MediumItalic.ttf"),
  // semiBoldItalic: require("../assets/fonts/static/Montserrat-SemiBoldItalic.ttf"),
  // boldItalic: require("../assets/fonts/static/Montserrat-BoldItalic.ttf"),
  // extraBoldItalic: require("../assets/fonts/static/Montserrat-ExtraBoldItalic.ttf"),
  // blackItalic: require("../assets/fonts/static/Montserrat-BlackItalic.ttf"),
};

export function Text({ style, ...props }: TextProps) {
  let font = "regular";
  if (style) {
    if (
      !Array.isArray(style) &&
      typeof style === "object" &&
      style.fontWeight
    ) {
      const isItalic = style.fontStyle === "italic";
      // @ts-ignore
      if (isItalic) font = italics[style.fontWeight.toString()];
      // @ts-ignore
      else font = fonts[style.fontWeight.toString()];
    }
  }

  return (
    <RNText
      {...props}
      style={[style, { fontFamily: font, fontWeight: undefined }]}
    />
  );
}
