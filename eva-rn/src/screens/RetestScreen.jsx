import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Btn, Card, Label, Title, TopBar } from "../components";

const RetestScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const improved = [
    { m: "Vitamin D", from: "18", to: "32", u: "ng/mL", d: "Protocol: 4,000 IU D3 + K2" },
    { m: "Magnesium", from: "4.2", to: "4.8", u: "mEq/L", d: "Protocol: 600mg Glycinate" },
  ];
  const keyMarkers = [
    { l: "Vitamin D", f: "18 ng/mL", to: "40+ ng/mL", dir: "up" },
    { l: "Magnesium", f: "4.2 mEq/L", to: "4.5+ mEq/L", dir: "up" },
    { l: "hs-CRP", f: "2.8 mg/L", to: "<1.0 mg/L", dir: "down" },
  ];
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <Label color={t.gold}>Re-Evaluation Due</Label>
      <Title sub="90 days since your last panel.">Time to re-test.</Title>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Card>
          <Text style={{ fontSize: 11, color: t.t3, marginBottom: 14, letterSpacing: 2, fontWeight: "700" }}>YOUR PROGRESS</Text>
          <Card style={{ backgroundColor: `${t.emerald}06`, borderWidth: 1, borderColor: `${t.emerald}18`, marginBottom: 12, padding: 14 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: t.emerald, letterSpacing: 1, marginBottom: 8 }}>IMPROVED</Text>
            {improved.map((x, i) => (
              <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: `${t.emerald}15` }}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: t.t1 }}>{x.m}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text style={{ fontSize: 13, color: t.t3 }}>{x.from}</Text>
                  <Text style={{ fontSize: 12, color: t.emerald }}>→</Text>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: t.emerald }}>{x.to} {x.u}</Text>
                </View>
              </View>
            ))}
          </Card>
          <Card style={{ backgroundColor: `${t.gold}06`, borderWidth: 1, borderColor: `${t.gold}18`, marginBottom: 12, padding: 14 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: t.gold, letterSpacing: 1, marginBottom: 8 }}>STILL WORKING ON</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: t.t1 }}>hs-CRP</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text style={{ fontSize: 13, color: t.t3 }}>2.8</Text>
                <Text style={{ fontSize: 12, color: t.gold }}>→</Text>
                <Text style={{ fontSize: 14, fontWeight: "700", color: t.gold }}>1.4 mg/L</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: t.t3, marginTop: 4 }}>{"Target: <1.0 · Protocol adjusted: Omega-3 dose increased, curcumin added"}</Text>
          </Card>
          <Text style={{ fontSize: 11, fontWeight: "700", color: t.t3, letterSpacing: 2, marginBottom: 10, marginTop: 16 }}>KEY MARKERS TO COMPARE</Text>
          {keyMarkers.map((r, i) => (
            <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 11, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: t.bg }}>
              <Text style={{ fontSize: 14, color: t.t1, flex: 1, fontWeight: "500" }}>{r.l}</Text>
              <Text style={{ fontSize: 14, fontWeight: "600", color: t.red }}>{r.f}</Text>
              <View style={{ marginHorizontal: 6 }}>
                <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  {r.dir === "down"
                    ? <Path d="M5 2v6M5 8L2.5 5.5M5 8l2.5-2.5" stroke={t.emerald} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    : <Path d="M5 8V2M5 2L2.5 4.5M5 2l2.5 2.5" stroke={t.emerald} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  }
                </Svg>
              </View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: t.emerald }}>{r.to}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
      <View style={{ flexShrink: 0, paddingBottom: 8 }}>
        <Btn onPress={() => onNavigate("book-test")}>Book Re-Test</Btn>
        <TouchableOpacity onPress={onBack} style={{ alignItems: "center", marginTop: 12 }}>
          <Text style={{ fontSize: 14, color: t.t3 }}>Remind me later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RetestScreen;
