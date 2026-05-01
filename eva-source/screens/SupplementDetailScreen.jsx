import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Card, Label, PillIcon, TopBar } from "../components";
import { supplements } from "../data/supplements";

const SupplementDetailScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:20 }}>
        <div style={{ width:52,height:52,borderRadius:16,background:`${t.purple}10`,border:`1.5px solid ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center" }}><PillIcon size={28}/></div>
        <div><div style={{ fontSize:22,fontWeight:700,color:t.t1 }}>Magnesium Glycinate</div><div style={{ fontSize:14,color:t.t3,marginTop:2 }}>SKU: 52438 · Capsule</div></div>
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        <div style={{ display:"flex",gap:10,marginBottom:16 }}>
          {[{l:"Dose",v:"600mg",c:t.purple},{l:"Frequency",v:"Evening",c:t.cyan},{l:"With",v:"Dinner",c:t.emerald}].map(d=>(
            <div key={d.l} style={{ flex:1,background:t.s1,borderRadius:10,padding:"15px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
              <div style={{ fontSize:17,fontWeight:700,color:d.c }}>{d.v}</div>
              <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.3 }}>{d.l}</div>
            </div>
          ))}
        </div>
        <Card style={{ background:"#F59E0B08",border:"1.5px solid #F59E0B20",marginBottom:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.3"/><path d="M8 4v5l3 2" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <div style={{ fontSize:12,fontWeight:700,color:"#F59E0B",letterSpacing:.5 }}>WEARABLE ADJUSTMENT ACTIVE</div>
          </div>
          <div style={{ fontSize:13,color:t.t2,lineHeight:1.5 }}>+200mg added due to HRV drop. Day 2 of 7. Base dose: 400mg.</div>
        </Card>
        <Label>Why This Supplement</Label>
        <Card>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.7 }}>Your RBC magnesium is 4.2 mEq/L (optimal: 4.5–5.5). Your TRPM6 gene variant (rs11144134) indicates reduced magnesium absorption efficiency, requiring the glycinate form for maximum bioavailability. Magnesium supports recovery, sleep quality, cardiovascular function, and over 300 enzymatic reactions.</div>
        </Card>
        <Label>Biological Targets</Label>
        {[{m:"Magnesium (RBC)",f:"4.2 mEq/L",tgt:"4.8 mEq/L",by:"Next re-test"},{m:"Deep Sleep",f:"Variable",tgt:"Improvement within 14 days",by:"Wearable tracking"}].map((tg,i)=>(
          <Card key={i} style={{ padding:14 }}>
            <div style={{ fontSize:14,fontWeight:600,color:t.t1,marginBottom:4 }}>{tg.m}</div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3 }}><span>Current: <span style={{ color:t.gold,fontWeight:600 }}>{tg.f}</span></span><span>Target: <span style={{ color:t.emerald,fontWeight:600 }}>{tg.tgt}</span></span></div>
            <div style={{ fontSize:12,color:t.t4,marginTop:4 }}>{tg.by}</div>
          </Card>
        ))}
        <Label>Adherence</Label>
        <Card>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8 }}>
            <span style={{ fontSize:14,fontWeight:600,color:t.t1 }}>Last 30 days</span>
            <span style={{ fontSize:18,fontWeight:700,color:t.emerald }}>87%</span>
          </div>
          <div style={{ height:6,background:t.bg,borderRadius:3 }}><div style={{ width:"87%",height:"100%",background:t.emerald,borderRadius:3 }}/></div>
          <div style={{ fontSize:12,color:t.t3,marginTop:6 }}>26 of 30 days taken · Excellent consistency</div>
        </Card>
        <Label>Interactions</Label>
        <Card style={{ padding:14 }}>
          <div style={{ fontSize:13,color:t.t2,lineHeight:1.6 }}>• Take 2+ hours apart from iron supplements (reduces absorption)<br/>• Safe to combine with all other EVA™ protocol supplements<br/>• Glycinate form is gentle on the stomach — no food timing restriction required</div>
        </Card>
      </div>
    </div>
  );
};


export default SupplementDetailScreen;
