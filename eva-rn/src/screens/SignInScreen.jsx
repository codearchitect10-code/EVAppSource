import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { AppleIcon, EVAFullLogo, EyeIcon, GoogleIcon, LoadingBtn, Title, TopBar } from "../components";

const SignInScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({ email: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socialAuth, setSocialAuth] = useState(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const handleSignIn = () => { setLoading(true); setTimeout(() => onNavigate("otp-verify"), 300); };
  const handleSocial = (provider) => { setSocialAuth(provider); setTimeout(() => onNavigate("welcome-back"), 1500); };
  const u = (k, v) => setForm({ ...form, [k]: v });

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, paddingTop: insets.top, paddingHorizontal: 24, paddingBottom: 20 }}>
      <TopBar onBack={onBack} />
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <EVAFullLogo width={70} />
      </View>
      <Title sub="Welcome back to your longevity journey.">Sign In</Title>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={{ marginBottom: 14 }}>
          <Text style={{ fontSize: 11, color: t.t3, marginBottom: 12, letterSpacing: 2, fontWeight: "700" }}>EMAIL</Text>
          <TextInput
            value={form.email}
            onChangeText={(v) => u("email", v)}
            placeholder="you@example.com"
            placeholderTextColor={t.t4}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: t.s2,
              borderRadius: 12,
              paddingVertical: 17,
              paddingHorizontal: 19,
              borderWidth: 1,
              borderColor: form.email.length > 0 ? (emailValid ? t.emerald : `${t.gold}80`) : t.b2,
              fontSize: 16,
              color: t.t1,
            }}
          />
          {form.email.length > 0 && !emailValid && (
            <Text style={{ fontSize: 12, color: t.gold, marginTop: 6, fontWeight: "500" }}>
              Please enter a valid email address
            </Text>
          )}
        </View>

        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontSize: 11, color: t.t3, marginBottom: 12, letterSpacing: 2, fontWeight: "700" }}>PASSWORD</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              value={form.pass}
              onChangeText={(v) => u("pass", v)}
              placeholder="Enter your password"
              placeholderTextColor={t.t4}
              secureTextEntry={!showPass}
              style={{
                backgroundColor: t.s2,
                borderRadius: 12,
                paddingVertical: 17,
                paddingLeft: 19,
                paddingRight: 52,
                borderWidth: 1,
                borderColor: t.b2,
                fontSize: 16,
                color: t.t1,
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center" }}
            >
              <EyeIcon open={showPass} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          {error && <Text style={{ fontSize: 13, color: t.red, fontWeight: "500", flex: 1 }}>{error}</Text>}
          <TouchableOpacity onPress={() => onNavigate("forgot-password")} style={{ marginLeft: "auto" }}>
            <Text style={{ fontSize: 14, color: t.purple, fontWeight: "500" }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <LoadingBtn loading={loading} onPress={handleSignIn}>Sign In</LoadingBtn>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginVertical: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: t.b2 }} />
          <Text style={{ fontSize: 13, color: t.t3, fontWeight: "500" }}>or continue with</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: t.b2 }} />
        </View>

        <TouchableOpacity
          onPress={() => handleSocial("Apple")}
          style={{ backgroundColor: "#000", borderWidth: 1, borderColor: "#000", borderRadius: 14, paddingVertical: 13, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}
        >
          <AppleIcon size={24} color="#FFF" />
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#FFF" }}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSocial("Google")}
          style={{ backgroundColor: t.s2, borderWidth: 1, borderColor: t.b2, borderRadius: 14, paddingVertical: 13, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 }}
        >
          <GoogleIcon size={18} />
          <Text style={{ fontSize: 15, fontWeight: "600", color: t.t1 }}>Continue with Google</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={{ alignItems: "center", paddingBottom: 12 }}>
        <Text style={{ fontSize: 14, color: t.t3 }}>
          Don't have an account?{" "}
          <Text style={{ color: t.cyan, fontWeight: "600" }} onPress={() => onNavigate("create-account")}>
            Get Started
          </Text>
        </Text>
      </View>

      {socialAuth && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: `${t.bg}F2`, zIndex: 50, alignItems: "center", justifyContent: "center" }}>
          <View style={{
            width: 56, height: 56, borderRadius: 999,
            backgroundColor: socialAuth === "Apple" ? "#000" : t.s2,
            borderWidth: socialAuth === "Google" ? 1 : 0,
            borderColor: socialAuth === "Google" ? t.b2 : "transparent",
            alignItems: "center", justifyContent: "center", marginBottom: 20,
          }}>
            {socialAuth === "Apple" ? <AppleIcon size={24} color="#FFF" /> : <GoogleIcon size={24} />}
          </View>
          <Text style={{ fontSize: 17, fontWeight: "600", color: t.t1, marginBottom: 8 }}>
            Signing in with {socialAuth}
          </Text>
          <ActivityIndicator size="large" color={t.purple} />
        </View>
      )}
    </View>
  );
};

export default SignInScreen;
