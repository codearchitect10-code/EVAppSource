import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, Card, CheckIcon, EVAFullLogo, Label, MiniDNA } from "../components";

const ResultsWowScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [view, setView] = useState("blood");
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ flexShrink:0,padding:`${SAFE_TOP}px 24px 0`,display:"flex",justifyContent:"center",paddingTop:SAFE_TOP+8 }}><EVAFullLogo width={70}/></div>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 24px 0" }}>
        {view==="blood"&&<div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
          <Label>Your Blood Results Are Ready</Label>
          <div onClick={()=>onNavigate("eva-age")} style={{ position:"relative",width:240,marginBottom:16,animation:"scaleIn .6s ease .2s both",cursor:"pointer",textAlign:"center" }}>
            <div style={{ position:"relative",height:120,overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,bottom:0,left:0,width:30,background:"linear-gradient(90deg,"+t.bg+",transparent)",zIndex:3 }}/>
              <div style={{ position:"absolute",top:0,bottom:0,right:0,width:30,background:"linear-gradient(90deg,transparent,"+t.bg+")",zIndex:3 }}/>
              <MiniDNA w={240} h={120} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/>
              <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:4 }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ width:100,height:60,borderRadius:"50%",background:t.bg,filter:"blur(20px)",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",opacity:0.85 }}/>
                  <div style={{ position:"relative",fontSize:50,fontWeight:800,color:t.emerald,letterSpacing:-2,animation:"fadeUp .5s ease .9s both" }}>34</div>
                  <div style={{ position:"relative",fontSize:12,color:t.emerald,fontWeight:600,marginTop:-2 }}>-4 years</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign:"center",marginBottom:20,animation:"fadeUp .5s ease 1.1s both" }}>
            <div style={{ fontSize:17,color:t.emerald,fontWeight:700 }}>4 years younger than chronological</div>
            <div onClick={()=>onNavigate("eva-age")} style={{ fontSize:13,color:t.emerald,marginTop:5,cursor:"pointer",textDecoration:"underline",textDecorationStyle:"dotted",textUnderlineOffset:4 }}>Tap to explore your EVA™ Age</div>
          </div>
          <div style={{ width:"100%",display:"flex",gap:12,marginBottom:14,animation:"fadeUp .5s ease 1.2s both" }}>
            {[{l:"Optimal",n:4,c:t.emerald,ic:<CheckIcon size={14} color={t.emerald}/>},{l:"Attention",n:3,c:t.gold,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L1 12h12L7 2z" stroke={t.gold} strokeWidth="1.3" fill="none"/><path d="M7 6v3M7 10.5v.5" stroke={t.gold} strokeWidth="1.3" strokeLinecap="round"/></svg>},{l:"Action Needed",n:1,c:t.red,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={t.red} strokeWidth="1.3"/><path d="M7 4v4M7 10v.5" stroke={t.red} strokeWidth="1.3" strokeLinecap="round"/></svg>}].map(c=>(
              <div key={c.l} style={{ flex:1,background:t.s1,borderRadius:14,padding:"17px 10px",textAlign:"center",border:`1px solid ${t.b1}` }}>
                <div style={{ display:"flex",justifyContent:"center",marginBottom:4 }}>{c.ic}</div>
                <div style={{ fontSize:26,fontWeight:800,color:c.c }}>{c.n}</div>
                <div style={{ fontSize:11,color:t.t2,marginTop:6,fontWeight:600 }}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>}
        {view==="dna"&&<div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
          <Label color={t.purple}>Your DNA Results Are In</Label>
          <div style={{ width:120,height:120,borderRadius:"50%",background:`${t.purple}08`,border:`3px solid ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,animation:"scaleIn .6s ease .2s both" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:38,fontWeight:800,color:t.purple,letterSpacing:-1 }}>5</div>
              <div style={{ fontSize:11,color:t.t2,fontWeight:500 }}>Variants</div>
            </div>
          </div>
          <div style={{ width:"100%",marginBottom:14 }}>
            {[{g:"MTHFR",v:"C677T",r:"Moderate"},{g:"TRPM6",v:"rs11144134",r:"Moderate"},{g:"VDR",v:"FokI",r:"Moderate"},{g:"APOE",v:"ε3/ε3",r:"Low"},{g:"CYP1A2",v:"Fast",r:"Low"}].map((d,i)=>(
              <Card key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,animation:`fadeUp .4s ease ${.1*i}s both` }}>
                <div><span style={{ fontSize:15,fontWeight:700,color:t.purple }}>{d.g}</span><span style={{ fontSize:13,color:t.t3,marginLeft:8 }}>{d.v}</span></div>
                <div style={{ fontSize:11,fontWeight:600,color:d.r==="Low"?t.emerald:t.gold,background:d.r==="Low"?`${t.emerald}12`:`${t.gold}12`,padding:"5px 10px",borderRadius:4 }}>{d.r}</div>
              </Card>
            ))}
          </div>
          <div style={{ fontSize:14,color:t.t2,textAlign:"center",lineHeight:1.6 }}>Protocol refined with DNA-specific adjustments. DEVA™ insights are now fully personalised.</div>
        </div>}
        {view==="combined"&&<div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
          <Label color={t.cyan}>Your Complete Profile</Label>
          <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,marginBottom:20 }}>Blood biomarkers and DNA variants combined into your complete longevity picture.</div>
          <div style={{ width:"100%",display:"flex",gap:12,marginBottom:14 }}>
            {[{l:"Biomarkers",v:"70+",c:t.cyan},{l:"DNA Variants",v:"5",c:t.purple},{l:"Protocol Items",v:"7",c:t.emerald}].map(s=>(
              <div key={s.l} style={{ flex:1,background:t.s1,borderRadius:12,padding:"17px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
                <div style={{ fontSize:24,fontWeight:800,color:s.c }}>{s.v}</div>
                <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ width:"100%",display:"flex",gap:12,marginBottom:14 }}>
            {[{l:"EVA™ Age",v:"34",c:t.emerald},{l:"Chronological",v:"38",c:t.t3},{l:"Difference",v:"-4",c:t.emerald}].map(s=>(
              <div key={s.l} onClick={s.l==="EVA™ Age"?()=>onNavigate("eva-age"):undefined} style={{ flex:1,background:s.l==="EVA™ Age"?`linear-gradient(135deg, ${t.emerald}12, ${t.emerald}06)`:t.s1,borderRadius:12,padding:"12px 8px",textAlign:"center",border:s.l==="EVA™ Age"?`1.5px solid ${t.emerald}25`:`1px solid ${t.b1}`,cursor:s.l==="EVA™ Age"?"pointer":"default" }}>
                {s.l==="EVA™ Age"&&<div style={{ display:"flex",justifyContent:"center",marginBottom:2 }}><MiniDNA w={50} h={24} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/></div>}
                <div style={{ fontSize:24,fontWeight:800,color:s.c }}>{s.v}</div>
                <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>}
      </div>
      <div style={{ flexShrink:0,padding:"0 24px 8px" }}>
        <Btn onClick={()=>onNavigate("today")}>View My Protocol →</Btn>
        <div style={{ marginTop:12,paddingTop:8,borderTop:`1px dashed ${t.b2}` }}>
          <div style={{ fontSize:10,fontWeight:700,color:t.t4,letterSpacing:2,textAlign:"center",marginBottom:6 }}>RESULT VIEW SIMULATOR</div>
          <div style={{ display:"flex",gap:8 }}>
            {[{id:"blood",l:"Blood"},{id:"dna",l:"DNA"},{id:"combined",l:"Combined"}].map(v=>(
              <div key={v.id} onClick={()=>setView(v.id)} style={{ flex:1,background:view===v.id?`${t.t4}15`:t.s2,border:`1px dashed ${view===v.id?t.t4:t.b2}`,borderRadius:6,padding:"6px 0",textAlign:"center",fontSize:10,fontWeight:600,color:view===v.id?t.t3:t.t4,cursor:"pointer" }}>{v.l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════
// NEW: Results Tab (My Biology)
// ══════════════════════════════════════════


export default ResultsWowScreen;
