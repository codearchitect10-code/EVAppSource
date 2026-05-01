import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, CheckIcon, Title, TopBar } from "../components";

const TermsScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [agreed, setAgreed] = useState(false);
  const [optIn, setOptIn] = useState(false);
  const S = (props) => <div style={{ fontWeight:600,color:t.t1,marginBottom:4,marginTop:14,...(props.style||{}) }}>{props.children}</div>;
  const P = (props) => <div style={{ marginBottom:10,...(props.style||{}) }}>{props.children}</div>;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Please review and accept before continuing.">Informed Consent</Title>
      <div style={{ flex:1,overflowY:"auto",background:t.s1,borderRadius:14,padding:16,border:`1px solid ${t.b1}`,fontSize:13,color:t.t2,lineHeight:1.8 }}>
        <div style={{ fontWeight:700,color:t.t1,marginBottom:8 }}>Informed Consent for Blood & DNA Testing, Analysis, and Data Use</div>

        <S style={{marginTop:0}}>1. Purpose and Scope</S>
        <P>You consent to the collection and analysis of your blood (via venepuncture) and/or DNA (via cheek swab) to generate personalised health insights.</P>
        <P>Results are used to generate personalised recommendations, not medical diagnoses. EVA™ is designed for health optimisation. It is informational and preventive in nature, and does not replace professional medical evaluation.</P>

        <S>2. Risks and Discomforts</S>
        <P><span style={{fontWeight:600,color:t.t1}}>Blood Collection:</span> May cause mild pain, bruising, or minor bleeding. Infection, dizziness, or fainting are very rare.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>DNA Collection:</span> Non-invasive cheek swab; very rarely, minor gum irritation or slight contact bleeding may occur.</P>

        <S>3. Understanding Your Results</S>
        <P><span style={{fontWeight:600,color:t.t1}}>Blood:</span> Reflects your current physiological state. Tests measure biomarkers related to heart health, metabolism, inflammation, nutrition, hormones, liver and kidney health, and other markers of general health.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>DNA:</span> Analyses genetic variations relevant to nutrition, methylation, and disease risks. Results indicate genetic probabilities and tendencies, not certainties or diagnoses. Scientific understanding of genetics may evolve over time.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Limitations:</span> Not all conditions can be detected. If abnormal results are found, you may be advised to seek independent medical care.</P>

        <S>4. Voluntary Participation and Your Rights</S>
        <P>Your participation is completely voluntary. Under UAE law, you have the right to:</P>
        <div style={{ paddingLeft:12,marginBottom:10 }}>
          <div style={{ marginBottom:4 }}>• Withdraw consent at any time without affecting your access to medical care</div>
          <div style={{ marginBottom:4 }}>• Access, correct, or request deletion of your personal data (subject to legal retention requirements)</div>
          <div>• Decline DNA testing and still utilise other EVA™ services</div>
        </div>

        <S>5. Data Privacy, Storage, and Sharing</S>
        <P>In compliance with the UAE Personal Data Protection Law (PDPL) and applicable UAE health data regulations, including relevant federal and Emirate-level health authorities (such as MoHAP, DHA, DoH, and other competent authorities across the UAE).</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Processing:</span> Your personal, health, and genetic data will only be used to generate insights, ensure clinical safety, and improve your tracking experience.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Security & Storage:</span> Data is encrypted, restricted to authorised personnel, and securely stored on UAE-based servers. Retained only as long as legally required.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Sharing:</span> Your data is shared only with licensed testing labs, your healthcare providers, and mandatory UAE health information exchanges (e.g. Riayati, Malaffi, NABIDH).</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Protection:</span> Your data will not be sold or used for marketing purposes.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Platform Improvement:</span> EVA™ uses de-identified (anonymised) data, with personal identifiers removed, to improve health outcomes, research insights, and platform performance. You may opt out of this use at any time.</P>

        <S>6. Consent Declaration</S>
        <P>By selecting "I Agree" below, you provide legally valid electronic consent under UAE law (equivalent to a written signature), confirming that you have read this information, understand the risks and limitations, and voluntarily agree to blood and/or DNA sample collection and processing and use of your health and genetic data for personalised insights.</P>
      </div>
      <div style={{ paddingTop:16 }}>
        <div onClick={()=>setAgreed(!agreed)} style={{ display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",marginBottom:12 }}>
          <div style={{ width:22,height:22,borderRadius:6,border:`1.5px solid ${agreed?t.purple:t.b2}`,background:agreed?t.purple:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",flexShrink:0,marginTop:1 }}>{agreed&&<CheckIcon size={12}/>}</div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.5 }}>I have read and agree to the <span style={{ color:t.purple,fontWeight:600 }}>Informed Consent</span> for blood & DNA testing, analysis, and data use</div>
        </div>
        <div onClick={()=>setOptIn(!optIn)} style={{ display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",marginBottom:16 }}>
          <div style={{ width:22,height:22,borderRadius:6,border:`1.5px solid ${optIn?t.emerald:t.b2}`,background:optIn?t.emerald:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",flexShrink:0,marginTop:1 }}>{optIn&&<CheckIcon size={12}/>}</div>
          <div style={{ fontSize:13,color:t.t3,lineHeight:1.5 }}>I agree to allow EVA™ to use my de-identified data (with personal identifiers removed) to improve health outcomes and platform performance. <span style={{fontStyle:"italic",fontSize:12}}>Optional</span></div>
        </div>
        <Btn onClick={agreed?()=>onNavigate("questionnaire"):undefined} style={{ opacity:agreed?1:.4 }}>I Agree</Btn>
      </div>
    </div>
  );
};


export default TermsScreen;
