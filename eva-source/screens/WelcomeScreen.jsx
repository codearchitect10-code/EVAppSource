import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, EVAFullLogo } from "../components";

const WelcomeScreen = ({ onNavigate }) => {
  const t = useTheme();
  // SVG icons matching Learn More brand style
  const DNAIcon = ({c}) => <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M8 3v20M18 3v20" stroke={c} strokeWidth="1.8"/><path d="M8 7h10M8 13h10M8 19h10" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="3" r="1.5" fill={c}/><circle cx="18" cy="3" r="1.5" fill={c}/><circle cx="8" cy="23" r="1.5" fill={c}/><circle cx="18" cy="23" r="1.5" fill={c}/></svg>;
  const BloodIcon = ({c}) => <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 2C13 2 5 12 5 17a8 8 0 0016 0c0-5-8-15-8-15z" stroke={c} strokeWidth="1.8" fill={`${c}15`}/><circle cx="13" cy="17" r="3" stroke={c} strokeWidth="1.5" fill="none"/></svg>;
  const SuppIcon = ({c}) => <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="8" y="2" width="10" height="22" rx="5" stroke={c} strokeWidth="1.8" fill={`${c}10`}/><line x1="8" y1="13" x2="18" y2="13" stroke={c} strokeWidth="1.5"/><circle cx="13" cy="8" r="1.5" fill={c}/></svg>;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP+8}px 24px 24px` }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center" }}>
        <div style={{ animation:"fadeUp .5s ease both",marginBottom:36,display:"flex",justifyContent:"center" }}><EVAFullLogo width={100} /></div>
        <div style={{ animation:"fadeUp .5s ease .1s both",fontSize:36,fontWeight:800,color:t.t1,lineHeight:1.1,letterSpacing:-.8,marginBottom:16,textAlign:"center" }}>Your gateway<br/>to longevity.</div>
        <div style={{ animation:"fadeUp .5s ease .2s both",fontSize:16,color:t.t2,lineHeight:1.7,maxWidth:280,textAlign:"center",margin:"0 auto" }}>DNA. Blood. Supplements. Unified into one personalised platform that translates your biology into daily action.</div>
        <div style={{ display:"flex",justifyContent:"center",gap:0,marginTop:48,animation:"fadeUp .5s ease .3s both" }}>
          {[{l:"DNA",s:"Your past",c:t.purple,I:DNAIcon},{l:"Blood",s:"Your present",c:t.cyan,I:BloodIcon},{l:"Supplements",s:"Your future",c:t.emerald,I:SuppIcon}].map(p=>(
            <div key={p.l} style={{ textAlign:"center",flex:1 }}>
              <div style={{ width:50,height:50,borderRadius:16,background:`${p.c}0A`,border:`1.5px solid ${p.c}18`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px" }}>
                <p.I c={p.c}/>
              </div>
              <div style={{ fontSize:13,fontWeight:700,color:t.t1,letterSpacing:.3 }}>{p.l}</div>
              <div style={{ fontSize:11,color:t.t3,marginTop:6,fontWeight:500 }}>{p.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:12,paddingBottom:12,animation:"fadeUp .5s ease .4s both" }}>
        <Btn onClick={()=>onNavigate("create-account")}>Get Started</Btn>
        <Btn variant="secondary" onClick={()=>onNavigate("learn")}>Learn More</Btn>
        <div style={{ textAlign:"center",fontSize:14,color:t.t3,marginTop:12 }}>Already have an account? <span style={{ color:t.cyan,cursor:"pointer",fontWeight:600 }} onClick={()=>onNavigate("signin")}>Sign in</span></div>
      </div>
    </div>
  );
};


export default WelcomeScreen;
