import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, useToast } from "../context/ThemeContext";
import { Card, ChevronRight, MiniDEVA, PillIcon, TopBar } from "../components";

const NotificationCentreScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const [notifs, setNotifs] = useState([
    { type: "deva", title: "Your Daily EVAluation is ready", body: "Inflammatory markers need attention today. 3 insights, 3 actions, 3 outcomes waiting.", time: "8:00 AM", read: false, link: "deva-insight" },
    { type: "protocol", title: "Morning protocol reminder", body: "5 supplements to take with breakfast: Vitamin D3, Omega-3, Magnesium Glycinate, CoQ10.", time: "7:30 AM", read: false, link: "protocol" },
    { type: "wearable", title: "HRV dropped 18% — Magnesium increased", body: "+200mg Magnesium Glycinate added to morning protocol for 7 days. Day 2 of 7.", time: "6 Mar", read: false, link: "supplement-detail" },
    { type: "clinician", title: "Message from Dr. Nival", body: "Vitamin D protocol showing great improvement. Maintaining current dosage through next re-test.", time: "6 Mar", read: true, link: "clinician-chat" },
    { type: "retest", title: "Re-test in 47 days", body: "Follow-up blood panel will compare Vitamin D, Magnesium, and hs-CRP against baseline.", time: "1 Mar", read: true, link: "retest" },
    { type: "system", title: "Welcome to EVA™, Daniel", body: "Your biology test is complete and your personalised protocol is active.", time: "28 Feb", read: true, link: null },
  ]);
  const unread = notifs.filter(n => !n.read).length;
  const markAllRead = () => { setNotifs(notifs.map(n => ({ ...n, read: true }))); toast.show("All marked as read", "success"); };
  const toggleRead = (idx) => { const next = [...notifs]; next[idx] = { ...next[idx], read: !next[idx].read }; setNotifs(next); };
  const handleTap = (n, idx) => {
    if (!n.read) { const next = [...notifs]; next[idx] = { ...next[idx], read: true }; setNotifs(next); }
    if (n.link) onNavigate(n.link);
  };
  const typeIcon = (tp) => {
    const iconMap = {
      deva: <MiniDEVA size={20} />,
      protocol: <PillIcon size={16} />,
      wearable: (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="8" r="6" stroke="#F59E0B" strokeWidth="1.3"/>
          <Path d="M8 4v4.5l2.5 1.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/>
        </Svg>
      ),
      clinician: (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="5.5" r="2.5" stroke={t.cyan} strokeWidth="1.3"/>
          <Path d="M3 14c0-2 2-3.5 5-3.5s5 1.5 5 3.5" stroke={t.cyan} strokeWidth="1.3"/>
        </Svg>
      ),
      retest: (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <Rect x="2.5" y="3" width="11" height="10" rx="1.5" stroke={t.gold} strokeWidth="1.3"/>
          <Path d="M5 1v3M11 1v3M2.5 6.5h11" stroke={t.gold} strokeWidth="1.1" strokeLinecap="round"/>
        </Svg>
      ),
      system: (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="8" r="6" stroke={t.t3} strokeWidth="1.3"/>
          <Path d="M8 5v.5M8 7.5v4" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/>
        </Svg>
      ),
    };
    return iconMap[tp] || iconMap.system;
  };
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "700", color: t.t1, letterSpacing: -0.3 }}>Notifications</Text>
          <Text style={{ fontSize: 14, color: t.t3, marginTop: 4 }}>{unread} unread</Text>
        </View>
        {unread > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={{ fontSize: 13, color: t.purple, fontWeight: "600" }}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {notifs.map((n, i) => (
          <TouchableOpacity key={i} onPress={() => handleTap(n, i)} activeOpacity={n.link ? 0.7 : 1}>
            <Card style={{ padding: 14, flexDirection: "row", gap: 14, alignItems: "flex-start", backgroundColor: n.read ? t.s1 : `${t.purple}06`, borderLeftWidth: 3, borderLeftColor: !n.read ? t.purple : "transparent" }}>
              <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: n.read ? t.s2 : `${t.purple}12`, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {typeIcon(n.type)}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: n.read ? "500" : "700", color: t.t1, marginBottom: 3 }}>{n.title}</Text>
                <Text style={{ fontSize: 13, color: t.t2, lineHeight: 20 }}>{n.body}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <Text style={{ fontSize: 11, color: t.t4, fontWeight: "500" }}>{n.time}</Text>
                  <TouchableOpacity onPress={() => toggleRead(i)}>
                    <Text style={{ fontSize: 11, color: t.purple, fontWeight: "500" }}>{n.read ? "Mark unread" : "Mark read"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {n.link && <ChevronRight size={12} color={t.t4} />}
            </Card>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => onNavigate("clinician-chat")} style={{ marginTop: 12, backgroundColor: `${t.cyan}12`, borderWidth: 1, borderColor: `${t.cyan}25`, borderRadius: 10, padding: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 13, fontWeight: "600", color: t.cyan }}>Contact Clinician</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NotificationCentreScreen;
