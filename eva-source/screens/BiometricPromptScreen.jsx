import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn } from "../components";

const BiometricPromptScreen = ({ onNavigate }) => {
  const t = useTheme();
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px` }}>
      <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.purple}10`,border:`2px solid ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:28 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M18 6c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12" stroke={t.purple} strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 12c-3.3 0-6 2.7-6 6s2.7 6 6 6" stroke={t.purple} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="18" cy="18" r="2" fill={t.purple}/>
          <path d="M10 28v2M14 30v2M18 30v2M22 30v2M26 28v2" stroke={t.purple} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ fontSize:24,fontWeight:700,color:t.t1,marginBottom:12,textAlign:"center" }}>Enable Quick Login</div>
      <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,maxWidth:260,marginBottom:36 }}>Use Face ID or fingerprint to sign in instantly. Your biometric data never leaves your device.</div>
      <Btn onClick={()=>onNavigate("welcome-back")} style={{ width:"100%",marginBottom:10 }}>Enable Biometrics</Btn>
      <Btn variant="muted" onClick={()=>onNavigate("welcome-back")} style={{ width:"100%" }}>Not Now</Btn>
    </div>
  );
};


export default BiometricPromptScreen;
