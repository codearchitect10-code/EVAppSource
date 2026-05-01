import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, useToast } from "../context/ThemeContext";
import { Title, TopBar } from "../components";

const ReportViewerScreen = ({ onNavigate, onBack, subTarget, clearSubTarget }) => {
  const t = useTheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const [rTab, setRTab] = useState(subTarget === "dna" ? "dna" : "blood");

  useEffect(() => {
    if (subTarget) { setRTab(subTarget); clearSubTarget?.(); }
  }, [subTarget]);

  const bloodReports = [
    { n: "Cardiovascular Health", f: "EVA_Blood_Cardiovascular.pdf", d: "4 Feb 2025" },
    { n: "Blood Sugar & Metabolism", f: "EVA_Blood_Metabolic.pdf", d: "4 Feb 2025" },
    { n: "Inflammation & Liver", f: "EVA_Blood_Inflammation.pdf", d: "4 Feb 2025" },
    { n: "Nutrition & Vitamins", f: "EVA_Blood_Nutrition.pdf", d: "4 Feb 2025" },
    { n: "Hormones", f: "EVA_Blood_Hormones.pdf", d: "4 Feb 2025" },
    { n: "Kidney & Electrolytes", f: "EVA_Blood_Kidney.pdf", d: "4 Feb 2025" },
  ];
  const dnaReports = [
    { n: "Methylation Pathway", f: "EVA_DNA_Methylation.pdf" },
    { n: "Diet & Macronutrient Response", f: "EVA_DNA_Diet.pdf" },
    { n: "Food Sensitivities", f: "EVA_DNA_Sensitivities.pdf" },
    { n: "Cardiovascular Risk", f: "EVA_DNA_Cardiovascular.pdf" },
    { n: "Metabolic Risk", f: "EVA_DNA_Metabolic.pdf" },
    { n: "Cancer Risk Panel", f: "EVA_DNA_Cancer.pdf" },
    { n: "Neurological Risk", f: "EVA_DNA_Neurological.pdf" },
    { n: "Nutrigenomics", f: "EVA_DNA_Nutrigenomics.pdf" },
    { n: "Detoxification Pathways", f: "EVA_DNA_Detox.pdf" },
    { n: "Inflammation Genetics", f: "EVA_DNA_Inflammation.pdf" },
    { n: "Hormone Metabolism", f: "EVA_DNA_Hormones.pdf" },
    { n: "Sleep & Circadian", f: "EVA_DNA_Sleep.pdf" },
    { n: "Athletic Performance", f: "EVA_DNA_Athletic.pdf" },
    { n: "Skin & Ageing", f: "EVA_DNA_Skin.pdf" },
  ];
  const reports = rTab === "blood" ? bloodReports : dnaReports;

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <Title sub="Download your full reports as PDF.">My Reports</Title>
      <View style={{ flexDirection: "row", gap: 6, marginBottom: 16, backgroundColor: t.s2, borderRadius: 10, padding: 3 }}>
        {[{ id: "blood", l: "Blood Reports" }, { id: "dna", l: "DNA Reports" }].map(tb => (
          <TouchableOpacity key={tb.id} onPress={() => setRTab(tb.id)} style={{ flex: 1, backgroundColor: rTab === tb.id ? t.bg : "transparent", borderRadius: 8, paddingVertical: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: rTab === tb.id ? t.t1 : t.t3 }}>{tb.l}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {reports.map((r, i) => (
          <TouchableOpacity key={i} onPress={() => toast.show(`Downloading ${r.f}`, "success")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, paddingHorizontal: 16, backgroundColor: t.s1, borderRadius: 12, borderWidth: 1, borderColor: t.b1, marginBottom: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${t.purple}08`, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Rect x="2" y="1" width="12" height="14" rx="2" stroke={t.purple} strokeWidth="1.3"/>
                  <Path d="M5 7h6M5 10h4" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/>
                </Svg>
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "600", color: t.t1 }}>{r.n}</Text>
                <Text style={{ fontSize: 11, color: t.t3, marginTop: 2 }}>{r.f}</Text>
              </View>
            </View>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => toast.show(`Downloading all reports as ZIP`, "success")} style={{ marginTop: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1.5, borderColor: t.purple, borderRadius: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: t.purple }}>Download All {rTab === "blood" ? "Blood" : "DNA"} Reports</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReportViewerScreen;
