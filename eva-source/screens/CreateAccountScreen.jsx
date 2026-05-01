import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { AppleIcon, CheckIcon, ChevronRight, EyeIcon, GoogleIcon, InfoModal, LoadingBtn, Title, TopBar } from "../components";

const CreateAccountScreen = ({ onNavigate, onBack, gender, setGender }) => {
  const t = useTheme();
  const [pdplOpen, setPdplOpen] = useState(false);
  const [form, setForm] = useState({name:"",email:"",phone:"",pass:""});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCreate = () => { setLoading(true); setTimeout(()=>onNavigate("email-verify"),400); };
  const [countryCode, setCountryCode] = useState("+971");
  const [codeOpen, setCodeOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const selGender = gender || "male";
  const u = (k,v) => setForm({...form,[k]:v});
  const codes = [
    {c:"+971",f:"🇦🇪",n:"UAE",ph:"50 XXX XXXX",top:true},
    {c:"+966",f:"🇸🇦",n:"KSA",ph:"5X XXX XXXX",top:true},
    {c:"+44",f:"🇬🇧",n:"GBR",ph:"7XXX XXXXXX",top:true},
    {c:"+1",f:"🇺🇸",n:"USA",ph:"(XXX) XXX-XXXX",top:true},
    {c:"+91",f:"🇮🇳",n:"IND",ph:"XXXXX XXXXX",top:true},
    {c:"---"},
    {c:"+93",f:"🇦🇫",n:"AFG",ph:"XX XXX XXXX"},
    {c:"+355",f:"🇦🇱",n:"ALB",ph:"XX XXX XXXX"},
    {c:"+213",f:"🇩🇿",n:"DZA",ph:"XXX XX XX XX"},
    {c:"+54",f:"🇦🇷",n:"ARG",ph:"XX XXXX XXXX"},
    {c:"+61",f:"🇦🇺",n:"AUS",ph:"4XX XXX XXX"},
    {c:"+43",f:"🇦🇹",n:"AUT",ph:"XXX XXXXXXX"},
    {c:"+973",f:"🇧🇭",n:"BHR",ph:"XXXX XXXX"},
    {c:"+880",f:"🇧🇩",n:"BGD",ph:"XXXX XXXXXX"},
    {c:"+32",f:"🇧🇪",n:"BEL",ph:"XXX XX XX XX"},
    {c:"+55",f:"🇧🇷",n:"BRA",ph:"XX XXXXX XXXX"},
    {c:"+1",f:"🇨🇦",n:"CAN",ph:"(XXX) XXX-XXXX"},
    {c:"+86",f:"🇨🇳",n:"CHN",ph:"XXX XXXX XXXX"},
    {c:"+57",f:"🇨🇴",n:"COL",ph:"XXX XXX XXXX"},
    {c:"+45",f:"🇩🇰",n:"DNK",ph:"XX XX XX XX"},
    {c:"+20",f:"🇪🇬",n:"EGY",ph:"XX XXXX XXXX"},
    {c:"+358",f:"🇫🇮",n:"FIN",ph:"XX XXX XXXX"},
    {c:"+33",f:"🇫🇷",n:"FRA",ph:"6 XX XX XX XX"},
    {c:"+49",f:"🇩🇪",n:"DEU",ph:"1XX XXXXXXXX"},
    {c:"+233",f:"🇬🇭",n:"GHA",ph:"XX XXX XXXX"},
    {c:"+30",f:"🇬🇷",n:"GRC",ph:"XXX XXX XXXX"},
    {c:"+852",f:"🇭🇰",n:"HKG",ph:"XXXX XXXX"},
    {c:"+36",f:"🇭🇺",n:"HUN",ph:"XX XXX XXXX"},
    {c:"+62",f:"🇮🇩",n:"IDN",ph:"XXX XXXX XXXX"},
    {c:"+353",f:"🇮🇪",n:"IRL",ph:"XX XXX XXXX"},
    {c:"+972",f:"🇮🇱",n:"ISR",ph:"XX XXX XXXX"},
    {c:"+39",f:"🇮🇹",n:"ITA",ph:"XXX XXX XXXX"},
    {c:"+81",f:"🇯🇵",n:"JPN",ph:"XX XXXX XXXX"},
    {c:"+962",f:"🇯🇴",n:"JOR",ph:"X XXXX XXXX"},
    {c:"+254",f:"🇰🇪",n:"KEN",ph:"XXX XXXXXX"},
    {c:"+82",f:"🇰🇷",n:"KOR",ph:"XX XXXX XXXX"},
    {c:"+965",f:"🇰🇼",n:"KWT",ph:"XXXX XXXX"},
    {c:"+961",f:"🇱🇧",n:"LBN",ph:"XX XXX XXX"},
    {c:"+60",f:"🇲🇾",n:"MYS",ph:"XX XXXX XXXX"},
    {c:"+52",f:"🇲🇽",n:"MEX",ph:"XX XXXX XXXX"},
    {c:"+212",f:"🇲🇦",n:"MAR",ph:"XX XXX XXXX"},
    {c:"+31",f:"🇳🇱",n:"NLD",ph:"6 XXXXXXXX"},
    {c:"+64",f:"🇳🇿",n:"NZL",ph:"XX XXX XXXX"},
    {c:"+234",f:"🇳🇬",n:"NGA",ph:"XXX XXX XXXX"},
    {c:"+47",f:"🇳🇴",n:"NOR",ph:"XXX XX XXX"},
    {c:"+968",f:"🇴🇲",n:"OMN",ph:"XXXX XXXX"},
    {c:"+92",f:"🇵🇰",n:"PAK",ph:"XXX XXXXXXX"},
    {c:"+63",f:"🇵🇭",n:"PHL",ph:"XXX XXX XXXX"},
    {c:"+48",f:"🇵🇱",n:"POL",ph:"XXX XXX XXX"},
    {c:"+351",f:"🇵🇹",n:"PRT",ph:"XXX XXX XXX"},
    {c:"+974",f:"🇶🇦",n:"QAT",ph:"XXXX XXXX"},
    {c:"+40",f:"🇷🇴",n:"ROU",ph:"XXX XXX XXX"},
    {c:"+7",f:"🇷🇺",n:"RUS",ph:"XXX XXX XX XX"},
    {c:"+65",f:"🇸🇬",n:"SGP",ph:"XXXX XXXX"},
    {c:"+27",f:"🇿🇦",n:"ZAF",ph:"XX XXX XXXX"},
    {c:"+34",f:"🇪🇸",n:"ESP",ph:"XXX XXX XXX"},
    {c:"+94",f:"🇱🇰",n:"LKA",ph:"XX XXX XXXX"},
    {c:"+46",f:"🇸🇪",n:"SWE",ph:"XX XXX XXXX"},
    {c:"+41",f:"🇨🇭",n:"CHE",ph:"XX XXX XX XX"},
    {c:"+886",f:"🇹🇼",n:"TWN",ph:"XXX XXX XXX"},
    {c:"+66",f:"🇹🇭",n:"THA",ph:"XX XXX XXXX"},
    {c:"+90",f:"🇹🇷",n:"TUR",ph:"XXX XXX XXXX"},
    {c:"+256",f:"🇺🇬",n:"UGA",ph:"XXX XXXXXX"},
    {c:"+380",f:"🇺🇦",n:"UKR",ph:"XX XXX XXXX"},
    {c:"+84",f:"🇻🇳",n:"VNM",ph:"XX XXX XXXX"},
  ];
  const selCode = codes.find(x=>x.c===countryCode)||codes[0];
  const passRules = [
    {l:"8+ characters",ok:form.pass.length>=8},
    {l:"One uppercase",ok:/[A-Z]/.test(form.pass)},
    {l:"One number",ok:/[0-9]/.test(form.pass)},
    {l:"One special character",ok:/[^A-Za-z0-9]/.test(form.pass)},
  ];
  const nameValid = form.name.trim().split(/\s+/).filter(w=>w.length>=2).length>=2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const phoneDigits = form.phone.replace(/\D/g,"");
  const phoneValid = phoneDigits.length>=7 && phoneDigits.length<=15;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Your data. Your biology. Always secure.">Create Your Account</Title>
      <div style={{ flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch",minHeight:0 }}>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke={t.t3} strokeWidth="1.5"/><path d="M2 14c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg>FULL NAME</div>
          <input value={form.name} onChange={e=>u("name",e.target.value)} placeholder="Enter your full name" type="text" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${form.name.length>0?(nameValid?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          {form.name.length>0&&!nameValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter first and last name</div>}
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke={t.t3} strokeWidth="1.5"/><path d="M2 4l6 5 6-5" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/></svg>EMAIL</div>
          <input value={form.email} onChange={e=>u("email",e.target.value)} placeholder="you@example.com" type="email" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${form.email.length>0?(emailValid?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          {form.email.length>0&&!emailValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter a valid email address</div>}
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="4" y="1" width="8" height="14" rx="2" stroke={t.t3} strokeWidth="1.5"/><path d="M7 12h2" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/></svg>PHONE</div>
          <div style={{ position:"relative",width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,border:`1px solid ${form.phone.length>0?(phoneValid?t.emerald:`${t.gold}80`):t.b2}`,display:"flex",alignItems:"center",transition:"border .2s" }}>
            <div onClick={()=>setCodeOpen(!codeOpen)} style={{ display:"flex",alignItems:"center",gap:6,padding:"14px 0 14px 14px",cursor:"pointer",flexShrink:0,borderRight:`1px solid ${t.b2}`,paddingRight:10,marginRight:2 }}>
              <span style={{ fontSize:16 }}>{selCode.f}</span><span style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{countryCode}</span><ChevronRight size={9}/>
            </div>
            <input value={form.phone} onChange={e=>u("phone",e.target.value)} placeholder={selCode.ph} type="tel" style={{ flex:1,minWidth:0,boxSizing:"border-box",background:"transparent",border:"none",padding:"17px 19px 17px 13px",fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
            {codeOpen&&<><div onClick={()=>setCodeOpen(false)} style={{ position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9 }}/><div style={{ position:"absolute",top:"100%",left:0,marginTop:6,background:t.s1,border:`1px solid ${t.b2}`,borderRadius:12,overflow:"hidden",zIndex:10,maxHeight:240,overflowY:"auto",boxShadow:"0 8px 24px rgba(0,0,0,.2)",width:"100%" }}>
              {codes.map((cc,ci)=>(
                <div key={ci} onClick={e=>{e.stopPropagation();setCountryCode(cc.c);setCodeOpen(false)}} style={{ padding:"13px 17px",display:"flex",alignItems:"center",gap:12,fontSize:14,color:t.t1,borderBottom:`1px solid ${t.b1}`,background:countryCode===cc.c?`${t.purple}08`:"transparent",cursor:"pointer" }}>
                  <span style={{ fontSize:17 }}>{cc.f}</span><span style={{ fontWeight:600,minWidth:32 }}>{cc.n}</span><span style={{ color:t.t3,flex:1 }}>{cc.c}</span>{countryCode===cc.c&&<CheckIcon size={12} color={t.purple}/>}
                </div>
              ))}
            </div></>}
          </div>
          {form.phone.length>0&&!phoneValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter a valid phone number</div>}
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>BIOLOGICAL SEX</div>
          <div style={{ display:"flex",gap:10 }}>
            {["Male","Female"].map(g=>(
              <div key={g} onClick={()=>setGender(g.toLowerCase())} style={{ flex:1,background:selGender===g.toLowerCase()?`${t.purple}12`:t.s2,border:`1.5px solid ${selGender===g.toLowerCase()?t.purple:t.b2}`,borderRadius:12,padding:"14px 0",textAlign:"center",fontSize:15,fontWeight:600,color:selGender===g.toLowerCase()?t.purple:t.t1,cursor:"pointer",transition:"all .2s" }}>{g}</div>
            ))}
          </div>
          <div style={{ fontSize:12,color:t.t3,marginTop:6 }}>Required for accurate biomarker analysis and protocol design.</div>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke={t.t3} strokeWidth="1.5"/><path d="M5 7V5a3 3 0 016 0v2" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg>PASSWORD</div>
          <div style={{ position:"relative" }}>
            <input value={form.pass} onChange={e=>u("pass",e.target.value)} placeholder="Create a password" type={showPass?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${form.pass.length>0?(passRules.every(r=>r.ok)?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
            <div onClick={()=>setShowPass(!showPass)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showPass}/></div>
          </div>
          {form.pass.length>0&&<div style={{ display:"flex",flexWrap:"wrap",gap:10,marginTop:10 }}>
            {passRules.map((r,ri)=>(
              <div key={ri} style={{ display:"flex",alignItems:"center",gap:6 }}>
                <div style={{ width:14,height:14,borderRadius:"50%",background:r.ok?t.emerald:`${t.t3}30`,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }}>{r.ok&&<CheckIcon size={8} color="#FFF"/>}</div>
                <span style={{ fontSize:12,color:r.ok?t.emerald:t.t3,fontWeight:500,transition:"color .2s" }}>{r.l}</span>
              </div>
            ))}
          </div>}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:14,margin:"10px 0 12px" }}>
          <div style={{ flex:1,height:1,background:t.b2 }}/><span style={{ fontSize:13,color:t.t3,fontWeight:500 }}>or sign up with</span><div style={{ flex:1,height:1,background:t.b2 }}/>
        </div>
        <div onClick={()=>onNavigate("email-verify")} style={{ background:"#000",border:"1px solid #000",borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer",marginBottom:8 }}>
          <AppleIcon size={24} color="#FFF"/><span style={{ fontSize:15,fontWeight:600,color:"#FFF" }}>Sign up with Apple</span>
        </div>
        <div onClick={()=>onNavigate("email-verify")} style={{ background:t.s2,border:`1px solid ${t.b2}`,borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer" }}>
          <GoogleIcon size={18}/><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Sign up with Google</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12,margin:"14px 0 12px" }}>
          <div onClick={()=>setConsent(!consent)} style={{ width:20,height:20,borderRadius:5,background:consent?t.purple:`${t.purple}15`,border:`1.5px solid ${consent?t.purple:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",cursor:"pointer",flexShrink:0 }}>{consent&&<CheckIcon size={10} color="#FFF"/>}</div>
          <span style={{ fontSize:13,color:t.t2 }}>I consent to data processing per <span onClick={(e)=>{e.stopPropagation();setPdplOpen(true)}} style={{ color:t.purple,textDecoration:"underline",cursor:"pointer",fontWeight:600 }}>UAE PDPL</span></span>
        </div>
        {pdplOpen&&<InfoModal title="UAE Personal Data Protection Law (PDPL)" text="EVA™ processes your personal health data in compliance with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL). This includes: explicit consent before collecting any data, data minimisation (we only collect what’s needed), encryption at rest and in transit, UAE-based data residency (your health data stays on UAE servers), and your right to access, rectify, or erase your data at any time. Your biological data (DNA, blood biomarkers) is processed solely for providing personalised health recommendations and is never sold to third parties." onClose={()=>setPdplOpen(false)}/>}
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        <LoadingBtn loading={loading} onClick={nameValid&&emailValid&&phoneValid&&passRules.every(r=>r.ok)&&consent?handleCreate:undefined} style={{ opacity:nameValid&&emailValid&&phoneValid&&passRules.every(r=>r.ok)&&consent?1:.4 }}>Create Account</LoadingBtn>
      </div>
    </div>
  );
};


export default CreateAccountScreen;
