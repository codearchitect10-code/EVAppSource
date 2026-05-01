import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, EVAFullLogo, Label, MiniDEVA, TopBar } from "../components";

const LearnScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [pg, setPg] = useState(0);
  const [showBrowser, setShowBrowser] = useState(false);
  const DNAIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M16 4v40M32 4v40" stroke={c} strokeWidth="2.2"/><path d="M16 12h16M16 24h16M16 36h16" stroke={c} strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="4" r="2.5" fill={c}/><circle cx="32" cy="4" r="2.5" fill={c}/><circle cx="16" cy="44" r="2.5" fill={c}/><circle cx="32" cy="44" r="2.5" fill={c}/></svg>;
  const BloodIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 4C24 4 8 20 8 30a16 16 0 0032 0c0-10-16-26-16-26z" stroke={c} strokeWidth="2.2" fill={`${c}12`}/><circle cx="24" cy="30" r="6" stroke={c} strokeWidth="2" fill="none"/><circle cx="24" cy="30" r="2" fill={c}/></svg>;
  const SuppIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="14" y="4" width="20" height="40" rx="10" stroke={c} strokeWidth="2.2" fill={`${c}08`}/><line x1="14" y1="24" x2="34" y2="24" stroke={c} strokeWidth="2"/><circle cx="24" cy="14" r="3" fill={c}/><circle cx="24" cy="34" r="2" fill={c} opacity=".5"/></svg>;
  const DEVAIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke={c} strokeWidth="2.2" fill={`${c}08`}/><path d="M16 24h4l3-8 5 16 3-8h4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const ClinicIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="10" y="12" width="28" height="28" rx="4" stroke={c} strokeWidth="2.2" fill={`${c}08`}/><path d="M24 20v12M18 26h12" stroke={c} strokeWidth="2.2" strokeLinecap="round"/><circle cx="24" cy="8" r="4" stroke={c} strokeWidth="2"/></svg>;
  const pgs = [
    { l:"Your past",ti:"DNA Analysis",c:t.purple,d:"Your DNA is your blueprint. We decode what it means for your healthspan and longevity. We analyse over 200 million genetic variants, including methylation, nutrient processing, and susceptibilities to heart disease, diabetes and dementia.",Ic:DNAIcL },
    { l:"Your present",ti:"Blood Biomarkers",c:t.cyan,d:"We analyse 70+ biomarkers to build a complete picture of your current health: cardiometabolic risk, inflammation and recovery, liver and kidney function, hormones, vitamins, minerals, and methylation status. Not just numbers — interpreted by a qualified clinician.",Ic:BloodIcL },
    { l:"Your future",ti:"Personalised Supplements",c:t.emerald,d:"Your supplement protocol is built directly from your DNA and blood data, targeting what your body actually needs. Delivered monthly, monitored, and continuously adjusted as your biomarkers evolve.",Ic:SuppIcL },
    { l:"Daily Ritual",ti:"DEVA™",c:t.gold,d:"Three insights. Three actions. Three outcomes. Your Daily EVAluation connects your biology to everyday decisions — personalised and evolving.",Ic:()=><MiniDEVA size={48}/> },
    { l:"Expert Oversight",ti:"Clinician-in-the-Loop",c:t.sky||t.cyan,d:"Every protocol is reviewed by a real clinician. Not an algorithm alone — human expertise ensures your plan is safe, effective, and tailored to you.",Ic:ClinicIcL },
  ];
  const p = pgs[pg];
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px`,position:"relative" }}>
      <TopBar onBack={onBack} right={`${pg+1} / ${pgs.length}`}/>
      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
        <div key={pg} style={{ display:"flex",flexDirection:"column",alignItems:"center",animation:"fadeUp .35s ease both" }}>
          <div style={{ width:120,height:120,borderRadius:32,background:`${p.c}0A`,border:`1.5px solid ${p.c}15`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:36 }}><p.Ic c={p.c}/></div>
          <Label color={p.c}>{p.l}</Label>
          <div style={{ fontSize:30,fontWeight:800,color:t.t1,marginBottom:14,textAlign:"center",letterSpacing:-.5 }}>{p.ti}</div>
          <div style={{ fontSize:15,color:t.t2,lineHeight:1.75,textAlign:"center",maxWidth:265 }}>{p.d}</div>
        </div>
      </div>
      <div style={{ paddingBottom:12 }}>
        {pg<pgs.length-1?<Btn onClick={()=>setPg(pg+1)}>Next →</Btn>:<>
          <Btn variant="secondary" onClick={()=>setShowBrowser(true)} style={{ marginBottom:10 }}>Find Out More →</Btn>
          <Btn onClick={()=>onNavigate("create-account")}>Get Started →</Btn>
        </>}
        <div style={{ display:"flex",justifyContent:"center",gap:10,marginTop:16 }}>
          {pgs.map((_,i)=><div key={i} onClick={()=>setPg(i)} style={{ width:pg===i?28:8,height:4,borderRadius:2,cursor:"pointer",background:pg===i?pgs[pg].c:t.b2,transition:"all .3s" }}/>)}
        </div>
      </div>
      {showBrowser&&<div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:t.bg,zIndex:50,display:"flex",flexDirection:"column",animation:"fadeUp .25s ease both" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:`${SAFE_TOP}px 16px 10px`,borderBottom:`1px solid ${t.b1}`,flexShrink:0 }}>
          <div onClick={()=>setShowBrowser(false)} style={{ fontSize:15,color:t.purple,cursor:"pointer",fontWeight:600 }}>Done</div>
          <div style={{ fontSize:13,color:t.t3,fontWeight:500,display:"flex",alignItems:"center",gap:6 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1" width="8" height="8" rx="1.5" stroke={t.emerald} strokeWidth="1.3"/><path d="M3 5l1.5 1.5L7 4" stroke={t.emerald} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            eva.ae
          </div>
          <div onClick={()=>window.open("https://eva.ae","_blank")} style={{ cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4M9 2h5v5M7 9l7-7" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        <div style={{ flex:1,overflowY:"auto",background:"#FFFFFF" }}>
          <div style={{ background:"linear-gradient(180deg, #4623BE 0%, #1a0e4e 100%)",padding:"52px 28px 44px",textAlign:"center" }}>
            <div style={{ display:"flex",justifyContent:"center" }}><EVAFullLogo width={100} color="#FFFFFF"/></div>
            <div style={{ fontSize:26,fontWeight:300,color:"#FFFFFF",marginTop:20,letterSpacing:-.3,lineHeight:1.4,fontFamily:"Gilroy,sans-serif" }}>Clinically Guided<br/>Longevity</div>
            <div style={{ fontSize:14,color:"rgba(255,255,255,.6)",marginTop:12,lineHeight:1.7,maxWidth:260,margin:"12px auto 0" }}>Biohacking and longevity science, made accessible. Backed by Elite Vita, Dubai.</div>
            <div style={{ marginTop:24,background:"#FFFFFF",borderRadius:24,padding:"15px 36px",display:"inline-block",fontSize:15,fontWeight:600,color:"#4623BE" }}>Get the App</div>
          </div>
          <div style={{ padding:"36px 28px",textAlign:"center" }}>
            <div style={{ fontSize:13,fontWeight:700,color:"#4623BE",letterSpacing:2,marginBottom:16 }}>THREE PILLARS</div>
            <div style={{ display:"flex",gap:18,justifyContent:"center",marginBottom:32 }}>
              {[{l:"DNA",s:"Your past"},{l:"Blood",s:"Your present"},{l:"Supplements",s:"Your future"}].map(p=>(
                <div key={p.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:18,fontWeight:700,color:"#4623BE",marginBottom:12,width:40,height:40,borderRadius:"50%",background:"#4623BE12",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto" }}>{p.l[0]}</div>
                  <div style={{ fontSize:15,fontWeight:700,color:"#1a1a2e" }}>{p.l}</div>
                  <div style={{ fontSize:12,color:"#6b7280",marginTop:2 }}>{p.s}</div>
                </div>
              ))}
            </div>
            <div style={{ height:1,background:"#e5e7eb",margin:"0 auto 32px",maxWidth:200 }}/>
            <div style={{ fontSize:20,fontWeight:600,color:"#1a1a2e",marginBottom:20,fontFamily:"Gilroy,sans-serif" }}>How it works</div>
            {["Book your biology test","Receive personalised results","Daily insights via DEVA™","Re-test every 90 days"].map((s,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:16,marginBottom:16,textAlign:"left" }}>
                <div style={{ width:28,height:28,borderRadius:"50%",background:"#4623BE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#FFF",flexShrink:0 }}>{i+1}</div>
                <div style={{ fontSize:15,color:"#374151",lineHeight:1.5 }}>{s}</div>
              </div>
            ))}
            <div style={{ height:1,background:"#e5e7eb",margin:"32px auto",maxWidth:200 }}/>
            <div style={{ fontSize:22,fontWeight:700,color:"#4623BE",marginBottom:4 }}>USD 1,999</div>
            <div style={{ fontSize:13,color:"#6b7280",marginBottom:20 }}>Core Package · DNA test + Blood tests (6-monthly) + Personalised recommendations</div>
            <div style={{ background:"linear-gradient(135deg, #4623BE 0%, #9717CC 40%, #00EFE3 100%)",borderRadius:24,padding:"14px 0",fontSize:16,fontWeight:600,color:"#FFF" }}>Download EVA™</div>
            <div style={{ marginTop:32,paddingTop:24,borderTop:"1px solid #e5e7eb" }}>
              <div style={{ fontSize:12,color:"#9ca3af",lineHeight:1.8 }}>EVA™ by Elite Vita Health L.L.C-FZ<br/>Dubai, UAE · eva.ae<br/><br/>EVA™ is a wellness platform designed to support health optimisation. It is not intended to diagnose, treat, cure, or prevent any disease.</div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};


export default LearnScreen;
