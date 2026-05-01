import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { Btn, EVAFullLogo } from "../components";

const DNAIcon = ({ c }) => (
  <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <Path d="M8 3v20M18 3v20" stroke={c} strokeWidth="1.8" />
    <Path d="M8 7h10M8 13h10M8 19h10" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    <Circle cx="8" cy="3" r="1.5" fill={c} />
    <Circle cx="18" cy="3" r="1.5" fill={c} />
    <Circle cx="8" cy="23" r="1.5" fill={c} />
    <Circle cx="18" cy="23" r="1.5" fill={c} />
  </Svg>
);

const BloodIcon = ({ c }) => (
  <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <Path d="M13 2C13 2 5 12 5 17a8 8 0 0016 0c0-5-8-15-8-15z" stroke={c} strokeWidth="1.8" fill={`${c}15`} />
    <Circle cx="13" cy="17" r="3" stroke={c} strokeWidth="1.5" fill="none" />
  </Svg>
);

const SuppIcon = ({ c }) => (
  <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <Rect x="8" y="2" width="10" height="22" rx="5" stroke={c} strokeWidth="1.8" fill={`${c}10`} />
    <Line x1="8" y1="13" x2="18" y2="13" stroke={c} strokeWidth="1.5" />
    <Circle cx="13" cy="8" r="1.5" fill={c} />
  </Svg>
);

const WelcomeScreen = ({ onNavigate }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const features = [
    { l: "DNA", s: "Your past", c: t.purple, I: DNAIcon },
    { l: "Blood", s: "Your present", c: t.cyan, I: BloodIcon },
    { l: "Supplements", s: "Your future", c: t.emerald, I: SuppIcon },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, paddingTop: insets.top + 8, paddingHorizontal: 24, paddingBottom: 24 }}>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginBottom: 36 }}>
          <EVAFullLogo width={100} />
        </View>

        <Text style={{ fontSize: 36, fontWeight: "800", color: t.t1, lineHeight: 40, letterSpacing: -0.8, marginBottom: 16, textAlign: "center" }}>
          Your gateway{"\n"}to longevity.
        </Text>

        <Text style={{ fontSize: 16, color: t.t2, lineHeight: 27, textAlign: "center", alignSelf: "center", maxWidth: 280 }}>
          DNA. Blood. Supplements. Unified into one personalised platform that translates your biology into daily action.
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 48 }}>
          {features.map((p) => (
            <View key={p.l} style={{ alignItems: "center", flex: 1 }}>
              <View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: `${p.c}0A`, borderWidth: 1.5, borderColor: `${p.c}18`, alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <p.I c={p.c} />
              </View>
              <Text style={{ fontSize: 13, fontWeight: "700", color: t.t1, letterSpacing: 0.3 }}>{p.l}</Text>
              <Text style={{ fontSize: 11, color: t.t3, marginTop: 6, fontWeight: "500" }}>{p.s}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: "column", gap: 12, paddingBottom: 12 }}>
        <Btn onPress={() => onNavigate("create-account")}>Get Started</Btn>
        <Btn variant="secondary" onPress={() => onNavigate("learn")}>Learn More</Btn>
        <Text style={{ textAlign: "center", fontSize: 14, color: t.t3, marginTop: 12 }}>
          Already have an account?{" "}
          <Text style={{ color: t.cyan, fontWeight: "600" }} onPress={() => onNavigate("signin")}>
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
