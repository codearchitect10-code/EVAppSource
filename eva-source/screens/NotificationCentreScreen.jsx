import { useState } from "react";
import { Line } from "recharts";
import { useTheme, useToast } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Card, ChevronRight, MiniDEVA, PillIcon, TopBar } from "../components";
import { supplements } from "../data/supplements";

const NotificationCentreScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  const [notifs, setNotifs] = useState([
    {type:"deva",title:"Your Daily EVAluation is ready",body:"Inflammatory markers need attention today. 3 insights, 3 actions, 3 outcomes waiting.",time:"8:00 AM",read:false,link:"deva-insight"},
    {type:"protocol",title:"Morning protocol reminder",body:"5 supplements to take with breakfast: Vitamin D3, Omega-3, Magnesium Glycinate, CoQ10.",time:"7:30 AM",read:false,link:"protocol"},
    {type:"wearable",title:"HRV dropped 18% — Magnesium increased",body:"+200mg Magnesium Glycinate added to morning protocol for 7 days. Day 2 of 7.",time:"6 Mar",read:false,link:"supplement-detail"},
    {type:"clinician",title:"Message from Dr. Nival",body:"Vitamin D protocol showing great improvement. Maintaining current dosage through next re-test.",time:"6 Mar",read:true,link:"clinician-chat"},
    {type:"retest",title:"Re-test in 47 days",body:"Follow-up blood panel will compare Vitamin D, Magnesium, and hs-CRP against baseline.",time:"1 Mar",read:true,link:"retest"},
    {type:"system",title:"Welcome to EVA™, Daniel",body:"Your biology test is complete and your personalised protocol is active.",time:"28 Feb",read:true,link:null},
  ]);
  const unread = notifs.filter(n=>!n.read).length;
  const markAllRead = () => { setNotifs(notifs.map(n=>({...n,read:true}))); toast.show("All marked as read","success"); };
  const toggleRead = (idx,e) => { e.stopPropagation(); const next=[...notifs]; next[idx]={...next[idx],read:!next[idx].read}; setNotifs(next); };
  const handleTap = (n,idx) => {
    if (!n.read) { const next=[...notifs]; next[idx]={...next[idx],read:true}; setNotifs(next); }
    if (n.link) onNavigate(n.link);
  };
  const typeIcon = (tp) => {
    const icons = {
      deva:<MiniDEVA size={20}/>,
      protocol:<PillIcon size={16}/>,
      wearable:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#F59E0B" strokeWidth="1.3"/><path d="M8 4v4.5l2.5 1.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/></svg>,
      clinician:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke={t.cyan} strokeWidth="1.3"/><path d="M3 14c0-2 2-3.5 5-3.5s5 1.5 5 3.5" stroke={t.cyan} strokeWidth="1.3"/></svg>,
      retest:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="3" width="11" height="10" rx="1.5" stroke={t.gold} strokeWidth="1.3"/><path d="M5 1v3M11 1v3M2.5 6.5h11" stroke={t.gold} strokeWidth="1.1" strokeLinecap="round"/></svg>,
      system:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={t.t3} strokeWidth="1.3"/><path d="M8 5v.5M8 7.5v4" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    };
    return icons[tp]||icons.system;
  };
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:16 }}>
        <div><div style={{ fontSize:24,fontWeight:700,color:t.t1,letterSpacing:-.3 }}>Notifications</div><div style={{ fontSize:14,color:t.t3,marginTop:4 }}>{unread} unread</div></div>
        {unread>0&&<div onClick={markAllRead} style={{ fontSize:13,color:t.purple,fontWeight:600,cursor:"pointer" }}>Mark all read</div>}
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        {notifs.map((n,i)=>(
          <Card key={i} onClick={()=>handleTap(n,i)} style={{ padding:14,display:"flex",gap:14,alignItems:"flex-start",cursor:n.link?"pointer":"default",background:n.read?t.s1:`${t.purple}06`,borderLeft:!n.read?`3px solid ${t.purple}`:"3px solid transparent",transition:"all .2s" }}>
            <div style={{ width:32,height:32,borderRadius:10,background:n.read?t.s2:`${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{typeIcon(n.type)}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14,fontWeight:n.read?500:700,color:t.t1,marginBottom:3 }}>{n.title}</div>
              <div style={{ fontSize:13,color:t.t2,lineHeight:1.5 }}>{n.body}</div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6 }}>
                <div style={{ fontSize:11,color:t.t4,fontWeight:500 }}>{n.time}</div>
                <div onClick={(e)=>toggleRead(i,e)} style={{ fontSize:11,color:t.purple,fontWeight:500,cursor:"pointer" }}>{n.read?"Mark unread":"Mark read"}</div>
              </div>
            </div>
            {n.link&&<ChevronRight size={12} color={t.t4}/>}
          
          <div onClick={()=>onNavigate("clinician-chat")} style={{ marginTop:12,background:`${t.cyan}12`,border:`1px solid ${t.cyan}25`,borderRadius:10,padding:"10px 0",textAlign:"center",fontSize:13,fontWeight:600,color:t.cyan,cursor:"pointer" }}>Contact Clinician</div></Card>
        ))}
      </div>
    </div>
  );
};


export default NotificationCentreScreen;
