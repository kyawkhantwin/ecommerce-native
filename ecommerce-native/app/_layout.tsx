import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { config } from "@gluestack-ui/config";
import { store } from "../redux/store";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { useEffect } from "react";
import AppStack from "./AppStack";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppStack />
        </ThemeProvider>
      </GluestackUIProvider>
    </Provider>
  );
}
