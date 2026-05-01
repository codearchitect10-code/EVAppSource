import { useState, useEffect } from "react";
import { Line } from "recharts";
import { useTheme, useToast } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Title, TopBar } from "../components";

const ReportViewerScreen = ({ onNavigate, onBack, subTarget, clearSubTarget }) => {
  const t = useTheme();
  const toast = useToast();
  const [rTab, setRTab] = useState(subTarget==="dna"?"dna":"blood");
  useEffect(()=>{if(subTarget){setRTab(subTarget);clearSubTarget?.()}},[subTarget]);
  const bloodReports = [{n:"Cardiovascular Health",f:"EVA_Blood_Cardiovascular.pdf",d:"4 Feb 2025"},{n:"Blood Sugar & Metabolism",f:"EVA_Blood_Metabolic.pdf",d:"4 Feb 2025"},{n:"Inflammation & Liver",f:"EVA_Blood_Inflammation.pdf",d:"4 Feb 2025"},{n:"Nutrition & Vitamins",f:"EVA_Blood_Nutrition.pdf",d:"4 Feb 2025"},{n:"Hormones",f:"EVA_Blood_Hormones.pdf",d:"4 Feb 2025"},{n:"Kidney & Electrolytes",f:"EVA_Blood_Kidney.pdf",d:"4 Feb 2025"}];
  const dnaReports = [{n:"Methylation Pathway",f:"EVA_DNA_Methylation.pdf"},{n:"Diet & Macronutrient Response",f:"EVA_DNA_Diet.pdf"},{n:"Food Sensitivities",f:"EVA_DNA_Sensitivities.pdf"},{n:"Cardiovascular Risk",f:"EVA_DNA_Cardiovascular.pdf"},{n:"Metabolic Risk",f:"EVA_DNA_Metabolic.pdf"},{n:"Cancer Risk Panel",f:"EVA_DNA_Cancer.pdf"},{n:"Neurological Risk",f:"EVA_DNA_Neurological.pdf"},{n:"Nutrigenomics",f:"EVA_DNA_Nutrigenomics.pdf"},{n:"Detoxification Pathways",f:"EVA_DNA_Detox.pdf"},{n:"Inflammation Genetics",f:"EVA_DNA_Inflammation.pdf"},{n:"Hormone Metabolism",f:"EVA_DNA_Hormones.pdf"},{n:"Sleep & Circadian",f:"EVA_DNA_Sleep.pdf"},{n:"Athletic Performance",f:"EVA_DNA_Athletic.pdf"},{n:"Skin & Ageing",f:"EVA_DNA_Skin.pdf"}];
  const reports = rTab==="blood"?bloodReports:dnaReports;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Download your full reports as PDF.">My Reports</Title>
      <div style={{ display:"flex",gap:6,marginBottom:16,background:t.s2,borderRadius:10,padding:3 }}>
        {[{id:"blood",l:"Blood Reports"},{id:"dna",l:"DNA Reports"}].map(tb=>(
          <div key={tb.id} onClick={()=>setRTab(tb.id)} style={{ flex:1,background:rTab===tb.id?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:rTab===tb.id?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
            <div style={{ fontSize:13,fontWeight:600,color:rTab===tb.id?t.t1:t.t3 }}>{tb.l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        {reports.map((r,i)=>(
          <div key={i} onClick={()=>toast.show(`Downloading ${r.f}`,"success")} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:t.s1,borderRadius:12,border:`1px solid ${t.b1}`,marginBottom:8,cursor:"pointer",transition:"all .15s" }}>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke={t.purple} strokeWidth="1.3"/><path d="M5 7h6M5 10h4" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{r.n}</div>
                <div style={{ fontSize:11,color:t.t3,marginTop:2 }}>{r.f}</div>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ))}
        <div onClick={()=>toast.show("Downloading all reports as ZIP","success")} style={{ marginTop:12,padding:"14px 0",textAlign:"center",border:`1.5px solid ${t.purple}`,borderRadius:12,cursor:"pointer" }}>
          <span style={{ fontSize:14,fontWeight:600,color:t.purple }}>Download All {rTab==="blood"?"Blood":"DNA"} Reports</span>
        </div>
      </div>
    </div>
  );
};


export default ReportViewerScreen;
