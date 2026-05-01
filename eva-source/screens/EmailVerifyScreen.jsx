import { Line } from "recharts";
import { useTheme, useToast } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn } from "../components";

const EmailVerifyScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px` }}>
      <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.purple}10`,border:`2px solid ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:28 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="4" y="8" width="28" height="20" rx="3" stroke={t.purple} strokeWidth="2.5" fill="none"/>
          <path d="M4 11l14 10 14-10" stroke={t.purple} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ fontSize:24,fontWeight:700,color:t.t1,marginBottom:12,textAlign:"center" }}>Check Your Email</div>
      <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,maxWidth:280,marginBottom:12 }}>We’ve sent a verification link to</div>
      <div style={{ fontSize:16,fontWeight:600,color:t.purple,marginBottom:32 }}>daniel@eva.ae</div>
      <div style={{ fontSize:14,color:t.t3,textAlign:"center",lineHeight:1.7,maxWidth:260,marginBottom:36 }}>Tap the link in the email to verify your account, then come back here to continue.</div>
      <Btn onClick={()=>onNavigate("terms")} style={{ width:"100%",marginBottom:10 }}>I’ve Verified My Email</Btn>
      <Btn variant="muted" onClick={()=>toast.show("Verification email resent!","success")} style={{ width:"100%" }}>Resend Email</Btn>
      <div style={{ fontSize:13,color:t.t2,marginTop:16 }}>Didn’t receive it? Check your spam folder.</div>
    </div>
  );
};


export default EmailVerifyScreen;
