import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { EVAFullLogo, LoadingBtn, Title, TopBar } from "../components";

const OTPVerifyScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resent, setResent] = useState(false);
  const [method, setMethod] = useState("sms");
  const inputRefs = useRef([]);

  const handleVerify = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => onNavigate("biometric-prompt"), 300);
  };
  const handleResend = () => {
    setResent(true);
    setError(null);
    setCode(["", "", "", "", "", ""]);
    setTimeout(() => setResent(false), 3000);
  };
  const toggleMethod = () => {
    setMethod(m => m === "sms" ? "email" : "sms");
    setCode(["", "", "", "", "", ""]);
    setError(null);
    setResent(false);
  };
  const updateDigit = (idx, val) => {
    if (val.length > 1) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    if (val && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };
  const handleKeyPress = (idx, key) => {
    if (key === "Backspace" && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <View style={{ alignItems: "center", marginBottom: 28 }}>
        <EVAFullLogo width={80} />
      </View>
      <Title sub={method === "sms" ? "We've sent a 6-digit code to +971 50 ••• ••••" : "We've sent a 6-digit code to d•••••@eva.ae"}>Verify Your Identity</Title>
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 28 }}>
          {code.map((d, i) => (
            <TextInput
              key={i}
              ref={ref => { inputRefs.current[i] = ref; }}
              value={d}
              onChangeText={val => updateDigit(i, val)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
              maxLength={1}
              keyboardType="numeric"
              style={{ width: 44, height: 52, textAlign: "center", fontSize: 24, fontWeight: "700", color: t.t1, backgroundColor: t.s2, borderWidth: 1.5, borderColor: d ? t.purple : t.b2, borderRadius: 12 }}
            />
          ))}
        </View>
        {error && <Text style={{ textAlign: "center", marginBottom: 12, fontSize: 14, color: t.red, fontWeight: "500" }}>{error}</Text>}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          {resent ? (
            <Text style={{ fontSize: 14, color: t.emerald, fontWeight: "500" }}>New code sent!</Text>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, color: t.t2 }}>Didn't receive a code? </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={{ fontSize: 14, color: t.purple, fontWeight: "600" }}>Resend</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ width: "100%" }}>
          <LoadingBtn loading={loading} onPress={handleVerify}>Verify</LoadingBtn>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 12 }}>
        <Text style={{ fontSize: 12, color: t.t4 }}>Verification via {method === "sms" ? "SMS" : "email"}. </Text>
        <TouchableOpacity onPress={toggleMethod}>
          <Text style={{ fontSize: 12, color: t.purple, fontWeight: "600" }}>Use {method === "sms" ? "email" : "SMS"} instead</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPVerifyScreen;
