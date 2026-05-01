import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeCtx, ToastCtx } from "./src/context/ThemeContext";
import themes from "./src/theme/tokens";

export default function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const theme = themes[themeMode];

  const toast = {
    show: (msg) => console.log("[Toast]", msg),
  };

  return (
    <SafeAreaProvider>
      <ThemeCtx.Provider value={theme}>
        <ToastCtx.Provider value={toast}>
          <View style={[styles.container, { backgroundColor: theme.bg }]}>
            <Text style={[styles.text, { color: theme.t1 }]}>EVA</Text>
            <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
          </View>
        </ToastCtx.Provider>
      </ThemeCtx.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: 4,
  },
});
