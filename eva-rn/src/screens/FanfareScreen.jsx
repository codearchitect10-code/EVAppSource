import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Btn, CheckIcon } from "../components";

const FanfareScreen = ({ onNavigate }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const steps = [
    { n: "1", l: "Complete your biology test", s: "Check your email for fasting instructions", c: t.purple },
    { n: "2", l: "Sample processing & analysis", s: "Blood: ~5 days · DNA: ~5 weeks", c: t.cyan },
    { n: "3", l: "Your personalised protocol begins", s: "Protocol activation on Day 7", c: t.emerald },
  ];
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginBottom: 24 }}>
          <View style={{ width: 80, height: 80, borderRadius: 999, backgroundColor: `${t.emerald}12`, borderWidth: 2, borderColor: `${t.emerald}30`, alignItems: "center", justifyContent: "center" }}>
            <CheckIcon size={36} color={t.emerald} />
          </View>
        </View>
        <Text style={{ fontSize: 26, fontWeight: "800", color: t.t1, textAlign: "center", letterSpacing: -0.5 }}>You're all set!</Text>
        <Text style={{ fontSize: 15, color: t.t2, marginTop: 10, textAlign: "center", lineHeight: 26, maxWidth: 280 }}>Your biology test is booked and your health profile is ready. Here's what happens next.</Text>
        <View style={{ width: "100%", marginTop: 28 }}>
          {steps.map((step, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 14 }}>
              <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${step.c}12`, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: "700", color: step.c }}>{step.n}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: "600", color: t.t1 }}>{step.l}</Text>
                <Text style={{ fontSize: 12, color: t.t3, marginTop: 2 }}>{step.s}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={{ flexShrink: 0, paddingBottom: 8 }}>
        <Btn onPress={() => onNavigate("today")}>Start Exploring EVA™ →</Btn>
      </View>
    </View>
  );
};

export default FanfareScreen;
