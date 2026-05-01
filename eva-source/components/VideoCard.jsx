import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const VideoCard = ({ title, duration, onDismiss, permanent }) => {
  const t = useTheme();
  const [playing, setPlaying] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlTimer = useRef(null);
  const hideControls = () => { if(controlTimer.current) clearTimeout(controlTimer.current); controlTimer.current = setTimeout(()=>setShowControls(false), 3000); };
  useEffect(()=>{if(playing&&!paused) hideControls(); return ()=>{if(controlTimer.current) clearTimeout(controlTimer.current)};},[playing,paused]);
  useEffect(()=>{if(!playing||paused)return;const iv=setInterval(()=>setProgress(p=>{if(p>=100){setPlaying(false);setPaused(false);return 0}return p+0.15}),100);return()=>clearInterval(iv)},[playing,paused]);
  const tapScreen = () => { setShowControls(true); hideControls(); };
  const durSec = parseInt(duration)*60 + (duration.includes(":")?parseInt(duration.split(":")[1]):0);
  const elapsed = Math.floor(progress/100*durSec);
  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  if (!permanent && removed) return null;
  if (!permanent && dismissed) return <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}><div onClick={()=>setDismissed(false)} style={{ display:"flex",alignItems:"center",gap:6,cursor:"pointer" }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 2l10 6-10 6V2z" fill={t.purple}/></svg><span style={{ fontSize:12,color:t.purple,fontWeight:600 }}>Watch: {title}</span></div><div onClick={()=>setRemoved(true)} style={{ width:20,height:20,borderRadius:10,background:`${t.t3}15`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}><svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg></div></div>;
  return (
    <>
      {playing&&<div onClick={tapScreen} style={{ position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9999,background:"#000" }}>
        <div style={{ width:"100%",height:"100%",background:"linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 40%, #12122a 100%)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ textAlign:"center",opacity:.15 }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#FFF" strokeWidth="1.5"/><path d="M26 20l18 12-18 12V20z" fill="#FFF"/></svg>
          </div>
        </div>
        <div onClick={e=>e.stopPropagation()} style={{ position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",flexDirection:"column",justifyContent:"space-between",opacity:showControls?1:0,transition:"opacity .3s",pointerEvents:showControls?"auto":"none" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"54px 20px 16px",background:"linear-gradient(180deg, rgba(0,0,0,.7) 0%, transparent 100%)" }}>
            <div>
              <div style={{ fontSize:16,fontWeight:700,color:"#FFF" }}>{title}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.5)",marginTop:2 }}>EVA™ by Elite Vita</div>
            </div>
            <div onClick={()=>{setPlaying(false);setPaused(false);setProgress(0)}} style={{ width:36,height:36,borderRadius:18,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          </div>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:40,flex:1 }}>
            <div onClick={()=>setProgress(p=>Math.max(0,p-5))} style={{ width:44,height:44,borderRadius:22,background:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(4px)" }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 4V1L6 5l4 4V6a6 6 0 11-1.5 11.5" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div onClick={()=>setPaused(!paused)} style={{ width:64,height:64,borderRadius:32,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(8px)" }}>
              {paused?<svg width="28" height="28" viewBox="0 0 16 16" fill="none"><path d="M4 2l10 6-10 6V2z" fill="#FFF"/></svg>:<svg width="28" height="28" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="4" height="12" rx="1" fill="#FFF"/><rect x="9" y="2" width="4" height="12" rx="1" fill="#FFF"/></svg>}
            </div>
            <div onClick={()=>setProgress(p=>Math.min(100,p+5))} style={{ width:44,height:44,borderRadius:22,background:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(4px)" }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 4V1l4 4-4 4V6a6 6 0 101.5 11.5" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{ padding:"0 20px 40px",background:"linear-gradient(0deg, rgba(0,0,0,.7) 0%, transparent 100%)" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}>
              <span style={{ fontSize:11,color:"rgba(255,255,255,.6)",fontFamily:"inherit",fontWeight:600,minWidth:32 }}>{fmt(elapsed)}</span>
              <div style={{ flex:1,height:3,background:"rgba(255,255,255,.2)",borderRadius:2,overflow:"hidden" }}>
                <div style={{ height:"100%",background:"#FFF",borderRadius:2,width:`${progress}%`,transition:"width .1s linear" }}/>
              </div>
              <span style={{ fontSize:11,color:"rgba(255,255,255,.6)",fontFamily:"inherit",fontWeight:600,minWidth:32,textAlign:"right" }}>{duration}</span>
            </div>
          </div>
        </div>
      </div>}
      <div style={{ borderRadius:14,overflow:"hidden",marginBottom:12,border:`1px solid ${t.b1}`,background:t.s1 }}>
        <div onClick={()=>{setPlaying(true);setPaused(false);setProgress(0);setShowControls(true)}} style={{ position:"relative",background:`linear-gradient(135deg, ${t.purple}18, ${t.purple}08)`,height:100,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
          <div style={{ position:"absolute",left:16,bottom:12,display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,.9)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,.15)" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2l10 6-10 6V2z" fill={t.purple}/></svg>
            </div>
            <div><div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{title}</div><div style={{ fontSize:11,color:t.t3 }}>{duration}</div></div>
          </div>
          {!permanent&&<div style={{ position:"absolute",right:12,top:10 }}>
            <div onClick={e=>{e.stopPropagation();setDismissed(true)}} style={{ width:24,height:24,borderRadius:12,background:`${t.t3}20`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};


// ── Info Modal (pop-out explainer) ──

export default VideoCard;
