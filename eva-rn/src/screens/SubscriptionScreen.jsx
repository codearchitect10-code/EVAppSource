import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, useToast } from "../context/ThemeContext";
import { Btn, Card, Label, Title, TopBar } from "../components";

const SubscriptionScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const [showCancel, setShowCancel] = useState(false);
  const payments = [
    { d: "15 Mar 2025", a: "USD 199", s: "Supplements", st: "Paid" },
    { d: "15 Feb 2025", a: "USD 199", s: "Supplements", st: "Paid" },
    { d: "4 Feb 2025", a: "USD 1,999", s: "Elite Core", st: "Paid" },
  ];
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, padding: 24, paddingTop: insets.top }}>
      <TopBar onBack={onBack} />
      <Title sub="Manage your EVA™ membership.">Subscription</Title>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Card style={{ backgroundColor: `${t.purple}06`, borderWidth: 1.5, borderColor: `${t.purple}20`, marginBottom: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <View>
              <Text style={{ fontSize: 12, fontWeight: "700", color: t.purple, letterSpacing: 1, marginBottom: 4 }}>ACTIVE PLAN</Text>
              <Text style={{ fontSize: 20, fontWeight: "700", color: t.t1 }}>Core Package</Text>
            </View>
            <View style={{ backgroundColor: t.emerald, borderRadius: 8, padding: 7, paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#FFF", letterSpacing: 0.5 }}>ACTIVE</Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, color: t.t2, lineHeight: 22 }}>DNA + Blood Panel + Clinician Review + Supplement Protocol + DEVA™ Daily Insights</Text>
        </Card>
        <Label>Supplement Subscription</Label>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: t.t1 }}>Monthly Supplements</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: t.t1 }}>USD 199</Text>
              <Text style={{ fontSize: 12, color: t.t3, fontWeight: "500" }}>/mo</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
            <Text style={{ fontSize: 13, color: t.t3 }}>Next renewal</Text>
            <Text style={{ fontSize: 13, color: t.t1, fontWeight: "500" }}>15 April 2025</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
            <Text style={{ fontSize: 13, color: t.t3 }}>Payment method</Text>
            <Text style={{ fontSize: 13, color: t.t1, fontWeight: "500" }}>•••• 4242</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 13, color: t.t3 }}>Member since</Text>
            <Text style={{ fontSize: 13, color: t.t1, fontWeight: "500" }}>February 2025</Text>
          </View>
        </Card>
        <Label>Payment History</Label>
        {payments.map((p, i) => (
          <Card key={i} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: t.t1 }}>{p.s}</Text>
              <Text style={{ fontSize: 12, color: t.t3, marginTop: 2 }}>{p.d}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 15, fontWeight: "700", color: t.t1 }}>{p.a}</Text>
              <Text style={{ fontSize: 11, color: t.emerald, fontWeight: "600", marginTop: 2 }}>{p.st}</Text>
            </View>
          </Card>
        ))}
        <View style={{ marginTop: 16 }}>
          <Btn variant="secondary" onPress={() => toast.show("Payment method updated", "success")}>Update Payment Method</Btn>
          <TouchableOpacity onPress={() => setShowCancel(true)} style={{ alignItems: "center", paddingVertical: 16 }}>
            <Text style={{ fontSize: 13, color: t.red, fontWeight: "500" }}>Cancel Subscription</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showCancel && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, alignItems: "center", justifyContent: "center", padding: 24 }}>
          <TouchableOpacity onPress={() => setShowCancel(false)} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,.5)" }} activeOpacity={1} />
          <View style={{ backgroundColor: t.s1, borderRadius: 20, padding: 24, maxWidth: 320, width: "100%", position: "relative", borderWidth: 1, borderColor: t.b1 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <Text style={{ fontSize: 17, fontWeight: "700", color: t.t1 }}>Cancel Subscription?</Text>
              <TouchableOpacity onPress={() => setShowCancel(false)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: t.s2, alignItems: "center", justifyContent: "center" }}>
                <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <Path d="M2 2l8 8M10 2l-8 8" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/>
                </Svg>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, color: t.t2, lineHeight: 25, marginBottom: 20 }}>You will lose access to Daily DEVA insights, personalised protocols, clinician oversight, and wearable adjustments. Your data and reports remain accessible. Takes effect at end of billing period.</Text>
            <Btn onPress={() => { setShowCancel(false); toast.show("Subscription cancelled.", "success"); }} style={{ width: "100%", marginBottom: 10 }}>Confirm Cancellation</Btn>
            <Btn variant="secondary" onPress={() => setShowCancel(false)} style={{ width: "100%" }}>Keep Subscription</Btn>
          </View>
        </View>
      )}
    </View>
  );
};

export default SubscriptionScreen;
