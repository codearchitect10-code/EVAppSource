import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, Card, Label, Title, TopBar } from "../components";

const RetestScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/><Label color={t.gold}>Re-Evaluation Due</Label>
      <Title sub="90 days since your last panel.">Time to re-test.</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card>
          <div style={{ fontSize:11,color:t.t3,marginBottom:14,letterSpacing:2,fontWeight:700 }}>YOUR PROGRESS</div>
          {/* Improvement Summary */}
            <Card style={{ background:`${t.emerald}06`,border:`1px solid ${t.emerald}18`,marginBottom:12,padding:14 }}>
              <div style={{ fontSize:11,fontWeight:700,color:t.emerald,letterSpacing:1,marginBottom:8 }}>IMPROVED</div>
              {[{m:"Vitamin D",from:"18",to:"32",u:"ng/mL",d:"Protocol: 4,000 IU D3 + K2"},{m:"Magnesium",from:"4.2",to:"4.8",u:"mEq/L",d:"Protocol: 600mg Glycinate"}].map((x,i)=>(
                <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:i>0?`1px solid ${t.emerald}15`:"none" }}>
                  <span style={{ fontSize:14,fontWeight:500,color:t.t1 }}>{x.m}</span>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <span style={{ fontSize:13,color:t.t3 }}>{x.from}</span>
                    <span style={{ fontSize:12,color:t.emerald }}>→</span>
                    <span style={{ fontSize:14,fontWeight:700,color:t.emerald }}>{x.to} {x.u}</span>
                  </div>
                </div>
              ))}
            </Card>
            <Card style={{ background:`${t.gold}06`,border:`1px solid ${t.gold}18`,marginBottom:12,padding:14 }}>
              <div style={{ fontSize:11,fontWeight:700,color:t.gold,letterSpacing:1,marginBottom:8 }}>STILL WORKING ON</div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0" }}>
                <span style={{ fontSize:14,fontWeight:500,color:t.t1 }}>hs-CRP</span>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <span style={{ fontSize:13,color:t.t3 }}>2.8</span>
                  <span style={{ fontSize:12,color:t.gold }}>→</span>
                  <span style={{ fontSize:14,fontWeight:700,color:t.gold }}>1.4 mg/L</span>
                </div>
              </div>
              <div style={{ fontSize:12,color:t.t3,marginTop:4 }}>Target: &lt;1.0 · Protocol adjusted: Omega-3 dose increased, curcumin added</div>
            </Card>
            <div style={{ fontSize:11,fontWeight:700,color:t.t3,letterSpacing:2,marginBottom:10,marginTop:16 }}>KEY MARKERS TO COMPARE</div>
            {[{l:"Vitamin D",f:"18 ng/mL",to:"40+ ng/mL",dir:"up"},{l:"Magnesium",f:"4.2 mEq/L",to:"4.5+ mEq/L",dir:"up"},{l:"hs-CRP",f:"2.8 mg/L",to:"<1.0 mg/L",dir:"down"}].map((r,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderTop:i>0?`1px solid ${t.bg}`:"none" }}>
              <span style={{ fontSize:14,color:t.t1,flex:1,fontWeight:500 }}>{r.l}</span><span style={{ fontSize:14,fontWeight:600,color:t.red }}>{r.f}</span><span style={{ fontSize:12,color:t.t4,margin:"0 6px" }}>{r.dir==="down"?<svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{verticalAlign:"middle"}}><path d="M5 2v6M5 8L2.5 5.5M5 8l2.5-2.5" stroke={t.emerald} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>:<svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{verticalAlign:"middle"}}><path d="M5 8V2M5 2L2.5 4.5M5 2l2.5 2.5" stroke={t.emerald} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</span><span style={{ fontSize:14,fontWeight:600,color:t.emerald }}>{r.to}</span>
            </div>
          ))}
        </Card>
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}><Btn onClick={()=>onNavigate("book-test")}>Book Re-Test</Btn><div onClick={onBack} style={{ textAlign:"center",fontSize:14,color:t.t3,marginTop:12,cursor:"pointer" }}>Remind me later</div></div>
    </div>
  );
};

// ══════════════════════════════════════════
// NAVIGATION & MAIN APP
// ══════════════════════════════════════════


export default RetestScreen;
