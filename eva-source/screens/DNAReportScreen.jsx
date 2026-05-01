import { Line } from "recharts";
import { useTheme, useToast } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Card, Label, Title, TopBar } from "../components";

const DNAReportScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <Title>DNA Analysis Report</Title>
        <div style={{ display:"flex",gap:10 }}>
          <div onClick={()=>toast.show("Downloading report...","info")} style={{ width:36,height:36,borderRadius:10,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M8 10l-3-3M8 10l3-3M3 14h10" stroke={t.t1} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div onClick={()=>toast.show("Share link copied!","success")} style={{ width:36,height:36,borderRadius:10,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="12" cy="4" r="2" stroke={t.t1} strokeWidth="1.3"/><circle cx="4" cy="8" r="2" stroke={t.t1} strokeWidth="1.3"/><circle cx="12" cy="12" r="2" stroke={t.t1} strokeWidth="1.3"/><path d="M6 7l4-2M6 9l4 2" stroke={t.t1} strokeWidth="1.3"/></svg>
          </div>
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card style={{ padding:22,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14 }}>
            <div><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>PATIENT</div><div style={{ fontSize:16,fontWeight:600,color:t.t1,marginTop:4 }}>Daniel Salewski</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>DATE</div><div style={{ fontSize:16,fontWeight:600,color:t.t1,marginTop:4 }}>28 Feb 2025</div></div>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between" }}>
            <div><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>PROVIDER</div><div style={{ fontSize:14,fontWeight:500,color:t.t2,marginTop:4 }}>OmicsEdge Genomics</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>VARIANTS</div><div style={{ fontSize:14,fontWeight:500,color:t.t2,marginTop:4 }}>5 clinically significant</div></div>
          </div>
        </Card>
        <Label>Significant Variants</Label>
        {[
          {gene:"MTHFR",variant:"C677T Heterozygous",impact:"Reduced folate metabolism",risk:"medium",action:"Methylated B-Complex added to protocol"},
          {gene:"TRPM6",variant:"rs11144134",impact:"Reduced magnesium absorption",risk:"medium",action:"Higher Mg dosage + glycinate form prescribed"},
          {gene:"VDR",variant:"FokI polymorphism",impact:"Vitamin D receptor efficiency reduced",risk:"medium",action:"4,000 IU D3 protocol (higher than standard)"},
          {gene:"APOE",variant:"ε3/ε3",impact:"Standard cardiovascular risk profile",risk:"low",action:"No additional intervention required"},
          {gene:"CYP1A2",variant:"Fast metaboliser",impact:"Rapid caffeine clearance",risk:"low",action:"No caffeine restriction needed"},
        ].map((g,i)=>(
          <Card key={i} style={{ padding:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ fontSize:16,fontWeight:700,color:t.purple }}>{g.gene}</div>
                <div style={{ fontSize:12,color:t.t3 }}>{g.variant}</div>
              </div>
              <div style={{ fontSize:11,fontWeight:600,color:g.risk==="low"?t.emerald:t.gold,background:g.risk==="low"?`${t.emerald}12`:`${t.gold}12`,padding:"5px 10px",borderRadius:4 }}>{g.risk==="low"?"LOW":"MODERATE"}</div>
            </div>
            <div style={{ fontSize:14,fontWeight:500,color:t.t1,marginBottom:4 }}>{g.impact}</div>
            <div style={{ fontSize:13,color:t.t2 }}>{g.action}</div>
          </Card>
        ))}
        <div style={{ textAlign:"center",padding:"20px 0",fontSize:13,color:t.t4 }}>Full report: 24 pages · PDF available for download</div>
      </div>
    </div>
  );
};


export default DNAReportScreen;
