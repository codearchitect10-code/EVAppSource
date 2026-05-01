import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { DanielAvatar } from "../components";

const WelcomeBackScreen = ({ onNavigate }) => {
  const t = useTheme();
  useEffect(() => {
    const tm = setTimeout(() => onNavigate("today"), 1800);
    return () => clearTimeout(tm);
  }, []);
  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: t.bg }}>
      <DanielAvatar size={80} border={`3px solid ${t.purple}40`} />
      <Text style={{ fontSize: 24, fontWeight: "700", color: t.t1, marginTop: 20 }}>Welcome back, Daniel</Text>
      <Text style={{ fontSize: 15, color: t.t2, marginTop: 8 }}>Let's check your biology.</Text>
    </View>
  );
};

export default WelcomeBackScreen;
