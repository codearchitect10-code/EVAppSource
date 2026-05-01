import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { Card, CheckIcon, ChevronRight, DanielAvatar, MiniDEVA, MiniDNA, PillIcon, TabBar, VideoCard } from "../components";

const TodayScreen = ({ onNavigate }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [testStatus, setTestStatus] = useState("active");

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg }}>
      <View style={{ paddingTop: insets.top, paddingHorizontal: 24 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <View>
            <Text style={{ fontSize: 14, color: t.t3, fontWeight: "500" }}>Good morning, Daniel</Text>
            <Text style={{ fontSize: 24, fontWeight: "700", color: t.t1, letterSpacing: -0.3 }}>Today</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <TouchableOpacity onPress={() => onNavigate("notifications")} style={{ position: "relative" }}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path d="M5 8a5 5 0 0110 0c0 2.5 1.5 4 2 5H3c.5-1 2-2.5 2-5z" stroke={t.t3} strokeWidth="1.5" />
                <Path d="M7.5 14.5a2.5 2.5 0 005 0" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round" />
              </Svg>
              <View style={{ position: "absolute", top: -4, right: -6, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: t.red, borderWidth: 2, borderColor: t.bg, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: "#FFF" }}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNavigate("profile")}>
              <DanielAvatar size={38} border={`${t.purple}35`} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 24 }} contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
        <VideoCard title="Welcome to EVA™ — Daniel's Story" duration="2:45" />

        {testStatus === "pending" && (
          <TouchableOpacity onPress={() => onNavigate("waiting")}>
            <Card style={{ backgroundColor: `${t.purple}06`, borderWidth: 1.5, borderColor: `${t.purple}18` }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${t.purple}12`, alignItems: "center", justifyContent: "center" }}>
                  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <Circle cx="8" cy="8" r="6" stroke={t.purple} strokeWidth="1.3" strokeDasharray="4 2" />
                    <Path d="M8 5v3.5l2 1.5" stroke={t.purple} strokeWidth="1.2" strokeLinecap="round" />
                  </Svg>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600", color: t.t1 }}>Tests Processing</Text>
                  <Text style={{ fontSize: 12, color: t.t3, marginTop: 2 }}>Blood analysis in progress</Text>
                </View>
                <ChevronRight size={12} color={t.purple} />
              </View>
              <View style={{ height: 4, backgroundColor: t.s2, borderRadius: 2 }}>
                <View style={{ width: "35%", height: "100%", backgroundColor: t.purple, borderRadius: 2 }} />
              </View>
            </Card>
          </TouchableOpacity>
        )}

        {testStatus === "blood-ready" && (
          <TouchableOpacity onPress={() => onNavigate("results")}>
            <Card style={{ backgroundColor: `${t.emerald}08`, borderWidth: 1.5, borderColor: `${t.emerald}25` }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${t.emerald}15`, alignItems: "center", justifyContent: "center" }}>
                  <CheckIcon size={16} color={t.emerald} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: "700", color: t.emerald }}>Blood Results Ready!</Text>
                  <Text style={{ fontSize: 13, color: t.t2, marginTop: 2 }}>Tap to see your biological age and biomarker results</Text>
                </View>
                <ChevronRight size={12} color={t.emerald} />
              </View>
            </Card>
          </TouchableOpacity>
        )}

        {/* Wearable Dose Adjustment Card */}
        <Card style={{ backgroundColor: "#F59E0B08", borderWidth: 1.5, borderColor: "#F59E0B25" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.5" />
              <Path d="M8 4v5l3 2" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" />
            </Svg>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#F59E0B", letterSpacing: 1 }}>WEARABLE ADJUSTMENT</Text>
          </View>
          <Text style={{ fontSize: 15, fontWeight: "600", color: t.t1, marginBottom: 12, lineHeight: 22 }}>HRV dropped 18% overnight — Magnesium increased</Text>
          <Text style={{ fontSize: 13, color: t.t2, lineHeight: 22 }}>+200mg Magnesium Glycinate added to your morning protocol for 7 days. Day 2 of 7.</Text>
        </Card>

        <VideoCard title="Understanding DEVA™" duration="1:15" />

        <TouchableOpacity onPress={() => onNavigate("deva-insight")} style={{ backgroundColor: `${t.purple}12`, borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: `${t.purple}18`, position: "relative", overflow: "hidden" }}>
          <View style={{ flexDirection: "row", gap: 16, alignItems: "center", marginBottom: 14 }}>
            <MiniDEVA size={56} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: t.t1 }}>Today's DEVA™</Text>
                <Text style={{ fontSize: 11, color: t.t3, fontWeight: "500" }}>6 Mar 2025</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: t.t1, marginTop: 4, lineHeight: 22 }}>
                Inflammatory markers need your attention today.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 14 }}>
            {[{ n: "3", l: "Insights", c: t.purple }, { n: "3", l: "Actions", c: t.gold }, { n: "3", l: "Outcomes", c: t.emerald }].map((d) => (
              <View key={d.l} style={{ flex: 1, backgroundColor: `${d.c}10`, borderRadius: 10, padding: 10, alignItems: "center", borderWidth: 1, borderColor: `${d.c}20` }}>
                <Text style={{ fontSize: 20, fontWeight: "800", color: d.c, lineHeight: 24 }}>{d.n}</Text>
                <Text style={{ fontSize: 10, color: d.c, fontWeight: "600", marginTop: 4, letterSpacing: 0.5 }}>{d.l}</Text>
              </View>
            ))}
          </View>
          <View style={{ backgroundColor: t.purple, borderRadius: 12, paddingVertical: 12, alignItems: "center" }}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#FFF" }}>Open Today's DEVA™ →</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNavigate("protocol")}>
          <Card style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: `${t.emerald}0C`, borderWidth: 1, borderColor: `${t.emerald}18`, alignItems: "center", justifyContent: "center" }}>
              <PillIcon size={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: t.t1 }}>Morning Protocol</Text>
              <Text style={{ fontSize: 13, color: t.t2, marginTop: 2 }}>5 supplements · Take with food</Text>
            </View>
            <View style={{ backgroundColor: t.emerald, borderRadius: 8, paddingVertical: 9, paddingHorizontal: 17 }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: "#FFF", letterSpacing: 0.3 }}>Log</Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* EVA™ Age, Streak, Next Test tiles */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 14, alignItems: "stretch" }}>
          <TouchableOpacity onPress={() => onNavigate("eva-age")} style={{ flex: 1, flexDirection: "column", justifyContent: "center", backgroundColor: `${t.emerald}15`, borderRadius: 16, padding: 13, alignItems: "center", borderWidth: 1.5, borderColor: `${t.emerald}30`, overflow: "hidden" }}>
            <View style={{ marginBottom: 6 }}>
              <MiniDNA w={60} h={36} emerald={t.emerald} gold={t.gold} cyan={t.cyan} />
            </View>
            <Text style={{ fontSize: 26, fontWeight: "800", color: t.emerald, letterSpacing: -1 }}>34</Text>
            <Text style={{ fontSize: 10, color: t.t3, marginTop: 4, fontWeight: "600", letterSpacing: 0.5 }}>EVA™ AGE</Text>
            <Text style={{ fontSize: 9, color: t.emerald, marginTop: 3, fontWeight: "600" }}>-4 yrs →</Text>
          </TouchableOpacity>

          {/* Streak */}
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", backgroundColor: t.s1, borderRadius: 16, padding: 13, alignItems: "center", borderWidth: 1, borderColor: t.b1 }}>
            <Svg width="28" height="28" viewBox="0 0 14 14" fill="none">
              <Path d="M7 1L5 6h4L5 13l2-5H3l4-7z" fill={t.emerald} opacity={0.6} stroke={t.emerald} strokeWidth="1.2" />
            </Svg>
            <Text style={{ fontSize: 24, fontWeight: "800", color: t.emerald, letterSpacing: -0.5 }}>12</Text>
            <Text style={{ fontSize: 10, color: t.t3, marginTop: 6, fontWeight: "600", letterSpacing: 0.5 }}>STREAK</Text>
          </View>

          {/* Next Test */}
          <TouchableOpacity onPress={() => onNavigate("retest")} style={{ flex: 1, flexDirection: "column", justifyContent: "center", backgroundColor: t.s1, borderRadius: 16, padding: 13, alignItems: "center", borderWidth: 1, borderColor: t.b1 }}>
            <Svg width="28" height="28" viewBox="0 0 14 14" fill="none">
              <Rect x="2" y="3" width="10" height="9" rx="1.5" stroke={t.gold} strokeWidth="1.2" />
              <Path d="M4 1v3M10 1v3M2 6h10" stroke={t.gold} strokeWidth="1" strokeLinecap="round" />
            </Svg>
            <Text style={{ fontSize: 24, fontWeight: "800", color: t.gold, letterSpacing: -0.5 }}>47d</Text>
            <Text style={{ fontSize: 10, color: t.t3, marginTop: 6, fontWeight: "600", letterSpacing: 0.5 }}>NEXT TEST</Text>
          </TouchableOpacity>
        </View>

        <Card glow={t.purple}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 999, backgroundColor: `${t.purple}30`, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "700", color: t.cyan }}>NK</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: t.t1 }}>Dr. Nival</Text>
              <Text style={{ fontSize: 12, color: t.t3 }}>2 hours ago</Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, color: t.t2, lineHeight: 24 }}>
            Your Vitamin D protocol is showing great improvement. Let's maintain current dosage through next re-test.
          </Text>
        </Card>

        {/* EV.AI™ WhatsApp Card */}
        <TouchableOpacity onPress={() => Linking.openURL("https://wa.me/971501234567?text=Hi%20EV.AI")}>
          <Card glow="#25D366" style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: "#25D36612", borderWidth: 1, borderColor: "#25D36620", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                <Path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ fontSize: 15, fontWeight: "700", color: t.t1 }}>EV.AI™</Text>
                <View style={{ backgroundColor: "#25D36612", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                  <Text style={{ fontSize: 10, fontWeight: "600", color: "#25D366", letterSpacing: 0.5 }}>BETA</Text>
                </View>
              </View>
              <Text style={{ fontSize: 13, color: t.t2, marginTop: 2 }}>Ask anything about your biology or protocol</Text>
            </View>
            <ChevronRight size={12} color="#25D366" />
          </Card>
        </TouchableOpacity>
      </ScrollView>

      <TabBar active="today" onNavigate={(id) => onNavigate(id)} />

      {/* Demo status switcher */}
      <View style={{ position: "absolute", bottom: 78, left: 16, right: 16 }}>
        <View style={{ backgroundColor: t.s1, borderRadius: 8, borderWidth: 1, borderColor: t.b2, borderStyle: "dashed", padding: 8, flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 9, fontWeight: "700", color: t.t4, letterSpacing: 1.5, flexShrink: 0 }}>DEMO</Text>
          {[{ id: "pending", l: "Pending" }, { id: "blood-ready", l: "Results!" }, { id: "active", l: "Active" }].map((s) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => setTestStatus(s.id)}
              style={{
                flex: 1,
                backgroundColor: testStatus === s.id ? `${t.t4}15` : t.s2,
                borderWidth: 1,
                borderColor: testStatus === s.id ? t.t4 : t.b2,
                borderStyle: "dashed",
                borderRadius: 4,
                paddingVertical: 4,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 9, fontWeight: "600", color: testStatus === s.id ? t.t3 : t.t4 }}>{s.l}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TodayScreen;
