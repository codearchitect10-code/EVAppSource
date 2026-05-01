import { useState } from "react";
import { useTheme, useToast } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, ChevronLeft, Label, Title } from "../components";
import { supplements } from "../data/supplements";

const QuestionnaireScreen = ({ onNavigate, onBack, gender }) => {
  const t = useTheme();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [goals, setGoals] = useState(new Set([4]));
  const [extraGoals, setExtraGoals] = useState(new Set());
  const [symptoms, setSymptoms] = useState(new Set([2,5]));
  const [height, setHeight] = useState("178");
  const [weight, setWeight] = useState("82");
  const [goalWeight, setGoalWeight] = useState("");
  const [exerciseDays, setExerciseDays] = useState(2);
  const [exerciseType, setExerciseType] = useState(2);
  const [dietPref, setDietPref] = useState(0);
  const [fishFreq, setFishFreq] = useState(1);
  const [trackProtein, setTrackProtein] = useState(1);
  const [smoke, setSmoke] = useState(0);
  const [alcohol, setAlcohol] = useState(1);
  const [alcDrinks, setAlcDrinks] = useState(0);
  const [currentSupps, setCurrentSupps] = useState(0);
  const [meds, setMeds] = useState(new Set([7]));
  const [conditions, setConditions] = useState(new Set());
  const [allergies, setAllergies] = useState(new Set([3]));
  const [stress, setStress] = useState(4);
  const [sleepQ, setSleepQ] = useState(6);
  const [familyHx, setFamilyHx] = useState(new Set());
  const [menstrualStage, setMenstrualStage] = useState(-1);
  const [lastPeriod, setLastPeriod] = useState(-1);
  const [cycleDay, setCycleDay] = useState(-1);
  const [yearsPost, setYearsPost] = useState(-1);
  const [wLibido, setWLibido] = useState(-1);
  const [libido, setLibido] = useState(1);
  const togSet = (set,setter,i,noneIdx) => {
    const s = new Set(set);
    if (noneIdx !== undefined && i === noneIdx) {
      // Tapping "None" clears everything else
      setter(s.has(i) ? new Set() : new Set([i]));
      return;
    }
    if (noneIdx !== undefined && s.has(noneIdx)) {
      // Tapping anything else deselects "None"
      s.delete(noneIdx);
    }
    s.has(i) ? s.delete(i) : s.add(i);
    setter(s);
  };
  const Chip = ({label,active,onClick}) => <div onClick={onClick} style={{ background:active?`${t.purple}10`:t.s2,border:`1.5px solid ${active?t.purple:t.b2}`,borderRadius:10,padding:"12px 16px",fontSize:14,fontWeight:500,color:active?t.purple:t.t1,cursor:"pointer",transition:"all .15s" }}>{label}</div>;
  const Radio = ({label,active,onClick}) => <div onClick={onClick} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 0",cursor:"pointer" }}><div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${active?t.purple:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{active&&<div style={{ width:10,height:10,borderRadius:"50%",background:t.purple }}/>}</div><span style={{ fontSize:15,color:t.t1 }}>{label}</span></div>;
  const Slider = ({value,onChange,min=1,max=10}) => {
    const pct = ((value - min) / (max - min)) * 100;
    return (
      <div style={{ marginBottom:8 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
          <span style={{ fontSize:12,color:t.t3 }}>{min}</span>
          <span style={{ fontSize:20,fontWeight:800,color:t.purple }}>{value}</span>
          <span style={{ fontSize:12,color:t.t3 }}>{max}</span>
        </div>
        <div style={{ position:"relative",height:40,display:"flex",alignItems:"center" }}>
          <div style={{ position:"absolute",left:0,right:0,height:6,borderRadius:3,background:t.s2 }}>
            <div style={{ width:pct+"%",height:"100%",borderRadius:3,background:t.purple,transition:"width .1s" }}/>
          </div>
          <input type="range" min={min} max={max} value={value} onChange={e=>onChange(parseInt(e.target.value))} style={{ position:"absolute",left:0,right:0,width:"100%",height:40,opacity:0,cursor:"pointer",margin:0 }}/>
          <div style={{ position:"absolute",left:`calc(${pct}% - 16px)`,width:32,height:32,borderRadius:"50%",background:t.purple,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.2)",pointerEvents:"none",transition:"left .1s" }}>
            <span style={{ fontSize:12,fontWeight:700,color:"#FFF" }}>{value}</span>
          </div>
        </div>
      </div>
    );
  };
  const Input = ({placeholder,value,onChange,type="text"}) => <input placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} type={type} inputMode={type==="number"?"numeric":undefined} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>;
  const SectionNote = ({text}) => <div style={{ background:`${t.purple}06`,borderRadius:10,padding:"10px 14px",fontSize:13,color:t.purple,marginBottom:16,marginTop:-4 }}>{text}</div>;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
        <div onClick={step>1?()=>setStep(step-1):onBack} style={{ fontSize:15,color:t.t3,cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:6 }}><ChevronLeft size={12}/> Back</div>
        <div style={{ fontSize:13,color:t.t3 }}>{step} of {totalSteps}</div>
      </div>
      <div style={{ height:3,background:t.s2,borderRadius:2,marginBottom:20 }}><div style={{ width:`${(step/totalSteps)*100}%`,height:"100%",background:t.brandGrad,borderRadius:2,transition:"width .3s" }}/></div>
      <div style={{ flex:1,overflowY:"auto",scrollbarWidth:"none",paddingBottom:24 }}>
        {step===1?<>
          <Title sub="Choose one primary goal.">What matters most?</Title>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:20 }}>
            {["Fat loss","Muscle gain / strength","Improve energy & focus","Improve sleep","Support long-term health","Gut health & digestion","Hormone balance","Mood & stress resilience","Skin & hair health"].map((g,i)=><Chip key={i} label={g} active={goals.has(i)} onClick={()=>setGoals(new Set([i]))}/>)}
          </div>
          <SectionNote text="We'll prioritise your protocol around this." />
          <Label>Any additional goals?</Label>
          <div style={{ fontSize:13,color:t.t3,marginBottom:10 }}>Select any that also apply.</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:20 }}>
            {["Fat loss","Muscle gain / strength","Improve energy & focus","Improve sleep","Support long-term health","Gut health & digestion","Hormone balance","Mood & stress resilience","Skin & hair health"].filter((_,i)=>!goals.has(i)).map((g,i)=><Chip key={`extra${i}`} label={g} active={extraGoals.has(g)} onClick={()=>{const s=new Set(extraGoals);s.has(g)?s.delete(g):s.add(g);setExtraGoals(s)}}/>)}
          </div>
          <Label>How are you feeling lately?</Label>
          <div style={{ fontSize:13,color:t.t3,marginBottom:10 }}>Select any that apply.</div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>SLEEP</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
            {["Difficulty falling asleep","Waking up during the night"].map((s,i)=><Chip key={i} label={s} active={symptoms.has(i)} onClick={()=>togSet(symptoms,setSymptoms,i)}/>)}
          </div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>ENERGY & BRAIN</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
            {["Low energy","Brain fog / trouble focusing"].map((s,i)=><Chip key={`e${i}`} label={s} active={symptoms.has(i+2)} onClick={()=>togSet(symptoms,setSymptoms,i+2)}/>)}
          </div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>STRESS & MOOD</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
            {["Feeling anxious or stressed"].map((s,i)=><Chip key={`s${i}`} label={s} active={symptoms.has(i+4)} onClick={()=>togSet(symptoms,setSymptoms,i+4)}/>)}
          </div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>GUT & BODY</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:8 }}>
            {["Bloating","Constipation","Muscle cramps","Joint pain"].map((s,i)=><Chip key={`g${i}`} label={s} active={symptoms.has(i+5)} onClick={()=>togSet(symptoms,setSymptoms,i+5)}/>)}
          </div>
          <SectionNote text="This helps EVA™ personalise your daily recommendations." />
        </>:step===2?<>
          <Title sub="Your starting point.">Your Baseline</Title>
          <div style={{ display:"flex",gap:12,marginBottom:20 }}>
            <div style={{ flex:1 }}><Label>Height (cm)</Label><Input placeholder="178" value={height} onChange={setHeight} type="number"/></div>
            <div style={{ flex:1 }}><Label>Weight (kg)</Label><Input placeholder="82" value={weight} onChange={setWeight} type="number"/></div>
          </div>
          <div style={{ marginBottom:24 }}><Label>Goal weight (optional)</Label><Input placeholder="Optional" value={goalWeight} onChange={setGoalWeight} type="number"/></div>
          <Label>Exercise days per week</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["0","1–2","3–4","5+"].map((d,i)=><Chip key={i} label={d} active={exerciseDays===i} onClick={()=>setExerciseDays(i)}/>)}
          </div>
          <Label>Exercise type</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
            {["Strength","Cardio","Both","None"].map((e,i)=><Chip key={i} label={e} active={exerciseType===i} onClick={()=>setExerciseType(i)}/>)}
          </div>
        </>:step===3?<>
          <Title sub="What you eat matters.">Nutrition</Title>
          <Label>Dietary preference</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["Balanced whole-food","High carb / low fat","Low carb / keto","High protein","Vegetarian","Vegan","Mediterranean","No structure","Lots of processed / takeout"].map((d,i)=><Chip key={i} label={d} active={dietPref===i} onClick={()=>setDietPref(i)}/>)}
          </div>
          <Label>How often do you eat fatty fish?</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["Rarely/never","Once/week","2+ times/week"].map((f,i)=><Chip key={i} label={f} active={fishFreq===i} onClick={()=>setFishFreq(i)}/>)}
          </div>
          <Label>Do you track protein intake?</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["Yes","No"].map((p,i)=><Chip key={i} label={p} active={trackProtein===i} onClick={()=>setTrackProtein(i)}/>)}
          </div>
        </>:step===4?<>
          <Title sub="Lifestyle and current supplements.">Lifestyle</Title>
          <Label>Do you smoke or vape?</Label>
          <div style={{ marginBottom:16 }}>{["Never","Used to (quit)","Yes"].map((s,i)=><Radio key={i} label={s} active={smoke===i} onClick={()=>setSmoke(i)}/>)}</div>
          <Label>Do you drink alcohol?</Label>
          <div style={{ marginBottom:16 }}>{["No","Occasionally (1–2/week)","Regularly (3+/week)"].map((a,i)=><Radio key={i} label={a} active={alcohol===i} onClick={()=>setAlcohol(i)}/>)}</div>
          <Label>Currently taking supplements?</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["No","Yes"].map((s,i)=><Chip key={i} label={s} active={currentSupps===i} onClick={()=>setCurrentSupps(i)}/>)}
          </div>
          <Label>Current medications</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["GLP-1 (Ozempic, Mounjaro, Retatrutide)","Warfarin","Blood thinners","Statins","Antidepressants","Metformin","Testosterone (TRT)","Other","None"].map((m,i)=><Chip key={i} label={m} active={meds.has(i)} onClick={()=>togSet(meds,setMeds,i,8)}/>)}
          </div>
        </>:step===5?<>
          <Title sub="For your safety and protocol design.">Medical Background</Title>
          <Label>Diagnosed conditions</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["High cholesterol","High blood pressure","Diabetes/pre-diabetes","Thyroid issues","PCOS/Endometriosis","Autoimmune","Depression/anxiety","Gut conditions","Heart condition","Kidney disease","Liver disease","Gout","None"].map((c,i)=><Chip key={i} label={c} active={conditions.has(i)} onClick={()=>togSet(conditions,setConditions,i,12)}/>)}
          </div>
          <Label>Allergies or sensitivities</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["Foods (nuts, dairy, gluten)","Medications","Supplements","None"].map((a,i)=><Chip key={i} label={a} active={allergies.has(i)} onClick={()=>togSet(allergies,setAllergies,i,3)}/>)}
          </div>
          <Label>Current stress level (1–10)</Label>
          <Slider value={stress} onChange={setStress}/>
          <div style={{ marginTop:16 }}><Label>Sleep quality (1–10)</Label></div>
          <Slider value={sleepQ} onChange={setSleepQ}/>
          <div style={{ marginBottom:20 }}/>
        </>:<>
          <Title sub="Final step — family and personal health.">Family & Health</Title>
          <Label>Family history (parent or sibling)</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["Heart attack/stroke before 55","Colon/colorectal cancer","Prostate cancer","Breast/ovarian cancer","Diabetes","Alzheimer's (Dementia)","None"].map((f,i)=><Chip key={i} label={f} active={familyHx.has(i)} onClick={()=>togSet(familyHx,setFamilyHx,i,6)}/>)}
          </div>
          {gender==="male"?<>
            <Label>Men’s Health</Label>
            <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>Have you noticed a decrease in libido or morning erections?</div>
            <div style={{ display:"flex",gap:10,marginBottom:20 }}>{["Yes","No"].map((l,i)=><Chip key={i} label={l} active={libido===i} onClick={()=>setLibido(i)}/>)}</div>
          </>:<>
            <Label>Women’s Health</Label>
            <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>Which best describes your current menstrual status?</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:8 }}>
              {["Regular cycle","Irregular cycle","Perimenopause","Post-menopause","Pregnant","Postpartum"].map((s,i)=><Chip key={i} label={s} active={menstrualStage===i} onClick={()=>setMenstrualStage(i)}/>)}
            </div>
            <div style={{ background:`${t.purple}06`,borderRadius:10,padding:"10px 14px",fontSize:13,color:t.purple,marginBottom:16 }}>Menstrual status directly affects hormonal balance, bone density, and cardiovascular risk markers. This helps EVA™ calibrate your biomarker reference ranges accurately.</div>
            {menstrualStage===0&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>What day of your cycle will you be on during your blood test?</div>
              <div style={{ background:`${t.purple}06`,borderRadius:10,padding:"10px 14px",fontSize:13,color:t.purple,marginBottom:8 }}>Cycle day is critical for accurate hormone interpretation. Day 1 = first day of your period.</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:16 }}>
                {Array.from({length:28},(_,i)=>i+1).map(d=><div key={d} onClick={()=>setCycleDay(d)} style={{ width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,background:cycleDay===d?`${t.purple}15`:t.s2,border:`1.5px solid ${cycleDay===d?t.purple:t.b2}`,color:cycleDay===d?t.purple:t.t1,cursor:"pointer",transition:"all .15s" }}>{d}</div>)}
              </div>
            </>}
            {(menstrualStage>=0&&menstrualStage<=2)&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>When was the first day of your last period?</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:16 }}>
                {["Within the last week","1–2 weeks ago","2–4 weeks ago","More than 4 weeks ago","Prefer not to say"].map((s,i)=><Chip key={`lp${i}`} label={s} active={lastPeriod===i} onClick={()=>setLastPeriod(i)}/>)}
              </div>
            </>}
            {menstrualStage===3&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>How long ago did your periods stop?</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:16 }}>
                {["Less than 1 year","1–3 years","3–5 years","5–10 years","10+ years"].map((s,i)=><Chip key={`mp${i}`} label={s} active={yearsPost===i} onClick={()=>setYearsPost(i)}/>)}
              </div>
            </>}
            {menstrualStage>=0&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>Have you noticed a drop in libido recently?</div>
              <div style={{ display:"flex",gap:10,marginBottom:16 }}>{["Yes","No"].map((l,i)=><Chip key={`wl${i}`} label={l} active={wLibido===i} onClick={()=>setWLibido(i)}/>)}</div>
            </>}
          </>}
        </>}
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        <Btn onClick={()=>{if(step<totalSteps)setStep(step+1);else onNavigate("book-test")}}>{step<totalSteps?"Next →":"Book Your Biology Test →"}</Btn>
      </div>
    </div>
  );
};


export default QuestionnaireScreen;
