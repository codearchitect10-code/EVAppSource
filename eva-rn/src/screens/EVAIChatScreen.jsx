import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeft } from "../components";

const EVAIChatScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [msg, setMsg] = useState("");
  const messages = [
    { from: "dr", text: "Hi Daniel, I've reviewed your latest protocol. Your Vitamin D is trending in the right direction — let's maintain the current 4,000 IU dose through your next re-test.", time: "2:14 PM" },
    { from: "me", text: "Thanks Dr. Nival. I've been consistent with the morning protocol. Should I be concerned about the hs-CRP level?", time: "2:18 PM" },
    { from: "dr", text: "Good question. 2.8 mg/L is elevated but not in the urgent range. The Omega-3 protocol we've added should bring this down. We'll verify at your next blood panel in ∼47 days. If you notice any unusual symptoms in the meantime, message me directly.", time: "2:22 PM" },
    { from: "me", text: "Understood. The magnesium seems to be helping with sleep already.", time: "2:25 PM" },
    { from: "dr", text: "That's great to hear — magnesium glycinate typically shows sleep improvements within 1–2 weeks. Keep it up.", time: "2:28 PM" },
  ];
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg }}>
      <View style={{ padding: 24, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: t.b1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <TouchableOpacity onPress={onBack}>
            <ChevronLeft size={16} />
          </TouchableOpacity>
          <View style={{ width: 36, height: 36, borderRadius: 999, backgroundColor: `${t.purple}15`, borderWidth: 1.5, borderColor: `${t.purple}30`, alignItems: "center", justifyContent: "center" }}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Circle cx="8" cy="8" r="6" stroke={t.purple} strokeWidth="1.3"/>
              <Circle cx="8" cy="8" r="2" fill={t.purple}/>
              <Path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/>
            </Svg>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: t.t1 }}>EV.AI™</Text>
              <View style={{ backgroundColor: "#25D36612", padding: 4, paddingHorizontal: 8, borderRadius: 4 }}>
                <Text style={{ fontSize: 10, fontWeight: "600", color: "#25D366", letterSpacing: 0.5 }}>BETA</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: t.purple, fontWeight: "500" }}>Dr. Nival · AI-assisted</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 19, paddingHorizontal: 28 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View style={{ backgroundColor: t.s2, padding: 6, paddingHorizontal: 15, borderRadius: 8 }}>
            <Text style={{ fontSize: 12, color: t.t4 }}>Today</Text>
          </View>
        </View>
        {messages.map((m, i) => (
          <View key={i} style={{ flexDirection: "row", justifyContent: m.from === "me" ? "flex-end" : "flex-start", marginBottom: 10 }}>
            <View style={{ maxWidth: "78%", backgroundColor: m.from === "me" ? t.purple : t.s1, borderRadius: 16, borderBottomRightRadius: m.from === "me" ? 4 : 16, borderBottomLeftRadius: m.from === "dr" ? 4 : 16, padding: 15, paddingHorizontal: 19 }}>
              <Text style={{ fontSize: 14, color: m.from === "me" ? "#FFF" : t.t1, lineHeight: 22 }}>{m.text}</Text>
              <Text style={{ fontSize: 11, color: m.from === "me" ? "rgba(255,255,255,.5)" : t.t4, marginTop: 6, textAlign: "right" }}>{m.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ padding: 15, paddingHorizontal: 28, paddingBottom: 28, borderTopWidth: 1, borderTopColor: t.b1, flexDirection: "row", gap: 12, alignItems: "center" }}>
        <TextInput
          value={msg}
          onChangeText={setMsg}
          placeholder="Type a message..."
          placeholderTextColor={t.t4}
          style={{ flex: 1, backgroundColor: t.s2, borderRadius: 24, padding: 15, paddingHorizontal: 22, borderWidth: 1, borderColor: t.b2, fontSize: 16, color: t.t1 }}
        />
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: t.purple, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path d="M14 2L7 9M14 2l-4 12-3-5-5-3 12-4z" fill="#FFF"/>
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EVAIChatScreen;
