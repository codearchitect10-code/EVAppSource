import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, Card, CheckIcon, Title, TopBar } from "../components";

const WaitingScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [phase, setPhase] = useState("blood-pending"); // blood-pending | blood-ready | dna-pending | all-ready
  const phases = {
    "blood-pending": {title:"Your Tests Are Processing",sub:"Blood analysis takes 1–2 days. DNA takes 3–4 weeks. We'll notify you at each step.",steps:[
      {l:"Blood Test Completed",s:"done",d:"Collected 4 Feb 2025"},
      {l:"Blood Analysis",s:"active",d:"~1 day remaining"},
      {l:"DNA Taken",s:"done",d:"Registered 6 Feb 2025"},
      {l:"DNA Analysis",s:"pending",d:"~4 weeks"},
      {l:"Clinician Review",s:"pending",d:"24–48 hrs after results"},
      {l:"Supplement Protocol",s:"pending",d:"Your personalised regimen"},
      {l:"Daily DEVA™ Check-in",s:"pending",d:"Your longevity ritual begins"},
    ]},
    "blood-ready": {title:"Blood Results Ready!",sub:"Your clinician has reviewed your biomarkers. DNA analysis continues in the background.",steps:[
      {l:"Blood Test Completed",s:"done",d:"Collected 4 Feb 2025"},
      {l:"Blood Analysis",s:"done",d:"Complete — 70 biomarkers analysed"},
      {l:"DNA Taken",s:"done",d:"Registered 6 Feb 2025"},
      {l:"DNA Analysis",s:"active",d:"~3 weeks remaining"},
      {l:"Clinician Review (Blood)",s:"done",d:"Reviewed by Dr. Nival"},
      {l:"Initial Protocol Ready",s:"done",d:"Based on blood results"},
      {l:"Daily DEVA™ Active",s:"done",d:"Your daily briefing is live"},
    ]},
    "dna-pending": {title:"DNA Still Processing",sub:"Your blood-based protocol is active. DNA results will refine it further.",steps:[
      {l:"Blood Panel",s:"done",d:"70 biomarkers — Complete"},
      {l:"DNA Kit Processing",s:"active",d:"~1 week remaining"},
      {l:"Clinician Review (Blood)",s:"done",d:"Protocol active"},
      {l:"DNA Variant Analysis",s:"pending",d:"5+ variants expected"},
      {l:"Protocol Refinement",s:"pending",d:"DNA-informed updates"},
    ]},
    "all-ready": {title:"All Results Are In!",sub:"Blood + DNA combined. Your full biological profile is ready to explore.",steps:[
      {l:"Blood Panel",s:"done",d:"70 biomarkers analysed"},
      {l:"DNA Analysis",s:"done",d:"5 significant variants identified"},
      {l:"Clinician Review",s:"done",d:"Full review by Dr. Nival"},
      {l:"Supplement Protocol",s:"done",d:"DNA + Blood optimised"},
      {l:"DEVA™ Personalised",s:"done",d:"Fully calibrated to your biology"},
    ]},
  };
  const p = phases[phase];
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub={p.sub}>{p.title}</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        {(phase==="blood-ready"||phase==="all-ready")&&<Card style={{ background:`${t.emerald}08`,border:`1.5px solid ${t.emerald}20`,marginBottom:16 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <CheckIcon size={18} color={t.emerald}/>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{phase==="all-ready"?"Full results available — tap below to view":"Blood results are in! Tap below to view your biomarkers."}</div>
          </div>
        </Card>}
        {p.steps.map((st,i,a)=>(
          <div key={i} style={{ display:"flex",gap:16 }}>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
              <div style={{ width:30,height:30,borderRadius:"50%",background:st.s==="done"?t.emerald:st.s==="active"?t.purple:t.s2,border:st.s==="pending"?`1.5px solid ${t.b2}`:"none",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:st.s==="active"?`0 0 14px ${t.purple}50`:"none" }}>{st.s==="done"?<CheckIcon size={14}/>:st.s==="active"?<div style={{ width:10,height:10,borderRadius:"50%",background:"#FFF",animation:"pulse 1.5s ease infinite" }}/>:null}</div>
              {i<a.length-1&&<div style={{ width:2,height:32,background:st.s==="done"?`${t.emerald}50`:t.b1,borderRadius:1 }}/>}
            </div>
            <div style={{ paddingTop:5,paddingBottom:20 }}>
              <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{st.l}</div>
              <div style={{ fontSize:13,color:st.s==="active"?t.cyan:st.s==="done"?t.emerald:t.t3,marginTop:6,fontWeight:500 }}>{st.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        {(phase==="blood-ready"||phase==="all-ready")?<Btn onClick={()=>onNavigate("results")}>View Your Results →</Btn>:<div><div style={{ fontSize:13,color:t.t2,textAlign:"center",marginBottom:12,lineHeight:1.6 }}>We'll notify you when your results are ready. In the meantime, explore the app.</div><Btn variant="secondary" onClick={()=>onNavigate("today")}>Explore EVA™ →</Btn></div>}
        <div style={{ marginTop:16,paddingTop:12,borderTop:`1px dashed ${t.b2}` }}>
          <div style={{ fontSize:10,fontWeight:700,color:t.t4,letterSpacing:2,textAlign:"center",marginBottom:6 }}>TEST STATUS SIMULATOR</div>
          <div style={{ display:"flex",gap:8 }}>
            {[{id:"blood-pending",l:"Waiting"},{id:"blood-ready",l:"Blood Ready"},{id:"dna-pending",l:"DNA Wait"},{id:"all-ready",l:"All Ready"}].map(ph=>(
              <div key={ph.id} onClick={()=>setPhase(ph.id)} style={{ flex:1,background:phase===ph.id?`${t.t4}15`:t.s2,border:`1px dashed ${phase===ph.id?t.t4:t.b2}`,borderRadius:6,padding:"6px 0",textAlign:"center",fontSize:10,fontWeight:600,color:phase===ph.id?t.t3:t.t4,cursor:"pointer" }}>{ph.l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default WaitingScreen;
