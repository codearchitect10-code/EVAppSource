import { useState, useEffect, useRef } from "react";
import { Line } from "recharts";
import { useTheme, useToast } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, Card, CheckIcon, ChevronRight, DanielAvatar, EVAFullLogo, EyeIcon, InfoIcon, InfoModal, Label, MiniDNA, PillIcon, TabBar, Title, TopBar, VideoCard } from "../components";
import { supplements } from "../data/supplements";

const ConsentToggles = () => {
  const t = useTheme();
  const toast = useToast();
  const [consents, setConsents] = useState([
    {l:"Essential Data Processing",s:"Required for core platform functionality",on:true,required:true,info:"We process your blood biomarker data, DNA analysis results, and supplement protocol information to provide personalised health recommendations. This processing is essential for EVA™ to function and cannot be disabled."},
    {l:"Clinical Communications",s:"Messages from your clinician",on:true,required:true,info:"Your clinician needs to communicate protocol updates, result reviews, and health alerts. This is a core part of the clinician-in-the-loop model that ensures your safety."},
    {l:"Anonymous Research Participation",s:"De-identified data for longevity research",on:false,info:"When enabled, your biological data is stripped of all personal identifiers and contributed to aggregate longevity research. No individual can be identified. Data is anonymised using k-anonymity techniques compliant with UAE PDPL. You can opt out at any time."},
    {l:"Marketing Communications",s:"Product updates and offers",on:false,info:"Occasional emails about new EVA™ features, health content, and partner offers. We never share your data with third parties for marketing. Unsubscribe anytime."},
  ]);
  const [infoModal, setInfoModal] = useState(null);
  const toggle = idx => {
    if (consents[idx].required) return;
    const next = [...consents];
    next[idx] = {...next[idx], on: !next[idx].on};
    setConsents(next);
  };
  return (
    <div>
      {infoModal!==null&&<InfoModal title={consents[infoModal].l} text={consents[infoModal].info} onClose={()=>setInfoModal(null)}/>}
      {consents.map((n,i)=>(
      <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{n.l}</div>
            {n.info&&<div onClick={()=>setInfoModal(i)} style={{ cursor:"pointer" }}><InfoIcon size={14} color={t.t3}/></div>}
          </div>
          <div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{n.s}{n.required&&<span style={{ color:t.gold,fontWeight:600 }}> · Required</span>}</div>
        </div>
        <div onClick={()=>toggle(i)} style={{ width:44,height:26,borderRadius:13,background:n.on?t.purple:t.b2,padding:2,cursor:n.required?"not-allowed":"pointer",opacity:n.required?.6:1,transition:"background .2s" }}>
          <div style={{ width:22,height:22,borderRadius:"50%",background:"#FFF",transition:"transform .2s",transform:n.on?"translateX(18px)":"translateX(0)" }}/>
        </div>
      </div>
    ))}
      <Btn variant="muted" onClick={()=>toast.show("Export requested. Check your email within 24 hours.","info")} style={{ marginTop:20 }}>Request Data Export</Btn>
    </div>
  );
};

