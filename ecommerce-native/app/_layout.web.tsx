import React, { createContext, useContext, useState } from "react";
import { store } from "@/redux/store";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, View } from "@gluestack-ui/themed";
import { Provider } from "react-redux";
import AppStack from "./AppStack";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { AuthProvider } from "@/context/AuthContext";

export const ThemeContext = createContext(null);

export default function TabLayout() {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = (value: string) => {
    setColorScheme(value);
  };
  return (
    <GluestackUIProvider config={config} colorMode={colorScheme}>

    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <AppStack />
          </ThemeProvider>
      </AuthProvider>
      </Provider>
    </ThemeContext.Provider>
    </GluestackUIProvider>

  );
}

// Use the ThemeProviderComponent to wrap your App
