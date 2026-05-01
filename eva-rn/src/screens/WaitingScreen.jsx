import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Btn, Card, CheckIcon, Title, TopBar } from "../components";

const WaitingScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState("blood-pending");

  const phases = {
    "blood-pending": {
      title: "Your Tests Are Processing",
      sub: "Blood analysis takes 1–2 days. DNA takes 3–4 weeks. We'll notify you at each step.",
      steps: [
        { l: "Blood Test Completed", s: "done", d: "Collected 4 Feb 2025" },
        { l: "Blood Analysis", s: "active", d: "~1 day remaining" },
        { l: "DNA Taken", s: "done", d: "Registered 6 Feb 2025" },
        { l: "DNA Analysis", s: "pending", d: "~4 weeks" },
        { l: "Clinician Review", s: "pending", d: "24–48 hrs after results" },
        { l: "Supplement Protocol", s: "pending", d: "Your personalised regimen" },
        { l: "Daily DEVA™ Check-in", s: "pending", d: "Your longevity ritual begins" },
      ],
    },
    "blood-ready": {
      title: "Blood Results Ready!",
      sub: "Your clinician has reviewed your biomarkers. DNA analysis continues in the background.",
      steps: [
        { l: "Blood Test Completed", s: "done", d: "Collected 4 Feb 2025" },
        { l: "Blood Analysis", s: "done", d: "Complete — 70 biomarkers analysed" },
        { l: "DNA Taken", s: "done", d: "Registered 6 Feb 2025" },
        { l: "DNA Analysis", s: "active", d: "~3 weeks remaining" },
        { l: "Clinician Review (Blood)", s: "done", d: "Reviewed by Dr. Nival" },
        { l: "Initial Protocol Ready", s: "done", d: "Based on blood results" },
        { l: "Daily DEVA™ Active", s: "done", d: "Your daily briefing is live" },
      ],
    },
    "dna-pending": {
      title: "DNA Still Processing",
      sub: "Your blood-based protocol is active. DNA results will refine it further.",
      steps: [
        { l: "Blood Panel", s: "done", d: "70 biomarkers — Complete" },
        { l: "DNA Kit Processing", s: "active", d: "~1 week remaining" },
        { l: "Clinician Review (Blood)", s: "done", d: "Protocol active" },
        { l: "DNA Variant Analysis", s: "pending", d: "5+ variants expected" },
        { l: "Protocol Refinement", s: "pending", d: "DNA-informed updates" },
      ],
    },
    "all-ready": {
      title: "All Results Are In!",
      sub: "Blood + DNA combined. Your full biological profile is ready to explore.",
      steps: [
        { l: "Blood Panel", s: "done", d: "70 biomarkers analysed" },
        { l: "DNA Analysis", s: "done", d: "5 significant variants identified" },
        { l: "Clinician Review", s: "done", d: "Full review by Dr. Nival" },
        { l: "Supplement Protocol", s: "done", d: "DNA + Blood optimised" },
        { l: "DEVA™ Personalised", s: "done", d: "Fully calibrated to your biology" },
      ],
    },
  };

  const p = phases[phase];

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, paddingTop: insets.top, paddingHorizontal: 24, paddingBottom: 20 }}>
      <TopBar onBack={onBack} />
      <Title sub={p.sub}>{p.title}</Title>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {(phase === "blood-ready" || phase === "all-ready") && (
          <Card style={{ backgroundColor: `${t.emerald}08`, borderWidth: 1.5, borderColor: `${t.emerald}20`, marginBottom: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <CheckIcon size={18} color={t.emerald} />
              <Text style={{ fontSize: 15, fontWeight: "600", color: t.t1, flex: 1 }}>
                {phase === "all-ready"
                  ? "Full results available — tap below to view"
                  : "Blood results are in! Tap below to view your biomarkers."}
              </Text>
            </View>
          </Card>
        )}

        {p.steps.map((st, i, a) => (
          <View key={i} style={{ flexDirection: "row", gap: 16 }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <View style={{
                width: 30, height: 30, borderRadius: 999,
                backgroundColor: st.s === "done" ? t.emerald : st.s === "active" ? t.purple : t.s2,
                borderWidth: st.s === "pending" ? 1.5 : 0,
                borderColor: st.s === "pending" ? t.b2 : "transparent",
                alignItems: "center", justifyContent: "center",
              }}>
                {st.s === "done" && <CheckIcon size={14} />}
                {st.s === "active" && (
                  <View style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#FFF" }} />
                )}
              </View>
              {i < a.length - 1 && (
                <View style={{ width: 2, height: 32, backgroundColor: st.s === "done" ? `${t.emerald}50` : t.b1, borderRadius: 1 }} />
              )}
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: t.t1 }}>{st.l}</Text>
              <Text style={{ fontSize: 13, color: st.s === "active" ? t.cyan : st.s === "done" ? t.emerald : t.t3, marginTop: 6, fontWeight: "500" }}>
                {st.d}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={{ flexShrink: 0, paddingBottom: 8 }}>
        {(phase === "blood-ready" || phase === "all-ready") ? (
          <Btn onPress={() => onNavigate("results")}>View Your Results →</Btn>
        ) : (
          <View>
            <Text style={{ fontSize: 13, color: t.t2, textAlign: "center", marginBottom: 12, lineHeight: 22 }}>
              We'll notify you when your results are ready. In the meantime, explore the app.
            </Text>
            <Btn variant="secondary" onPress={() => onNavigate("today")}>Explore EVA™ →</Btn>
          </View>
        )}

        <View style={{ marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: t.b2, borderStyle: "dashed" }}>
          <Text style={{ fontSize: 10, fontWeight: "700", color: t.t4, letterSpacing: 2, textAlign: "center", marginBottom: 6 }}>
            TEST STATUS SIMULATOR
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {[
              { id: "blood-pending", l: "Waiting" },
              { id: "blood-ready", l: "Blood Ready" },
              { id: "dna-pending", l: "DNA Wait" },
              { id: "all-ready", l: "All Ready" },
            ].map((ph) => (
              <TouchableOpacity
                key={ph.id}
                onPress={() => setPhase(ph.id)}
                style={{
                  flex: 1,
                  backgroundColor: phase === ph.id ? `${t.t4}15` : t.s2,
                  borderWidth: 1,
                  borderColor: phase === ph.id ? t.t4 : t.b2,
                  borderStyle: "dashed",
                  borderRadius: 6,
                  paddingVertical: 6,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: "600", color: phase === ph.id ? t.t3 : t.t4 }}>
                  {ph.l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WaitingScreen;
