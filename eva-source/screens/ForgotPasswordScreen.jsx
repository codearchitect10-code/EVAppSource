import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, EVAFullLogo, Title, TopBar } from "../components";

const ForgotPasswordScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const fEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}><EVAFullLogo width={80} /></div>
      {!sent ? (
        <>
          <Title sub="Enter your email and we'll send you a reset link.">Reset Password</Title>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>EMAIL</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" type="email" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
          </div>
          <div style={{ flexShrink:0,paddingBottom:8 }}><Btn onClick={fEmailValid?()=>setSent(true):undefined} style={{ opacity:fEmailValid?1:.4 }}>Send Reset Link</Btn></div>
        </>
      ) : (
        <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
          <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.emerald}12`,border:`2px solid ${t.emerald}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:24 }}>✉</div>
          <div style={{ fontSize:22,fontWeight:700,color:t.t1,marginBottom:12,textAlign:"center" }}>Check Your Email</div>
          <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,maxWidth:260,marginBottom:32 }}>We've sent a password reset link to <span style={{ color:t.t1,fontWeight:600 }}>{email || "your email"}</span>.</div>
          <Btn variant="secondary" onClick={onBack}>Back to Sign In</Btn>
        </div>
      )}
    </div>
  );
};


export default ForgotPasswordScreen;
