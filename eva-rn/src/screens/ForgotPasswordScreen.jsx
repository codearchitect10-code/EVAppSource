import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Btn, EVAFullLogo, Title, TopBar } from "../components";

const ForgotPasswordScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const fEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <View style={{ alignItems: "center", marginBottom: 28 }}>
        <EVAFullLogo width={80} />
      </View>
      {!sent ? (
        <>
          <Title sub="Enter your email and we'll send you a reset link.">Reset Password</Title>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: t.t3, marginBottom: 12, letterSpacing: 2, fontWeight: "700" }}>EMAIL</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ backgroundColor: t.s2, borderRadius: 12, padding: 17, paddingHorizontal: 19, borderWidth: 1, borderColor: t.b2, fontSize: 16, color: t.t1 }}
              placeholderTextColor={t.t4}
            />
          </View>
          <View style={{ flexShrink: 0, paddingBottom: 8 }}>
            <Btn onPress={fEmailValid ? () => setSent(true) : undefined} style={{ opacity: fEmailValid ? 1 : 0.4 }}>Send Reset Link</Btn>
          </View>
        </>
      ) : (
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 80, height: 80, borderRadius: 999, backgroundColor: `${t.emerald}12`, borderWidth: 2, borderColor: `${t.emerald}30`, alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <Text style={{ fontSize: 38 }}>✉</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: "700", color: t.t1, marginBottom: 12, textAlign: "center" }}>Check Your Email</Text>
          <Text style={{ fontSize: 15, color: t.t2, textAlign: "center", lineHeight: 26, maxWidth: 260, marginBottom: 32 }}>
            {"We've sent a password reset link to "}
            <Text style={{ color: t.t1, fontWeight: "600" }}>{email || "your email"}</Text>
            {"."}
          </Text>
          <Btn variant="secondary" onPress={onBack}>Back to Sign In</Btn>
        </View>
      )}
    </View>
  );
};

export default ForgotPasswordScreen;
