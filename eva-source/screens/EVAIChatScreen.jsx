import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { ChevronLeft } from "../components";

const EVAIChatScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [msg, setMsg] = useState("");
  const messages = [
    {from:"dr",text:"Hi Daniel, I’ve reviewed your latest protocol. Your Vitamin D is trending in the right direction — let’s maintain the current 4,000 IU dose through your next re-test.",time:"2:14 PM"},
    {from:"me",text:"Thanks Dr. Nival. I’ve been consistent with the morning protocol. Should I be concerned about the hs-CRP level?",time:"2:18 PM"},
    {from:"dr",text:"Good question. 2.8 mg/L is elevated but not in the urgent range. The Omega-3 protocol we’ve added should bring this down. We’ll verify at your next blood panel in ∼47 days. If you notice any unusual symptoms in the meantime, message me directly.",time:"2:22 PM"},
    {from:"me",text:"Understood. The magnesium seems to be helping with sleep already.",time:"2:25 PM"},
    {from:"dr",text:"That’s great to hear — magnesium glycinate typically shows sleep improvements within 1–2 weeks. Keep it up.",time:"2:28 PM"},
  ];
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 12px`,borderBottom:`1px solid ${t.b1}` }}>
        <div style={{ display:"flex",alignItems:"center",gap:14 }}>
          <div onClick={onBack} style={{ cursor:"pointer" }}><ChevronLeft size={16}/></div>
          <div style={{ width:36,height:36,borderRadius:"50%",background:`${t.purple}15`,border:`1.5px solid ${t.purple}30`,display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={t.purple} strokeWidth="1.3"/><circle cx="8" cy="8" r="2" fill={t.purple}/><path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/></svg></div>
          <div style={{ flex:1 }}><div style={{ fontSize:16,fontWeight:600,color:t.t1,display:"flex",alignItems:"center",gap:8 }}>EV.AI™ <span style={{ fontSize:10,fontWeight:600,color:"#25D366",background:"#25D36612",padding:"4px 8px",borderRadius:4,letterSpacing:.5 }}>BETA</span></div><div style={{ fontSize:12,color:t.purple,fontWeight:500 }}>Dr. Nival · AI-assisted</div></div>
          
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"19px 28px" }}>
        <div style={{ textAlign:"center",marginBottom:16 }}><span style={{ fontSize:12,color:t.t4,background:t.s2,padding:"6px 15px",borderRadius:8 }}>Today</span></div>
        {messages.map((m,i)=>(
          <div key={i} style={{ display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:10 }}>
            <div style={{ maxWidth:"78%",background:m.from==="me"?t.purple:`${t.s1}`,borderRadius:16,borderBottomRightRadius:m.from==="me"?4:16,borderBottomLeftRadius:m.from==="dr"?4:16,padding:"15px 19px" }}>
              <div style={{ fontSize:14,color:m.from==="me"?"#FFF":t.t1,lineHeight:1.6 }}>{m.text}</div>
              <div style={{ fontSize:11,color:m.from==="me"?"rgba(255,255,255,.5)":t.t4,marginTop:6,textAlign:"right" }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"15px 28px 28px",borderTop:`1px solid ${t.b1}`,display:"flex",gap:12,alignItems:"center" }}>
        <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message..." style={{ flex:1,background:t.s2,borderRadius:24,padding:"15px 22px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
        <div style={{ width:40,height:40,borderRadius:"50%",background:t.purple,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 2L7 9M14 2l-4 12-3-5-5-3 12-4z" fill="#FFF"/></svg>
        </div>
      </div>
    </div>
  );
};


export default EVAIChatScreen;
