import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, Card, CheckIcon, EVAFullLogo, Label, Title, TopBar } from "../components";
import { supplements } from "../data/supplements";

const BookTestScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [loc, setLoc] = useState("home");
  const [pkg, setPkg] = useState("elite");
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(0);
  const [step, setStep] = useState("form"); // form | payment | processing | confirmed
  const [cardForm, setCardForm] = useState({number:"",expiry:"",cvc:"",name:""});
  const uc = (k,v) => setCardForm({...cardForm,[k]:v});
  const [addrCountry, setAddrCountry] = useState("United Arab Emirates");
  const [addrCity, setAddrCity] = useState("");
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [idType, setIdType] = useState("eid");
  const [eidVal, setEidVal] = useState("");
  const [passportVal, setPassportVal] = useState("");
  const [idUpload, setIdUpload] = useState("none"); // none | picking | loading | done
  const formatEid = (v) => { const d = v.replace(/\D/g,"").slice(0,15); let r = ""; if(d.length>0) r=d.slice(0,3); if(d.length>3) r+="-"+d.slice(3,7); if(d.length>7) r+="-"+d.slice(7,14); if(d.length>14) r+="-"+d.slice(14,15); return r; };
  const areaMap = {"United Arab Emirates":["Dubai","Abu Dhabi","Sharjah","Ajman","Ras Al Khaimah","Fujairah","Umm Al Quwain"],"Saudi Arabia":["Riyadh","Jeddah","Dammam","Mecca","Medina","Khobar"],"Bahrain":["Manama","Muharraq","Riffa"],"Kuwait":["Kuwait City","Hawalli","Salmiya"],"Oman":["Muscat","Salalah","Sohar"],"Qatar":["Doha","Al Wakrah","Al Khor"]};
  const idValid = idType==="eid" ? eidVal.length===18 : passportVal.length>=5;
  const addrValid = addrLine1.trim()&&addrLine2.trim()&&addrCity;
  const bookingValid = addrValid && idValid && day>=0 && time>=0;

  // Processing screen
  if (step==="processing") return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px` }}>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:32 }}><EVAFullLogo width={80}/></div>
      <div style={{ width:64,height:64,borderRadius:"50%",border:`3px solid ${t.s2}`,borderTopColor:t.purple,animation:"spin 1s linear infinite",marginBottom:28 }}/>
      <div style={{ fontSize:20,fontWeight:700,color:t.t1,marginBottom:8 }}>Processing Payment</div>
      <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.6 }}>Securely processing via Stripe. Do not close the app.</div>
    </div>
  );

  // Payment screen
  if (step==="payment") return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={()=>setStep("form")}/>
      <Title sub="All transactions are encrypted and processed securely.">Payment Details</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card style={{ background:`${t.purple}06`,border:`1px solid ${t.purple}15`,marginBottom:20 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{pkg==="bloodintel"?"Blood Intelligence":pkg==="core"?"Elite Core":pkg==="elite"?"Elite":"Blood Intelligence"}</span>
            <span style={{ fontSize:18,fontWeight:700,color:t.t1 }}>{pkg==="bloodintel"?"USD 399":pkg==="blood"?"USD 399":pkg==="elite"?"USD 2,699":"USD 1,999"}</span>
          </div>
        </Card>
        <div onClick={()=>{setStep("processing");setTimeout(()=>setStep("confirmed"),1500)}} style={{ background:"#000",border:"1px solid #000",borderRadius:12,padding:"16px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",marginBottom:10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          <span style={{ fontSize:16,fontWeight:600,color:"#FFF" }}>Apple Pay</span>
        </div>
        <div onClick={()=>{setStep("processing");setTimeout(()=>setStep("confirmed"),1500)}} style={{ background:"#FFF",border:"1px solid #dadce0",borderRadius:12,padding:"16px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",marginBottom:16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span style={{ fontSize:16,fontWeight:600,color:"#3c4043" }}>Google Pay</span>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:16 }}>
          <input placeholder="Promo code" style={{ flex:1,boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"14px 17px",border:`1px solid ${t.b2}`,fontSize:14,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
          <div style={{ background:`${t.purple}12`,border:`1px solid ${t.purple}25`,borderRadius:10,padding:"14px 19px",fontSize:14,fontWeight:600,color:t.purple,cursor:"pointer" }}>Apply</div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:16 }}>
          <div style={{ flex:1,height:1,background:t.b2 }}/><span style={{ fontSize:13,color:t.t3,fontWeight:500 }}>or pay with card</span><div style={{ flex:1,height:1,background:t.b2 }}/>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CARD NUMBER</div>
          <div style={{ position:"relative" }}>
            <input value={cardForm.number} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(\d{4})/g,"$1 ").trim();uc("number",v)}} placeholder="1234 5678 9012 3456" inputMode="numeric" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 54px 17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1 }}/>
            <div style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",display:"flex",gap:6 }}>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><rect width="24" height="16" rx="2" fill="#1A1F71"/><circle cx="9" cy="8" r="5" fill="#EB001B" opacity=".8"/><circle cx="15" cy="8" r="5" fill="#F79E1B" opacity=".8"/></svg>
            </div>
          </div>
        </div>
        <div style={{ display:"flex",gap:14,marginBottom:16 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>EXPIRY</div>
            <input value={cardForm.expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);if(v.length>=3)v=v.slice(0,2)+"/"+v.slice(2);uc("expiry",v)}} placeholder="MM/YY" inputMode="numeric" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1 }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CVC</div>
            <input value={cardForm.cvc} onChange={e=>uc("cvc",e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" inputMode="numeric" type="password" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:2 }}/>
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CARDHOLDER NAME</div>
          <input value={cardForm.name} onChange={e=>uc("name",e.target.value)} placeholder="Name on card" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
        </div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"16px 0 8px",borderTop:`1px solid ${t.b1}`,marginTop:8 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="10" rx="2" stroke={t.t3} strokeWidth="1.3"/><path d="M5 4V3a3 3 0 016 0v1" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="9.5" r="1.5" fill={t.t3}/></svg>
          <span style={{ fontSize:12,color:t.t4 }}>Powered by</span>
          <span style={{ fontSize:14,fontWeight:700,color:t.t3,letterSpacing:.5 }}>stripe</span>
          <span style={{ fontSize:12,color:t.t4 }}>· 256-bit SSL · PCI DSS</span>
        </div>
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        <div style={{ fontSize:12,color:t.t3,textAlign:"center",marginBottom:12,lineHeight:1.6 }}>By proceeding, you agree to our <span style={{color:t.purple,cursor:"pointer",textDecoration:"underline"}} onClick={(e)=>{e.stopPropagation();toast.show("Full refund within 14 days of purchase if tests not yet completed. Contact support@eva.com","info")}}>refund policy</span></div><Btn onClick={()=>{setStep("processing");setTimeout(()=>setStep("confirmed"),1500)}}>{pkg==="bloodintel"?"Pay USD 399":pkg==="blood"?"Pay USD 399":pkg==="elite"?"Pay USD 2,699":"Pay USD 1,999"}</Btn>
      </div>
    </div>
  );

  if (step==="confirmed") return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px` }}>
      <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.emerald}12`,border:`2px solid ${t.emerald}30`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24 }}><CheckIcon size={32} color={t.emerald}/></div>
      <div style={{ fontSize:24,fontWeight:700,color:t.t1,marginBottom:12,textAlign:"center" }}>Booking Confirmed</div>
      <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,maxWidth:280,marginBottom:32 }}>Your appointment is confirmed. We'll send a confirmation to your email.</div>
      <Card style={{ width:"100%",marginBottom:16 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}><span style={{ fontSize:13,color:t.t3 }}>Time</span><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>10:00 AM</span></div>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}><span style={{ fontSize:13,color:t.t3 }}>Date</span><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{day>0?day:"6"} {["March","April","May","June","July","August","September","October","November","December"][month]} 2026</span></div>
        <div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ fontSize:13,color:t.t3 }}>Location</span><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{"Home Visit"}</span></div>
      </Card>
      <Btn onClick={()=>{const d=new Date();d.setDate(d.getDate()+7);const ds=d.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";const de=new Date(d.getTime()+3600000).toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=EVA+Biology+Test&dates="+ds+"/"+de+"&location=Dubai+Healthcare+City&details=EVA+biology+test+appointment","_blank")}} variant="secondary" style={{ width:"100%",marginBottom:10 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke={t.purple} strokeWidth="1.3"/><path d="M5 1v3M11 1v3M2 7h12" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span>Add to Calendar</span>
        </div>
      </Btn>
      <Btn onClick={()=>onNavigate("fanfare")} style={{ width:"100%" }}>Continue →</Btn>
    </div>
  );
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub={"One appointment. DNA and 70+ blood biomarkers analysed."}>Book Your Biology Test</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
                <Label>Package <span style={{color:t.red,fontSize:11}}>*</span></Label>
        {/* Tier toggle */}
        <div style={{ display:"flex",gap:6,marginBottom:14,background:t.s2,borderRadius:10,padding:3 }}>
          <div style={{ fontSize:13,fontWeight:600,color:t.t1 }}>Select Package</div>
        </div>
        <div style={{ marginTop:14,marginBottom:20 }}>
            {[{id:"elite",n:"Elite",p:"USD 2,699",s:"DNA + Blood (quarterly)",tag:"RECOMMENDED",feat:["DNA analysis + 70+ biomarker blood panel","Quarterly blood monitoring (4x/year)","Clinician review + personalised protocol","DEVA™ daily insights"]},{id:"core",n:"Elite Core",p:"USD 1,999",s:"DNA + Blood (6-monthly)",tag:null,feat:["DNA analysis + 70+ biomarker blood panel","6-monthly blood monitoring (2x/year)","Clinician review + personalised protocol","DEVA™ daily insights"]},{id:"blood",n:"Blood Intelligence",p:"USD 399",s:"70+ biomarkers, no DNA",tag:null,feat:["70+ biomarker blood panel","Clinician review + personalised protocol","DEVA™ daily insights","No DNA analysis"]}].map(p=>(
              <div key={p.id} onClick={()=>setPkg(p.id)} style={{ background:pkg===p.id?`${t.purple}08`:t.s1,border:`1.5px solid ${pkg===p.id?t.purple:t.b1}`,borderRadius:14,padding:"14px 16px",cursor:"pointer",transition:"all .2s",position:"relative",marginBottom:8 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${pkg===p.id?t.purple:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center" }}>{pkg===p.id&&<div style={{ width:10,height:10,borderRadius:"50%",background:t.purple }}/>}</div>
                    <div><div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{p.n}</div><div style={{ fontSize:12,color:t.t3 }}>{p.s}</div></div>
                  </div>
                  <div style={{ textAlign:"right" }}><div style={{ fontSize:16,fontWeight:800,color:t.purple }}>{p.p}</div>{p.tag&&<div style={{ fontSize:9,fontWeight:700,color:t.purple,background:`${t.purple}12`,padding:"2px 8px",borderRadius:4,marginTop:2 }}>{p.tag}</div>}</div>
                </div>
                {pkg===p.id&&<div style={{ marginTop:10,paddingTop:10,borderTop:`1px solid ${t.b1}` }}>{p.feat.map((f,fi)=><div key={fi} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:t.t2 }}><CheckIcon size={10} color={t.emerald}/>{f}</div>)}</div>}
              </div>
            ))}
          </div>


        <Label>Location</Label>
        <div style={{ background:`${t.purple}12`,border:`1.5px solid ${t.purple}`,borderRadius:14,padding:"17px 15px",textAlign:"center",marginBottom:20 }}>
          <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Home Visit</div>
          <div style={{ fontSize:12,color:t.t3,marginTop:3 }}>We come to you</div>
        </div>
        <div style={{marginBottom:20}}>
          <Label>Home Visit Address <span style={{color:t.red,fontSize:11}}>*</span></Label>
          <input value={addrLine1} onChange={e=>setAddrLine1(e.target.value)} placeholder="Building / Villa name or number *" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:8}}/>
          <input value={addrLine2} onChange={e=>setAddrLine2(e.target.value)} placeholder="Street / Area *" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:8}}/>
          <input placeholder="District / Neighbourhood" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:8}}/>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <select value={addrCountry} onChange={e=>{setAddrCountry(e.target.value);setAddrCity("")}} style={{flex:1,boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
              {Object.keys(areaMap).map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <select value={addrCity} onChange={e=>setAddrCity(e.target.value)} style={{flex:1,boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:addrCity?t.t1:t.t3,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
              <option value="">{({"United Arab Emirates":"Emirate","Saudi Arabia":"Region","Bahrain":"Governorate","Kuwait":"Governorate","Oman":"Governorate","Qatar":"Municipality"})[addrCountry]||"Area"} *</option>
              {(areaMap[addrCountry]||[]).map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,padding:"12px 14px",background:t.s1,borderRadius:12,border:`1px solid ${t.b1}`}}>
            <div><div style={{fontSize:14,fontWeight:600,color:t.t1}}>Deliver supplements to this address?</div><div style={{fontSize:12,color:t.t3,marginTop:2}}>If no, you can set a different delivery address in Profile Settings.</div></div>
            <div style={{width:44,height:26,borderRadius:13,background:t.purple,padding:2,cursor:"pointer",flexShrink:0,marginLeft:12}}><div style={{width:22,height:22,borderRadius:"50%",background:"#FFF",transform:"translateX(18px)",transition:"transform .2s"}}/></div>
          </div>
        </div>
        <div style={{marginBottom:20}}>
          <Label>Identity Document <span style={{color:t.red,fontSize:11}}>*</span></Label>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {[{id:"eid",l:"Emirates ID"},{id:"passport",l:"Passport"}].map(t2=>(
              <div key={t2.id} onClick={()=>setIdType(t2.id)} style={{flex:1,background:idType===t2.id?`${t.purple}12`:t.s2,border:`1.5px solid ${idType===t2.id?t.purple:t.b2}`,borderRadius:10,padding:"11px 0",textAlign:"center",fontSize:14,fontWeight:600,color:idType===t2.id?t.purple:t.t1,cursor:"pointer",transition:"all .2s"}}>{t2.l}</div>
            ))}
          </div>
          {idType==="eid"?<>
            <div style={{fontSize:12,color:t.t3,marginBottom:8,fontWeight:600,letterSpacing:.5}}>EMIRATES ID NUMBER</div>
            <input value={eidVal} onChange={e=>setEidVal(formatEid(e.target.value))} placeholder="784-XXXX-XXXXXXX-X" inputMode="numeric" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${eidVal.length===18?t.emerald:t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1,transition:"border .2s"}}/>
            {eidVal.length>0&&eidVal.length<18&&<div style={{fontSize:12,color:t.gold,marginTop:6,fontWeight:500}}>Format: 784-XXXX-XXXXXXX-X (15 digits)</div>}
            {eidVal.length===18&&<div style={{fontSize:12,color:t.emerald,marginTop:6,fontWeight:500}}>Valid format</div>}
          </>:<>
            <div style={{fontSize:12,color:t.t3,marginBottom:8,fontWeight:600,letterSpacing:.5}}>PASSPORT NUMBER</div>
            <input value={passportVal} onChange={e=>setPassportVal(e.target.value.toUpperCase().slice(0,12))} placeholder="e.g. AB1234567" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1}}/>
          </>}

          <div style={{marginTop:12}}>
            <div style={{fontSize:12,color:t.t3,marginBottom:8,fontWeight:600,letterSpacing:.5}}>UPLOAD {idType==="eid"?"EMIRATES ID":"PASSPORT"} IMAGE</div>
            {idUpload==="done"?
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:`${t.emerald}06`,borderRadius:12,border:`1.5px solid ${t.emerald}25`}}>
                <div style={{width:44,height:44,borderRadius:8,background:`${t.purple}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke={t.purple} strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="2" stroke={t.purple} strokeWidth="1.3"/><path d="M3 16l5-5 4 4 3-3 6 6" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600,color:t.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{idType==="eid"?"emirates_id_front.jpg":"passport_scan.jpg"}</div>
                  <div style={{fontSize:12,color:t.emerald,fontWeight:500}}>Uploaded successfully</div>
                </div>
                <div onClick={()=>setIdUpload("none")} style={{fontSize:12,color:t.red,cursor:"pointer",fontWeight:600,flexShrink:0}}>Remove</div>
              </div>
            :idUpload==="loading"?
              <div style={{border:`2px dashed ${t.purple}`,borderRadius:12,padding:"20px 16px",textAlign:"center",background:`${t.purple}04`}}>
                <div style={{width:28,height:28,borderRadius:"50%",border:`2.5px solid ${t.s2}`,borderTopColor:t.purple,animation:"spin 1s linear infinite",margin:"0 auto 8px"}}/>
                <div style={{fontSize:13,color:t.purple,fontWeight:500}}>Processing image...</div>
              </div>
            :idUpload==="picking"?
              <div style={{borderRadius:14,overflow:"hidden",border:`1px solid ${t.b2}`,background:t.s1}}>
                {[{l:"Take Photo",ic:"M12 15.2V3m0 0L8 7m4-4l4 4",sub:"Open camera"},{l:"Photo Library",ic:"M3 3h18v18H3zM3 16l5-5 4 4 3-3 6 6M8.5 8.5a2 2 0 110 .01",sub:"Choose existing"},{l:"Browse Files",ic:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",sub:"PDF, JPG, PNG"}].map((opt,oi)=>(
                  <div key={oi} onClick={()=>{setIdUpload("loading");setTimeout(()=>setIdUpload("done"),1200)}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer",borderBottom:oi<2?`1px solid ${t.b1}`:"none"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={opt.ic} stroke={t.purple} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div><div style={{fontSize:15,fontWeight:600,color:t.t1}}>{opt.l}</div><div style={{fontSize:12,color:t.t3}}>{opt.sub}</div></div>
                  </div>
                ))}
                <div onClick={()=>setIdUpload("none")} style={{padding:"12px 16px",textAlign:"center",borderTop:`1px solid ${t.b1}`,cursor:"pointer"}}>
                  <span style={{fontSize:14,fontWeight:600,color:t.t3}}>Cancel</span>
                </div>
              </div>
            :
              <div onClick={()=>setIdUpload("picking")} style={{border:`2px dashed ${t.b2}`,borderRadius:12,padding:"16px",textAlign:"center",cursor:"pointer",background:t.s1,transition:"all .2s"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={t.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{fontSize:14,fontWeight:600,color:t.purple}}>Tap to upload</span>
                  <span style={{fontSize:12,color:t.t3}}>JPG / PNG</span>
                </div>
              </div>
            }
          </div>
          <div style={{fontSize:12,color:t.t3,marginTop:8}}>Required for blood test registration at the laboratory.</div>
        </div>
        <Label>Month <span style={{color:t.red,fontSize:11}}>*</span></Label>
        <div style={{ display:"flex",gap:0,overflowX:"auto",marginBottom:20,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none" }}>
          {["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i)=>(
            <div key={i} onClick={()=>{setMonth(i);setDay(-1)}} style={{ flexShrink:0,padding:"10px 19px",borderRadius:20,background:month===i?t.purple:"transparent",fontSize:14,fontWeight:month===i?700:500,color:month===i?"#FFF":t.t3,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap" }}>{m} {"2026"}</div>
          ))}
        </div>
        <Label>Day <span style={{color:t.red,fontSize:11}}>*</span></Label>
        <div style={{ display:"flex",gap:8,overflowX:"auto",marginBottom:20,paddingBottom:4,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none" }}>
          {(()=>{
            const dim=[31,28,31,30,31,30,31,31,30,31,30,31][month];
            const dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const yr=2025;
            return Array.from({length:dim},(_,i)=>{
              const d=i+1;
              const dt=new Date(yr,month,d);
              const wd=dt.getDay();
              const isWE=wd===0||wd===6;
              const past=month<1||(month===1&&d<3);
              const avail=!isWE&&!past;
              return <div key={d} onClick={avail?()=>setDay(d):undefined} style={{ flexShrink:0,width:44,textAlign:"center",padding:"8px 0",borderRadius:12,background:day===d?t.purple:avail?"transparent":"transparent",border:day===d?`1.5px solid ${t.purple}`:"1.5px solid transparent",cursor:avail?"pointer":"default",opacity:avail?1:.3,transition:"all .15s" }}>
                <div style={{ fontSize:11,color:day===d?"#FFF":t.t3,fontWeight:500,marginBottom:3 }}>{dayNames[wd]}</div>
                <div style={{ fontSize:18,fontWeight:day===d?700:600,color:day===d?"#FFF":t.t1 }}>{d}</div>
              </div>;
            });
          })()}
        </div>
        <Label>Time <span style={{color:t.red,fontSize:11}}>*</span></Label>
        <div style={{ display:"flex",gap:8,overflowX:"auto",marginBottom:20,paddingBottom:4,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none" }}>
          {["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30"].map((tm,i)=>(
            <div key={i} onClick={()=>setTime(i)} style={{ flexShrink:0,padding:"10px 17px",borderRadius:10,background:time===i?`${t.purple}15`:"transparent",border:`1.5px solid ${time===i?t.purple:t.b2}`,fontSize:14,fontWeight:time===i?600:500,color:time===i?t.purple:t.t1,cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap" }}>{tm}{i<8?" AM":" PM"}</div>
          ))}
        </div>
      </div>
      <div style={{ flexShrink:0,paddingTop:12,paddingBottom:8 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"0 4px" }}>
          <span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{pkg==="bloodintel"?"Blood Intelligence":pkg==="core"?"Elite Core":pkg==="elite"?"Elite":"Blood Intelligence"}</span>
          <span style={{ fontSize:17,fontWeight:700,color:t.purple }}>{pkg==="bloodintel"?"USD 399":pkg==="blood"?"USD 399":pkg==="elite"?"USD 2,699":"USD 1,999"}</span>
        </div>
        <Btn onClick={bookingValid?()=>setStep("payment"):undefined} style={{opacity:bookingValid?1:.4}}>Proceed to Payment</Btn>
      </div>
    </div>
  );
};


export default BookTestScreen;
