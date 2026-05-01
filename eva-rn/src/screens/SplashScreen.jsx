import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { EVAFullLogo } from "../components";

const SplashScreen = ({ onNext }) => {
  const t = useTheme();
  useEffect(() => {
    const tm = setTimeout(onNext, 2200);
    return () => clearTimeout(tm);
  }, [onNext]);
  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: t.bg }}>
      <EVAFullLogo width={170} />
      <View style={{ position: "absolute", bottom: 64 }}>
        <Text style={{ fontSize: 12, letterSpacing: 3, color: t.t4, fontWeight: "500" }}>BioIntel in your pocket</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
