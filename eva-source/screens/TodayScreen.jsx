import { useState } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Card, CheckIcon, ChevronRight, DanielAvatar, MiniDEVA, MiniDNA, PillIcon, TabBar, VideoCard } from "../components";
import { supplements } from "../data/supplements";

const TodayScreen = ({ onNavigate }) => {
  const t = useTheme();
  const [testStatus, setTestStatus] = useState("active"); // "pending" | "blood-ready" | "active" | "hidden"
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,animation:"fadeUp .4s ease both" }}>
          <div><div style={{ fontSize:14,color:t.t3,fontWeight:500 }}>Good morning, Daniel</div><div style={{ fontSize:24,fontWeight:700,color:t.t1,letterSpacing:-.3 }}>Today</div></div>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <div onClick={()=>onNavigate("notifications")} style={{ position:"relative",cursor:"pointer" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 8a5 5 0 0110 0c0 2.5 1.5 4 2 5H3c.5-1 2-2.5 2-5z" stroke={t.t3} strokeWidth="1.5"/><path d="M7.5 14.5a2.5 2.5 0 005 0" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg>
              <div style={{ position:"absolute",top:-4,right:-6,minWidth:16,height:16,borderRadius:8,background:t.red,border:`2px solid ${t.bg}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#FFF" }}>3</div>
            </div>
            <div onClick={()=>onNavigate("profile")} style={{ cursor:"pointer" }}><DanielAvatar size={38} border={`1.5px solid ${t.purple}35`}/></div>
          </div>
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"0 24px",paddingBottom:8 }}>
        <VideoCard title="Welcome to EVA™ — Daniel’s Story" duration="2:45"/>
        {/* Test Progress Card */}
        {testStatus==="pending"&&<Card onClick={()=>onNavigate("waiting")} style={{ background:`${t.purple}06`,border:`1.5px solid ${t.purple}18`,cursor:"pointer",animation:"fadeUp .4s ease both" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
            <div style={{ width:32,height:32,borderRadius:10,background:`${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={t.purple} strokeWidth="1.3" strokeDasharray="4 2"/><path d="M8 5v3.5l2 1.5" stroke={t.purple} strokeWidth="1.2" strokeLinecap="round"/></svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Tests Processing</div>
              <div style={{ fontSize:12,color:t.t3,marginTop:2 }}>Blood analysis in progress</div>
            </div>
            <ChevronRight size={12} color={t.purple}/>
          </div>
          <div style={{ height:4,background:t.s2,borderRadius:2 }}><div style={{ width:"35%",height:"100%",background:t.purple,borderRadius:2,animation:"pulse 2s ease infinite" }}/></div>
        </Card>}
        {testStatus==="blood-ready"&&<Card onClick={()=>onNavigate("results")} style={{ background:`${t.emerald}08`,border:`1.5px solid ${t.emerald}25`,cursor:"pointer",animation:"fadeUp .4s ease both" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:32,height:32,borderRadius:10,background:`${t.emerald}15`,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <CheckIcon size={16} color={t.emerald}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15,fontWeight:700,color:t.emerald }}>Blood Results Ready!</div>
              <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>Tap to see your biological age and biomarker results</div>
            </div>
            <ChevronRight size={12} color={t.emerald}/>
          </div>
        </Card>}
        {/* Wearable Dose Adjustment Card */}
        <Card style={{ background:"#F59E0B08",border:"1.5px solid #F59E0B25",animation:"fadeUp .4s ease both" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.5"/><path d="M8 4v5l3 2" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <div style={{ fontSize:12,fontWeight:700,color:"#F59E0B",letterSpacing:1 }}>WEARABLE ADJUSTMENT</div>
          </div>
          <div style={{ fontSize:15,fontWeight:600,color:t.t1,marginBottom:12,lineHeight:1.4 }}>HRV dropped 18% overnight — Magnesium increased</div>
          <div style={{ fontSize:13,color:t.t2,lineHeight:1.5 }}>+200mg Magnesium Glycinate added to your morning protocol for 7 days. Day 2 of 7.</div>
        </Card>
        <VideoCard title="Understanding DEVA™" duration="1:15"/>
        <div onClick={()=>onNavigate("deva-insight")} style={{ background:`linear-gradient(150deg,${t.purple}12,${t.violet||t.purple}06,${t.cyan}03)`,borderRadius:20,padding:20,marginBottom:16,border:`1px solid ${t.purple}18`,cursor:"pointer",animation:"fadeUp .4s ease .08s both",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:`${t.cyan}06` }}/>
          <div style={{ position:"absolute",bottom:-40,left:-20,width:100,height:100,borderRadius:"50%",background:`${t.purple}06` }}/>
          <div style={{ display:"flex",gap:16,alignItems:"center",marginBottom:14 }}>
            <MiniDEVA size={56}/>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:16,fontWeight:700,color:t.t1 }}>Today's DEVA™</span>
                <div style={{ fontSize:11,color:t.t3,fontWeight:500 }}>6 Mar 2025</div>
              </div>
              <div style={{ fontSize:14,fontWeight:600,color:t.t1,marginTop:4,lineHeight:1.4 }}>Inflammatory markers need your attention today.</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:8,marginBottom:14 }}>
            {[{n:"3",l:"Insights",c:t.purple},{n:"3",l:"Actions",c:t.gold},{n:"3",l:"Outcomes",c:t.emerald}].map(d=>(
              <div key={d.l} style={{ flex:1,background:`${d.c}10`,borderRadius:10,padding:"10px 8px",textAlign:"center",border:`1px solid ${d.c}20` }}>
                <div style={{ fontSize:20,fontWeight:800,color:d.c,lineHeight:1 }}>{d.n}</div>
                <div style={{ fontSize:10,color:d.c,fontWeight:600,marginTop:4,letterSpacing:.5 }}>{d.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background:t.purple,borderRadius:12,padding:"12px 0",textAlign:"center",fontSize:15,fontWeight:600,color:"#FFF" }}>Open Today's DEVA™ →</div>
        </div>
        <Card onClick={()=>onNavigate("protocol")} style={{ display:"flex",alignItems:"center",gap:16,animation:"fadeUp .4s ease .16s both" }}>
          <div style={{ width:48,height:48,borderRadius:14,background:`${t.emerald}0C`,border:`1px solid ${t.emerald}18`,display:"flex",alignItems:"center",justifyContent:"center" }}><PillIcon size={24}/></div>
          <div style={{ flex:1 }}><div style={{ fontSize:16,fontWeight:600,color:t.t1 }}>Morning Protocol</div><div style={{ fontSize:13,color:t.t2,marginTop:2 }}>5 supplements · Take with food</div></div>
          <div style={{ background:t.emerald,borderRadius:8,padding:"9px 17px",fontSize:13,fontWeight:700,color:"#FFF",letterSpacing:.3 }}>Log</div>
        </Card>
        <div style={{ display:"flex",gap:12,marginBottom:14,alignItems:"stretch",animation:"fadeUp .4s ease .24s both" }}>
          {/* EVA™ Age — special tile */}
          <div onClick={()=>onNavigate("eva-age")} style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",background:`linear-gradient(135deg, ${t.emerald}15, ${t.emerald}08)`,borderRadius:16,padding:"12px 13px",textAlign:"center",border:`1.5px solid ${t.emerald}30`,cursor:"pointer",animation:"evaBioTilePulse 3s ease-in-out infinite",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:-20,right:-20,width:60,height:60,borderRadius:"50%",background:`${t.emerald}08` }}/>
            <div style={{ margin:"0 auto 6px",display:"flex",justifyContent:"center" }}><MiniDNA w={60} h={36} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/></div>
            <div style={{ fontSize:26,fontWeight:800,color:t.emerald,letterSpacing:-1 }}>34</div>
            <div style={{ fontSize:10,color:t.t3,marginTop:4,fontWeight:600,letterSpacing:.5 }}>EVA™ AGE</div>
            <div style={{ fontSize:9,color:t.emerald,marginTop:3,fontWeight:600 }}>-4 yrs →</div>
          </div>
          {/* Streak + Next Test — regular tiles */}
          {[{l:"Streak",v:"12",c:t.emerald,nav:null,toast:"streak",ic:<svg width="28" height="28" viewBox="0 0 14 14" fill="none"><path d="M7 1L5 6h4L5 13l2-5H3l4-7z" fill={t.emerald} opacity=".6" stroke={t.emerald} strokeWidth="1.2"/></svg>},{l:"Next Test",v:"47d",c:t.gold,nav:"retest",ic:<svg width="28" height="28" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="9" rx="1.5" stroke={t.gold} strokeWidth="1.2"/><path d="M4 1v3M10 1v3M2 6h10" stroke={t.gold} strokeWidth="1" strokeLinecap="round"/></svg>}].map(s=>(
            <div key={s.l} onClick={s.nav?()=>onNavigate(s.nav):undefined} style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",background:t.s1,borderRadius:16,padding:"12px 13px",textAlign:"center",border:`1px solid ${t.b1}`,cursor:s.nav?"pointer":"default" }}>
              <div style={{ display:"flex",justifyContent:"center",marginBottom:6 }}>{s.ic}</div>
              <div style={{ fontSize:24,fontWeight:800,color:s.c,letterSpacing:-.5 }}>{s.v}</div>
              <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5,textTransform:"uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <Card glow={t.purple} style={{ animation:"fadeUp .4s ease .32s both" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
            <div style={{ width:30,height:30,borderRadius:"50%",background:`${t.purple}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:t.cyan }}>NK</div>
            <div><div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>Dr. Nival</div><div style={{ fontSize:12,color:t.t3 }}>2 hours ago</div></div>
          </div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6 }}>Your Vitamin D protocol is showing great improvement. Let's maintain current dosage through next re-test.</div>
        </Card>
        {/* EV.AI™ WhatsApp Card */}
        <Card onClick={()=>window.open("https://wa.me/971501234567?text=Hi%20EV.AI","_blank")} glow="#25D366" style={{ display:"flex",alignItems:"center",gap:16,cursor:"pointer",animation:"fadeUp .4s ease .4s both" }}>
          <div style={{ width:44,height:44,borderRadius:14,background:"#25D36612",border:"1px solid #25D36620",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15,fontWeight:700,color:t.t1,display:"flex",alignItems:"center",gap:8 }}>EV.AI™ <span style={{ fontSize:10,fontWeight:600,color:"#25D366",background:"#25D36612",padding:"4px 8px",borderRadius:4,letterSpacing:.5 }}>BETA</span></div>
            <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>Ask anything about your biology or protocol</div>
          </div>
          <ChevronRight size={12} color="#25D366"/>
        </Card>
      </div>
      <TabBar active="today" onNavigate={id=>onNavigate(id)}/>
      <div style={{ position:"absolute",bottom:78,left:16,right:16 }}>
        <div style={{ background:t.s1,borderRadius:8,border:`1px dashed ${t.b2}`,padding:"8px 13px",display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ fontSize:9,fontWeight:700,color:t.t4,letterSpacing:1.5,flexShrink:0 }}>DEMO</div>
          {[{id:"pending",l:"Pending"},{id:"blood-ready",l:"Results!"},{id:"active",l:"Active"}].map(s=>(
            <div key={s.id} onClick={()=>setTestStatus(s.id)} style={{ flex:1,background:testStatus===s.id?`${t.t4}15`:t.s2,border:`1px dashed ${testStatus===s.id?t.t4:t.b2}`,borderRadius:4,padding:"4px 0",textAlign:"center",fontSize:9,fontWeight:600,color:testStatus===s.id?t.t3:t.t4,cursor:"pointer" }}>{s.l}</div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default TodayScreen;
