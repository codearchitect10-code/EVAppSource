import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, Line, Defs, LinearGradient, Stop, G, Text as SvgText } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { Card, MiniDNA, TopBar, VideoCard } from "../components";

const BioAgeScreen = ({ onBack, onNavigate }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState(0);
  const [openMarker, setOpenMarker] = useState(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => setPhase(4), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const bio = 34, chron = 38, diff = chron - bio, pace = 0.88;
  const pacePos = ((pace + 1) / 4) * 100;
  const sc = t.emerald;
  const hist = [{ d: "Feb", v: 36 }, { d: "May", v: 35 }, { d: "Aug", v: 34.5 }, { d: "Nov", v: 34 }];
  const minV = 30, maxV = 42;

  const mks = [
    { n: "hs-CRP", lb: "Inflammation", s: "improving", pct: 50, info: "Measures systemic inflammation. Trending down with Omega-3 protocol. Target: below 1.0 mg/L." },
    { n: "HbA1c", lb: "Blood Sugar", s: "optimal", pct: 85, info: "Average blood sugar over 3 months. Healthy glucose metabolism. Maintained with chromium and berberine." },
    { n: "Vitamin D", lb: "Immune", s: "improving", pct: 62, info: "Supports immune function, bone health, mood. Your VDR variant needs higher doses. Currently on 4,000 IU D3 + K2." },
    { n: "Testosterone", lb: "Hormones", s: "optimal", pct: 90, info: "Key androgen for muscle, energy, mood. Levels within optimal range. No intervention needed." },
    { n: "Triglycerides", lb: "Heart", s: "optimal", pct: 88, info: "Blood fat linked to cardiovascular risk. Levels healthy, supported by Omega-3 and dietary guidance." },
    { n: "eGFR", lb: "Kidney", s: "optimal", pct: 92, info: "Estimated kidney filtration rate. Kidney function is excellent. No concerns." },
  ];

  const chartW = 280;
  const pts = hist.map((h, i) => ({
    x: 20 + (i / (hist.length - 1)) * 240,
    y: 12 + ((maxV - h.v) / (maxV - minV)) * 85,
  }));
  const pathD = pts.map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x} ${pt.y}`).join(" ");
  const fillD = `${pathD} L${pts[pts.length - 1].x} 100 L${pts[0].x} 100 Z`;

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg }}>
      <View style={{ paddingTop: insets.top, paddingHorizontal: 24, flexShrink: 0 }}>
        <TopBar onBack={onBack} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* DNA HERO replaced with MiniDNA */}
        <View style={{ alignItems: "center", paddingVertical: 24, position: "relative" }}>
          <MiniDNA w={220} h={110} emerald={t.emerald} gold={t.gold} cyan={t.cyan} />
          <View style={{ position: "absolute", top: 0, bottom: 0, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 52, fontWeight: "800", color: sc, letterSpacing: -3, lineHeight: 56, opacity: phase >= 1 ? 1 : 0 }}>{bio}</Text>
            <Text style={{ fontSize: 11, color: sc, fontWeight: "900", letterSpacing: 3, marginTop: 5, opacity: phase >= 1 ? 1 : 0 }}>EVA™ AGE</Text>
          </View>
        </View>

        <Text style={{ textAlign: "center", marginBottom: 14, fontSize: 16, fontWeight: "700", color: sc, opacity: phase >= 2 ? 1 : 0 }}>
          {diff} years younger
        </Text>

        {/* TRAJECTORY CARD */}
        <View style={{ marginHorizontal: 24, backgroundColor: t.s1, borderRadius: 18, borderWidth: 1, borderColor: t.b1, overflow: "hidden", marginBottom: 16, opacity: phase >= 3 ? 1 : 0 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14, paddingBottom: 0 }}>
            <View>
              <Text style={{ fontSize: 13, fontWeight: "700", color: t.t1 }}>Your Trajectory</Text>
              <Text style={{ fontSize: 10, color: t.t3, marginTop: 2 }}>Trending younger each quarter</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: t.gold, lineHeight: 24 }}>{chron}</Text>
              <Text style={{ fontSize: 8, fontWeight: "700", color: t.t4, letterSpacing: 1.5, marginTop: 3 }}>ACTUAL AGE</Text>
            </View>
          </View>
          <View style={{ padding: 16 }}>
            <Svg width="100%" height="120" viewBox={`0 0 ${chartW} 120`} preserveAspectRatio="none">
              <Defs>
                <LinearGradient id="trajFill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={sc} stopOpacity="0.15" />
                  <Stop offset="100%" stopColor={sc} stopOpacity="0" />
                </LinearGradient>
              </Defs>
              {/* Actual age dashed line */}
              <Line x1="0" y1="12" x2={chartW} y2="12" stroke={t.gold} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
              {/* Fill */}
              <Path d={fillD} fill="url(#trajFill)" />
              {/* Line segments */}
              {hist.map((h, i) => {
                if (i >= hist.length - 1) return null;
                const x1 = pts[i].x, y1 = pts[i].y;
                const x2 = pts[i + 1].x, y2 = pts[i + 1].y;
                return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={sc} strokeWidth="2.5" strokeLinecap="round" />;
              })}
              {/* Data points */}
              {hist.map((h, i) => {
                const { x, y } = pts[i];
                const isLast = i === hist.length - 1;
                return (
                  <G key={i}>
                    <Circle cx={x} cy={y} r={isLast ? 6 : 4} fill={isLast ? sc : t.s1} stroke={sc} strokeWidth={isLast ? 2.5 : 1.5} />
                    <SvgText x={x} y={y - 12} textAnchor="middle" fill={isLast ? sc : t.t3} fontSize={isLast ? "13" : "11"} fontWeight={isLast ? "800" : "600"}>
                      {h.v}
                    </SvgText>
                    <SvgText x={x} y="115" textAnchor="middle" fill={t.t4} fontSize="9" fontWeight="500">
                      {h.d}
                    </SvgText>
                  </G>
                );
              })}
            </Svg>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 20, padding: 14 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <View style={{ width: 14, height: 2.5, borderRadius: 2, backgroundColor: sc }} />
              <Text style={{ fontSize: 9, color: t.t3, fontWeight: "600" }}>EVA™ Age</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <View style={{ width: 14, borderTopWidth: 1.5, borderTopColor: t.gold, borderStyle: "dashed", opacity: 0.6 }} />
              <Text style={{ fontSize: 9, color: t.t3, fontWeight: "600" }}>Actual Age ({chron})</Text>
            </View>
          </View>
        </View>

        {/* PACE OF AGING */}
        <View style={{ paddingHorizontal: 24, marginBottom: 16, opacity: phase >= 3 ? 1 : 0 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
            <Text style={{ fontSize: 10, fontWeight: "700", color: t.t3, letterSpacing: 2 }}>PACE OF AGING</Text>
            <Text style={{ fontSize: 22, fontWeight: "800", color: sc }}>{pace}x</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontSize: 9, color: t.t4 }}>Slow</Text>
            <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: t.s2 }}>
              <View style={{ height: "100%", borderRadius: 3, width: `${pacePos}%`, backgroundColor: sc }} />
              <View style={{ position: "absolute", top: -4, left: `${pacePos}%`, width: 13, height: 13, borderRadius: 999, backgroundColor: sc, borderWidth: 2.5, borderColor: t.bg, marginLeft: -6.5 }} />
            </View>
            <Text style={{ fontSize: 9, color: t.t4 }}>Fast</Text>
          </View>
        </View>

        {/* POWERED BY YOUR BLOOD */}
        <View style={{ backgroundColor: t.s1, borderRadius: 14, borderWidth: 1, borderColor: t.b1, padding: 14, marginHorizontal: 24, marginBottom: 14, opacity: phase >= 4 ? 1 : 0 }}>
          <Text style={{ fontSize: 10, fontWeight: "700", color: t.t3, letterSpacing: 2, marginBottom: 12 }}>POWERED BY YOUR BLOOD</Text>
          {mks.map((m, i) => {
            const bc = m.s === "optimal" ? sc : t.gold;
            const isOpen = openMarker === i;
            return (
              <View key={i} style={{ marginBottom: i < 5 ? 4 : 0 }}>
                <TouchableOpacity onPress={() => setOpenMarker(isOpen ? null : i)} style={{ paddingVertical: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <Text style={{ fontSize: 12, fontWeight: "600", color: t.t1 }}>{m.n}</Text>
                      <Text style={{ fontSize: 10, color: t.t3 }}>{m.lb}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <Text style={{ fontSize: 9, fontWeight: "600", color: bc }}>{m.s.toUpperCase()}</Text>
                      <Svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}>
                        <Path d="M2 3.5l3 3 3-3" stroke={t.t3} strokeWidth="1.3" fill="none" strokeLinecap="round" />
                      </Svg>
                    </View>
                  </View>
                  <View style={{ height: 3, borderRadius: 2, backgroundColor: t.s2 }}>
                    <View style={{ height: "100%", borderRadius: 2, backgroundColor: bc, width: `${m.pct}%` }} />
                  </View>
                </TouchableOpacity>
                {isOpen && (
                  <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: t.b1 }}>
                    <Text style={{ fontSize: 12, color: t.t2, lineHeight: 22 }}>{m.info}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* HOW IT WORKS */}
        <View style={{ paddingHorizontal: 24 }}>
          <Card style={{ marginBottom: 14, opacity: phase >= 4 ? 1 : 0 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: t.t1, marginBottom: 8 }}>How EVA™ Calculates This</Text>
            <Text style={{ fontSize: 13, color: t.t2, lineHeight: 24 }}>
              Your EVA™ Age comes directly from your blood — not a wearable estimate. We use the Klemera–Doubal Method, trained on the NHANES dataset, combining markers from metabolism, inflammation, cardiovascular health, and organ function.
            </Text>
          </Card>

          <VideoCard title="The Biological Age Reality Check" duration="0:40" />

          <Card style={{ marginBottom: 14, opacity: phase >= 4 ? 1 : 0 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: t.t1, marginBottom: 12 }}>EVA™ vs. Wearable Ages</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1, backgroundColor: t.s2, borderRadius: 12, padding: 14 }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: t.t3, letterSpacing: 1, marginBottom: 6 }}>WEARABLES</Text>
                <Text style={{ fontSize: 12, color: t.t2, lineHeight: 22 }}>Surface signals — sleep, heart rate, steps. Helpful but short-term noise.</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: `${sc}08`, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: `${sc}18` }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: sc, letterSpacing: 1, marginBottom: 6 }}>EVA™ AGE</Text>
                <Text style={{ fontSize: 12, color: t.t2, lineHeight: 22 }}>70+ internal blood markers. True long-term health trajectory.</Text>
              </View>
            </View>
          </Card>

          <Card style={{ marginBottom: 14, opacity: phase >= 4 ? 1 : 0 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: t.t1, marginBottom: 12 }}>Why It Matters</Text>
            <View style={{ backgroundColor: `${sc}08`, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: `${sc}15` }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: sc, marginBottom: 4 }}>Younger than actual age</Text>
              <Text style={{ fontSize: 12, color: t.t2, lineHeight: 22 }}>Your body is performing like someone {diff} years younger. Strong foundation for long-term health.</Text>
            </View>
            <View style={{ backgroundColor: `${t.red}08`, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: `${t.red}15` }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: t.red, marginBottom: 4 }}>Older than actual age</Text>
              <Text style={{ fontSize: 12, color: t.t2, lineHeight: 22 }}>Added physiological stress — but an opportunity to intervene. Exactly what EVA™ addresses.</Text>
            </View>
          </Card>

          <VideoCard title="Biological Age vs. Chronological Age" duration="0:55" />

          <Text style={{ fontSize: 11, color: t.t3, textAlign: "center", lineHeight: 18, fontStyle: "italic", paddingBottom: 20 }}>
            EVA™ Age is a directional signal, not a diagnosis.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BioAgeScreen;
