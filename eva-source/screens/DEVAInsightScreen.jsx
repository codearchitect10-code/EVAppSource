import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { CheckIcon, ChevronRight, MiniDEVA, PillIcon, TabBar, TopBar, VideoCard } from "../components";

const DEVAInsightScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [expanded, setExpanded] = useState(null);
  const [subTab, setSubTab] = useState({});
  const [checkedActions, setCheckedActions] = useState(new Set());
  const toggleAction = (key) => { const s = new Set(checkedActions); s.has(key)?s.delete(key):s.add(key); setCheckedActions(s); };

  const cards = [
    {
      id: "cvd",
      title: "Chronic low-grade inflammation — a silent driver of accelerated biological ageing.",
      marker: "hs-CRP", val: "2.8 mg/L", valColor: "red", pct: 72, optimal: "<0.6",
      dna: "No genetic variant — likely lifestyle-driven.",
      detail: "Your hs-CRP is elevated, indicating a state of chronic, low-grade inflammation. This is linked to cardiovascular disease, cancer, and dementia risk.",
      urgent: true,
      actions: [
        { type: "PROTOCOL", title: "Omega-3 and Vitamin C are working together.", supp: "Omega-3 + Vitamin C", dose: "3g Omega-3 + 1g Vit C · Morning · With food", suppId: "omega3", why: "EPA/DHA in Omega-3 reduces inflammation at the cellular level while Vitamin C neutralises free radicals that drive it. Consistency drives the resolution." },
        { type: "ACTION", title: "Avoid deep-fried and ultra-processed food today.", why: "These are key dietary drivers of systemic inflammation. Prioritise whole foods, fatty fish, leafy greens, and extra virgin olive oil." },
        { type: "NARRATIVE", title: "Month 2: Your inflammatory markers are responding.", why: "Your body is adapting to the protocol. Consistency now compounds into measurable hs-CRP reduction at your 6-month blood test." },
      ],
      outcomes: [
        { text: "Better recovery, reduced brain fog and fatigue.", timeframe: "SHORT-TERM", color: t.cyan },
        { text: "Significantly reduced hs-CRP at 6-month assessment.", timeframe: "MEDIUM-TERM", color: t.purple },
        { text: "Slower biological ageing, reduced risk of all major chronic diseases.", timeframe: "LONG-TERM", color: t.emerald },
      ]
    },
    {
      id: "vitd",
      title: "Vitamin D is deficient — impacting immunity, bone health, and hormonal balance.",
      marker: "Vitamin D", val: "18 ng/mL", valColor: "gold", pct: 22, optimal: "50–80",
      dna: "VDR FokI polymorphism — receptor efficiency reduced.",
      detail: "Your Vitamin D is deficient, impacting immunity, bone health, hormonal health, and cardiovascular health all at once. Your VDR variant requires higher doses.",
      urgent: false,
      actions: [
        { type: "PROTOCOL", title: "Double-dose loading protocol for your VDR variant.", supp: "Vitamin D3 + K2", dose: "8,000 IU · Morning · With fat (loading × 1 month, then 4,000 IU)", suppId: "vitd3", why: "Loading protocol to quickly replete stores. K2 ensures the calcium your Vitamin D helps absorb goes to your bones, not arteries." },
        { type: "ACTION", title: "Get 15 minutes of early morning sunlight today.", why: "UVB exposure supports Vitamin D synthesis and your circadian rhythm. In Dubai, morning sun before 10am is optimal." },
        { type: "NARRATIVE", title: "Month 2: Building your reserves.", why: "Vitamin D is fat-soluble and takes time to accumulate. Stay consistent — your 6-month assessment will show the trajectory." },
      ],
      outcomes: [
        { text: "Improved immunity within 2–4 weeks.", timeframe: "SHORT-TERM", color: t.cyan },
        { text: "Optimal Vitamin D levels at 6-month assessment.", timeframe: "MEDIUM-TERM", color: t.purple },
        { text: "Reduced risk of hospitalisation and sustained immune function.", timeframe: "LONG-TERM", color: t.emerald },
      ]
    },
    {
      id: "mag",
      title: "Magnesium is suboptimal — high-leverage for sleep, stress, and recovery.",
      marker: "Magnesium (RBC)", val: "4.2 mEq/L", valColor: "gold", pct: 38, optimal: "4.5–5.5",
      dna: "TRPM6 gene variant — reduced absorption efficiency.",
      detail: "RBC magnesium reflects cellular levels. Optimising it is a high-leverage action for sleep quality, stress resilience, and muscle function.",
      urgent: false,
      actions: [
        { type: "PROTOCOL", title: "Bisglycinate form — most bioavailable for your TRPM6 variant.", supp: "Magnesium Bisglycinate", dose: "300mg · 1 cap AM, 2 caps before sleep", suppId: "magnesium", why: "Split dosing is intentional: the morning dose supports energy and cognition, while the evening dose supports sleep and recovery." },
        { type: "ACTION", title: "Eat magnesium-rich foods today: dark chocolate (85%+), pumpkin seeds, spinach.", why: "Dietary magnesium complements supplementation. These are the densest natural sources." },
        { type: "NARRATIVE", title: "Month 2: Your sleep architecture is shifting.", why: "Magnesium’s effects on sleep are among the first you’ll notice. Deep sleep and HRV should be trending up." },
      ],
      outcomes: [
        { text: "Improved sleep quality and reduced stress within 1–2 weeks.", timeframe: "SHORT-TERM", color: t.cyan },
        { text: "Magnesium levels reaching optimal range at 6-month assessment.", timeframe: "MEDIUM-TERM", color: t.purple },
        { text: "A more resilient nervous system and better recovery.", timeframe: "LONG-TERM", color: t.emerald },
      ]
    }
  ];

  const totalActions = cards.length * 3;
  const progress = checkedActions.size;

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0`,flexShrink:0 }}>
        <TopBar onBack={onBack}/>
        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:12 }}>
          <MiniDEVA size={48}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:22,fontWeight:700,color:t.t1,letterSpacing:-.3 }}>Today’s DEVA™</div>
            <div style={{ fontSize:12,color:t.t2,marginTop:2 }}>3 insights · each with actions and outcomes</div>
          </div>
          <div style={{ position:"relative",width:44,height:44 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke={t.s2} strokeWidth="3"/>
              <circle cx="22" cy="22" r="18" fill="none" stroke={progress===totalActions?t.emerald:t.purple} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(progress/totalActions)*113} 113`} transform="rotate(-90 22 22)" style={{transition:"stroke-dasharray .5s ease"}}/>
            </svg>
            <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:11,fontWeight:800,color:progress===totalActions?t.emerald:t.purple }}>{progress}/{totalActions}</div>
          </div>
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"0 24px 20px" }}>
        {cards.map((card, ci) => {
          const isOpen = expanded === ci;
          const tab = subTab[ci] || "actions";
          return (
            <div key={ci} style={{ background:t.s1,borderRadius:18,marginBottom:14,border:`1px solid ${isOpen?t[card.valColor]+"30":t.b1}`,borderLeft:`3px solid ${t[card.valColor]}`,overflow:"hidden",transition:"all .2s",animation:`fadeUp .3s ease ${ci*0.08}s both` }}>
              {/* Insight header — always visible */}
              <div onClick={()=>setExpanded(isOpen?null:ci)} style={{ padding:16,cursor:"pointer" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                  <div style={{ fontSize:15,fontWeight:600,color:t.t1,lineHeight:1.4,flex:1,paddingRight:8 }}>
                    {card.urgent && <span style={{ fontSize:9,fontWeight:700,color:t.red,background:`${t.red}12`,padding:"3px 7px",borderRadius:3,letterSpacing:.5,marginRight:6,verticalAlign:"middle" }}>URGENT</span>}
                    {card.title}
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <div style={{ display:"flex",gap:4 }}>
                      {[t.purple, t.gold, t.emerald].map((c,i) => <div key={i} style={{ width:6,height:6,borderRadius:3,background:c+"60" }}/>)}
                    </div>
                    <div style={{ transform:isOpen?"rotate(90deg)":"rotate(0)",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:6 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ height:4,background:`${t.t4}12`,borderRadius:2 }}><div style={{ width:`${card.pct}%`,height:"100%",background:t[card.valColor],borderRadius:2 }}/></div>
                  </div>
                  <span style={{ fontSize:14,fontWeight:700,color:t[card.valColor],flexShrink:0 }}>{card.val}</span>
                </div>
                <div style={{ fontSize:12,color:t.purple,fontWeight:500 }}>{card.dna}</div>
              </div>

              {/* Expanded: nested actions + outcomes */}
              {isOpen && (
                <div style={{ borderTop:`1px solid ${t.b1}`,animation:"fadeUp .2s ease both" }}>
                  {/* Detail text */}
                  <div style={{ padding:"12px 16px 0",fontSize:13,color:t.t2,lineHeight:1.7 }}>{card.detail}</div>
                  {card.urgent&&<div style={{padding:"8px 16px 0"}}><VideoCard title="The Hidden Inflammation Threat" duration="0:40"/></div>}

                  {/* Sub-tabs: Actions | Outcomes */}
                  <div style={{ display:"flex",gap:6,padding:"12px 16px 0" }}>
                    {[{id:"actions",l:"3 Actions",c:t.gold},{id:"outcomes",l:"3 Outcomes",c:t.emerald}].map(s=>(
                      <div key={s.id} onClick={()=>setSubTab({...subTab,[ci]:s.id})} style={{ flex:1,background:tab===s.id?`${s.c}12`:t.s2,border:`1.5px solid ${tab===s.id?s.c:t.b2}`,borderRadius:8,padding:"8px 0",textAlign:"center",cursor:"pointer",transition:"all .2s" }}>
                        <div style={{ fontSize:12,fontWeight:700,color:tab===s.id?s.c:t.t4 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding:"10px 16px 16px" }}>
                    {tab === "actions" && card.actions.map((act, ai) => {
                      const actionKey = ci + "-" + ai;
                      const checked = checkedActions.has(actionKey);
                      const typeColor = act.type === "PROTOCOL" ? t.purple : act.type === "ACTION" ? t.gold : t.cyan;
                      return (
                        <div key={ai} style={{ background:t.bg,borderRadius:12,padding:12,marginBottom:ai<2?8:0,border:`1px solid ${checked?t.emerald+"30":t.b1}`,transition:"all .2s" }}>
                          <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                            <div onClick={(e)=>{e.stopPropagation();toggleAction(actionKey)}} style={{ width:24,height:24,borderRadius:6,background:checked?`${t.emerald}12`:`${typeColor}08`,border:`1.5px solid ${checked?t.emerald:typeColor+"30"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,marginTop:2,transition:"all .2s" }}>
                              {checked && <CheckIcon size={12} color={t.emerald}/>}
                            </div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:9,fontWeight:700,color:typeColor,background:`${typeColor}10`,padding:"3px 7px",borderRadius:3,letterSpacing:.5,display:"inline-block",marginBottom:4 }}>{act.type}</div>
                              <div style={{ fontSize:13,fontWeight:600,color:checked?t.t3:t.t1,textDecoration:checked?"line-through":"none",lineHeight:1.4,marginBottom:4 }}>{act.title}</div>
                              <div style={{ fontSize:12,color:t.t3,lineHeight:1.6 }}>{act.why}</div>
                              {act.supp && (
                                <div onClick={()=>onNavigate("supplement-detail")} style={{ display:"flex",alignItems:"center",gap:10,background:`${t.purple}06`,borderRadius:8,padding:"10px 12px",marginTop:8,cursor:"pointer" }}>
                                  <PillIcon size={14}/>
                                  <div style={{ flex:1 }}><div style={{ fontSize:12,fontWeight:600,color:t.t1 }}>{act.supp}</div><div style={{ fontSize:11,color:t.t3 }}>{act.dose}</div></div>
                                  <ChevronRight size={10} color={t.purple}/>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {tab === "outcomes" && card.outcomes.map((out, oi) => (
                      <div key={oi} style={{ background:t.bg,borderRadius:12,padding:12,marginBottom:oi<2?8:0,borderLeft:`3px solid ${out.color}`,border:`1px solid ${t.b1}`,borderLeftWidth:3,borderLeftColor:out.color }}>
                        <div style={{ fontSize:9,fontWeight:700,color:out.color,background:`${out.color}10`,padding:"3px 7px",borderRadius:3,letterSpacing:.5,display:"inline-block",marginBottom:6 }}>{out.timeframe}</div>
                        <div style={{ fontSize:14,color:t.t1,lineHeight:1.5,fontWeight:500 }}>{out.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <TabBar active="today" onNavigate={id=>onNavigate(id)}/>
    </div>
  );
};


export default DEVAInsightScreen;
