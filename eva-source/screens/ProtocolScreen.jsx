import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { CheckIcon, InfoIcon, InfoModal, TabBar, Title, TopBar, VideoCard } from "../components";
import { supplements } from "../data/supplements";

const ProtocolScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [tab, setTab] = useState("morning");
  const [suppInfo, setSuppInfo] = useState(null);
  const [taken, setTaken] = useState(new Set([2,4]));
    const sups = { morning:[{n:"Vitamin D3",d:"4,000 IU",r:"Below optimal",why:"Your Vitamin D is at 18 ng/mL (optimal: 50–80). Your VDR gene variant reduces receptor efficiency, requiring higher supplementation.",info:"Vitamin D3 (cholecalciferol) supports immune function, bone density, mood regulation, and calcium absorption. Take with a fat-containing meal for optimal absorption. Your VDR FokI polymorphism means standard doses are insufficient — 4,000 IU compensates for reduced receptor binding. Paired with K2 (200mcg) to direct calcium to bones, not arteries. Expected improvement: 10–15 ng/mL increase over 90 days. Re-test to confirm."},{n:"Omega-3",d:"2,000mg",r:"Inflammation",why:"Your hs-CRP is elevated at 2.8 mg/L. EPA/DHA at this dose targets systemic inflammation and cardiovascular markers.",info:"Omega-3 fatty acids (EPA 1,340mg + DHA 660mg) are pharmaceutical-grade fish oil targeting systemic inflammation. Your hs-CRP at 2.8 mg/L indicates low-grade chronic inflammation. Take with breakfast. Minimum 90 days for measurable hs-CRP reduction. Also supports cardiovascular health, brain function, and joint mobility. No significant interactions with your current protocol."},{n:"CoQ10",d:"200mg",r:"Mitochondrial",why:"Supports cellular energy production and mitochondrial health. Essential for cardiovascular function and exercise recovery.",info:"Coenzyme Q10 (ubiquinol form, 200mg) is essential for mitochondrial ATP production. Levels naturally decline after age 30. Supports cardiovascular function, exercise recovery, and cellular energy. Take with a fat-containing meal. Particularly important if you experience fatigue or engage in regular exercise. Synergistic with Omega-3 for cardiovascular protection."},{n:"Vitamin K2",d:"200mcg",r:"Paired with D3",why:"K2 directs calcium to bones rather than arteries. Always paired with D3 supplementation for safe, effective absorption.",info:"Vitamin K2 (MK-7 form, 200mcg) activates osteocalcin (directs calcium to bones) and Matrix GLA protein (prevents arterial calcification). Essential safety pairing with high-dose D3. Without K2, excess calcium from D3 can deposit in arteries. Take together with D3 in the morning. No known upper limit toxicity for K2."},{n:"B-Complex",d:"1 capsule",r:"MTHFR variant",why:"Your MTHFR C677T variant reduces folate metabolism. Methylated B-Complex bypasses this genetic bottleneck.",info:"Methylated B-Complex contains pre-activated forms: L-Methylfolate (400mcg), Methylcobalamin B12 (1000mcg), P5P B6, and Riboflavin 5-Phosphate. Your MTHFR C677T heterozygous variant reduces folate conversion by ~35%. Methylated forms bypass this bottleneck entirely. Supports homocysteine metabolism, energy production, and nervous system function. Take in the morning — B vitamins can be stimulating."}], evening:[{n:"Magnesium Glycinate",d:"600mg",r:"Recovery & sleep",adjusted:true,adjustNote:"Wearable: +200mg for 7 days (Day 2/7)",why:"Your RBC magnesium is 4.2 mEq/L (optimal: 4.5–5.5). TRPM6 variant reduces absorption. Glycinate form maximises bioavailability and supports sleep.",info:"Magnesium Bisglycinate (600mg = 100mg elemental per capsule × 6). Glycinate form chosen specifically for your TRPM6 rs11144134 variant which reduces intestinal absorption. This chelated form bypasses the compromised transport channel. Supports 300+ enzymatic reactions, sleep quality (GABA agonist), muscle recovery, and cardiovascular function. Take with dinner — glycinate promotes relaxation. Currently adjusted +200mg due to HRV drop detected by your wearable."},{n:"Zinc Picolinate",d:"30mg",r:"Immune support",why:"Supports immune function, testosterone maintenance, and wound healing. Picolinate form offers superior absorption.",info:"Zinc Picolinate (25mg elemental from 150mg picolinate, with 1mg copper). Picolinate form has highest bioavailability among zinc forms. Supports immune cell production, testosterone synthesis, wound healing, and taste/smell function. Copper included to prevent zinc-induced copper depletion. Take with dinner to avoid nausea. Do not take within 2 hours of iron supplements."}] };
  const tog = i => { const s = new Set(taken); s.has(i)?s.delete(i):s.add(i); setTaken(s); };
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0` }}>
        <TopBar onBack={onBack}/><Title sub="Reviewed by Dr. Nival · Updated 6 Mar 2025">Your Protocol</Title>
        <VideoCard title="How Your Protocol Was Built" duration="1:45"/>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"12px 16px",background:`${t.cyan}06`,borderRadius:14,border:`1px solid ${t.cyan}18` }}>
          <div style={{ width:36,height:36,borderRadius:10,background:`${t.cyan}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12l-1 8H3L2 4z" stroke={t.cyan} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12a1 1 0 100 2 1 1 0 000-2zM11 12a1 1 0 100 2 1 1 0 000-2z" fill={t.cyan}/></svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>Next delivery: 1 Apr 2026</div>
            <div style={{ fontSize:12,color:t.t3 }}>7 supplements · 30-day supply</div>
          </div>
          <div onClick={()=>toast.show("Your next box ships 1 Apr: Vitamin D3, Omega-3, CoQ10, K2, B-Complex, Magnesium, Zinc","info")} style={{ cursor:"pointer" }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={t.purple} strokeWidth="1.2"/><path d="M8 5v3M8 10h.01" stroke={t.purple} strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:18 }}>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:18 }}>
          {["morning","evening"].map(tb=>(<div key={tb} onClick={()=>{setTab(tb);setTaken(tb==="morning"?new Set([2,4]):new Set());}} style={{ flex:1,background:tab===tb?t.purple:t.s2,border:tab===tb?`1.5px solid ${t.purple}`:`1px solid ${t.b2}`,borderRadius:12,padding:"11px 0",textAlign:"center",fontSize:14,fontWeight:600,color:tab===tb?"#FFF":t.t3,cursor:"pointer",transition:"all .2s",textTransform:"capitalize" }}>{tb}</div>))}
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"0 24px" }}>
        {(sups[tab]&&sups[tab].every((_,i)=>taken.has(i)))?<div style={{textAlign:"center",padding:"60px 20px"}}><div style={{width:64,height:64,borderRadius:"50%",background:`${t.emerald}12`,border:`2px solid ${t.emerald}30`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><CheckIcon size={28} color={t.emerald}/></div><div style={{fontSize:17,fontWeight:600,color:t.t1,marginBottom:8}}>All logged!</div><div style={{fontSize:14,color:t.t3,lineHeight:1.6}}>Your {tab} supplements are recorded. Great job staying consistent.</div></div>:(sups[tab]||[]).map((s,i)=>(
          <div key={`${tab}-${i}`} style={{ background:t.s1,borderRadius:16,padding:taken.has(i)?"0 16px":"14px 16px",marginBottom:taken.has(i)?0:10,border:`1px solid ${taken.has(i)?"transparent":t.b1}`,cursor:"pointer",transition:"all .35s ease",maxHeight:taken.has(i)?0:200,opacity:taken.has(i)?0:1,overflow:"hidden" }}>
            <div onClick={()=>tog(i)} style={{ display:"flex",alignItems:"center",gap:16 }}>
              <div style={{ width:38,height:38,borderRadius:11,background:taken.has(i)?`${t.emerald}14`:`${t.purple}10`,border:`1.5px solid ${taken.has(i)?t.emerald:t.purple}25`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s" }}>{taken.has(i)?<CheckIcon size={16} color={t.emerald}/>:<div style={{width:10,height:10,borderRadius:"50%",border:`1.5px solid ${t.purple}40`}}/>}</div>
              <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1,flex:1 }}>{s.n}{s.adjusted&&<span style={{ fontSize:9,fontWeight:700,color:"#F59E0B",background:"#F59E0B12",padding:"4px 8px",borderRadius:4,marginLeft:6,letterSpacing:.5,verticalAlign:"middle" }}>ADJUSTED</span>}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{s.d} · {s.r}</div></div>
              <div onClick={(e)=>{e.stopPropagation();setSuppInfo(s)}} style={{cursor:"pointer",padding:4}}><InfoIcon size={16} color={t.purple}/></div>
            </div>
            {s.why&&<div style={{ marginTop:10,paddingTop:10,borderTop:`1px solid ${t.b1}`,fontSize:13,color:t.t2,lineHeight:1.6 }}>{s.why}{s.adjustNote&&<div style={{ marginTop:8,fontSize:12,color:"#F59E0B",fontWeight:600,display:"flex",alignItems:"center",gap:8 }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.5"/><path d="M8 4v5l3 2" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round"/></svg>{s.adjustNote}</div>}</div>}
          </div>
        ))}

        <VideoCard title="Supplement Quality & Certifications" duration="2:45"/>
      </div>
      {suppInfo&&<InfoModal title={suppInfo.n} text={suppInfo.info||suppInfo.why} onClose={()=>setSuppInfo(null)} video={true}/>}
      <TabBar active="protocol" onNavigate={id=>onNavigate(id)}/>
    </div>
  );
};


export default ProtocolScreen;