const NotificationToggles = () => {
  const t = useTheme();
  const [notifs, setNotifs] = useState([
    {l:"DEVA™ Daily Briefing",s:"Morning push notification",on:true,ic:"deva",hasDeva:true},
    {l:"Supplement Reminders",s:"Morning & evening alerts",on:true,ic:"pill"},
    {l:"Re-Test Reminders",s:"90-day blood test prompt",on:true,ic:"cal"},
    {l:"Clinician Messages",s:"Direct messages from your clinician",on:true,ic:"doc"},
    {l:"Marketing & Updates",s:"Product news and offers",on:false,ic:"mega"},
  ]);
  const toggle = idx => {
    const next = [...notifs];
    next[idx] = {...next[idx], on: !next[idx].on};
    setNotifs(next);
  };
  return (
    <div>{notifs.map((n,i)=>(
      <div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}>
        <div style={{ width:30,height:30,borderRadius:9,background:`${t.purple}08`,border:`1px solid ${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          {n.ic==="deva"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={t.purple} strokeWidth="1.3"/><circle cx="8" cy="8" r="2" fill={t.purple}/></svg>}
          {n.ic==="pill"&&<PillIcon size={14}/>}
          {n.ic==="cal"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke={t.purple} strokeWidth="1.3"/><path d="M5 1v3M11 1v3M2 7h12" stroke={t.purple} strokeWidth="1.1" strokeLinecap="round"/></svg>}
          {n.ic==="doc"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke={t.purple} strokeWidth="1.3" fill="none"/><path d="M3 14c0-2 2-3.5 5-3.5s5 1.5 5 3.5" stroke={t.purple} strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>}
          {n.ic==="mega"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 3v8l-4-2H4a1 1 0 01-1-1V6a1 1 0 011-1h5l4-2z" stroke={t.purple} strokeWidth="1.3" fill="none"/><path d="M5 9v3" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round"/></svg>}
        </div>
        <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{n.l}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{n.s}</div></div>
        <div onClick={()=>toggle(i)} style={{ width:44,height:26,borderRadius:13,background:n.on?t.purple:t.b2,padding:2,cursor:"pointer",transition:"background .2s" }}>
          <div style={{ width:22,height:22,borderRadius:"50%",background:"#FFF",transition:"transform .2s",transform:n.on?"translateX(18px)":"translateX(0)" }}/>
        </div>
      </div>
    ))}</div>
  );
};

const PersonalInfoEditor = () => {
  const t = useTheme();
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [fields, setFields] = useState([
    {l:"Full Name",v:"Daniel Salewski",k:"name",tp:"text"},
    {l:"Email",v:"daniel@eva.ae",k:"email",tp:"email"},
    {l:"Phone",v:"+971 50 XXX XXXX",k:"phone",tp:"tel"},
    {l:"Date of Birth",v:"15 March 1982",k:"dob",tp:"text"},
    {l:"Gender",v:"Male",k:"gender",tp:"text"},
  ]);
  const [addresses, setAddresses] = useState([
    {id:1,label:"Home",line1:"Villa 42, Al Barari",line2:"Dubailand",line3:"",country:"United Arab Emirates",city:"Dubai",pobox:"",postcode:"",preferred:true},
  ]);
  const [editAddr, setEditAddr] = useState(null);
  const updateField = (idx, val) => {
    const next = [...fields];
    next[idx] = {...next[idx], v: val};
    setFields(next);
  };
  const setPreferred = (id) => setAddresses(prev=>prev.map(a=>({...a,preferred:a.id===id})));
  const deleteAddr = (id) => { const next = addresses.filter(a=>a.id!==id); if(next.length&&!next.find(a=>a.preferred)) next[0].preferred=true; setAddresses(next); };
  const addAddr = () => { if(addresses.length>=3) return; setAddresses([...addresses,{id:Date.now(),label:"New Address",line1:"",line2:"",line3:"",country:"",city:"",pobox:"",postcode:"",preferred:false}]); setEditAddr(addresses.length); };
  const updateAddr = (idx,k,v) => { const next=[...addresses]; next[idx]={...next[idx],[k]:v}; setAddresses(next); };
  const addrField = (idx,key,placeholder) => <input value={addresses[idx]?.[key]||""} onChange={e=>updateAddr(idx,key,e.target.value)} placeholder={placeholder} style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1px solid ${t.b2}`,fontSize:14,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:6}}/>;
  return (
    <div>
      {fields.map((f,i)=>(
        <div key={i} style={{ padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ fontSize:12,color:t.t3,marginBottom:12,fontWeight:600,letterSpacing:.5 }}>{f.l}</div>
            <div onClick={()=>setEditing(editing===i?null:i)} style={{ fontSize:13,color:t.mode==="dark"?t.cyan:t.purple,cursor:"pointer",fontWeight:600 }}>{editing===i?"Done":"Edit"}</div>
          </div>
          {editing===i?(
            <input value={f.v} onChange={e=>updateField(i,e.target.value)} type={f.tp} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"13px 17px",border:`1.5px solid ${t.purple}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",marginTop:4 }}/>
          ):(
            <div style={{ fontSize:16,color:t.t1,fontWeight:500 }}>{f.v}</div>
          )}
        </div>
      ))}
      <div style={{ padding:"18px 0 8px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:.5 }}>DELIVERY ADDRESSES</div>
          {addresses.length<3&&<div onClick={addAddr} style={{ fontSize:13,color:t.mode==="dark"?t.cyan:t.purple,cursor:"pointer",fontWeight:600 }}>+ Add</div>}
        </div>
        {addresses.map((a,ai)=>(
          <Card key={a.id} style={{ marginBottom:8,border:a.preferred?`1.5px solid ${t.emerald}30`:`1px solid ${t.b1}`,padding:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:editAddr===ai?10:0 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{a.label||"Address"}</div>
                {a.preferred&&<div style={{ fontSize:10,fontWeight:700,color:t.emerald,background:`${t.emerald}12`,padding:"3px 8px",borderRadius:4 }}>PREFERRED</div>}
              </div>
              <div style={{ display:"flex",gap:12 }}>
                {!a.preferred&&<div onClick={()=>setPreferred(a.id)} style={{ fontSize:12,color:t.emerald,cursor:"pointer",fontWeight:600 }}>Set preferred</div>}
                <div onClick={()=>setEditAddr(editAddr===ai?null:ai)} style={{ fontSize:12,color:t.mode==="dark"?t.cyan:t.purple,cursor:"pointer",fontWeight:600 }}>{editAddr===ai?"Done":"Edit"}</div>
                {addresses.length>1&&<div onClick={()=>deleteAddr(a.id)} style={{ fontSize:12,color:t.red,cursor:"pointer",fontWeight:600 }}>Delete</div>}
              </div>
            </div>
            {editAddr===ai?<div style={{ marginTop:8 }}>
              <input value={a.label} onChange={e=>updateAddr(ai,"label",e.target.value)} placeholder="Label (e.g. Home, Office)" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1.5px solid ${t.purple}`,fontSize:14,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:6}}/>
              {addrField(ai,"line1","Building / Villa name or number")}
              {addrField(ai,"line2","Street / Area")}
              {addrField(ai,"line3","District / Neighbourhood")}
              <div style={{display:"flex",gap:6,marginBottom:6}}>
                <select value={a.country} onChange={e=>{updateAddr(ai,"country",e.target.value);updateAddr(ai,"city","")}} style={{flex:1,boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1px solid ${t.b2}`,fontSize:14,color:a.country?t.t1:t.t3,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
                  <option value="">Country</option>
                  {["United Arab Emirates","Saudi Arabia","Bahrain","Kuwait","Oman","Qatar"].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <select value={a.city} onChange={e=>updateAddr(ai,"city",e.target.value)} style={{flex:1,boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1px solid ${t.b2}`,fontSize:14,color:a.city?t.t1:t.t3,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
                  <option value="">{({"United Arab Emirates":"Emirate","Saudi Arabia":"Region","Bahrain":"Governorate","Kuwait":"Governorate","Oman":"Governorate","Qatar":"Municipality"})[a.country]||"Area"}</option>
                  {({"United Arab Emirates":["Dubai","Abu Dhabi","Sharjah","Ajman","Ras Al Khaimah","Fujairah","Umm Al Quwain"],"Saudi Arabia":["Riyadh","Jeddah","Dammam","Mecca","Medina","Khobar"],"Bahrain":["Manama","Muharraq","Riffa"],"Kuwait":["Kuwait City","Hawalli","Salmiya"],"Oman":["Muscat","Salalah","Sohar"],"Qatar":["Doha","Al Wakrah","Al Khor"]}[a.country]||[]).map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>

            </div>:<div style={{ fontSize:14,color:t.t2,marginTop:6 }}>{[a.line1,a.line2,a.line3,a.city,a.country].filter(Boolean).join(", ")}</div>}
          </Card>
        ))}
        {addresses.length>=3&&<div style={{ fontSize:12,color:t.t3,marginTop:4 }}>Maximum 3 addresses reached.</div>}
      </div>
      <Btn variant="secondary" onClick={()=>{setEditing(null);setEditAddr(null);toast.show("Changes saved successfully")}} style={{ marginTop:12 }}>Save Changes</Btn>
    </div>
  );
};

const FAQAccordion = () => {
  const t = useTheme();
  const [open, setOpen] = useState(null);
  const faqs = [
    {q:"How does EVA™ work?",a:"EVA™ combines your DNA and blood data to give you personalised health guidance. Your DNA is your blueprint (what you are born with), while your blood results show your current biological state. Together, this allows EVA™ to create and continuously adjust a protocol tailored to your body."},
    {q:"How often should I re-test?",a:"We recommend a follow-up blood test every 90 days. This allows enough time for your supplement protocol to take effect and gives us measurable data to track your progress and adjust your regimen."},
    {q:"What's included in my subscription?",a:"The Core subscription is USD 1,999 per year, including a DNA test, two 6-monthly blood biomarker panels, and personalised recommendations. Elite upgrade available for an additional USD 700 (total USD 2,699/year), which includes two extra blood tests per year for quarterly monitoring. The personalised supplement subscription is USD 199/month."},
    {q:"How are supplements personalised?",a:"Your supplement protocol is built from the intersection of your DNA variants and blood biomarker results. A clinician reviews all data and creates a protocol targeting your specific deficiencies and genetic predispositions."},
    {q:"Who reviews my results?",a:"Every protocol is reviewed and approved by a qualified clinician from Elite Vita's clinical team. No supplement recommendation reaches you without human expert oversight."},
    {q:"How do I cancel my subscription?",a:"You can contact our support team via the app or email support@eva.com. We require 30 days notice for supplement subscription cancellation. Your biological data and reports remain accessible."},
  ];
  return (
    <div>{faqs.map((f,i)=>(
      <Card key={i} onClick={()=>setOpen(open===i?null:i)} style={{ padding:16,cursor:"pointer",transition:"all .2s" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ fontSize:15,fontWeight:500,color:t.t1,flex:1,paddingRight:12 }}>{f.q}</div>
          <div style={{ fontSize:16,color:t.t4,transition:"transform .2s",transform:open===i?"rotate(90deg)":"none" }}>›</div>
        </div>
        {open===i&&<div style={{ fontSize:14,color:t.t2,lineHeight:1.7,marginTop:12,paddingTop:12,borderTop:`1px solid ${t.b1}` }}>{f.a}</div>}
      </Card>
    ))}

    <div style={{marginTop:24,paddingTop:20,borderTop:`1px solid ${t.b1}`}}>
      <div style={{fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:12}}>EVA™ VIDEO LIBRARY</div>
      <div style={{fontSize:13,color:t.t2,marginBottom:14,lineHeight:1.5}}>All explainer videos in one place. Tap to watch.</div>
      {[
        {t:"Welcome to EVA™ — Daniel's Story",d:"2:45"},
        {t:"Understanding DEVA™",d:"1:15"},
        {t:"The Biological Age Reality Check",d:"0:40"},
        {t:"Biological Age vs. Chronological Age",d:"0:55"},
        {t:"The Hidden Inflammation Threat",d:"0:40"},
        {t:"Why Our Blood Panel is Superior",d:"2:00"},
        {t:"How We Read Your DNA",d:"2:45"},
        {t:"Six Months In — A Message from Daniel",d:"2:15"},
        {t:"How Your Protocol Was Built",d:"1:45"},
        {t:"Supplement Quality & Certifications",d:"2:45"},
        {t:"The Clinical Difference",d:"0:40"},
        {t:"What to Expect — Your Phlebotomist Visit",d:"1:15"},
        {t:"Your Results Are In — Dr. Nival",d:"2:15"},
      ].map((v,i)=><VideoCard key={i} title={v.t} duration={v.d} permanent/>)}
    </div>
    </div>
  );
};

const DeviceConnectionList = ({onNavigate}) => {
  const t = useTheme();
  const toast = useToast();
  const [devices, setDevices] = useState([
    {n:"Apple Health",s:"Sync activity, sleep & vitals",synced:"2h ago",connected:true},
    {n:"Google Fit",s:"Activity tracking & workouts",synced:"4h ago",connected:true},
    {n:"Whoop",s:"HRV, strain & recovery scores",connected:false},
    {n:"Oura",s:"Sleep stages & readiness score",connected:false},
    {n:"Garmin",s:"HRV, Body Battery & sleep",connected:false},
    {n:"Fitbit",s:"Sleep, activity & stress",connected:false},
    {n:"Ultrahuman",s:"Metabolic & recovery scores",connected:false},
    {n:"Samsung",s:"Sleep, stress & heart rate",connected:false},
  ]);
  const [connecting, setConnecting] = useState(null);
  const toggleDevice = (idx) => {
    if (devices[idx].connected) {
      const next = [...devices]; next[idx] = {...next[idx],connected:false,synced:undefined}; setDevices(next);
      toast.show(devices[idx].n + " disconnected","info");
    } else {
      setConnecting(idx);
      setTimeout(()=>{
        const next = [...devices]; next[idx] = {...next[idx],connected:true,synced:"Just now"}; setDevices(next);
        setConnecting(null);
        toast.show(devices[idx].n + " connected!","success");
      },1200);
    }
  };
  return (
    <div>
      <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:16 }}>Connect your wearable to enable real-time protocol adjustments based on your HRV, sleep, and activity data.</div>
      {devices.map((d,i)=>(
        <Card key={i} style={{ display:"flex",alignItems:"center",gap:16,padding:16 }}>
          <div style={{ width:42,height:42,borderRadius:12,background:d.connected?`${t.emerald}10`:t.s2,border:`1px solid ${d.connected?`${t.emerald}20`:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <div style={{ fontSize:11,fontWeight:800,color:d.connected?t.emerald:t.t3,letterSpacing:.5 }}>{d.n.split(" ")[0].slice(0,4).toUpperCase()}</div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{d.n}</div>
            <div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{d.s}{d.synced&&<span style={{ color:t.emerald,fontWeight:500 }}> · Last: {d.synced}</span>}</div>
          </div>
          <div onClick={()=>toggleDevice(i)} style={{ background:connecting===i?"transparent":(d.connected?`${t.emerald}14`:t.s2),border:`1px solid ${connecting===i?t.purple:(d.connected?t.emerald:t.b2)}`,borderRadius:10,padding:"10px 17px",fontSize:13,fontWeight:600,color:connecting===i?t.purple:(d.connected?t.emerald:t.purple),cursor:"pointer",minWidth:80,textAlign:"center" }}>
            {connecting===i?"Connecting...":(d.connected?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><CheckIcon size={10} color={t.emerald}/>Connected</span>:"Connect")}
          </div>
        </Card>
      ))}
    </div>
  );
};

const ReferralSection = ({toast, onNavigate}) => {
  const t = useTheme();
  const [inviteMethod, setInviteMethod] = useState("email");
  const [inviteInput, setInviteInput] = useState("");
  const [slots, setSlots] = useState([
    {email:"sarah@example.com",status:"subscribed",date:"Joined 12 Mar 2025"},
    {email:"james@example.com",status:"signed-up",date:"Signed up 9 Mar 2025"},
    {email:null,status:"empty",date:null},
  ]);
  const [showTerms, setShowTerms] = useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inviteInput);
  const sendInvite = () => {
    if (!emailValid) return;
    const next = [...slots];
    const emptyIdx = next.findIndex(s=>s.status==="empty");
    if (emptyIdx===-1) { toast.show("All 3 invitation slots are used","warning"); return; }
    next[emptyIdx] = {email:inviteInput,status:"invited",date:"Invited just now"};
    setSlots(next);
    setInviteInput("");
    toast.show("Invitation sent to "+inviteInput,"success");
  };
  const rewardCount = slots.filter(s=>s.status==="subscribed").length;
  const statusColor = {subscribed:t.emerald,"signed-up":t.gold,invited:t.cyan,empty:t.t4};
  const statusLabel = {subscribed:"Subscribed","signed-up":"Signed Up",invited:"Invited",empty:"Available"};
  return (
    <div>
      <Card style={{ background:`${t.purple}06`,border:`1.5px solid ${t.purple}15`,marginBottom:16 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:8 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:`${t.emerald}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <div style={{ fontSize:18,fontWeight:800,color:t.emerald }}>{rewardCount}</div>
          </div>
          <div>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{rewardCount>0?`${rewardCount} free month${rewardCount>1?"s":""} earned!`:"No rewards yet"}</div>
            <div style={{ fontSize:12,color:t.t3,marginTop:2 }}>{rewardCount>0?"Unlocks at Month 3 of their membership":"Invite friends to earn free months"}</div>
          </div>
        </div>
        <div style={{ fontSize:13,color:t.t2,lineHeight:1.6 }}>When a friend subscribes, <span style={{ color:t.t1,fontWeight:600 }}>both of you receive 1 free month of supplements</span>.</div>
      </Card>
      <Label>Your Referral Code</Label>
      <Card style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:16,marginBottom:16 }}>
        <div>
          <div style={{ fontSize:20,fontWeight:700,color:t.purple,letterSpacing:2 }}>EVA-DANIEL-2025</div>
          <div style={{ fontSize:11,color:t.t3,marginTop:4 }}>Share this code or send a direct invitation below</div>
        </div>
        <div onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText("EVA-DANIEL-2025");toast.show("EVA-DANIEL-2025 copied!","success")}} style={{ background:`${t.purple}12`,border:`1px solid ${t.purple}25`,borderRadius:10,padding:"10px 17px",fontSize:13,fontWeight:600,color:t.purple,cursor:"pointer" }}>Copy</div>
      </Card>
      <Label>Quick Share</Label>
      <div style={{ display:"flex",gap:12,marginBottom:20 }}>
        {[
          {l:"WhatsApp",c:"#25D366",bg:"#25D36612",bd:"#25D36620",ic:<svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>,fn:()=>window.open("https://wa.me/?text=Join%20me%20on%20EVA%E2%84%A2%20%E2%80%94%20use%20code%20EVA-DANIEL-2025%20to%20get%20started.%20https://eva.ae","_blank")},
          {l:"SMS",c:t.t1,bg:t.s2,bd:t.b2,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="9" rx="2" stroke={t.t1} strokeWidth="1.2"/><path d="M4 6h3M4 8.5h5" stroke={t.t1} strokeWidth="1" strokeLinecap="round"/></svg>,fn:()=>toast.show("SMS app opening...","info")},
          {l:"Email",c:t.t1,bg:t.s2,bd:t.b2,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke={t.t1} strokeWidth="1.2"/><path d="M1 4l6 4 6-4" stroke={t.t1} strokeWidth="1.2" strokeLinecap="round"/></svg>,fn:()=>toast.show("Email app opening...","info")},
        ].map((sh,i)=>(
          <div key={i} onClick={sh.fn} style={{ flex:1,background:sh.bg,border:`1px solid ${sh.bd}`,borderRadius:12,padding:"12px 0",textAlign:"center",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
            {sh.ic}
            <div style={{ fontSize:12,fontWeight:600,color:sh.c }}>{sh.l}</div>
          </div>
        ))}
      </div>
      <Label>Invitation Slots</Label>
      {slots.map((s,i)=>(
        <Card key={i} onClick={s.status==="empty"?()=>{}:undefined} style={{ display:"flex",alignItems:"center",gap:14,padding:14,background:s.status==="empty"?`${t.bg}`:(s.status==="subscribed"?`${t.emerald}04`:t.s1),borderStyle:s.status==="empty"?"dashed":"solid" }}>
          <div style={{ width:36,height:36,borderRadius:"50%",background:`${statusColor[s.status]}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            {s.status==="subscribed"?<CheckIcon size={16} color={t.emerald}/>:s.status==="signed-up"?<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke={t.gold} strokeWidth="1.3"/><path d="M7 4v3.5" stroke={t.gold} strokeWidth="1.3" strokeLinecap="round"/></svg>:s.status==="invited"?<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 2L5 9M12 2l-3 10-2-4-4-2 10-3z" stroke={t.cyan} strokeWidth="1.2" fill="none"/></svg>:<div style={{ fontSize:18,color:t.t4,fontWeight:300 }}>+</div>}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14,fontWeight:600,color:s.email?t.t1:t.t4 }}>{s.email||"Empty slot"}</div>
            {s.date&&<div style={{ fontSize:12,color:t.t3,marginTop:2 }}>{s.date}</div>}
          </div>
          <div style={{ fontSize:11,fontWeight:600,color:statusColor[s.status],background:`${statusColor[s.status]}12`,padding:"5px 10px",borderRadius:4 }}>{statusLabel[s.status]}</div>
        </Card>
      ))}
      <Label style={{ marginTop:16 }}>Send Invitation</Label>
      <div style={{ display:"flex",gap:10,marginBottom:12 }}>
        {["email","phone"].map(m=>(
          <div key={m} onClick={()=>setInviteMethod(m)} style={{ flex:1,background:inviteMethod===m?`${t.purple}12`:t.s2,border:`1.5px solid ${inviteMethod===m?t.purple:t.b2}`,borderRadius:10,padding:"10px 0",textAlign:"center",fontSize:13,fontWeight:600,color:inviteMethod===m?t.purple:t.t3,cursor:"pointer",transition:"all .2s" }}>{m==="email"?"By Email":"By Phone"}</div>
        ))}
      </div>
      <input value={inviteInput} onChange={e=>setInviteInput(e.target.value)} placeholder={inviteMethod==="email"?"friend@example.com":"+971 50 XXX XXXX"} type={inviteMethod==="email"?"email":"tel"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${inviteInput.length>0?(emailValid?t.emerald:`${t.gold}60`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:12,transition:"border .2s" }}/>
      <Btn onClick={sendInvite} style={{ opacity:(inviteMethod==="email"&&emailValid)||(inviteMethod==="phone"&&inviteInput.length>7)?1:.4 }}>Send Invitation</Btn>
      <Card style={{ marginTop:16,padding:14 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
          <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5 }}>HOW IT WORKS</div>
          <div onClick={()=>setShowTerms(!showTerms)} style={{ fontSize:12,color:t.purple,fontWeight:600,cursor:"pointer" }}>{showTerms?"Hide":"Terms"}</div>
        </div>
        <div style={{ fontSize:13,color:t.t2,lineHeight:1.8 }}>1. Send up to 3 invitations via email, phone, or share link<br/>2. Your friend signs up and subscribes to EVA™<br/>3. Both of you receive 1 free month of supplements<br/>4. Reward unlocks at Month 3 of their membership</div>
        {showTerms&&<div style={{ marginTop:10,paddingTop:10,borderTop:`1px solid ${t.b1}`,fontSize:12,color:t.t3,lineHeight:1.7,animation:"fadeUp .2s ease both" }}>Referral rewards are limited to 3 per user. Free months apply to the supplement subscription only (USD 199 value). Both referrer and referee must maintain active subscriptions. Rewards cannot be transferred or exchanged for cash. Elite Vita reserves the right to modify or discontinue the referral programme.</div>}
      </Card>
    </div>
  );
};

const ChangePasswordForm = ({toast}) => {
  const t = useTheme();
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const rules = [
    {l:"8+ characters",ok:newPw.length>=8},
    {l:"One uppercase",ok:/[A-Z]/.test(newPw)},
    {l:"One number",ok:/[0-9]/.test(newPw)},
    {l:"One special character",ok:/[^A-Za-z0-9]/.test(newPw)},
  ];
  const allValid = rules.every(r=>r.ok) && newPw===confirm && current.length>0;
  const matching = confirm.length>0 && newPw===confirm;
  const notMatching = confirm.length>0 && newPw!==confirm;
  return (
    <div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CURRENT PASSWORD</div>
        <div style={{ position:"relative" }}>
          <input value={current} onChange={e=>setCurrent(e.target.value)} placeholder="Enter current password" type={showCurrent?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
          <div onClick={()=>setShowCurrent(!showCurrent)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showCurrent}/></div>
        </div>
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>NEW PASSWORD</div>
        <div style={{ position:"relative" }}>
          <input value={newPw} onChange={e=>setNewPw(e.target.value)} placeholder="Create new password" type={showNew?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${newPw.length>0?(rules.every(r=>r.ok)?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          <div onClick={()=>setShowNew(!showNew)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showNew}/></div>
        </div>
        {newPw.length>0&&<div style={{ display:"flex",flexWrap:"wrap",gap:10,marginTop:10 }}>
          {rules.map((r,ri)=>(
            <div key={ri} style={{ display:"flex",alignItems:"center",gap:6 }}>
              <div style={{ width:14,height:14,borderRadius:"50%",background:r.ok?t.emerald:`${t.t3}30`,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }}>{r.ok&&<CheckIcon size={8} color="#FFF"/>}</div>
              <span style={{ fontSize:12,color:r.ok?t.emerald:t.t3,fontWeight:500,transition:"color .2s" }}>{r.l}</span>
            </div>
          ))}
        </div>}
      </div>
      <div style={{ marginBottom:16,marginTop:16 }}>
        <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CONFIRM NEW PASSWORD</div>
        <div style={{ position:"relative" }}>
          <input value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm new password" type={showConfirm?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${notMatching?`${t.red}80`:matching?t.emerald:t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          <div onClick={()=>setShowConfirm(!showConfirm)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showConfirm}/></div>
        </div>
        {notMatching&&<div style={{ fontSize:12,color:t.red,marginTop:6,fontWeight:500 }}>Passwords do not match</div>}
        {matching&&<div style={{ fontSize:12,color:t.emerald,marginTop:6,fontWeight:500 }}>Passwords match</div>}
      </div>
      <Btn onClick={allValid?()=>toast.show("Password updated successfully"):undefined} style={{ opacity:allValid?1:.4 }}>Update Password</Btn>
    </div>
  );
};

const ProfileScreen = ({ onNavigate, onToggleTheme, isDark, profileSection, setProfileSection }) => {
  const t = useTheme();
  const toast = useToast();
  const activeSection = profileSection;
  const [suppTab, setSuppTab] = useState("morning");
  const [reportTab, setReportTab] = useState("Blood Reports");
  const scrollRef = useRef(null);
  const scrollPos = useRef(0);
  const setActiveSection = (s) => {
    if (s !== null && scrollRef.current) scrollPos.current = scrollRef.current.scrollTop;
    setProfileSection(s);
  };
  useEffect(() => {
    if (activeSection === null && scrollRef.current) {
      setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollPos.current; }, 10);
    }
  }, [activeSection]);

  const pIcon = (ic) => {
    const s = {width:32,height:32,borderRadius:10,background:`${t.purple}08`,border:`1px solid ${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0};
    const p = {stroke:t.purple,strokeWidth:"1.3",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"};
    const icons = {
      person:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="5" r="3"/><path d="M2 14c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5"/></svg>,
      clipboard:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><rect x="3" y="1" width="10" height="14" rx="1.5"/><path d="M6 5h4M6 8h4M6 11h2"/></svg>,
      bell:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M4 6a4 4 0 018 0c0 2 1 3.5 1.5 4.5H2.5C3 9.5 4 8 4 6z"/><path d="M6 12a2 2 0 004 0"/></svg>,
      shield:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M8 1L2 4v4c0 3.5 2.5 5.8 6 7 3.5-1.2 6-3.5 6-7V4L8 1z"/><path d="M6 8l1.5 1.5L10 6"/></svg>,
      doctor:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="5.5" r="2.5"/><path d="M3 14c0-2 2-3.5 5-3.5s5 1.5 5 3.5"/><path d="M12 4V2M11 3h2"/></svg>,
      question:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="8" r="6.5"/><path d="M6 6a2 2 0 013.5 1.5c0 1-1.5 1.5-1.5 1.5M8 12v.5"/></svg>,
      doc:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M4 1h5l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/><path d="M9 1v4h4M6 9h4M6 12h2"/></svg>,
      send:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M14 2L7 9M14 2l-4 12-3-5-5-3 12-4z"/></svg>,
      info:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="8" r="6.5"/><path d="M8 5v.5M8 7.5v4"/></svg>,
      link:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M7 9a3.5 3.5 0 005 0l1.5-1.5a3.5 3.5 0 00-5-5L7 4M9 7a3.5 3.5 0 00-5 0L2.5 8.5a3.5 3.5 0 005 5L9 12"/></svg>,
      bag:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M2 5h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V5z"/><path d="M5 5V3a3 3 0 016 0v2"/></svg>,
    };
    return <div style={s}>{icons[ic]||icons.info}</div>;
  };
  // Sub-screen renderer
  if (activeSection) {
    const sections = {
      personal: { title:"Personal Information", content: (
        <PersonalInfoEditor/>
      )},
      questionnaire: { title:"Health Questionnaire", content: (
        <div>{[{l:"Primary Goal",v:"Longevity optimisation",opts:["Longevity optimisation","Weight management","Athletic performance","Hormone balance","Disease prevention","General wellness"]},{l:"Activity Level",v:"Moderate (3-4x/week)",opts:["Sedentary","Light (1-2x/week)","Moderate (3-4x/week)","Active (5-6x/week)","Very active (daily)"]},{l:"Sleep Quality",v:"Variable (5-7 hours)",opts:["Poor (<5 hours)","Variable (5-7 hours)","Good (7-8 hours)","Excellent (8+ hours)"]},{l:"Dietary Preferences",v:"No restrictions",opts:["No restrictions","Vegetarian","Vegan","Keto","Halal","Gluten-free","Dairy-free"]},{l:"Family History",v:"Cardiovascular (paternal)",opts:["None known","Cardiovascular (paternal)","Cardiovascular (maternal)","Diabetes","Cancer","Alzheimer's/Dementia","Multiple"]},{l:"Current Supplements",v:"None prior to EVA™",opts:["None prior to EVA™","Multivitamin only","Several supplements","Prescribed medications"]}].map((f,i)=>(
          <div key={i} style={{ padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}><div style={{ fontSize:12,color:t.t3,marginBottom:12,fontWeight:600,letterSpacing:.5 }}>{f.l}</div><select defaultValue={f.v} onChange={()=>{}} style={{ fontSize:16,color:t.t1,fontWeight:500,background:"transparent",border:"none",borderBottom:`1px dashed ${t.b2}`,paddingBottom:4,width:"100%",outline:"none",fontFamily:"inherit",cursor:"pointer" }}>{f.opts&&f.opts.map((o,oi)=><option key={oi}>{o}</option>)}</select></div>
        ))}<Btn variant="secondary" onClick={()=>toast.show("Questionnaire updated!","success")} style={{ marginTop:20 }}>Save Changes</Btn></div>
      )},
      notifications: { title:"Notifications", content: (
        <NotificationToggles/>
      )},
      subscription: { title:"Subscription", content: (
        <div style={{ textAlign:"center",padding:"20px 0" }}><Btn onClick={()=>onNavigate("subscription")}>Manage Subscription</Btn></div>
      )},
      password: { title:"Change Password", content: (
        <ChangePasswordForm toast={toast}/>
      )},
      consent: { title:"Consent Management", content: (
        <ConsentToggles/>
      )},
      integrations: { title:"Connected Devices", content: (<DeviceConnectionList onNavigate={onNavigate}/>)},
      _unused_integrations: { title:"_", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:20 }}>Connect wearables and health platforms to enrich your EVA™ data with activity, sleep, and recovery metrics.</div>
          {[
            {n:"Apple Health",s:"Sync activity, sleep & vitals",synced:"2h ago",logo:<svg width="24" height="24" viewBox="0 0 1080 1080" fill="none"><defs><linearGradient id="ah" x1="540" y1="100" x2="540" y2="979" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FF61AD"/><stop offset="1" stopColor="#FF2616"/></linearGradient></defs><path d="M540.4,978.9c-25.4,0-174.1-80.3-313.2-211.9C116.8,662.7,36.9,509.2,36.9,371c0-125.1,104.9-270.5,274.4-270.5c165.1,0,201.4,88.9,229.1,88.9c22.1,0,66-88.9,229.1-88.9c179,0,274.4,159.8,274.4,270.5c0,138.1-73.9,286-190.2,396C718.1,895.2,565.8,978.9,540.4,978.9z" fill="url(#ah)"/></svg>,connected:false},
            {n:"Google Fit",s:"Activity tracking & workouts",synced:"4h ago",logo:<svg width="24" height="24" viewBox="0 0 236.2 200" fill="none"><path fill="#EA4335" d="M22.6 105.8l11.9 11.9 25.7-25.6-11.8-11.9-5.4-5.4c-4.3-4.3-6.6-9.9-6.6-16 0-5.3 1.8-10.1 4.9-13.9 4.2-5.3 10.6-8.7 17.8-8.7 6.1 0 11.7 2.4 16.1 6.7l5.3 5.1 11.9 12 25.8-25.6-12-11.9-5.4-5.2C90.1 6.6 75.4 0 59.1 0 26.4 0 0 26.4 0 58.9c0 8.1 1.6 15.8 4.6 22.9 3 7.1 7.3 13.4 12.7 18.7l5.3 5.3"/><path fill="#FBBC04" d="M81.5 122.2l36.7-36.5-25.8-25.7-32.2 32.1-25.7 25.6 13.8 13.9 11.9 11.8z"/><path fill="#34A853" d="M143.8 175.6l58-57.9-25.8-25.6-57.9 57.8-32.2-32.1-25.7 25.6 32.2 32.2-.1.1 25.8 24.3 25.8-24.4z"/><path fill="#4285F4" d="M218.9 100.5c12-12 18.9-30.4 17-49-2.8-28.2-26.2-49.4-54.6-51.3-17.9-1.2-34.3 5.5-45.9 17.1L92.4 60l25.7 25.7 43-42.8c5.2-5.1 12.4-7.5 19.8-6.3 9.6 1.5 17.4 9.4 18.7 19 1 7.2-1.4 14.2-6.5 19.3L176 92.1l25.8 25.6 17.1-17.2z"/></svg>,connected:false},
            {n:"Whoop",s:"HRV, strain & recovery scores",logo:({t})=><svg width="28" height="28" viewBox="0 0 50 50" fill={t.t1}><polygon points="33.5,33.1 29.9,21.3 26.6,21.3 31.8,38.4 31.8,38.4 35.1,38.4 43.5,10.9 40.2,10.9"/><polygon points="9.9,10.9 6.7,10.9 11.9,28 15.1,28"/><polygon points="23.4,10.9 15.1,38.4 18.3,38.4 26.7,10.9"/></svg>,connected:false},
            {n:"Oura",s:"Sleep stages & readiness score",logo:({t})=><svg width="28" height="28" viewBox="0 0 50 50" fill={t.t1}><path d="M8.2,28.6c0-9.3,7.6-16.8,16.8-16.8c9.3,0,16.8,7.6,16.8,16.9c0,9.3-7.5,16.8-16.8,16.8C15.7,45.5,8.2,37.9,8.2,28.6z M24.9,41.9C31.9,42,38,36.2,38.2,29c0.2-7.4-5.6-13.4-13.1-13.6C18.2,15.2,12,21.1,11.8,28C11.6,35.7,17.3,41.7,24.9,41.9z"/><path d="M16.6,4.5c5.6,0,11,0,16.4,0c0.1,0,0.2,0.1,0.3,0.1c0,1.1,0,2.3,0,3.5c-5.6,0-11.1,0-16.7,0C16.6,6.9,16.6,5.7,16.6,4.5z"/></svg>,connected:false},
            {n:"Garmin",s:"HRV, Body Battery & sleep",logo:({t})=><div style={{fontSize:12,fontWeight:800,color:t.t1,letterSpacing:1}}>GARMIN</div>,connected:false},
            {n:"Fitbit",s:"Sleep, activity & stress",logo:({t})=><div style={{fontSize:12,fontWeight:800,color:"#00B0B9",letterSpacing:.5}}>fitbit</div>,connected:false},
            {n:"Ultrahuman",s:"Metabolic & recovery scores",logo:({t})=><div style={{fontSize:11,fontWeight:800,color:t.t1,letterSpacing:.5}}>ULTRA</div>,connected:false},
            {n:"Samsung",s:"Sleep, stress & heart rate",logo:({t})=><div style={{fontSize:11,fontWeight:800,color:"#1428A0",letterSpacing:.5}}>Samsung</div>,connected:false},
          ].map((d,i)=>(
            <Card key={i} style={{ display:"flex",alignItems:"center",gap:16,padding:16 }}>
              <div style={{ width:42,height:42,borderRadius:12,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{typeof d.logo==="function"?d.logo({t}):d.logo}</div>
              <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{d.n}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{d.s}{d.synced&&<span style={{ color:t.emerald,fontWeight:500 }}> · Last: {d.synced}</span>}</div></div>
              <div style={{ background:d.connected?t.emerald:t.purple,borderRadius:8,padding:"9px 17px",fontSize:12,fontWeight:700,color:"#FFF",letterSpacing:.3 }}>{d.connected?"Connected":"Connect"}</div>
            </Card>
          ))}
        </div>
      )},
      clinician: { title:"Contact Clinician", content: (
        <div>
          <Card style={{ display:"flex",alignItems:"center",gap:16,padding:18 }}>
            <div style={{ width:48,height:48,borderRadius:"50%",background:`${t.emerald}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:t.emerald }}>NK</div>
            <div><div style={{ fontSize:17,fontWeight:700,color:t.t1 }}>Dr. Nival</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Lead Clinician · Elite Vita</div><div style={{ fontSize:13,color:t.emerald,marginTop:6,fontWeight:600 }}>Typically responds within 24 hours</div></div>
          </Card>
          <Btn onClick={()=>onNavigate("clinician-chat")} style={{ marginTop:16 }}>Send Message</Btn>
          <Btn variant="secondary" onClick={()=>window.open("https://wa.me/971501234567?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation","_blank")} style={{ marginTop:10 }}>Book Consultation — USD 200</Btn>
          <div style={{ marginTop:20,padding:"16px 0",borderTop:`1px solid ${t.b1}` }}>
            <Label color="#25D366">EV.AI™ — INSTANT SUPPORT</Label>
            <Card onClick={()=>window.open("https://wa.me/971501234567?text=Hi%20EV.AI","_blank")} glow="#25D366" style={{ display:"flex",alignItems:"center",gap:16,cursor:"pointer" }}>
              <div style={{ width:44,height:44,borderRadius:14,background:"#25D36612",border:"1px solid #25D36620",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15,fontWeight:700,color:t.t1,display:"flex",alignItems:"center",gap:8 }}>Chat with EV.AI™ <span style={{ fontSize:10,fontWeight:600,color:"#25D366",background:"#25D36612",padding:"4px 8px",borderRadius:4,letterSpacing:.5 }}>BETA</span></div>
                <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>Get instant answers about your biology, protocol, and health goals via WhatsApp</div>
              </div>
              <ChevronRight size={12} color="#25D366"/>
            </Card>
          </div>
        </div>
      )},
      help: { title:"Help & FAQ", content: (
        <FAQAccordion/>
      )},
      "supplements": { title:"My Supplements", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:16 }}>Your personalised supplement stack, built from your DNA and blood data.</div>
          <div style={{ display:"flex",gap:6,marginBottom:16,background:t.s2,borderRadius:10,padding:3 }}>
            {["morning","evening"].map(tb=>(
              <div key={tb} onClick={()=>setSuppTab(tb)} style={{ flex:1,background:suppTab===tb?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:suppTab===tb?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
                <div style={{ fontSize:13,fontWeight:600,color:suppTab===tb?t.t1:t.t3,textTransform:"capitalize" }}>{tb}</div>
              </div>
            ))}
          </div>
          {(suppTab==="morning"?[{n:"Vitamin D3",d:"4,000 IU",desc:"Supports immune function, bone density, and mood regulation. Higher dose compensates for your VDR gene variant."},{n:"Omega-3",d:"2,000mg",desc:"Pharmaceutical-grade EPA/DHA targeting systemic inflammation and cardiovascular protection."},{n:"CoQ10",d:"200mg",desc:"Essential for mitochondrial energy production, cardiovascular function, and exercise recovery."},{n:"Vitamin K2",d:"200mcg",desc:"Directs calcium to bones and prevents arterial calcification. Safety pairing with high-dose D3."},{n:"B-Complex",d:"1 capsule",desc:"Pre-activated methylated forms bypass your MTHFR C677T variant for optimal folate metabolism."}]:[{n:"Magnesium Glycinate",d:"600mg",desc:"Chelated glycinate form selected for your TRPM6 variant. Supports sleep, muscle recovery, and 300+ enzymatic reactions."},{n:"Zinc Picolinate",d:"30mg",desc:"Highest bioavailability zinc form. Supports immune function, testosterone maintenance, and wound healing."}]).map((s,i)=>(
            <div key={i} style={{display:"flex",gap:14,padding:14,background:t.s1,borderRadius:14,border:`1px solid ${t.b1}`,marginBottom:8}}>
              <div style={{width:56,height:72,borderRadius:10,background:`${t.purple}08`,border:`1px solid ${t.purple}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <div style={{fontSize:8,color:t.purple,fontWeight:700,textAlign:"center",lineHeight:1.3}}>EliteVita<br/><span style={{fontSize:6,fontWeight:400}}>SUPPLEMENTS</span></div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:600,color:t.t1}}>{s.n}</div>
                <div style={{fontSize:12,color:t.purple,fontWeight:600,marginTop:1}}>{s.d}</div>
                <div style={{fontSize:12,color:t.t2,marginTop:4,lineHeight:1.5}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )},
      "test-history": { title:"Test History", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:20 }}>Your complete testing timeline. Tap to view details.</div>
          <VideoCard title="What to Expect — Your Phlebotomist Visit" duration="1:15"/>
          <VideoCard title="Your Results Are In — Dr. Nival" duration="2:15"/>
          {[
            {type:"Blood Panel",date:"4 Feb 2025",status:"Complete",markers:70,key:"Vitamin D low, hs-CRP elevated, Magnesium below optimal"},
            {type:"DNA Analysis",date:"28 Feb 2025",status:"Complete",markers:5,key:"MTHFR, TRPM6, VDR variants identified"},
            {type:"Follow-up Blood",date:"Expected Aug 2025",status:"Scheduled",markers:null,key:"6-month re-evaluation"},
          ].map((t2,i)=>(
            <Card key={i} style={{ padding:16,opacity:t2.status==="Scheduled"?.6:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{t2.type}</div>
                <div style={{ fontSize:12,fontWeight:600,color:t2.status==="Complete"?t.emerald:t.purple,background:t2.status==="Complete"?`${t.emerald}12`:`${t.purple}12`,borderRadius:6,padding:"5px 10px" }}>{t2.status}</div>
              </div>
              <div style={{ fontSize:13,color:t.t3,marginBottom:4 }}>{t2.date}{t2.markers?` · ${t2.markers} markers`:""}</div>
              {t2.key&&<div style={{ fontSize:13,color:t.t2,lineHeight:1.5,marginBottom:8 }}>{t2.key}</div>}
              {t2.status==="Complete"&&<div onClick={()=>onNavigate("report-viewer")} style={{ background:t.purple,borderRadius:8,padding:"9px 15px",fontSize:12,fontWeight:700,color:"#FFF",letterSpacing:.3,cursor:"pointer",textAlign:"center" }}>View Report</div>}
            </Card>
          ))}
        </div>
      )},
      reports: { title:"My Reports", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:16 }}>Download your full reports as PDF.</div>
          <div style={{ display:"flex",gap:6,marginBottom:16,background:t.s2,borderRadius:10,padding:3 }}>
            {["Blood Reports","DNA Reports"].map(tb=>(
              <div key={tb} onClick={()=>setReportTab(tb)} style={{ flex:1,background:reportTab===tb?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:reportTab===tb?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
                <div style={{ fontSize:13,fontWeight:600,color:reportTab===tb?t.t1:t.t3 }}>{tb}</div>
              </div>
            ))}
          </div>
          {reportTab==="Blood Reports"&&[{n:"Cardiovascular Health",f:"EVA_Blood_Cardiovascular.pdf"},{n:"Blood Sugar & Metabolism",f:"EVA_Blood_Metabolic.pdf"},{n:"Inflammation & Liver",f:"EVA_Blood_Inflammation.pdf"},{n:"Nutrition & Vitamins",f:"EVA_Blood_Nutrition.pdf"},{n:"Hormones",f:"EVA_Blood_Hormones.pdf"},{n:"Kidney & Electrolytes",f:"EVA_Blood_Kidney.pdf"}].map((r,i)=>(
            <div key={`r${i}`} onClick={()=>toast.show("Downloading "+r.f,"success")} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:t.s1,borderRadius:10,border:`1px solid ${t.b1}`,marginBottom:6,cursor:"pointer" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:8,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke={t.purple} strokeWidth="1.3"/><path d="M5 7h6M5 10h4" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/></svg>
                </div>
                <div style={{ fontSize:14,fontWeight:500,color:t.t1 }}>{r.n}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
          {reportTab==="DNA Reports"&&[{n:"Methylation Pathway",f:"EVA_DNA_Methylation.pdf"},{n:"Diet & Macronutrient Response",f:"EVA_DNA_Diet.pdf"},{n:"Food Sensitivities",f:"EVA_DNA_Sensitivities.pdf"},{n:"Cardiovascular Risk",f:"EVA_DNA_Cardiovascular.pdf"},{n:"Metabolic Risk",f:"EVA_DNA_Metabolic.pdf"},{n:"Cancer Risk Panel",f:"EVA_DNA_Cancer.pdf"},{n:"Neurological Risk",f:"EVA_DNA_Neurological.pdf"},{n:"Nutrigenomics",f:"EVA_DNA_Nutrigenomics.pdf"},{n:"Detoxification Pathways",f:"EVA_DNA_Detox.pdf"},{n:"Inflammation Genetics",f:"EVA_DNA_Inflammation.pdf"},{n:"Hormone Metabolism",f:"EVA_DNA_Hormones.pdf"},{n:"Sleep & Circadian",f:"EVA_DNA_Sleep.pdf"},{n:"Athletic Performance",f:"EVA_DNA_Athletic.pdf"},{n:"Skin & Ageing",f:"EVA_DNA_Skin.pdf"}].map((r,i)=>(
            <div key={`r${i}`} onClick={()=>toast.show("Downloading "+r.f,"success")} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:t.s1,borderRadius:10,border:`1px solid ${t.b1}`,marginBottom:6,cursor:"pointer" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:8,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke={t.purple} strokeWidth="1.3"/><path d="M5 7h6M5 10h4" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/></svg>
                </div>
                <div style={{ fontSize:14,fontWeight:500,color:t.t1 }}>{r.n}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
        </div>
      )},
      referral: { title:"Refer a Friend", content: (
        <ReferralSection toast={toast} onNavigate={onNavigate}/>
      )},
            shop: { title:"EVA™ Store", content: (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",textAlign:"center" }}>
          <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.purple}08`,border:`2px dashed ${t.purple}25`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M4 8h2l3 12h14l3-10H10" stroke={t.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="24" r="2" fill={t.purple}/><circle cx="22" cy="24" r="2" fill={t.purple}/></svg>
          </div>
          <div style={{ fontSize:22,fontWeight:700,color:t.t1,marginBottom:8 }}>Coming Soon</div>
          <div style={{ fontSize:15,color:t.t2,lineHeight:1.7,maxWidth:260,marginBottom:24 }}>The EVA™ Store will let you re-order supplements, browse longevity products, and manage your subscription directly.</div>
          <div style={{ fontSize:13,color:t.t3 }}>We'll notify you when the store launches.</div>
        </div>
      )},
      about: { title:"About EVA™", content: (
        <div style={{ textAlign:"center",padding:"20px 0",display:"flex",flexDirection:"column",alignItems:"center" }}>
          <VideoCard title="The Clinical Difference" duration="0:40"/>
          <EVAFullLogo width={100} />
          <div style={{ fontSize:15,color:t.t2,marginTop:16,lineHeight:1.7 }}>EVA™ is your gateway to longevity — a clinically guided platform that makes biohacking and longevity science accessible to everyone.</div>
          <div style={{ fontSize:13,color:t.t3,marginTop:16 }}>Version 1.0.0</div>
          <div style={{ fontSize:13,color:t.t3,marginTop:4 }}>by Elite Vita · Dubai, UAE</div>
          <div style={{ display:"flex",gap:14,marginTop:24,marginBottom:16 }}>
            {[{l:"Halal Certified",i:"HC"},{l:"ISO 27001",i:"ISO"},{l:"UAE PDPL",i:"PDPL"}].map((cert,i)=>(
              <div key={i} style={{ flex:1,background:t.s2,borderRadius:10,padding:"15px 8px",textAlign:"center",border:`1px solid ${t.b2}` }}>
                <div style={{ fontSize:13,fontWeight:800,color:t.emerald,letterSpacing:.5 }}>{cert.i}</div>
                <div style={{ fontSize:10,color:t.t3,marginTop:3,fontWeight:500 }}>{cert.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:11,color:t.t4,marginTop:8,lineHeight:1.6 }}>EVA™ is a wellness platform designed to support health optimisation. It is not intended to diagnose, treat, cure, or prevent any disease.</div>
        </div>
      )},
    };
    const sec = sections[activeSection];
    return (
      <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
        <div style={{ padding:`${SAFE_TOP}px 24px 0` }}><TopBar onBack={()=>setActiveSection(null)}/><Title>{sec?.title}</Title></div>
        <div key={activeSection} style={{ flex:1,overflowY:"auto",padding:"0 24px",paddingBottom:20 }}>{sec?.content}</div>
        <TabBar active="profile" onNavigate={id=>{setActiveSection(null);onNavigate(id);}}/>
      </div>
    );
  }

  // Main profile view
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0` }}>
        <div style={{ fontSize:24,fontWeight:700,color:t.t1,letterSpacing:-.3,marginBottom:20 }}>Profile</div>
        <Card style={{ display:"flex",alignItems:"center",gap:18,padding:18 }}>
          <DanielAvatar size={52}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18,fontWeight:700,color:t.t1 }}>Daniel Salewski</div>
            <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>daniel@eva.ae</div>
            <div style={{ fontSize:12,color:t.t3,marginTop:2 }}>Member since Feb 2026</div>
          </div>
        </Card>
      </div>
      <div ref={scrollRef} style={{ flex:1,overflowY:"auto",padding:"0 24px",paddingBottom:8 }}>
        <div style={{ display:"flex",gap:12,margin:"6px 0 18px" }}>
          {/* Profile stat tiles */}
          <div onClick={()=>onNavigate("eva-age")} style={{ flex:1,background:`linear-gradient(135deg, ${t.emerald}12, ${t.emerald}06)`,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1.5px solid ${t.emerald}25`,cursor:"pointer" }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:2 }}><MiniDNA w={50} h={24} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/></div>
            <div style={{ fontSize:22,fontWeight:800,color:t.emerald }}>34</div>
            <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>EVA™ Age</div>
          </div>
          <div onClick={()=>setActiveSection("test-history")} style={{ flex:1,background:t.s1,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1px solid ${t.b1}`,cursor:"pointer" }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:6 }}><svg width="28" height="28" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 1 2.5 5.5 2.5 9a4.5 4.5 0 009 0c0-3.5-4.5-8-4.5-8z" stroke={t.purple} strokeWidth="1.2" fill={`${t.purple}15`}/><circle cx="7" cy="9" r="1.5" fill={t.purple} opacity=".4"/></svg></div>
            <div style={{ fontSize:22,fontWeight:800,color:t.purple }}>2</div>
            <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>Tests</div>
          </div>
          <div style={{ flex:1,background:t.s1,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:6 }}><svg width="28" height="28" viewBox="0 0 14 14" fill="none"><path d="M7 1L5.5 5.5h3L5.5 13l2-5H4l3-7z" fill={`${t.emerald}15`} stroke={t.emerald} strokeWidth="1"/></svg></div>
            <div style={{ fontSize:22,fontWeight:800,color:t.emerald }}>87</div>
            <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>Days Active</div>
          </div>
        </div>

        <Label>Refer & Earn</Label>
        <Card onClick={()=>setActiveSection("referral")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer",background:`${t.purple}04`,border:`1px solid ${t.purple}12` }}>
          {pIcon("send")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Refer a Friend</div><div style={{ fontSize:13,color:t.emerald,marginTop:6,fontWeight:500 }}>Earn 1 free month per referral</div></div>
          <ChevronRight/>
        </Card>

        <Label>Account</Label>
        {[
          { id:"personal",label:"Personal Information",sub:"Name, email, phone",icon:"person" },
          { id:"questionnaire",label:"Health Questionnaire",sub:"Update your health goals",icon:"clipboard" },
          { id:"subscription",label:"Subscription",sub:"Plan, billing & payment history",icon:"bag" },
          { id:"password",label:"Change Password",sub:"Update your account password",icon:"shield" },
        ].map((item)=>(
          <Card key={item.id} onClick={()=>setActiveSection(item.id)} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
            {item.icon&&pIcon(item.icon)}
            <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{item.label}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{item.sub}</div></div>
            <ChevronRight/>
          </Card>
        ))}

        <Label>Privacy & Notifications</Label>
        {[
          { id:"notifications",label:"Notification Preferences",sub:"Push, email, SMS settings",icon:"bell" },
          { id:"consent",label:"Consent & Data",sub:"Data processing, UAE PDPL",icon:"shield" },
        ].map((item)=>(
          <Card key={item.id} onClick={()=>setActiveSection(item.id)} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
            {item.icon&&pIcon(item.icon)}
            <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{item.label}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{item.sub}</div></div>
            <ChevronRight/>
          </Card>
        ))}

        <Label>Connected Devices</Label>
        <Card onClick={()=>setActiveSection("integrations")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          {pIcon("link")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Health Integrations</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Apple Health, Google Fit, Whoop, Oura + 4 more</div></div>
          <ChevronRight/>
        </Card>

        <Label>Support & Data</Label>
        {[
          { id:"clinician",label:"Contact Clinician",sub:"Message Dr. Nival directly",icon:"doctor" },
          { id:"help",label:"Help & FAQ",sub:"Common questions and guides",icon:"question" },
          { id:"test-history",label:"Test History",sub:"Your complete testing timeline",icon:"clipboard" },
          { id:"reports",label:"My Reports",sub:"Blood & DNA report PDFs",icon:"doc" },
          { id:"supplements",label:"My Supplements",sub:"Your supplement stack & product details",icon:"pill" },
        ].map((item)=>(
          <Card key={item.id} onClick={()=>setActiveSection(item.id)} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
            {item.icon&&pIcon(item.icon)}
            <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{item.label}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{item.sub}</div></div>
            <ChevronRight/>
          </Card>
        ))}

        <Label>Appearance</Label>
        <Card style={{ padding:16 }}>
          <div style={{ display:"flex",background:t.s2,borderRadius:10,padding:3 }}>
            {[
              {id:"light",l:"Light",ic:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.8 3.8l1 1M11.2 11.2l1 1M3.8 12.2l1-1M11.2 4.8l1-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,fn:()=>{if(isDark)onToggleTheme()}},
              {id:"dark",l:"Dark",ic:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 8A4 4 0 118 4a3.2 3.2 0 004 4z" stroke="currentColor" strokeWidth="1.3"/></svg>,fn:()=>{if(!isDark)onToggleTheme()}},
              {id:"system",l:"System",ic:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,fn:()=>{const d=window.matchMedia&&window.matchMedia("(prefers-color-scheme:dark)").matches;if(d!==isDark)onToggleTheme();toast.show(d?"Switched to system dark mode":"Switched to system light mode","success")}},
            ].map(opt=>{
              const active = (opt.id==="dark"&&isDark)||(opt.id==="light"&&!isDark);
              return (
              <div key={opt.id} onClick={opt.fn} style={{ flex:1,background:active?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:active?"0 1px 3px rgba(0,0,0,.1)":"none" }}>
                <div style={{ display:"flex",justifyContent:"center",marginBottom:3,color:active?t.t1:t.t3 }}>{opt.ic}</div><div style={{ fontSize:12,fontWeight:active?600:500,color:active?t.t1:t.t3 }}>{opt.l}</div>
              </div>
            );})
            }
          </div>
        </Card>

        <Label>More</Label>
        <Card onClick={()=>setActiveSection("shop")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          {pIcon("bag")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>EVA™ Store</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Supplements & products</div></div>
          <div style={{ fontSize:11,fontWeight:700,color:t.purple,background:`${t.purple}12`,borderRadius:6,padding:"6px 13px",letterSpacing:.5 }}>COMING SOON</div>
        </Card>
        <Card onClick={()=>setActiveSection("about")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          {pIcon("info")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>About EVA™</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Version 1.0 · by Elite Vita</div></div>
          <ChevronRight/>
        </Card>

        <Label>Account Actions</Label>
        <Card onClick={()=>onNavigate("welcome")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 2H4a2 2 0 00-2 2v10a2 2 0 002 2h3M12 13l4-4-4-4M16 9H7" stroke={t.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div style={{ fontSize:15,fontWeight:600,color:t.red }}>Sign Out</div>
        </Card>
        <div onClick={()=>toast.show("To delete your account, please email support@eva.com","warning")} style={{ textAlign:"center",padding:"16px 0 4px",cursor:"pointer" }}>
          <span style={{ fontSize:13,color:t.t4,fontWeight:500 }}>Delete Account</span>
        </div>
        <div style={{ textAlign:"center",padding:"20px 0 12px" }}>
          <div style={{ display:"flex",justifyContent:"center" }}><EVAFullLogo width={70} color={t.t4} /></div>
          <div style={{ fontSize:11,color:t.t4,marginTop:10,letterSpacing:1 }}>Clinically guided longevity</div>
          <div style={{ fontSize:10,color:t.t4,marginTop:4 }}>Version 1.0.0 (Build 92)</div>
        </div>
      </div>
      <TabBar active="profile" onNavigate={id => onNavigate(id)} />
    </div>
  );
};


// ── Safety Gate Alerts ──


export default ProfileScreen;
