import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { EVAFullLogo, LoadingBtn, Title, TopBar } from "../components";

const OTPVerifyScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [code, setCode] = useState(["","","","","",""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resent, setResent] = useState(false);
  const [method, setMethod] = useState("sms");
  const handleVerify = () => { setLoading(true); setError(null); setTimeout(()=>onNavigate("biometric-prompt"),300); };
  const handleResend = () => { setResent(true); setError(null); setCode(["","","","","",""]); setTimeout(()=>setResent(false),3000); };
  const toggleMethod = () => { setMethod(m=>m==="sms"?"email":"sms"); setCode(["","","","","",""]); setError(null); setResent(false); };
  const updateDigit = (idx, val) => {
    if (val.length > 1) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
  };
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}><EVAFullLogo width={80} /></div>
      <Title sub={method==="sms"?"We've sent a 6-digit code to +971 50 ••• ••••":"We've sent a 6-digit code to d•••••@eva.ae"}>Verify Your Identity</Title>
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center" }}>
        <div style={{ display:"flex",gap:12,marginBottom:28 }}>
          {code.map((d,i)=>(
            <input key={i} value={d} onChange={e=>updateDigit(i,e.target.value)} maxLength={1} inputMode="numeric" style={{ width:44,height:52,textAlign:"center",fontSize:24,fontWeight:700,color:t.t1,background:t.s2,border:`1.5px solid ${d?t.purple:t.b2}`,borderRadius:12,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          ))}
        </div>
        {error&&<div style={{ textAlign:"center",marginBottom:12,fontSize:14,color:t.red,fontWeight:500 }}>{error}</div>}
        <div style={{ textAlign:"center",marginBottom:24 }}>
          {resent?<span style={{ fontSize:14,color:t.emerald,fontWeight:500 }}>New code sent!</span>:<>
          <span style={{ fontSize:14,color:t.t2 }}>Didn't receive a code? </span>
          <span onClick={handleResend} style={{ fontSize:14,color:t.purple,cursor:"pointer",fontWeight:600 }}>Resend</span></>}
        </div>
        <div style={{ width:"100%" }}><LoadingBtn loading={loading} onClick={handleVerify}>Verify</LoadingBtn></div>
      </div>
      <div style={{ textAlign:"center",fontSize:12,color:t.t4,paddingBottom:12 }}>Verification via {method==="sms"?"SMS":"email"}. <span onClick={toggleMethod} style={{ color:t.purple,cursor:"pointer",fontWeight:600 }}>Use {method==="sms"?"email":"SMS"} instead</span></div>
    </div>
  );
};


export default OTPVerifyScreen;
