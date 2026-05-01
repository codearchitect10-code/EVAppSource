import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { DanielAvatar } from "../components";

const WelcomeBackScreen = ({ onNavigate }) => {
  const t = useTheme();
  useEffect(()=>{const tm=setTimeout(()=>onNavigate("today"),1800);return()=>clearTimeout(tm)},[]);
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg }}>
      <div style={{ animation:"scaleIn .5s ease both" }}><DanielAvatar size={80} border={`3px solid ${t.purple}40`}/></div>
      <div style={{ fontSize:24,fontWeight:700,color:t.t1,marginTop:20,animation:"fadeUp .5s ease .3s both" }}>Welcome back, Daniel</div>
      <div style={{ fontSize:15,color:t.t2,marginTop:8,animation:"fadeUp .5s ease .5s both" }}>Let’s check your biology.</div>
    </div>
  );
};


export default WelcomeBackScreen;
