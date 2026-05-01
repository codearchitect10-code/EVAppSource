import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, CheckIcon } from "../components";

const FanfareScreen = ({ onNavigate }) => {
  const t = useTheme();
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px` }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
        <div style={{ animation:"scaleIn .6s ease both",marginBottom:24 }}>
          <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.emerald}12`,border:`2px solid ${t.emerald}30`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto" }}><CheckIcon size={36} color={t.emerald}/></div>
        </div>
        <div style={{ fontSize:26,fontWeight:800,color:t.t1,textAlign:"center",animation:"fadeUp .5s ease .3s both",letterSpacing:-.5 }}>You're all set!</div>
        <div style={{ fontSize:15,color:t.t2,marginTop:10,textAlign:"center",lineHeight:1.7,maxWidth:280,animation:"fadeUp .5s ease .4s both" }}>Your biology test is booked and your health profile is ready. Here's what happens next.</div>
        <div style={{ width:"100%",marginTop:28,animation:"fadeUp .5s ease .5s both" }}>
          {[
            {n:"1",l:"Complete your biology test",s:"Check your email for fasting instructions",c:t.purple},
            {n:"2",l:"Sample processing & analysis",s:"Blood: ~5 days · DNA: ~5 weeks",c:t.cyan},
            {n:"3",l:"Your personalised protocol begins",s:"Protocol activation on Day 7",c:t.emerald},
            
          ].map((step,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:16,marginBottom:14 }}>
              <div style={{ width:32,height:32,borderRadius:10,background:`${step.c}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:step.c,flexShrink:0 }}>{step.n}</div>
              <div>
                <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{step.l}</div>
                <div style={{ fontSize:12,color:t.t3,marginTop:2 }}>{step.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flexShrink:0,paddingBottom:8,animation:"fadeUp .5s ease .7s both" }}><Btn onClick={()=>onNavigate("today")}>Start Exploring EVA™ →</Btn></div>
    </div>
  );
};


export default FanfareScreen;
