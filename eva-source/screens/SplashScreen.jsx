import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { EVAFullLogo } from "../components";

const SplashScreen = ({ onNext }) => {
  const t = useTheme();
  useEffect(() => { const tm = setTimeout(onNext, 2200); return () => clearTimeout(tm); }, [onNext]);
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg }}>
      <div style={{ animation:"scaleIn .8s ease both" }}>
        <div style={{ animation:"pulseGlow 2s ease-in-out infinite" }}><EVAFullLogo width={170} /></div>
      </div>
      <div style={{ position:"absolute",bottom:64,animation:"fadeIn 1s ease .8s both" }}>
        <div style={{ fontSize:12,letterSpacing:3,color:t.t4,textTransform:"uppercase",fontWeight:500 }}>BioIntel in your pocket</div>
      </div>
    </div>
  );
};


export default SplashScreen;
