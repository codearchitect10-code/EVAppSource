import React from "react";
import { View, Text } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Btn } from "../components";

const BiometricPromptScreen = ({ onNavigate }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: t.bg, padding: 24, paddingTop: insets.top + 24 }}>
      <View style={{ width: 80, height: 80, borderRadius: 999, backgroundColor: `${t.purple}10`, borderWidth: 2, borderColor: `${t.purple}20`, alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <Path d="M18 6c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12" stroke={t.purple} strokeWidth="2" strokeLinecap="round"/>
          <Path d="M18 12c-3.3 0-6 2.7-6 6s2.7 6 6 6" stroke={t.purple} strokeWidth="2" strokeLinecap="round"/>
          <Circle cx="18" cy="18" r="2" fill={t.purple}/>
          <Path d="M10 28v2M14 30v2M18 30v2M22 30v2M26 28v2" stroke={t.purple} strokeWidth="1.5" strokeLinecap="round"/>
        </Svg>
      </View>
      <Text style={{ fontSize: 24, fontWeight: "700", color: t.t1, marginBottom: 12, textAlign: "center" }}>Enable Quick Login</Text>
      <Text style={{ fontSize: 15, color: t.t2, textAlign: "center", lineHeight: 26, maxWidth: 260, marginBottom: 36 }}>Use Face ID or fingerprint to sign in instantly. Your biometric data never leaves your device.</Text>
      <Btn onPress={() => onNavigate("welcome-back")} style={{ width: "100%", marginBottom: 10 }}>Enable Biometrics</Btn>
      <Btn variant="muted" onPress={() => onNavigate("welcome-back")} style={{ width: "100%" }}>Not Now</Btn>
    </View>
  );
};

export default BiometricPromptScreen;
