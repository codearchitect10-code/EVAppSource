import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Btn, CheckIcon, Title, TopBar } from "../components";

const TermsScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);
  const [optIn, setOptIn] = useState(false);

  const S = ({ children, style }) => (
    <Text style={{ fontWeight: "700", color: t.t1, marginBottom: 4, marginTop: 14, fontSize: 13, ...(style || {}) }}>
      {children}
    </Text>
  );
  const P = ({ children, style }) => (
    <Text style={{ marginBottom: 10, fontSize: 13, color: t.t2, lineHeight: 22, ...(style || {}) }}>
      {children}
    </Text>
  );

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: t.bg, paddingTop: insets.top, paddingHorizontal: 24, paddingBottom: 20 }}>
      <TopBar onBack={onBack} />
      <Title sub="Please review and accept before continuing.">Informed Consent</Title>

      <ScrollView style={{ flex: 1, backgroundColor: t.s1, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: t.b1 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontWeight: "700", color: t.t1, marginBottom: 8, fontSize: 13 }}>
          Informed Consent for Blood & DNA Testing, Analysis, and Data Use
        </Text>

        <S style={{ marginTop: 0 }}>1. Purpose and Scope</S>
        <P>You consent to the collection and analysis of your blood (via venepuncture) and/or DNA (via cheek swab) to generate personalised health insights.</P>
        <P>Results are used to generate personalised recommendations, not medical diagnoses. EVA™ is designed for health optimisation. It is informational and preventive in nature, and does not replace professional medical evaluation.</P>

        <S>2. Risks and Discomforts</S>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Blood Collection:</Text>{" "}May cause mild pain, bruising, or minor bleeding. Infection, dizziness, or fainting are very rare.</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>DNA Collection:</Text>{" "}Non-invasive cheek swab; very rarely, minor gum irritation or slight contact bleeding may occur.</P>

        <S>3. Understanding Your Results</S>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Blood:</Text>{" "}Reflects your current physiological state. Tests measure biomarkers related to heart health, metabolism, inflammation, nutrition, hormones, liver and kidney health, and other markers of general health.</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>DNA:</Text>{" "}Analyses genetic variations relevant to nutrition, methylation, and disease risks. Results indicate genetic probabilities and tendencies, not certainties or diagnoses. Scientific understanding of genetics may evolve over time.</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Limitations:</Text>{" "}Not all conditions can be detected. If abnormal results are found, you may be advised to seek independent medical care.</P>

        <S>4. Voluntary Participation and Your Rights</S>
        <P>Your participation is completely voluntary. Under UAE law, you have the right to:</P>
        <View style={{ paddingLeft: 12, marginBottom: 10 }}>
          <Text style={{ marginBottom: 4, fontSize: 13, color: t.t2, lineHeight: 22 }}>• Withdraw consent at any time without affecting your access to medical care</Text>
          <Text style={{ marginBottom: 4, fontSize: 13, color: t.t2, lineHeight: 22 }}>• Access, correct, or request deletion of your personal data (subject to legal retention requirements)</Text>
          <Text style={{ fontSize: 13, color: t.t2, lineHeight: 22 }}>• Decline DNA testing and still utilise other EVA™ services</Text>
        </View>

        <S>5. Data Privacy, Storage, and Sharing</S>
        <P>In compliance with the UAE Personal Data Protection Law (PDPL) and applicable UAE health data regulations, including relevant federal and Emirate-level health authorities (such as MoHAP, DHA, DoH, and other competent authorities across the UAE).</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Processing:</Text>{" "}Your personal, health, and genetic data will only be used to generate insights, ensure clinical safety, and improve your tracking experience.</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Security & Storage:</Text>{" "}Data is encrypted, restricted to authorised personnel, and securely stored on UAE-based servers. Retained only as long as legally required.</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Sharing:</Text>{" "}Your data is shared only with licensed testing labs, your healthcare providers, and mandatory UAE health information exchanges (e.g. Riayati, Malaffi, NABIDH).</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Protection:</Text>{" "}Your data will not be sold or used for marketing purposes.</P>
        <P><Text style={{ fontWeight: "600", color: t.t1 }}>Platform Improvement:</Text>{" "}EVA™ uses de-identified (anonymised) data, with personal identifiers removed, to improve health outcomes, research insights, and platform performance. You may opt out of this use at any time.</P>

        <S>6. Consent Declaration</S>
        <P>By selecting "I Agree" below, you provide legally valid electronic consent under UAE law (equivalent to a written signature), confirming that you have read this information, understand the risks and limitations, and voluntarily agree to blood and/or DNA sample collection and processing and use of your health and genetic data for personalised insights.</P>
      </ScrollView>

      <View style={{ paddingTop: 16 }}>
        <TouchableOpacity onPress={() => setAgreed(!agreed)} style={{ flexDirection: "row", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
          <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: agreed ? t.purple : t.b2, backgroundColor: agreed ? t.purple : "transparent", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            {agreed && <CheckIcon size={12} />}
          </View>
          <Text style={{ fontSize: 14, color: t.t2, lineHeight: 21, flex: 1 }}>
            I have read and agree to the <Text style={{ color: t.purple, fontWeight: "600" }}>Informed Consent</Text> for blood & DNA testing, analysis, and data use
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOptIn(!optIn)} style={{ flexDirection: "row", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
          <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: optIn ? t.emerald : t.b2, backgroundColor: optIn ? t.emerald : "transparent", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            {optIn && <CheckIcon size={12} />}
          </View>
          <Text style={{ fontSize: 13, color: t.t3, lineHeight: 21, flex: 1 }}>
            I agree to allow EVA™ to use my de-identified data (with personal identifiers removed) to improve health outcomes and platform performance. <Text style={{ fontStyle: "italic", fontSize: 12 }}>Optional</Text>
          </Text>
        </TouchableOpacity>

        <Btn
          onPress={agreed ? () => onNavigate("questionnaire") : undefined}
          style={{ opacity: agreed ? 1 : 0.4 }}
        >
          I Agree
        </Btn>
      </View>
    </View>
  );
};

export default TermsScreen;
