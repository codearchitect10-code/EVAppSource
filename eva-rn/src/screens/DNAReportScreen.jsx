import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, useToast } from "../context/ThemeContext";
import { Card, Label, Title, TopBar } from "../components";

const DNAReportScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const variants = [
    { gene: "MTHFR", variant: "C677T Heterozygous", impact: "Reduced folate metabolism", risk: "medium", action: "Methylated B-Complex added to protocol" },
    { gene: "TRPM6", variant: "rs11144134", impact: "Reduced magnesium absorption", risk: "medium", action: "Higher Mg dosage + glycinate form prescribed" },
    { gene: "VDR", variant: "FokI polymorphism", impact: "Vitamin D receptor efficiency reduced", risk: "medium", action: "4,000 IU D3 protocol (higher than standard)" },
    { gene: "APOE", variant: "ε3/ε3", impact: "Standard cardiovascular risk profile", risk: "low", action: "No additional intervention required" },
    { gene: "CYP1A2", variant: "Fast metaboliser", impact: "Rapid caffeine clearance", risk: "low", action: "No caffeine restriction needed" },
  ];
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Title>DNA Analysis Report</Title>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={() => toast.show("Downloading report...", "info")} style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: t.s2, alignItems: "center", justifyContent: "center" }}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path d="M8 2v8M8 10l-3-3M8 10l3-3M3 14h10" stroke={t.t1} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toast.show("Share link copied!", "success")} style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: t.s2, alignItems: "center", justifyContent: "center" }}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Circle cx="12" cy="4" r="2" stroke={t.t1} strokeWidth="1.3"/>
              <Circle cx="4" cy="8" r="2" stroke={t.t1} strokeWidth="1.3"/>
              <Circle cx="12" cy="12" r="2" stroke={t.t1} strokeWidth="1.3"/>
              <Path d="M6 7l4-2M6 9l4 2" stroke={t.t1} strokeWidth="1.3"/>
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Card style={{ padding: 22, marginBottom: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
            <View>
              <Text style={{ fontSize: 12, color: t.t3, fontWeight: "600", letterSpacing: 1 }}>PATIENT</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: t.t1, marginTop: 4 }}>Daniel Salewski</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 12, color: t.t3, fontWeight: "600", letterSpacing: 1 }}>DATE</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: t.t1, marginTop: 4 }}>28 Feb 2025</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 12, color: t.t3, fontWeight: "600", letterSpacing: 1 }}>PROVIDER</Text>
              <Text style={{ fontSize: 14, fontWeight: "500", color: t.t2, marginTop: 4 }}>OmicsEdge Genomics</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 12, color: t.t3, fontWeight: "600", letterSpacing: 1 }}>VARIANTS</Text>
              <Text style={{ fontSize: 14, fontWeight: "500", color: t.t2, marginTop: 4 }}>5 clinically significant</Text>
            </View>
          </View>
        </Card>
        <Label>Significant Variants</Label>
        {variants.map((g, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: t.purple }}>{g.gene}</Text>
                <Text style={{ fontSize: 12, color: t.t3 }}>{g.variant}</Text>
              </View>
              <View style={{ backgroundColor: g.risk === "low" ? `${t.emerald}12` : `${t.gold}12`, padding: 5, paddingHorizontal: 10, borderRadius: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: "600", color: g.risk === "low" ? t.emerald : t.gold }}>{g.risk === "low" ? "LOW" : "MODERATE"}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, fontWeight: "500", color: t.t1, marginBottom: 4 }}>{g.impact}</Text>
            <Text style={{ fontSize: 13, color: t.t2 }}>{g.action}</Text>
          </Card>
        ))}
        <Text style={{ textAlign: "center", paddingVertical: 20, fontSize: 13, color: t.t4 }}>Full report: 24 pages · PDF available for download</Text>
      </ScrollView>
    </View>
  );
};

export default DNAReportScreen;
