import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, Card, CheckIcon, ChevronRight, MiniDNA, TabBar, VideoCard } from "../components";
import { bloodSystems } from "../data/blood-markers";
import { dnaSystems } from "../data/dna-systems";

const ResultsTabScreen = ({ onNavigate, gender }) => {
  const t = useTheme();
  const [tab, setTab] = useState("blood");
  const [expandedMarker, setExpandedMarker] = useState(null);
  const [expandedSystems, setExpandedSystems] = useState(new Set());
  const [bioFilter, setBioFilter] = useState("all");
  const [expandedDNA, setExpandedDNA] = useState(new Set());
  const [dnaShowAll, setDnaShowAll] = useState(new Set());

  const toggleSys = (id) => { const s = new Set(expandedSystems); s.has(id)?s.delete(id):s.add(id); setExpandedSystems(s); };
  const toggleDnaSys = (id) => { const s = new Set(expandedDNA); s.has(id)?s.delete(id):s.add(id); setExpandedDNA(s); };
  const toggleDnaAll = (id) => { const s = new Set(dnaShowAll); s.has(id)?s.delete(id):s.add(id); setDnaShowAll(s); };


  /* ── Blood Systems Data (from Blood Markers Tab spec) ── */
  const bloodSystems = [
    { id:"cardio", letter:"A", name:"Heart & Blood Vessels", ic:"\u2665",
      main:[
        { name:"ApoB",val:"112",unit:"mg/dL",status:"suboptimal",optimal:"<100 mg/dL (target-dependent)",meaning:"ApoB counts the number of cholesterol particles that can enter arteries and cause plaque buildup, driving heart attack risk.",action:"Supports ApoB reduction using Berberine to improve cholesterol clearance." },
        { name:"Lipoprotein(a)",val:"22",unit:"mg/dL",status:"optimal",optimal:"<30 mg/dL",meaning:"Lp(a) is an inherited cholesterol particle that increases the risk of heart attack and stroke.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"LDL Cholesterol",val:"118",unit:"mg/dL",status:"suboptimal",optimal:"<100 mg/dL",meaning:"LDL carries cholesterol through the bloodstream and contributes to plaque formation when elevated.",action:"Supports cholesterol metabolism through dietary optimisation." },
        { name:"HDL Cholesterol",val:"58",unit:"mg/dL",status:"optimal",optimal:"50–90 mg/dL",meaning:"HDL helps remove excess cholesterol from the bloodstream and transport it back to the liver.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Triglycerides",val:"142",unit:"mg/dL",status:"suboptimal",optimal:"<90 mg/dL",meaning:"Triglycerides measure circulating fats and reflect metabolic health and insulin sensitivity.",action:"Supports fat metabolism using Omega-3 fatty acids." },
      ]
    },
    { id:"sugar", letter:"B", name:"Blood Sugar Control", ic:"\u25C9",
      main:[
        { name:"HOMA-IR",val:"2.1",unit:"",status:"suboptimal",optimal:"≤1.5",meaning:"HOMA-IR estimates how resistant your body is to insulin, a key driver of metabolic disease.",action:"Supports insulin sensitivity using Berberine and Magnesium." },
        { name:"TG/HDL Ratio",val:"2.4",unit:"",status:"suboptimal",optimal:"≤1.5",meaning:"This ratio reflects how efficiently your body processes energy and indicates insulin resistance risk.",action:"Supports metabolic health using Omega-3 and Berberine." },
      ],
      expanded:[
        { name:"Fasting Glucose",val:"92",unit:"mg/dL",status:"optimal",optimal:"<95 mg/dL",meaning:"Fasting glucose measures how well your body maintains stable blood sugar levels.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Fasting Insulin",val:"9.2",unit:"µIU/mL",status:"suboptimal",optimal:"<6 µIU/mL",meaning:"Fasting insulin shows how much insulin your body needs to regulate blood sugar.",action:"Supports insulin sensitivity using Berberine." },
      ]
    },
    { id:"inflam", letter:"C", name:"Inflammation & Liver", ic:"\u26A0",
      main:[
        { name:"hs-CRP",val:"2.8",unit:"mg/L",status:"abnormal",optimal:"<0.6 mg/L",meaning:"hs-CRP measures inflammation in the body and is linked to chronic disease risk.",action:"Supports inflammation reduction using Omega-3 and Vitamin C." },
        { name:"GGT",val:"24",unit:"U/L",status:"suboptimal",optimal:"<11 U/L",meaning:"GGT is a liver enzyme that reflects oxidative stress and detoxification burden.",action:"Supports liver detox and metabolic recovery." },
      ],
      expanded:[
        { name:"AST",val:"28",unit:"U/L",status:"optimal",optimal:"17–30 U/L",meaning:"AST reflects liver and metabolic stress.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"ALT",val:"32",unit:"U/L",status:"suboptimal",optimal:"<29 U/L",meaning:"ALT measures liver cell stress and damage. It is more specific to liver stress compared to AST.",action:"Supports liver health through metabolic optimisation." },
        { name:"Uric Acid",val:"5.8",unit:"mg/dL",status:"optimal",optimal:"<6 mg/dL",meaning:"Uric acid reflects purine metabolism and is linked to inflammation, gout, and metabolic risk.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
    { id:"nutrition", letter:"D", name:"Nutrition", ic:"\u2726",
      main:[
        { name:"Vitamin B12",val:"380",unit:"pg/mL",status:"suboptimal",optimal:">400 pg/mL",meaning:"Vitamin B12 supports nerve function, energy production, and methylation pathways.",action:"Supports methylation using Vitamin B12 supplementation." },
        { name:"Folate",val:"14",unit:"ng/mL",status:"optimal",optimal:"≥11 ng/mL",meaning:"Folate supports DNA repair and methylation processes.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Homocysteine",val:"11.2",unit:"µmol/L",status:"suboptimal",optimal:"<9 µmol/L",meaning:"Homocysteine rises when methylation is impaired and is linked to cardiovascular and brain risk.",action:"Supports methylation using L-Methylfolate and Vitamin B12." },
        { name:"Magnesium (RBC)",val:"4.2",unit:"mEq/L",status:"suboptimal",optimal:"≥4.5 mEq/L",meaning:"Magnesium supports energy production, sleep, and nervous system balance.",action:"Supports recovery using Magnesium Glycinate." },
        { name:"Vitamin D",val:"18",unit:"ng/mL",status:"abnormal",optimal:"50–80 ng/mL",meaning:"Vitamin D regulates immune function, bone health, and metabolic balance.",action:"Optimises levels using Vitamin D3 + K2." },
      ],
      expanded:[
        { name:"Zinc",val:"74",unit:"µg/dL",status:"suboptimal",optimal:"80–130 µg/dL",meaning:"Zinc supports immune function, hormone production, and cellular repair.",action:"Supports immune and hormone health using Zinc." },
        { name:"Ferritin",val:"89",unit:"ng/mL",status:"optimal",optimal:"70–200 ng/mL",meaning:"Ferritin reflects iron storage and oxygen delivery capacity, affecting energy, sleep, and hair/skin.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Hemoglobin",val:"14.8",unit:"g/dL",status:"optimal",optimal:">13 g/dL",meaning:"Hemoglobin carries oxygen in the blood and reflects overall oxygen transport.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
    { id:"hormones", letter:"E", name:"Hormones", ic:"\u2642",
      main: gender === "male" ? [
        { name:"Testosterone",val:"680",unit:"ng/dL",status:"optimal",optimal:"500–900 ng/dL",meaning:"Testosterone regulates energy, muscle mass, mood, and metabolic health.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Cortisol (AM)",val:"14",unit:"µg/dL",status:"optimal",optimal:"6–20 µg/dL",meaning:"Cortisol regulates stress response, energy levels, and daily rhythm.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"IGF-1",val:"218",unit:"ng/mL",status:"optimal",optimal:"Age-adjusted median",meaning:"IGF-1 reflects growth hormone activity linked to muscle maintenance and metabolic health.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ] : [
        { name:"Estrogen (Estradiol)",val:"—",unit:"pg/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"Estrogen regulates reproductive health, bone strength, and metabolic balance.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"Progesterone",val:"—",unit:"ng/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"Progesterone supports menstrual balance, fertility, and mood regulation.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"LH",val:"—",unit:"mIU/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"LH regulates ovulation and reproductive hormone signalling.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"Cortisol (AM)",val:"14",unit:"µg/dL",status:"optimal",optimal:"6–20 µg/dL",meaning:"Cortisol regulates stress response, energy levels, and daily rhythm.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"TSH",val:"2.1",unit:"mIU/L",status:"optimal",optimal:"0.5–2.5 mIU/L",meaning:"TSH indicates thyroid function which regulates metabolism, energy, and body temperature.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Free T3",val:"0.38",unit:"ng/dL",status:"optimal",optimal:">0.35 ng/dL",meaning:"Free T3 is the active thyroid hormone that regulates metabolism at the cellular level.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Free T4",val:"1.2",unit:"ng/dL",status:"optimal",optimal:">1.0 ng/dL",meaning:"Free T4 is converted to active T3 and reflects thyroid output.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        ...(gender === "male" ? [
          { name:"SHBG",val:"38",unit:"nmol/L",status:"optimal",optimal:"Reference range",meaning:"SHBG binds testosterone and regulates free hormone availability.",action:"Book a telehealth consult with an EVA™ physician." },
          { name:"PSA",val:"0.8",unit:"ng/mL",status:"optimal",optimal:"<4.0 ng/mL",meaning:"PSA screens for prostate health and inflammation.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        ] : [
          { name:"FSH",val:"—",unit:"mIU/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"FSH controls ovarian function and reproductive hormone balance.",action:"Book a telehealth consult with an EVA™ physician." },
        ]),
        { name:"DHEA",val:"320",unit:"µg/dL",status:"optimal",optimal:"Reference range",meaning:"DHEA is a precursor hormone supporting vitality and immune function.",action:"Book a telehealth consult with an EVA™ physician." },
      ]
    },
    { id:"kidney", letter:"F", name:"Kidney & Electrolytes", ic:"\u25CE",
      main:[
        { name:"Creatinine",val:"1.0",unit:"mg/dL",status:"optimal",optimal:"<1.2 mg/dL",meaning:"Creatinine reflects kidney function and filtration capacity.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Sodium",val:"141",unit:"mmol/L",status:"optimal",optimal:"138–145 mmol/L",meaning:"Sodium regulates fluid balance and nerve function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Potassium",val:"4.2",unit:"mmol/L",status:"optimal",optimal:"3.8–5.5 mmol/L",meaning:"Potassium supports heart rhythm and muscle function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"BUN",val:"16",unit:"mg/dL",status:"optimal",optimal:"7–20 mg/dL",meaning:"BUN reflects protein metabolism and kidney function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Chloride",val:"102",unit:"mmol/L",status:"optimal",optimal:"98–106 mmol/L",meaning:"Chloride helps maintain fluid balance and acid-base stability.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
  ];

  /* ── DNA Data (from DNA Tab spec) ── */
  const dnaSystems = [
    { id:"methylation", name:"Methylation Pathway", desc:"Supports DNA repair, detoxification, neurotransmitters, and long-term disease prevention.",
      rule:"Shows only impaired genes. Tap 'See all' for complete panel.",
      markers:[
        { gene:"MTHFR",status:"impaired",level:"orange",meaning:"MTHFR controls conversion of folate into its active form used for DNA repair and methylation.",action:"Supports methylation using L-Methylfolate and Vitamin B12." },
        { gene:"FOLH1",status:"normal",level:"green",meaning:"FOLH1 regulates absorption of folate from food in the gut.",action:"No action needed." },
        { gene:"DHFR",status:"normal",level:"green",meaning:"DHFR converts synthetic folic acid into active folate in the body.",action:"No action needed." },
        { gene:"MTR",status:"normal",level:"green",meaning:"MTR helps recycle homocysteine into methionine, a key step in methylation.",action:"No action needed." },
        { gene:"MTRR",status:"impaired",level:"orange",meaning:"MTRR regenerates active B12 required for methylation to function properly.",action:"Supports methylation using Vitamin B12." },
        { gene:"CUBN",status:"normal",level:"green",meaning:"CUBN affects absorption of Vitamin B12 from the gut.",action:"No action needed." },
        { gene:"PDXK",status:"normal",level:"green",meaning:"PDXK activates Vitamin B6, which supports homocysteine metabolism.",action:"No action needed." },
        { gene:"COMT",status:"impaired",level:"orange",meaning:"COMT controls the breakdown of dopamine, adrenaline, and oestrogen. Slow variants cause slower clearance of stress hormones, amplifying the anxiety and stress response.",action:"Regulate COMT activity via targeted Magnesium, Omega-3, and Vitamin C dosing." },
      ]
    },
    { id:"diet", name:"Diet & Sensitivities", desc:"Determines how your body responds to macronutrients and potential food triggers.",
      rule:"Shows macronutrient response and positive sensitivities only.",
      macros:[
        { name:"Carbohydrate Response",result:"Intermediate response",color:"gold",meaning:"Indicates how efficiently your body processes carbohydrates and regulates blood sugar.",action:"Personalises carbohydrate intake and plate structure." },
        { name:"Fat Response",result:"Worse response",color:"red",meaning:"Indicates how your body responds to dietary fats, especially saturated fats.",action:"Guides fat intake and saturated fat restriction." },
        { name:"Protein Response",result:"Better response",color:"emerald",meaning:"Indicates how effectively your body uses protein for muscle and metabolism.",action:"Sets personalised daily protein targets." },
      ],
      sensitivities:[
        { name:"Lactose Sensitivity",detected:true,meaning:"Indicates reduced ability to digest lactose, leading to bloating or discomfort.",action:"Initiate 3-week lactose elimination protocol." },
        { name:"Gluten Sensitivity",detected:false,meaning:"Indicates increased likelihood of sensitivity to gluten-containing foods.",action:"No sensitivity detected." },
        { name:"Histamine Sensitivity",detected:false,meaning:"Indicates reduced ability to break down histamine from foods.",action:"No sensitivity detected." },
        { name:"Oxalate Sensitivity",detected:false,meaning:"Indicates increased sensitivity to oxalate-rich foods.",action:"No sensitivity detected." },
        { name:"Salicylate Sensitivity",detected:false,meaning:"Indicates sensitivity to salicylates found in fruits, spices, and medications.",action:"No sensitivity detected." },
      ]
    },
    { id:"risk", name:"Disease Risks", desc:"Represents genetic predisposition — not diagnosis. Results indicate probabilities, not certainties.",
      rule:"Shows only higher/increased risk markers.",
      markers:[
        { name:"Coronary Artery Disease",category:"Cardiovascular",risk:"higher",variants:"1,049,366",meaning:"Estimates inherited risk of plaque buildup in heart arteries, the process that causes heart attacks.",action:"Aggressively optimise ApoB, inflammation, and insulin resistance." },
        { name:"Type 2 Diabetes",category:"Metabolic",risk:"average",variants:"1,048,858",meaning:"Estimates your genetic risk of developing Type 2 Diabetes, which is shaped by both lifestyle and genetics.",action:"No increased genetic risk detected." },
        { name:"Alzheimer's Disease (ApoE)",category:"Neurological",risk:"average",variants:"ApoE",alleles:"E3/E3",meaning:"Driven by ApoE genotype. One copy of E4 = slightly elevated risk. Two copies = significantly elevated. No E4 = average risk.",action:"No increased genetic risk detected." },
        { name:"Colorectal Cancer",category:"Cancer",risk:"average",variants:"1,049,410",meaning:"Indicates increased inherited risk of colon cancer.",action:"No increased genetic risk detected." },
        { name:"Prostate Cancer",category:"Cancer",risk:"higher",variants:"1,049,413",meaning:"Indicates increased inherited risk of prostate cancer.",action:"Initiate early screening including PSA blood test." },
        { name:"Lung Cancer",category:"Cancer",risk:"average",variants:"849,819",meaning:"Indicates increased inherited risk of lung cancer.",action:"No increased genetic risk detected." },
        { name:"Breast Cancer",category:"Cancer",risk:"average",variants:"TBC",meaning:"Indicates inherited risk of breast cancer.",action:"No increased genetic risk detected." },
        { name:"Ovarian Cancer",category:"Cancer",risk:"average",variants:"TBC",meaning:"Indicates inherited risk of ovarian cancer.",action:"No increased genetic risk detected." },
        { name:"Stroke",category:"Disease Risks",risk:"average",variants:"1,030,648",meaning:"Estimates inherited risk of stroke based on cardiovascular and clotting genetic markers.",action:"Optimise blood pressure, inflammation, and cardiovascular health." },
        { name:"Melanoma",category:"Disease Risks",risk:"average",variants:"1,049,396",meaning:"Indicates inherited risk of melanoma skin cancer.",action:"Prioritise sun protection and regular skin checks." },
        { name:"Pancreatic Cancer",category:"Disease Risks",risk:"average",variants:"35,160",meaning:"Indicates inherited risk of pancreatic cancer.",action:"Early screening." },
      ]
    },
  ];

  const statusColor = s => s === "optimal" ? t.emerald : s === "suboptimal" ? t.gold : t.red;
  const levelColor = l => l === "green" ? t.emerald : l === "orange" ? t.gold : t.red;
  const allFlat = bloodSystems.flatMap(sys => [...sys.main, ...sys.expanded]);
  const optCount = allFlat.filter(m=>m.status==="optimal").length;
  const subCount = allFlat.filter(m=>m.status==="suboptimal").length;
  const abnCount = allFlat.filter(m=>m.status==="abnormal").length;

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
          <div><div style={{ fontSize:14,color:t.t3,fontWeight:500 }}>Daniel Salewski</div><div style={{ fontSize:24,fontWeight:700,color:t.t1,letterSpacing:-.3 }}>My Biology</div></div>
          <div onClick={()=>onNavigate("eva-age")} style={{ background:`linear-gradient(135deg, ${t.emerald}15, ${t.emerald}08)`,borderRadius:14,padding:"10px 18px",border:`1.5px solid ${t.emerald}30`,cursor:"pointer",textAlign:"center" }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:2 }}><MiniDNA w={50} h={28} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/></div>
            <div style={{ fontSize:26,fontWeight:800,color:t.emerald }}>34</div>
            <div style={{ fontSize:10,color:t.emerald,fontWeight:600,letterSpacing:1 }}>EVA™ AGE</div>
            <div style={{ fontSize:9,color:t.emerald,marginTop:2,opacity:.7 }}>{"-4 yrs →"}</div>
          </div>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:16 }}>
          {[{id:"blood",l:"Blood",ic:<svg width="14" height="14" viewBox="0 0 14 15" fill="none"><path d="M7 1C7 1 2 6 2 9.5a5 5 0 0010 0c0-3.5-5-8.5-5-8.5z" stroke={tab==="blood"?"#FFF":t.t3} strokeWidth="1.3" fill="none"/></svg>},
            {id:"dna",l:"DNA",ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 1v12M10 1v12" stroke={tab==="dna"?"#FFF":t.t3} strokeWidth="1.2"/><path d="M4 4h6M4 7h6M4 10h6" stroke={tab==="dna"?"#FFF":t.t3} strokeWidth="1" strokeLinecap="round"/></svg>},
            {id:"progress",l:"Progress",ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11l3-4 3 2 4-6" stroke={tab==="progress"?"#FFF":t.t3} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          ].map(tb=>(
            <div key={tb.id} onClick={()=>setTab(tb.id)} style={{ flex:1,background:tab===tb.id?t.purple:t.s2,border:tab===tb.id?`1.5px solid ${t.purple}`:`1px solid ${t.b2}`,borderRadius:12,padding:"10px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontSize:14,fontWeight:600,color:tab===tb.id?"#FFF":t.t3,cursor:"pointer",transition:"all .2s" }}>{tb.ic}{tb.l}</div>
          ))}
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"0 24px",paddingBottom:8 }}>

        {/* ═══ BLOOD TAB ═══ */}
        {tab === "blood" ? (
          <>
            {/* Summary counters */}
            <div style={{ display:"flex",gap:12,marginBottom:10 }}>
              {[{l:"Optimal",n:optCount,c:t.emerald},{l:"Suboptimal",n:subCount,c:t.gold},{l:"Abnormal",n:abnCount,c:t.red}].map(s=>(
                <div key={s.l} style={{ flex:1,background:t.s1,borderRadius:12,padding:"15px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
                  <div style={{ fontSize:22,fontWeight:800,color:s.c }}>{s.n}</div>
                  <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Filter chips */}
            <div style={{ display:"flex",gap:8,marginBottom:14,marginTop:8 }}>
              {[{l:"All",v:"all"},{l:"Optimal",v:"optimal"},{l:"Suboptimal",v:"suboptimal"},{l:"Abnormal",v:"abnormal"}].map(f=>(
                <div key={f.v} onClick={()=>setBioFilter(f.v)} style={{ flex:1,background:bioFilter===f.v?`${t.purple}15`:t.s2,border:`1.5px solid ${bioFilter===f.v?t.purple:t.b2}`,borderRadius:8,padding:"8px 0",textAlign:"center",fontSize:12,fontWeight:600,color:bioFilter===f.v?t.purple:t.t3,cursor:"pointer",transition:"all .2s" }}>{f.l}</div>
              ))}
            </div>

            {/* Systems */}
            <VideoCard title="Why Our Blood Panel is Superior" duration="2:00"/>
            {bloodSystems.map(sys => {
              const sysMarkers = [...sys.main, ...(expandedSystems.has(sys.id) ? sys.expanded : [])];
              const filtered = bioFilter === "all" ? sysMarkers : sysMarkers.filter(m=>m.status===bioFilter);
              if (filtered.length === 0 && bioFilter !== "all") return null;
              const sysAbn = [...sys.main,...sys.expanded].filter(m=>m.status==="abnormal").length;
              const sysSub = [...sys.main,...sys.expanded].filter(m=>m.status==="suboptimal").length;
              const worstColor = sysAbn > 0 ? t.red : sysSub > 0 ? t.gold : t.emerald;
              return (
                <div key={sys.id} style={{ marginBottom:16 }}>
                  {/* System header */}
                  <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${worstColor}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:worstColor,fontWeight:700 }}>{sys.letter}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>{sys.main.length} key markers{sys.expanded.length > 0 ? ` · ${sys.expanded.length} more` : ""}</div>
                    </div>
                    <div style={{ display:"flex",gap:3 }}>
                      {sysAbn > 0 && <div style={{ width:8,height:8,borderRadius:4,background:t.red }}/>}
                      {sysSub > 0 && <div style={{ width:8,height:8,borderRadius:4,background:t.gold }}/>}
                      {sysAbn === 0 && sysSub === 0 && <div style={{ width:8,height:8,borderRadius:4,background:t.emerald }}/>}
                    </div>
                  </div>

                  {/* Markers */}
                  {filtered.map((m, mi) => {
                    const mKey = sys.id + "-" + mi;
                    const isExp = expandedMarker === mKey;
                    return (
                      <Card key={mi} onClick={()=>setExpandedMarker(isExp?null:mKey)} style={{ padding:14,cursor:"pointer",transition:"all .2s",marginBottom:8,border:isExp?`1.5px solid ${statusColor(m.status)}30`:undefined }}>
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4 }}>
                          <span style={{ fontSize:15,fontWeight:600,color:t.t1,flex:1 }}>{m.name}</span>
                          <div style={{ display:"flex",alignItems:"baseline",gap:6 }}>
                            <span style={{ fontSize:17,fontWeight:700,color:statusColor(m.status) }}>{m.val}</span>
                            <span style={{ fontSize:12,color:t.t3 }}>{m.unit}</span>
                          </div>
                          <div style={{ marginLeft:8,transition:"transform .2s",transform:isExp?"rotate(90deg)":"none" }}><ChevronRight size={10} color={t.t3}/></div>
                        </div>
                        <div style={{ display:"flex",justifyContent:"space-between",marginTop:5 }}>
                          <span style={{ fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:1,padding:"4px 8px",borderRadius:4,background:`${statusColor(m.status)}12`,color:statusColor(m.status) }}>{m.status}</span>
                          <span style={{ fontSize:11,color:t.t3 }}>Optimal: {m.optimal}</span>
                        </div>
                        {isExp && (
                          <div style={{ marginTop:12,paddingTop:12,borderTop:`1px solid ${t.b1}`,animation:"fadeUp .25s ease both" }}>
                            <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:6 }}>WHAT THIS MEANS</div>
                            <div style={{ fontSize:13,color:t.t2,lineHeight:1.6,marginBottom:12 }}>{m.meaning}</div>
                            <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:6 }}>EVA™ ACTION</div>
                            <div style={{ fontSize:13,color:t.emerald,lineHeight:1.6 }}>{m.action}</div>
                          </div>
                        )}
                      </Card>
                    );
                  })}

                  {/* See more / less toggle */}
                  {sys.expanded.length > 0 && (
                    <div onClick={()=>toggleSys(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",cursor:"pointer" }}>
                      <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{expandedSystems.has(sys.id) ? "See less" : `See ${sys.expanded.length} more markers`}</span>
                      <div style={{ transform:expandedSystems.has(sys.id)?"rotate(-90deg)":"rotate(90deg)",transition:"transform .2s" }}><ChevronRight size={10} color={t.purple}/></div>
                    </div>
                  )}
                </div>
              );
            })}
            })}
            <div style={{marginTop:20}}>
              <Btn variant="secondary" onClick={()=>onNavigate("report-viewer")} style={{width:"100%"}}>Download My Blood Reports</Btn>
            </div>
          </>

        /* ═══ DNA TAB ═══ */
        ) : tab === "dna" ? (
          <>
            <Card style={{ background:`${t.purple}08`,border:`1px solid ${t.purple}18`,marginBottom:16 }}>
              <div style={{ fontSize:14,color:t.t2,lineHeight:1.6 }}>EVA™ screens over 200 million genetic variants, calculates composite risk scores, and surfaces only what’s most relevant to your biology.</div>
            </Card>

            <VideoCard title="How We Read Your DNA" duration="2:45"/>

            {/* ── 1. Methylation ── */}
            {(() => {
              const sys = dnaSystems[0];
              const abnormal = sys.markers.filter(m=>m.status==="impaired");
              const showAll = dnaShowAll.has(sys.id);
              const visible = showAll ? sys.markers : abnormal;
              return (
                <div style={{ marginBottom:20 }}>
                  <div onClick={()=>toggleDnaSys(sys.id)} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:t.purple }}>1</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>{abnormal.length} impaired gene{abnormal.length!==1?"s":""} of {sys.markers.length}</div>
                    </div>
                    <div style={{ transform:expandedDNA.has(sys.id)?"rotate(90deg)":"none",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                  {expandedDNA.has(sys.id) && (
                    <div style={{ animation:"fadeUp .2s ease both" }}>
                      <div style={{ fontSize:12,color:t.t3,marginBottom:10,lineHeight:1.5 }}>{sys.desc}</div>
                      {visible.map((m,i) => (
                        <Card key={i} style={{ padding:14,marginBottom:8,borderLeft:`3px solid ${levelColor(m.level)}` }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                            <div style={{ fontSize:16,fontWeight:700,color:t.purple,letterSpacing:.5 }}>{m.gene}</div>
                            <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:m.level==="green"?`${t.emerald}12`:`${t.gold}12`,color:m.level==="green"?t.emerald:t.gold }}>{m.status==="impaired"?"Slightly Impaired":"Normal"}</div>
                          </div>
                          <div style={{ fontSize:13,color:t.t2,lineHeight:1.5,marginBottom:6 }}>{m.meaning}</div>
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <div style={{ width:5,height:5,borderRadius:"50%",background:m.status==="impaired"?t.gold:t.emerald }}/>
                            <span style={{ fontSize:12,color:m.status==="impaired"?t.gold:t.emerald,fontWeight:500 }}>{m.action}</span>
                          </div>
                        </Card>
                      ))}
                      {sys.markers.length > abnormal.length && (
                        <div onClick={()=>toggleDnaAll(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",cursor:"pointer" }}>
                          <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{showAll ? "Show impaired only" : `See all ${sys.markers.length} genes`}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── 2. Diet & Sensitivities ── */}
            {(() => {
              const sys = dnaSystems[1];
              const showAll = dnaShowAll.has(sys.id);
              const posSens = sys.sensitivities.filter(s=>s.detected);
              const visSens = showAll ? sys.sensitivities : posSens;
              return (
                <div style={{ marginBottom:20 }}>
                  <div onClick={()=>toggleDnaSys(sys.id)} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${t.gold}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:t.gold }}>2</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>3 macros · {posSens.length} sensitivity detected</div>
                    </div>
                    <div style={{ transform:expandedDNA.has(sys.id)?"rotate(90deg)":"none",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                  {expandedDNA.has(sys.id) && (
                    <div style={{ animation:"fadeUp .2s ease both" }}>
                      <div style={{ fontSize:12,color:t.t3,marginBottom:10,lineHeight:1.5 }}>{sys.desc}</div>
                      {/* Macronutrient Response */}
                      <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8 }}>MACRONUTRIENT RESPONSE</div>
                      {sys.macros.map((m,i) => (
                        <Card key={i} style={{ padding:14,marginBottom:8 }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                            <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{m.name}</div>
                            <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:`${t[m.color]}12`,color:t[m.color] }}>{m.result}</div>
                          </div>
                          <div style={{ fontSize:12,color:t.t3,lineHeight:1.5,marginBottom:4 }}>{m.meaning}</div>
                          <div style={{ fontSize:12,color:t.emerald,fontWeight:500 }}>{m.action}</div>
                        </Card>
                      ))}
                      {/* Sensitivities */}
                      <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8,marginTop:14 }}>FOOD SENSITIVITIES</div>
                      {visSens.map((s,i) => (
                        <Card key={i} style={{ padding:14,marginBottom:8,borderLeft:`3px solid ${s.detected?t.red:t.emerald}` }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                            <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{s.name}</div>
                            <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:s.detected?`${t.red}12`:`${t.emerald}12`,color:s.detected?t.red:t.emerald }}>{s.detected?"Detected":"Not detected"}</div>
                          </div>
                          <div style={{ fontSize:12,color:t.t3,lineHeight:1.5,marginBottom:4 }}>{s.meaning}</div>
                          <div style={{ fontSize:12,color:s.detected?t.gold:t.emerald,fontWeight:500 }}>{s.action}</div>
                        </Card>
                      ))}
                      {sys.sensitivities.length > posSens.length && (
                        <div onClick={()=>toggleDnaAll(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",cursor:"pointer" }}>
                          <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{showAll ? "Show positive only" : `See all ${sys.sensitivities.length} sensitivities`}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── 3. Disease Risks ── */}
            {(() => {
              const sys = dnaSystems[2];
              const showAll = dnaShowAll.has(sys.id);
              const elevated = sys.markers.filter(m=>m.risk==="higher");
              const visible = showAll ? sys.markers : elevated;
              return (
                <div style={{ marginBottom:20 }}>
                  <div onClick={()=>toggleDnaSys(sys.id)} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${t.red}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:t.red }}>3</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>{elevated.length} higher risk</div>
                    </div>
                    <div style={{ transform:expandedDNA.has(sys.id)?"rotate(90deg)":"none",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                  {expandedDNA.has(sys.id) && (
                    <div style={{ animation:"fadeUp .2s ease both" }}>
                      <div style={{ fontSize:12,color:t.t3,marginBottom:10,lineHeight:1.5 }}>{sys.desc}</div>
                      {visible.map((m,i) => {
                        const riskColor = m.risk==="higher"?t.red:t.emerald;
                        return (
                          <Card key={i} style={{ padding:14,marginBottom:8,borderLeft:`3px solid ${riskColor}` }}>
                            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
                              <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{m.name}</div>
                              <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:`${riskColor}12`,color:riskColor }}>{m.risk==="higher"?"Higher risk":"Average risk"}</div>
                            </div>
                            <div style={{ fontSize:10,fontWeight:600,color:t.t3,letterSpacing:.5,marginBottom:2 }}>{m.category}</div>
                            {m.variants&&<div style={{ fontSize:10,color:t.t3,marginBottom:4 }}>{m.variants==="ApoE"?`Alleles: ${m.alleles||"—"}`:`${m.variants} variants analysed`}{m.variants==="TBC"?" (pending)":""}</div>}
                            <div style={{ fontSize:12,color:t.t3,lineHeight:1.5,marginBottom:6 }}>{m.meaning}</div>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <div style={{ width:5,height:5,borderRadius:"50%",background:m.risk==="higher"?t.gold:t.emerald }}/>
                              <span style={{ fontSize:12,color:m.risk==="higher"?t.gold:t.emerald,fontWeight:500 }}>{m.action}</span>
                            </div>
                          </Card>
                        );
                      })}
                      {sys.markers.length > elevated.length && (
                        <div onClick={()=>toggleDnaAll(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",cursor:"pointer" }}>
                          <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{showAll ? "Show higher risk only" : `See all ${sys.markers.length} conditions`}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          <div style={{marginTop:20}}>
              <Btn variant="secondary" onClick={()=>onNavigate("dna-report")} style={{width:"100%"}}>Download My DNA Reports</Btn>
            </div>
          </>

        /* ═══ PROGRESS TAB ═══ */
        ) : (
          <>
            <VideoCard title="Six Months In — A Message from Daniel" duration="2:15"/>
            <Card style={{ background:`${t.emerald}06`,border:`1px solid ${t.emerald}20`,marginBottom:16 }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:`${t.emerald}14`,display:"flex",alignItems:"center",justifyContent:"center" }}><CheckIcon size={18} color={t.emerald}/></div>
                <div><div style={{ fontSize:16,fontWeight:700,color:t.t1 }}>3 markers improved</div><div style={{ fontSize:13,color:t.emerald,fontWeight:500 }}>since your last panel</div></div>
              </div>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                {[{m:"Vitamin D",d:"+14 ng/mL",c:t.emerald},{m:"Omega-3",d:"+1.4%",c:t.emerald},{m:"Magnesium",d:"+0.8 mEq/L",c:t.emerald}].map((x,i)=>(
                  <div key={i} style={{ background:`${x.c}10`,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,color:x.c }}>{x.m} {x.d} ↑</div>
                ))}
              </div>
            </Card>
            <Card style={{ background:`${t.gold}06`,border:`1px solid ${t.gold}20`,marginBottom:16 }}>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:`${t.gold}14`,display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={t.gold} strokeWidth="1.5"/><path d="M8 5v4M8 11h.01" stroke={t.gold} strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                <div><div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>1 marker needs attention</div><div style={{ fontSize:13,color:t.gold,fontWeight:500 }}>hs-CRP still elevated — protocol adjusted</div></div>
              </div>
            </Card>
            {[
              {name:"Vitamin D",unit:"ng/mL",target:50,data:[{q:"Feb 25",v:18},{q:"May 25",v:26},{q:"Aug 25",v:32},{q:"Nov 25",v:38}],status:"improving"},
              {name:"hs-CRP",unit:"mg/L",target:0.6,data:[{q:"Feb 25",v:2.8},{q:"May 25",v:2.1},{q:"Aug 25",v:1.4},{q:"Nov 25",v:1.1}],status:"improving",lower:true},
              {name:"Homocysteine",unit:"µmol/L",target:9.0,data:[{q:"Feb 25",v:11.2},{q:"May 25",v:10.4},{q:"Aug 25",v:9.8},{q:"Nov 25",v:9.1}],status:"improving",lower:true},
              {name:"Magnesium",unit:"mEq/L",target:4.5,data:[{q:"Feb 25",v:4.2},{q:"May 25",v:4.4},{q:"Aug 25",v:4.6},{q:"Nov 25",v:4.8}],status:"improving"},
            ].map((marker,mi)=>{
              const latest = marker.data[marker.data.length-1].v;
              const first = marker.data[0].v;
              const pctChange = Math.round(Math.abs((latest-first)/first)*100);
              const improving = marker.lower ? latest < first : latest > first;
              const reachedTarget = marker.lower ? latest <= marker.target : latest >= marker.target;
              const lineColor = reachedTarget ? t.emerald : improving ? t.gold : t.red;
              return (
              <Card key={mi} style={{ padding:16,marginBottom:12 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4 }}>
                  <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{marker.name}</div>
                  <div style={{ fontSize:13,fontWeight:700,color:lineColor }}>{latest} {marker.unit} {improving?"↑":"↓"} {pctChange}%</div>
                </div>
                <div style={{ fontSize:11,color:t.t3,marginBottom:10 }}>Target: {marker.target} {marker.unit}</div>
                <div style={{ height:100,marginLeft:-10,marginRight:-5 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marker.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.b1} vertical={false}/>
                      <XAxis dataKey="q" tick={{fontSize:10,fill:t.t3}} axisLine={false} tickLine={false}/>
                      <YAxis hide domain={["dataMin-2","dataMax+5"]}/>
                      <ReferenceLine y={marker.target} stroke={t.emerald} strokeDasharray="4 4" strokeWidth={1.5}/>
                      <Line type="monotone" dataKey="v" stroke={lineColor} strokeWidth={2.5} dot={{r:4,fill:lineColor,stroke:t.bg,strokeWidth:2}} activeDot={{r:6}}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,padding:"8px 0 0",borderTop:`1px solid ${t.b1}` }}>
                  <div style={{ fontSize:12,color:t.t3 }}>Baseline: <span style={{fontWeight:600,color:t.t2}}>{first}</span></div>
                  <div style={{ fontSize:12,color:t.t3 }}>Latest: <span style={{fontWeight:700,color:lineColor}}>{latest}</span></div>
                  <div style={{ fontSize:11,fontWeight:600,color:lineColor,background:`${lineColor}10`,padding:"3px 8px",borderRadius:6 }}>{reachedTarget?"✓ Target reached":"On track"}</div>
                </div>
              </Card>
            );})}
            <Card onClick={()=>onNavigate("retest")} style={{ background:`${t.emerald}08`,border:`1px solid ${t.emerald}18`,marginTop:8,cursor:"pointer" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div><div style={{ fontSize:14,fontWeight:600,color:t.t1,marginBottom:4 }}>Next Re-Test</div>
                <div style={{ fontSize:13,color:t.t2,lineHeight:1.6 }}>Scheduled in ~90 days. Continue your protocol.</div></div>
                <ChevronRight color={t.emerald}/>
              </div>
            </Card>
          </>
        )}
      </div>
      <TabBar active="results-tab" onNavigate={id => onNavigate(id)} />
    </div>
  );
};

// ══════════════════════════════════════════
// NEW: Profile Tab
// ══════════════════════════════════════════


export default ResultsTabScreen;
