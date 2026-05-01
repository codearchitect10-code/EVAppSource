import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, useToast } from "../context/ThemeContext";
import { Btn } from "../components";

const EmailVerifyScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: t.bg, padding: 24, paddingTop: insets.top + 24 }}>
      <View style={{ width: 80, height: 80, borderRadius: 999, backgroundColor: `${t.purple}10`, borderWidth: 2, borderColor: `${t.purple}20`, alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <Rect x="4" y="8" width="28" height="20" rx="3" stroke={t.purple} strokeWidth="2.5" fill="none"/>
          <Path d="M4 11l14 10 14-10" stroke={t.purple} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
      </View>
      <Text style={{ fontSize: 24, fontWeight: "700", color: t.t1, marginBottom: 12, textAlign: "center" }}>Check Your Email</Text>
      <Text style={{ fontSize: 15, color: t.t2, textAlign: "center", lineHeight: 26, maxWidth: 280, marginBottom: 12 }}>We've sent a verification link to</Text>
      <Text style={{ fontSize: 16, fontWeight: "600", color: t.purple, marginBottom: 32 }}>daniel@eva.ae</Text>
      <Text style={{ fontSize: 14, color: t.t3, textAlign: "center", lineHeight: 24, maxWidth: 260, marginBottom: 36 }}>Tap the link in the email to verify your account, then come back here to continue.</Text>
      <Btn onPress={() => onNavigate("terms")} style={{ width: "100%", marginBottom: 10 }}>I've Verified My Email</Btn>
      <Btn variant="muted" onPress={() => toast.show("Verification email resent!", "success")} style={{ width: "100%" }}>Resend Email</Btn>
      <Text style={{ fontSize: 13, color: t.t2, marginTop: 16 }}>Didn't receive it? Check your spam folder.</Text>
    </View>
  );
};

export default EmailVerifyScreen;
