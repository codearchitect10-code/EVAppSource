import React from "react";
import { View, Text, ScrollView } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Card, Label, PillIcon, TopBar } from "../components";

const SupplementDetailScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const doseBadges = [
    { l: "Dose", v: "600mg", c: t.purple },
    { l: "Frequency", v: "Evening", c: t.cyan },
    { l: "With", v: "Dinner", c: t.emerald },
  ];
  const targets = [
    { m: "Magnesium (RBC)", f: "4.2 mEq/L", tgt: "4.8 mEq/L", by: "Next re-test" },
    { m: "Deep Sleep", f: "Variable", tgt: "Improvement within 14 days", by: "Wearable tracking" },
  ];
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: `${t.purple}10`, borderWidth: 1.5, borderColor: `${t.purple}20`, alignItems: "center", justifyContent: "center" }}>
          <PillIcon size={28} />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "700", color: t.t1 }}>Magnesium Glycinate</Text>
          <Text style={{ fontSize: 14, color: t.t3, marginTop: 2 }}>SKU: 52438 · Capsule</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
          {doseBadges.map(d => (
            <View key={d.l} style={{ flex: 1, backgroundColor: t.s1, borderRadius: 10, padding: 15, paddingHorizontal: 8, alignItems: "center", borderWidth: 1, borderColor: t.b1 }}>
              <Text style={{ fontSize: 17, fontWeight: "700", color: d.c }}>{d.v}</Text>
              <Text style={{ fontSize: 10, color: t.t3, marginTop: 6, fontWeight: "600", letterSpacing: 0.3 }}>{d.l}</Text>
            </View>
          ))}
        </View>
        <Card style={{ backgroundColor: "#F59E0B08", borderWidth: 1.5, borderColor: "#F59E0B20", marginBottom: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <Circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.3"/>
              <Path d="M8 4v5l3 2" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/>
            </Svg>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#F59E0B", letterSpacing: 0.5 }}>WEARABLE ADJUSTMENT ACTIVE</Text>
          </View>
          <Text style={{ fontSize: 13, color: t.t2, lineHeight: 20 }}>+200mg added due to HRV drop. Day 2 of 7. Base dose: 400mg.</Text>
        </Card>
        <Label>Why This Supplement</Label>
        <Card>
          <Text style={{ fontSize: 14, color: t.t2, lineHeight: 24 }}>Your RBC magnesium is 4.2 mEq/L (optimal: 4.5–5.5). Your TRPM6 gene variant (rs11144134) indicates reduced magnesium absorption efficiency, requiring the glycinate form for maximum bioavailability. Magnesium supports recovery, sleep quality, cardiovascular function, and over 300 enzymatic reactions.</Text>
        </Card>
        <Label>Biological Targets</Label>
        {targets.map((tg, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: t.t1, marginBottom: 4 }}>{tg.m}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 13, color: t.t3 }}>
                {"Current: "}
                <Text style={{ color: t.gold, fontWeight: "600" }}>{tg.f}</Text>
              </Text>
              <Text style={{ fontSize: 13, color: t.t3 }}>
                {"Target: "}
                <Text style={{ color: t.emerald, fontWeight: "600" }}>{tg.tgt}</Text>
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: t.t4, marginTop: 4 }}>{tg.by}</Text>
          </Card>
        ))}
        <Label>Adherence</Label>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: t.t1 }}>Last 30 days</Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: t.emerald }}>87%</Text>
          </View>
          <View style={{ height: 6, backgroundColor: t.bg, borderRadius: 3 }}>
            <View style={{ width: "87%", height: "100%", backgroundColor: t.emerald, borderRadius: 3 }} />
          </View>
          <Text style={{ fontSize: 12, color: t.t3, marginTop: 6 }}>26 of 30 days taken · Excellent consistency</Text>
        </Card>
        <Label>Interactions</Label>
        <Card style={{ padding: 14 }}>
          <Text style={{ fontSize: 13, color: t.t2, lineHeight: 22 }}>
            {"• Take 2+ hours apart from iron supplements (reduces absorption)\n• Safe to combine with all other EVA™ protocol supplements\n• Glycinate form is gentle on the stomach — no food timing restriction required"}
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
};

export default SupplementDetailScreen;
