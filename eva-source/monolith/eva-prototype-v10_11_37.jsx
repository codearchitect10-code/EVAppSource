import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

/* ═══════════════════════════════════════════════════════════════════
   EVA™ by Elite Vita — Platform Architecture + Prototype v10.11.37
   
   THREE VIEWS: IA Map | Design Tokens | Interactive Prototype
   15 SCREENS: Full app with Dark/Light mode
   REAL ASSETS: Exact SVG logo paths from brand files
   TYPOGRAPHY: Gilroy (Plus Jakarta Sans web fallback)
   COLORS: Exact hex from Brand Guidelines v8.0 page 17
   ═══════════════════════════════════════════════════════════════════ */

// ── Theme System ──
const themes = {
  dark: {
    mode: "dark",
    bg: "#060A12", s1: "#111827", s2: "#1A2332", s3: "#1C2333",
    b1: "#283848", b2: "#354558",
    t1: "#F1F5F9", t2: "#94A3B8", t3: "#8899AB", t4: "#566878",
    // Brand colors stay consistent
    purple: "#4623BE", violet: "#9717CC", cyan: "#00EFE3",
    emerald: "#00AD80", gold: "#DDB76A", red: "#EF4444",
    sky: "#00C5F1", ice: "#CCFCF9", deepTeal: "#002B38", taupe: "#9B7E7C",
    white: "#FFFFFF",
    brandGrad: "linear-gradient(135deg, #4623BE 0%, #9717CC 40%, #00EFE3 100%)",
    glow: "0 0 60px rgba(70,35,190,0.2), 0 0 120px rgba(151,23,204,0.06)",
    logoColor: "#FFFFFF",
    shellBg: "#020308",
  },
  light: {
    mode: "light",
    bg: "#FFFFFF", s1: "#F8FAFE", s2: "#EFF3F9", s3: "#E5EAF2",
    b1: "#E0E5ED", b2: "#CDD4DE",
    t1: "#0F172A", t2: "#475569", t3: "#94A3B8", t4: "#CBD5E1",
    purple: "#4623BE", violet: "#9717CC", cyan: "#00AD80",
    emerald: "#00AD80", gold: "#B8960A", red: "#DC2626",
    sky: "#0891B2", ice: "#CCFCF9", deepTeal: "#002B38", taupe: "#9B7E7C",
    white: "#FFFFFF",
    brandGrad: "linear-gradient(135deg, #4623BE 0%, #9717CC 40%, #00C5F1 100%)",
    glow: "0 0 60px rgba(70,35,190,0.08), 0 0 120px rgba(0,173,128,0.04)",
    logoColor: "#4623BE",
    shellBg: "#F0F2F5",
  },
};

const ThemeCtx = createContext(themes.dark);
const useTheme = () => useContext(ThemeCtx);

// ── SVG Logo Paths (from uploaded brand files) ──
const LOGO = {
  symbolVB: "0 0 264.57 267.22",
  symbolD: "M0,133.72c0,73.85,133.72-12.89,133.72,121.78,0,33.43,130.85-3.82,130.85-121.78C264.57,59.87,207.57,0,133.72,0,59.87,0,0,59.87,0,133.72ZM237.02,133.72c0,57.05-46.25,103.3-103.3,103.3-57.05,0-103.3-46.25-103.3-103.3,0-57.05,46.25-103.3,103.3-103.3s103.3,46.25,103.3,103.3Z",
  // Old EVA-only logo (no "by Elite Vita")
  evaVB: "0 0 792.34 581.48",
  pSym: "M250.08,133.72c0,73.85,133.72-12.89,133.72,121.78,0,33.43,130.85-3.82,130.85-121.78C514.65,59.87,457.65,0,383.8,0c-73.85,0-133.72,59.87-133.72,133.72ZM487.1,133.72c0,57.05-46.25,103.3-103.3,103.3-57.05,0-103.3-46.25-103.3-103.3,0-57.05,46.25-103.3,103.3-103.3s103.3,46.25,103.3,103.3Z",
  pE: "M242.91,455.11H38.33c3.63,57.49,47.13,91.67,91.16,91.67,34.33,0,65.41-12.54,84-48.61,1.89-3.66,6.02-5.59,10.03-4.64l17.86,4.2c5.53,1.3,8.49,7.36,6.09,12.51-21.8,46.79-64.24,71.24-117.99,71.24-37.72,0-16.49-58.67-39.05-88.46C70.9,467.25,0,483.96,0,447.86,0,366.02,61.63,313.19,132.07,313.19s122.75,51.28,125.34,127.41h0c0,8.01-6.49,14.5-14.5,14.5ZM39.88,425.58h177.65c-7.25-50.24-42.99-77.69-85.46-77.69s-84.42,27.45-92.19,77.69Z",
  pV: "M413.95,574.75h-33.2c-2.98,0-5.67-1.76-6.87-4.48l-107.11-242.23c-1.8-4.07,1.18-8.64,5.63-8.64h29.53c2.44,0,4.65,1.44,5.63,3.68l90.06,205.05,89.55-205.04c.98-2.24,3.19-3.69,5.64-3.69h29.52c4.45,0,7.42,4.57,5.63,8.64l-107.11,242.23c-1.2,2.72-3.9,4.48-6.87,4.48Z",
  pA: "M787.93,574.75h-30.54c-2.44,0-4.41-1.98-4.41-4.41v-17.2c0-6.32-7.56-9.55-12.13-5.19-22.59,21.55-53.81,33.54-89.38,33.54-67.85,0-127.41-53.35-127.41-134.15,0-36.81,67.67-14.16,87.55-37.12,23.75-27.45,2.93-97.02,39.87-97.02s66.79,11.99,89.38,33.54c4.57,4.36,12.13,1.13,12.13-5.19v-17.72c0-2.44,1.98-4.41,4.41-4.41h30.54c2.44,0,4.41,1.98,4.41,4.41v246.52c0,2.44-1.98,4.41-4.41,4.41ZM752.97,447.34c0-61.12-47.13-99.44-95.3-99.44-52.83,0-95.3,38.33-95.3,99.44s42.47,98.93,95.3,98.93c48.17,0,95.3-38.33,95.3-98.93Z",
  // "by ELITE VITA" text paths from EVA_ByEliteVita_Wt.svg (viewBox 0 0 792.34 685.36)
  fullVB: "0 0 792.34 685.36",
  byB: "M216.84,651.71c2.7,2.65,4.02,5.93,4.02,9.79s-1.32,7.15-4.02,9.85-5.88,3.97-9.69,3.97c-5.03,0-9.21-2.54-11.38-6.72v6.14h-2.65v-37.06h2.65v16.73c2.17-4.18,6.35-6.72,11.38-6.72,3.81,0,7.04,1.32,9.69,4.02ZM206.99,672.78c3.12,0,5.77-1.11,7.94-3.28s3.28-4.87,3.28-8-1.11-5.82-3.28-8-4.82-3.28-7.94-3.28-5.82,1.11-8,3.28-3.23,4.87-3.23,8,1.06,5.82,3.23,8,4.87,3.28,8,3.28Z",
  byY: "M244.53,648.27h2.86l-11.44,28.91c-2.06,5.24-6.04,8.52-10.48,8.15v-2.49c3.39.27,6.19-2.12,7.89-6.19l.58-1.43-12.18-26.95h2.86l10.7,23.56,9.21-23.56Z",
  evE: "M305.93,637.09c.22,2.61.44,5.08.65,7.55-.1.04-.21.08-.31.12-.2-.25-.45-.47-.58-.75-1.74-3.79-4.78-5.83-8.85-6.06-3.7-.21-7.42-.04-11.26-.04v18.09c2.59,0,5.18.04,7.78-.01,1.46-.03,2.94-.12,4.38-.33,2.07-.3,3.82-1.12,4.59-3.29.05-.15.3-.23.63-.47v8.98c-.29-.21-.58-.3-.63-.48-.71-2.04-2.33-3.05-4.28-3.21-4.1-.34-8.23-.42-12.4-.62-.09.56-.17.81-.17,1.05,0,5.81-.02,11.62,0,17.43,0,1.72.7,2.74,2.15,2.76,3.82.05,7.66.11,11.46-.18,3.73-.28,6.4-2.38,7.97-5.8.13-.28.29-.55.47-.81.04-.06.19-.05.54-.14-.15,2.58-.29,5.09-.44,7.71h-29.35c.12-.3.14-.58.27-.65,1.65-.85,1.98-2.41,1.99-4,.04-10.73.03-21.46,0-32.19,0-1.59-.32-3.15-1.98-4-.13-.06-.15-.34-.27-.66h27.67Z",
  evL: "M347.6,672.19c-.12,2.12-.24,4.23-.36,6.41h-27.71c.11-.29.12-.58.24-.64,1.55-.74,1.93-2.14,1.99-3.65.11-2.98.19-5.96.2-8.94.03-7.07.07-14.13-.03-21.2-.04-2.48.34-5.23-2.35-7.03h9.43c0,.11.05.35,0,.39-1.95,1.07-2.22,2.96-2.23,4.85-.05,10.89-.05,21.77-.04,32.66,0,1.7.85,2.72,2.4,2.73,3.45.03,6.92.02,10.36-.17,3.3-.19,5.68-1.93,7.17-4.88.13-.25.35-.45.53-.67.13.05.27.09.4.14Z",
  evI: "M358.37,637.08h9.19c.03.19.08.36.04.38-2,1.33-2.21,3.38-2.21,5.51,0,10.1,0,20.21.02,30.31,0,1.86.23,3.68,2.1,4.75.08.05.06.28.1.54h-9.31c-.02-.19-.07-.35-.03-.38,2.24-1.44,2.23-3.73,2.24-5.98.02-9.58.02-19.16,0-28.74,0-2.33.04-4.72-2.52-6.17.13-.08.25-.16.38-.23Z",
  evT: "M396.23,637.57c0,.97,0,1.43,0,1.89,0,10.73,0,21.47,0,32.2,0,.05,0,.1,0,.16.05,2.43-.17,4.95,2.23,6.73h-9.85c3.51-2.33,2.67-5.61,2.69-8.57.08-9.74.03-19.48.03-29.21,0-.89,0-1.77,0-2.79-5.37-.42-10.34-.25-12.85,5.84-.15-.12-.3-.24-.45-.36.12-2.08.24-4.17.36-6.35h30.64c.12,2.12.24,4.22.35,6.32-.14.09-.27.18-.41.27-1.26-2.2-2.51-4.54-5.1-5.12-2.42-.54-4.93-.65-7.66-.98Z",
  evE2: "M419.91,637.11h27.54c.21,2.5.42,5,.63,7.51-.11.04-.21.08-.32.12-.19-.25-.43-.47-.56-.75-1.72-3.72-4.69-5.79-8.71-6.03-3.75-.22-7.53-.05-11.42-.05v18.07c1.57,0,3.12.02,4.67,0,2.15-.04,4.3-.03,6.44-.19,2.62-.19,4.94-.98,5.87-3.94.11.07.23.14.34.21v8.83c-.27-.23-.48-.32-.54-.47-.79-2.23-2.61-3.23-4.72-3.32-3.97-.18-7.94-.05-12.1-.05-.02.29-.08.79-.08,1.3,0,5.34-.02,10.68,0,16.02.01,2.84.7,3.51,3.54,3.51,2.73,0,5.45,0,8.18-.04,4.52-.07,8-1.85,9.94-6.12.13-.29.37-.54.93-.71-.14,2.51-.28,5.01-.42,7.6h-29.2c0-.2-.06-.45,0-.48,2.01-1.21,2.18-3.21,2.18-5.22.03-10.05.03-20.1,0-30.15,0-2.1-.19-4.18-2.55-5.37.12-.09.23-.18.35-.27Z",
  evV: "M458.02,637.08h8.96c-.02.17.03.48-.07.54-1.31.79-1.06,1.93-.65,3.04.84,2.31,1.73,4.6,2.62,6.88,3.16,8.13,6.34,16.26,9.51,24.39.17.42.37.83.68,1.49.29-.62.49-1,.65-1.4,3.48-9.02,6.95-18.04,10.43-27.06.04-.1.08-.19.12-.29,1.54-4.08,1.53-4.27-.47-7.58h6.47c-.05.21-.03.52-.14.57-2.58,1.27-3.61,3.67-4.57,6.13-4.38,11.25-8.73,22.5-13.14,33.74-.22.57-.76,1.25-1.29,1.41-1.12.35-1.15-.81-1.41-1.46-4.34-10.81-8.65-21.64-12.98-32.46-1.14-2.85-2.14-5.78-5.01-7.56.1-.13.19-.25.29-.38Z",
  evI2: "M505.53,637.08h9.26c.02.19.07.36.03.38-2.23,1.36-2.24,3.6-2.25,5.79-.03,9.68-.04,19.35,0,29.03.01,2.26-.22,4.71,2.26,6.25h-9.11c.61-1.33,1.32-2.64,1.81-4.02.25-.71.16-1.55.16-2.33,0-9.57,0-19.15,0-28.72,0-.1,0-.21,0-.31-.11-2.18,0-4.46-2.52-5.71.11-.12.23-.23.34-.35Z",
  evT2: "M538.49,637.95c-5.43-.35-10.42-.25-12.85,5.83l-.46-.33c.1-2.12.19-4.25.29-6.39h30.69c.11,2.16.22,4.25.32,6.34-.15.07-.29.13-.44.2-1.23-2.24-2.55-4.5-5.16-5.08-2.37-.52-4.84-.63-7.48-.94-.05.9-.11,1.44-.12,1.99,0,10.58-.01,21.15,0,31.73,0,1.2-.06,2.47.28,3.59.4,1.29,1.21,2.45,1.84,3.66h-9.29c2.75-1.88,2.33-4.72,2.34-7.31.07-10.58.03-21.15.03-31.73,0-.46,0-.93,0-1.57Z",
  evA: "M602.46,678.57h-9.39c2.35-1.63,1.25-3.28.61-4.87-1.29-3.2-2.66-6.36-3.93-9.57-.37-.93-.88-1.23-1.86-1.22-4.77.05-9.54.05-14.3,0-.99-.01-1.48.28-1.83,1.23-.89,2.4-1.98,4.73-2.84,7.13-.87,2.41-2.51,4.93.78,7.29h-6.91c.13-.26.2-.63.39-.71,2.03-.9,3.12-2.64,3.9-4.54,4.21-10.24,8.4-20.5,12.45-30.8.44-1.11-.05-2.59-.12-4.18,1.06-.49,2.41-1.11,3.93-1.81,1.35,3.22,2.65,6.34,3.95,9.45,3.42,8.2,6.84,16.39,10.27,24.58,1.2,2.88,2.24,5.87,5.18,7.64-.09.12-.18.23-.27.35ZM588.86,662.04c-2.74-6.57-5.41-12.96-8.25-19.74-2.77,6.85-5.34,13.22-7.98,19.74h16.23Z",
};
const ELITE_VITA_PATHS = [LOGO.byB,LOGO.byY,LOGO.evE,LOGO.evL,LOGO.evI,LOGO.evT,LOGO.evE2,LOGO.evV,LOGO.evI2,LOGO.evT2,LOGO.evA];

// Profile photo (Daniel Salewski)
const DANIEL_IMG = "/Daniel_Salewski.png";
const DanielAvatar = ({size=52,border:b}) => { const t = useTheme(); const [err,setErr] = useState(false); return <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",border:b||`2px solid ${t.purple}40`,flexShrink:0,background:`${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center"}}>{err?<span style={{fontSize:size*0.38,fontWeight:700,color:t.t1}}>DS</span>:<img src={DANIEL_IMG} onError={()=>setErr(true)} width={size} height={size} style={{width:size,height:size,objectFit:"cover",display:"block"}} alt=""/>}</div>; };

const EVASymbol = ({ size = 40, color }) => { const c = color || useTheme().logoColor; return <svg width={size} height={size*(267.22/264.57)} viewBox={LOGO.symbolVB}><path d={LOGO.symbolD} fill={c}/></svg>; };
// EVALogo = EVA wordmark only (no "by Elite Vita")
const EVALogo = ({ width = 120, color }) => { const c = color || useTheme().logoColor; return <svg width={width} height={width*(581.48/792.34)} viewBox={LOGO.evaVB}><path d={LOGO.pSym} fill={c}/><path d={LOGO.pE} fill={c}/><path d={LOGO.pV} fill={c}/><path d={LOGO.pA} fill={c}/></svg>; };
// EVAFullLogo = EVA + "by Elite Vita" lockup
const EVAFullLogo = ({ width = 120, color }) => { const c = color || useTheme().logoColor; return <svg width={width} height={width*(685.36/792.34)} viewBox={LOGO.fullVB}><path d={LOGO.pSym} fill={c}/><path d={LOGO.pE} fill={c}/><path d={LOGO.pV} fill={c}/><path d={LOGO.pA} fill={c}/>{ELITE_VITA_PATHS.map((d,i)=><path key={i} d={d} fill={c}/>)}</svg>; };

const FONT = "'Gilroy','Plus Jakarta Sans',-apple-system,sans-serif";
const FONT_URL = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
const CSS = `@import url('${FONT_URL}');*{-webkit-tap-highlight-color:transparent;user-select:none;box-sizing:border-box}::-webkit-scrollbar{width:0}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes pulseGlow{0%,100%{opacity:.4}50%{opacity:.8}}@keyframes resultRing{from{stroke-dashoffset:515}to{stroke-dashoffset:140}}@keyframes evaBioTilePulse{0%,100%{box-shadow:0 0 0 0 rgba(0,173,128,0.25)}50%{box-shadow:0 0 0 8px rgba(0,173,128,0)}}@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }@keyframes bioRingFill{from{stroke-dashoffset:440}to{stroke-dashoffset:0}}@keyframes bioCountUp{from{opacity:0;transform:scale(0.5)}to{opacity:1;transform:scale(1)}}@keyframes bioSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes bioPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,173,128,0.4)}50%{box-shadow:0 0 0 12px rgba(0,173,128,0)}}
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
    @keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}`;

// ── UI Components ──
const Btn = ({ children, variant = "primary", onClick, style = {} }) => {
  const t = useTheme();
  const v = {
    primary: { background: t.brandGrad, color: "#FFF", border: "none" },
    secondary: { background: "transparent", color: t.mode === "dark" ? t.cyan : t.purple, border: `1.5px solid ${t.purple}40` },
    ghost: { background: `${t.cyan}0A`, color: t.mode === "dark" ? t.cyan : t.purple, border: `1px solid ${t.cyan}15` },
    muted: { background: t.s2, color: t.t2, border: `1px solid ${t.b2}` },
  };
  return <div onClick={onClick} style={{ width:"100%",borderRadius:14,padding:"15px 0",textAlign:"center",fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:FONT,transition:"all .2s",letterSpacing:.2,...v[variant],...style }}>{children}</div>;
};

const Label = ({ children, color }) => { const t = useTheme(); return <div style={{ fontSize:11,letterSpacing:2.5,color:color||t.cyan,textTransform:"uppercase",marginBottom:12,fontWeight:700 }}>{children}</div>; };
const Title = ({ children, sub, size = 22 }) => { const t = useTheme(); return <div style={{ marginBottom:sub?20:14 }}><div style={{ fontSize:size,fontWeight:700,color:t.t1,lineHeight:1.22,letterSpacing:-.3 }}>{children}</div>{sub&&<div style={{ fontSize:14,color:t.t2,marginTop:6,lineHeight:1.55 }}>{sub}</div>}</div>; };
const Card = ({ children, glow, onClick, style = {} }) => { const t = useTheme(); return <div onClick={onClick} style={{ background:t.s1,borderRadius:16,padding:18,marginBottom:12,border:glow?`1px solid ${glow}20`:`1px solid ${t.b1}`,cursor:onClick?"pointer":"default",transition:"all .15s",...style }}>{children}</div>; };

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
const InfoModal = ({title,text,onClose}) => {
  const t = useTheme();
  return (
    <div style={{ position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div onClick={onClose} style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(2px)" }}/>
      <div style={{ background:t.s1,borderRadius:20,padding:24,maxWidth:320,width:"100%",position:"relative",border:`1px solid ${t.b1}`,boxShadow:"0 16px 48px rgba(0,0,0,.2)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
          <div style={{ fontSize:17,fontWeight:700,color:t.t1 }}>{title}</div>
          <div onClick={onClose} style={{ width:32,height:32,borderRadius:16,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
        {video&&<div style={{marginBottom:12}}><VideoCard title={`${title}: How It Works`} duration="0:30"/></div>}
        <div style={{ fontSize:14,color:t.t2,lineHeight:1.8 }}>{text}</div>
      </div>
    </div>
  );
};

// Safe area constants
const SAFE_TOP = 52;

// Shared SVG Icons
const PillIcon = ({size=22,color}) => { const t=useTheme(); const cl=color||t.emerald; return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="6" stroke={cl} strokeWidth="1.8" fill={`${cl}10`}/><line x1="6" y1="12" x2="18" y2="12" stroke={cl} strokeWidth="1.5"/><circle cx="12" cy="7" r="1.5" fill={cl}/></svg>; };
const InfoIcon = ({size=18,color}) => { const t=useTheme(); const cl=color||t.purple; return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke={cl} strokeWidth="1.5"/><path d="M9 5.5v.5M9 8v4.5" stroke={cl} strokeWidth="1.5" strokeLinecap="round"/></svg>; };
const CheckIcon = ({size=14,color}) => { const t=useTheme(); const cl=color||"#FFF"; return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M3 7.5l3 3 5-6" stroke={cl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>; };
const ChevronLeft = ({size=14,color}) => { const t=useTheme(); const cl=color||t.t3; return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M9 3l-4 4 4 4" stroke={cl} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; };
const ChevronRight = ({size=12,color}) => { const t=useTheme(); const cl=color||t.t4; return <svg width={size} height={size} viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={cl} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; };
const DNAEmojiIcon = ({size=28}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 28 28" fill="none"><path d="M9 2v24M19 2v24" stroke={t.purple} strokeWidth="1.5"/><path d="M9 7h10M9 14h10M9 21h10" stroke={t.purple} strokeWidth="1.2" strokeLinecap="round"/><circle cx="9" cy="2" r="1.5" fill={t.purple}/><circle cx="19" cy="2" r="1.5" fill={t.purple}/></svg>; };
const BloodDropIcon = ({size=28}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 28 28" fill="none"><path d="M14 3C14 3 6 13 6 18a8 8 0 0016 0c0-5-8-15-8-15z" stroke={t.red} strokeWidth="1.5" fill={`${t.red}10`}/></svg>; };
const ClipboardIcon = ({size=28}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 28 28" fill="none"><rect x="6" y="4" width="16" height="20" rx="2.5" stroke={t.emerald} strokeWidth="1.5"/><path d="M10 2h8v4H10z" fill={t.emerald} rx="1"/><path d="M10 12h8M10 16h5" stroke={t.emerald} strokeWidth="1.2" strokeLinecap="round"/></svg>; };
const EyeIcon = ({open,size=18,color}) => { const t=useTheme(); const cl=color||t.t3; return open ? <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke={cl} strokeWidth="1.5"/><circle cx="10" cy="10" r="2.5" stroke={cl} strokeWidth="1.5"/></svg> : <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke={cl} strokeWidth="1.5"/><path d="M3 17L17 3" stroke={cl} strokeWidth="1.5" strokeLinecap="round"/></svg>; };
const AppleIcon = ({size=20,color}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 24 24" fill={color||t.t1}><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>; };
const GoogleIcon = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;

const TopBar = ({ onBack, right }) => { const t = useTheme(); return <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,minHeight:28,padding:"0 0 4px" }}>{onBack?<div onClick={onBack} style={{ display:"flex",alignItems:"center",gap:8,fontSize:15,color:t.t3,cursor:"pointer",fontWeight:500 }}><ChevronLeft size={14}/> Back</div>:<div/>}{right?<div style={{ fontSize:13,color:t.t3,fontWeight:500 }}>{right}</div>:<div/>}</div>; };

// ── Toast System ──
const ToastCtx = createContext({show:()=>{}});
const useToast = () => useContext(ToastCtx);
const ToastProvider = ({children}) => {
  const t = useTheme();
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type="success") => {
    const id = Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),3000);
  },[]);
  const colors = {success:t.emerald,error:t.red,info:t.purple,warning:t.gold};
  const icons = {
    success:<CheckIcon size={14} color="#FFF"/>,
    error:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/></svg>,
    info:<InfoIcon size={14} color="#FFF"/>,
    warning:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v5M7 10v1" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/></svg>,
  };
  return <ToastCtx.Provider value={{show}}>
    {children}
    <div style={{position:"fixed",top:80,left:16,right:16,zIndex:9999,display:"flex",flexDirection:"column",gap:10,pointerEvents:"none"}}>
      {toasts.map(t2=>(
        <div key={t2.id} style={{background:colors[t2.type],borderRadius:14,padding:"15px 19px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 20px rgba(0,0,0,.25)",animation:"fadeUp .3s ease both",pointerEvents:"auto"}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{icons[t2.type]}</div>
          <span style={{fontSize:15,fontWeight:500,color:"#FFF",flex:1}}>{t2.msg}</span>
        </div>
      ))}
    </div>
  </ToastCtx.Provider>;
};

// ── Loading Button ──
const LoadingBtn = ({children,onClick,loading,variant="primary",style={},...props}) => {
  const t = useTheme();
  if (loading) return <Btn variant={variant} style={{...style,opacity:.7}} {...props}><span style={{display:"inline-flex",gap:6}}><span style={{animation:"pulse 1s ease infinite"}}>.</span><span style={{animation:"pulse 1s ease .2s infinite"}}>.</span><span style={{animation:"pulse 1s ease .4s infinite"}}>.</span></span></Btn>;
  return <Btn variant={variant} onClick={onClick} style={style} {...props}>{children}</Btn>;
};

// ── Skeleton Loader ──
const Skeleton = ({width="100%",height=16,radius=8,style={}}) => {
  const t = useTheme();
  return <div style={{width,height,borderRadius:radius,background:`linear-gradient(90deg,${t.s2} 25%,${t.s3||t.s2}88 50%,${t.s2} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.5s ease infinite",...style}}/>;
};

const SkeletonCard = () => {
  const t = useTheme();
  return <Card style={{padding:16}}>
    <Skeleton width="60%" height={14} style={{marginBottom:12}}/>
    <Skeleton width="100%" height={10} style={{marginBottom:12}}/>
    <Skeleton width="80%" height={10}/>
  </Card>;
};

// ── Empty State ──
const EmptyState = ({icon,title,message}) => {
  const t = useTheme();
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"52px 28px",textAlign:"center"}}>
    <div style={{width:72,height:72,borderRadius:"50%",background:`${t.purple}08`,border:`2px dashed ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>{icon}</div>
    <div style={{fontSize:18,fontWeight:700,color:t.t1,marginBottom:12}}>{title}</div>
    <div style={{fontSize:15,color:t.t2,lineHeight:1.6,maxWidth:260}}>{message}</div>
  </div>;
};

const TabBar = ({ active = "today", onNavigate }) => {
  const t = useTheme();
  const TodayIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={c} strokeWidth="1.5"/><circle cx="10" cy="10" r="3" fill={c}/><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></svg>;
  const BioIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M10 2C10 2 4 8 4 12a6 6 0 0012 0c0-4-6-10-6-10z" stroke={c} strokeWidth="1.5" fill={`${c}15`}/><circle cx="10" cy="12" r="2" fill={c}/></svg>;
  const ProtoIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="5" stroke={c} strokeWidth="1.5" fill={`${c}10`}/><line x1="5" y1="10" x2="15" y2="10" stroke={c} strokeWidth="1.2"/><circle cx="10" cy="6" r="1.5" fill={c}/></svg>;
  const ProfIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke={c} strokeWidth="1.5"/><path d="M3 18c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>;
  const tabs = [
    { id:"today", label:"Today", Ic:TodayIc },
    { id:"results-tab", label:"My Biology", Ic:BioIc },
    { id:"protocol", label:"Protocol", Ic:ProtoIc },
    { id:"profile", label:"Profile", Ic:ProfIc },
  ];
  return (
    <div style={{ display:"flex",justifyContent:"space-around",padding:"10px 0 28px",borderTop:`1px solid ${t.b1}`,background:t.bg,flexShrink:0 }}>
      {tabs.map(tab => {
        const isActive = active===tab.id;
        return (
        <div key={tab.id} onClick={() => onNavigate?.(tab.id)} style={{ textAlign:"center",cursor:"pointer",padding:"6px 16px",position:"relative" }}>
          <div style={{ marginBottom:5,display:"flex",justifyContent:"center",transform:isActive?"scale(1.15) translateY(-2px)":"scale(1) translateY(0)",transition:"transform .25s cubic-bezier(.34,1.56,.64,1)" }}><tab.Ic c={isActive?t.cyan:t.t4}/></div>
          <div style={{ fontSize:12,fontWeight:isActive?700:500,color:isActive?t.cyan:t.t4,letterSpacing:.5,transition:"color .2s, font-weight .2s" }}>{tab.label}</div>
        </div>
      );})}
    </div>
  );
};

// ══════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════


/* Mini DNA helix canvas — reusable identity element */
const MiniDNA = ({w=60,h=40,emerald,gold,cyan}) => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = w; canvas.height = h;
    const cy=h/2, amp=h*0.35, numPts=30, twists=1;
    let f=0, raf;
    const draw = () => {
      f++;
      const rot = f * 0.003;
      ctx.clearRect(0, 0, w, h);
      const s1=[], s2=[];
      for (let i=0; i<numPts; i++) {
        const frac=i/(numPts-1), x=frac*w, a1=frac*Math.PI*2*twists+rot;
        s1.push({x, y:cy+Math.sin(a1)*amp, z:(Math.cos(a1)+1)/2});
        s2.push({x, y:cy+Math.sin(a1+Math.PI)*amp, z:(Math.cos(a1+Math.PI)+1)/2});
      }
      const drawS = (pts, col) => {
        for (let i=0; i<pts.length-1; i++) {
          const a=pts[i], b=pts[i+1], z=(a.z+b.z)/2;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=col; ctx.lineWidth=0.6+z*1.8; ctx.globalAlpha=0.1+z*0.7; ctx.lineCap="round"; ctx.stroke();
        }
      };
      drawS(s1, emerald); drawS(s2, gold);
      for (let i=2; i<numPts-2; i+=5) {
        const a=s1[i], b=s2[i], avgZ=(a.z+b.z)/2;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=emerald; ctx.lineWidth=0.4+avgZ*0.8; ctx.globalAlpha=0.05+avgZ*0.2; ctx.stroke();
      }
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return ()=>cancelAnimationFrame(raf);
  }, [w,h,emerald,gold,cyan]);
  return <canvas ref={ref} style={{ width:w,height:h,display:"block" }}/>;
};

/* DEVA™ segment arcs — 6 segments, 3 colours, matching Opt3 exactly */
const MiniDEVA = ({size=48}) => {
  const t = useTheme();
  const r = 100, circ = 2 * Math.PI * r, gap = 6;
  const segArc = circ / 9;
  const segs = [
    { c: t.purple, pct: 85 },
    { c: t.gold, pct: 75 },
    { c: t.emerald, pct: 90 },
    { c: t.purple, pct: 70 },
    { c: t.gold, pct: 88 },
    { c: t.emerald, pct: 82 },
    { c: t.purple, pct: 78 },
    { c: t.gold, pct: 92 },
    { c: t.emerald, pct: 80 },
  ];
  return (
    <div style={{ width:size, height:size }}>
      <style>{`@keyframes devaRingSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <svg width={size} height={size} viewBox="0 0 240 240">
        <g style={{ transformOrigin:"120px 120px", animation:"devaRingSpin 60s linear infinite" }}>
          {segs.map((seg, i) => {
            const available = segArc - gap;
            const filled = available * (seg.pct / 100);
            const rotation = -90 + i * 40 + (gap / circ) * 180;
            return (
              <g key={i} transform={"rotate(" + rotation + " 120 120)"}>
                <circle cx="120" cy="120" r={r} fill="none" stroke={t.mode==="dark"?t.s2:t.b1} strokeWidth="11" strokeDasharray={available + " " + (circ - available)} />
                <circle cx="120" cy="120" r={r} fill="none" stroke={seg.c} strokeWidth="11" strokeLinecap="round" strokeDasharray={filled + " " + (circ - filled)}>
                  <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur={2 + i * 0.3 + "s"} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};


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

const LearnScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [pg, setPg] = useState(0);
  const [showBrowser, setShowBrowser] = useState(false);
  const DNAIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M16 4v40M32 4v40" stroke={c} strokeWidth="2.2"/><path d="M16 12h16M16 24h16M16 36h16" stroke={c} strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="4" r="2.5" fill={c}/><circle cx="32" cy="4" r="2.5" fill={c}/><circle cx="16" cy="44" r="2.5" fill={c}/><circle cx="32" cy="44" r="2.5" fill={c}/></svg>;
  const BloodIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 4C24 4 8 20 8 30a16 16 0 0032 0c0-10-16-26-16-26z" stroke={c} strokeWidth="2.2" fill={`${c}12`}/><circle cx="24" cy="30" r="6" stroke={c} strokeWidth="2" fill="none"/><circle cx="24" cy="30" r="2" fill={c}/></svg>;
  const SuppIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="14" y="4" width="20" height="40" rx="10" stroke={c} strokeWidth="2.2" fill={`${c}08`}/><line x1="14" y1="24" x2="34" y2="24" stroke={c} strokeWidth="2"/><circle cx="24" cy="14" r="3" fill={c}/><circle cx="24" cy="34" r="2" fill={c} opacity=".5"/></svg>;
  const DEVAIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke={c} strokeWidth="2.2" fill={`${c}08`}/><path d="M16 24h4l3-8 5 16 3-8h4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const ClinicIcL = ({c}) => <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="10" y="12" width="28" height="28" rx="4" stroke={c} strokeWidth="2.2" fill={`${c}08`}/><path d="M24 20v12M18 26h12" stroke={c} strokeWidth="2.2" strokeLinecap="round"/><circle cx="24" cy="8" r="4" stroke={c} strokeWidth="2"/></svg>;
  const pgs = [
    { l:"Your past",ti:"DNA Analysis",c:t.purple,d:"Your DNA is your blueprint. We decode what it means for your healthspan and longevity. We analyse over 200 million genetic variants, including methylation, nutrient processing, and susceptibilities to heart disease, diabetes and dementia.",Ic:DNAIcL },
    { l:"Your present",ti:"Blood Biomarkers",c:t.cyan,d:"We analyse 70+ biomarkers to build a complete picture of your current health: cardiometabolic risk, inflammation and recovery, liver and kidney function, hormones, vitamins, minerals, and methylation status. Not just numbers — interpreted by a qualified clinician.",Ic:BloodIcL },
    { l:"Your future",ti:"Personalised Supplements",c:t.emerald,d:"Your supplement protocol is built directly from your DNA and blood data, targeting what your body actually needs. Delivered monthly, monitored, and continuously adjusted as your biomarkers evolve.",Ic:SuppIcL },
    { l:"Daily Ritual",ti:"DEVA™",c:t.gold,d:"Three insights. Three actions. Three outcomes. Your Daily EVAluation connects your biology to everyday decisions — personalised and evolving.",Ic:()=><MiniDEVA size={48}/> },
    { l:"Expert Oversight",ti:"Clinician-in-the-Loop",c:t.sky||t.cyan,d:"Every protocol is reviewed by a real clinician. Not an algorithm alone — human expertise ensures your plan is safe, effective, and tailored to you.",Ic:ClinicIcL },
  ];
  const p = pgs[pg];
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px`,position:"relative" }}>
      <TopBar onBack={onBack} right={`${pg+1} / ${pgs.length}`}/>
      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
        <div key={pg} style={{ display:"flex",flexDirection:"column",alignItems:"center",animation:"fadeUp .35s ease both" }}>
          <div style={{ width:120,height:120,borderRadius:32,background:`${p.c}0A`,border:`1.5px solid ${p.c}15`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:36 }}><p.Ic c={p.c}/></div>
          <Label color={p.c}>{p.l}</Label>
          <div style={{ fontSize:30,fontWeight:800,color:t.t1,marginBottom:14,textAlign:"center",letterSpacing:-.5 }}>{p.ti}</div>
          <div style={{ fontSize:15,color:t.t2,lineHeight:1.75,textAlign:"center",maxWidth:265 }}>{p.d}</div>
        </div>
      </div>
      <div style={{ paddingBottom:12 }}>
        {pg<pgs.length-1?<Btn onClick={()=>setPg(pg+1)}>Next →</Btn>:<>
          <Btn variant="secondary" onClick={()=>setShowBrowser(true)} style={{ marginBottom:10 }}>Find Out More →</Btn>
          <Btn onClick={()=>onNavigate("create-account")}>Get Started →</Btn>
        </>}
        <div style={{ display:"flex",justifyContent:"center",gap:10,marginTop:16 }}>
          {pgs.map((_,i)=><div key={i} onClick={()=>setPg(i)} style={{ width:pg===i?28:8,height:4,borderRadius:2,cursor:"pointer",background:pg===i?pgs[pg].c:t.b2,transition:"all .3s" }}/>)}
        </div>
      </div>
      {showBrowser&&<div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:t.bg,zIndex:50,display:"flex",flexDirection:"column",animation:"fadeUp .25s ease both" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:`${SAFE_TOP}px 16px 10px`,borderBottom:`1px solid ${t.b1}`,flexShrink:0 }}>
          <div onClick={()=>setShowBrowser(false)} style={{ fontSize:15,color:t.purple,cursor:"pointer",fontWeight:600 }}>Done</div>
          <div style={{ fontSize:13,color:t.t3,fontWeight:500,display:"flex",alignItems:"center",gap:6 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1" width="8" height="8" rx="1.5" stroke={t.emerald} strokeWidth="1.3"/><path d="M3 5l1.5 1.5L7 4" stroke={t.emerald} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            eva.ae
          </div>
          <div onClick={()=>window.open("https://eva.ae","_blank")} style={{ cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4M9 2h5v5M7 9l7-7" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        <div style={{ flex:1,overflowY:"auto",background:"#FFFFFF" }}>
          <div style={{ background:"linear-gradient(180deg, #4623BE 0%, #1a0e4e 100%)",padding:"52px 28px 44px",textAlign:"center" }}>
            <div style={{ display:"flex",justifyContent:"center" }}><EVAFullLogo width={100} color="#FFFFFF"/></div>
            <div style={{ fontSize:26,fontWeight:300,color:"#FFFFFF",marginTop:20,letterSpacing:-.3,lineHeight:1.4,fontFamily:"Gilroy,sans-serif" }}>Clinically Guided<br/>Longevity</div>
            <div style={{ fontSize:14,color:"rgba(255,255,255,.6)",marginTop:12,lineHeight:1.7,maxWidth:260,margin:"12px auto 0" }}>Biohacking and longevity science, made accessible. Backed by Elite Vita, Dubai.</div>
            <div style={{ marginTop:24,background:"#FFFFFF",borderRadius:24,padding:"15px 36px",display:"inline-block",fontSize:15,fontWeight:600,color:"#4623BE" }}>Get the App</div>
          </div>
          <div style={{ padding:"36px 28px",textAlign:"center" }}>
            <div style={{ fontSize:13,fontWeight:700,color:"#4623BE",letterSpacing:2,marginBottom:16 }}>THREE PILLARS</div>
            <div style={{ display:"flex",gap:18,justifyContent:"center",marginBottom:32 }}>
              {[{l:"DNA",s:"Your past"},{l:"Blood",s:"Your present"},{l:"Supplements",s:"Your future"}].map(p=>(
                <div key={p.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:18,fontWeight:700,color:"#4623BE",marginBottom:12,width:40,height:40,borderRadius:"50%",background:"#4623BE12",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto" }}>{p.l[0]}</div>
                  <div style={{ fontSize:15,fontWeight:700,color:"#1a1a2e" }}>{p.l}</div>
                  <div style={{ fontSize:12,color:"#6b7280",marginTop:2 }}>{p.s}</div>
                </div>
              ))}
            </div>
            <div style={{ height:1,background:"#e5e7eb",margin:"0 auto 32px",maxWidth:200 }}/>
            <div style={{ fontSize:20,fontWeight:600,color:"#1a1a2e",marginBottom:20,fontFamily:"Gilroy,sans-serif" }}>How it works</div>
            {["Book your biology test","Receive personalised results","Daily insights via DEVA™","Re-test every 90 days"].map((s,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:16,marginBottom:16,textAlign:"left" }}>
                <div style={{ width:28,height:28,borderRadius:"50%",background:"#4623BE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#FFF",flexShrink:0 }}>{i+1}</div>
                <div style={{ fontSize:15,color:"#374151",lineHeight:1.5 }}>{s}</div>
              </div>
            ))}
            <div style={{ height:1,background:"#e5e7eb",margin:"32px auto",maxWidth:200 }}/>
            <div style={{ fontSize:22,fontWeight:700,color:"#4623BE",marginBottom:4 }}>USD 1,999</div>
            <div style={{ fontSize:13,color:"#6b7280",marginBottom:20 }}>Core Package · DNA test + Blood tests (6-monthly) + Personalised recommendations</div>
            <div style={{ background:"linear-gradient(135deg, #4623BE 0%, #9717CC 40%, #00EFE3 100%)",borderRadius:24,padding:"14px 0",fontSize:16,fontWeight:600,color:"#FFF" }}>Download EVA™</div>
            <div style={{ marginTop:32,paddingTop:24,borderTop:"1px solid #e5e7eb" }}>
              <div style={{ fontSize:12,color:"#9ca3af",lineHeight:1.8 }}>EVA™ by Elite Vita Health L.L.C-FZ<br/>Dubai, UAE · eva.ae<br/><br/>EVA™ is a wellness platform designed to support health optimisation. It is not intended to diagnose, treat, cure, or prevent any disease.</div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

const SignInScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [form, setForm] = useState({email:"",pass:""});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socialAuth, setSocialAuth] = useState(null);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const handleSignIn = () => { setLoading(true); setTimeout(()=>onNavigate("otp-verify"),300); };
  const handleSocial = (provider) => { setSocialAuth(provider); setTimeout(()=>onNavigate("welcome-back"),1500); };
  const u = (k,v) => setForm({...form,[k]:v});
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px`,position:"relative" }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:20 }}><EVAFullLogo width={70} /></div>
      <Title sub="Welcome back to your longevity journey.">Sign In</Title>
      <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>EMAIL</div>
          <input value={form.email} onChange={e=>u("email",e.target.value)} placeholder="you@example.com" type="email" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${form.email.length>0?(emailValid?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          {form.email.length>0&&!emailValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter a valid email address</div>}
        </div>
        <div style={{ marginBottom:6 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>PASSWORD</div>
          <div style={{ position:"relative" }}>
            <input value={form.pass} onChange={e=>u("pass",e.target.value)} placeholder="Enter your password" type={showPass?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
            <div onClick={()=>setShowPass(!showPass)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showPass}/></div>
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          {error&&<div style={{ fontSize:13,color:t.red,fontWeight:500,flex:1 }}>{error}</div>}
          <div onClick={()=>onNavigate("forgot-password")} style={{ fontSize:14,color:t.purple,cursor:"pointer",fontWeight:500,marginLeft:"auto" }}>Forgot password?</div>
        </div>
        <LoadingBtn loading={loading} onClick={handleSignIn}>Sign In</LoadingBtn>
        <div style={{ display:"flex",alignItems:"center",gap:14,margin:"16px 0" }}>
          <div style={{ flex:1,height:1,background:t.b2 }}/><span style={{ fontSize:13,color:t.t3,fontWeight:500 }}>or continue with</span><div style={{ flex:1,height:1,background:t.b2 }}/>
        </div>
        <div onClick={()=>handleSocial("Apple")} style={{ background:"#000",border:"1px solid #000",borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer",marginBottom:8 }}>
          <AppleIcon size={24} color="#FFF"/><span style={{ fontSize:15,fontWeight:600,color:"#FFF" }}>Continue with Apple</span>
        </div>
        <div onClick={()=>handleSocial("Google")} style={{ background:t.s2,border:`1px solid ${t.b2}`,borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer" }}>
          <GoogleIcon size={18}/><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Continue with Google</span>
        </div>
      </div>
      <div style={{ textAlign:"center",fontSize:14,color:t.t3,paddingBottom:12 }}>Don't have an account? <span style={{ color:t.cyan,cursor:"pointer",fontWeight:600 }} onClick={()=>onNavigate("create-account")}>Get Started</span></div>
      {socialAuth&&<div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:`${t.bg}F2`,zIndex:50,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"fadeUp .2s ease both" }}>
        <div style={{ width:56,height:56,borderRadius:"50%",background:socialAuth==="Apple"?"#000":t.s2,border:socialAuth==="Google"?`1px solid ${t.b2}`:"none",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}>
          {socialAuth==="Apple"?<AppleIcon size={24} color="#FFF"/>:<GoogleIcon size={24}/>}
        </div>
        <div style={{ fontSize:17,fontWeight:600,color:t.t1,marginBottom:8 }}>Signing in with {socialAuth}</div>
        <div style={{ width:32,height:32,borderRadius:"50%",border:`2.5px solid ${t.b2}`,borderTopColor:t.purple,animation:"spin 1s linear infinite" }}/>
      </div>}
    </div>
  );
};

const OTPVerifyScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [code, setCode] = useState(["","","","","",""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resent, setResent] = useState(false);
  const [method, setMethod] = useState("sms");
  const handleVerify = () => { setLoading(true); setError(null); setTimeout(()=>onNavigate("biometric-prompt"),300); };
  const handleResend = () => { setResent(true); setError(null); setCode(["","","","","",""]); setTimeout(()=>setResent(false),3000); };
  const toggleMethod = () => { setMethod(m=>m==="sms"?"email":"sms"); setCode(["","","","","",""]); setError(null); setResent(false); };
  const updateDigit = (idx, val) => {
    if (val.length > 1) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
  };
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}><EVAFullLogo width={80} /></div>
      <Title sub={method==="sms"?"We've sent a 6-digit code to +971 50 ••• ••••":"We've sent a 6-digit code to d•••••@eva.ae"}>Verify Your Identity</Title>
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center" }}>
        <div style={{ display:"flex",gap:12,marginBottom:28 }}>
          {code.map((d,i)=>(
            <input key={i} value={d} onChange={e=>updateDigit(i,e.target.value)} maxLength={1} inputMode="numeric" style={{ width:44,height:52,textAlign:"center",fontSize:24,fontWeight:700,color:t.t1,background:t.s2,border:`1.5px solid ${d?t.purple:t.b2}`,borderRadius:12,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          ))}
        </div>
        {error&&<div style={{ textAlign:"center",marginBottom:12,fontSize:14,color:t.red,fontWeight:500 }}>{error}</div>}
        <div style={{ textAlign:"center",marginBottom:24 }}>
          {resent?<span style={{ fontSize:14,color:t.emerald,fontWeight:500 }}>New code sent!</span>:<>
          <span style={{ fontSize:14,color:t.t2 }}>Didn't receive a code? </span>
          <span onClick={handleResend} style={{ fontSize:14,color:t.purple,cursor:"pointer",fontWeight:600 }}>Resend</span></>}
        </div>
        <div style={{ width:"100%" }}><LoadingBtn loading={loading} onClick={handleVerify}>Verify</LoadingBtn></div>
      </div>
      <div style={{ textAlign:"center",fontSize:12,color:t.t4,paddingBottom:12 }}>Verification via {method==="sms"?"SMS":"email"}. <span onClick={toggleMethod} style={{ color:t.purple,cursor:"pointer",fontWeight:600 }}>Use {method==="sms"?"email":"SMS"} instead</span></div>
    </div>
  );
};


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

const ForgotPasswordScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const fEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:20 }}><EVAFullLogo width={70} /></div>
      {!sent ? (
        <>
          <Title sub="Enter your email and we'll send you a reset link.">Reset Password</Title>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>EMAIL</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" type="email" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
          </div>
          <div style={{ flexShrink:0,paddingBottom:8 }}><Btn onClick={fEmailValid?()=>setSent(true):undefined} style={{ opacity:fEmailValid?1:.4 }}>Send Reset Link</Btn></div>
        </>
      ) : (
        <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
          <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.emerald}12`,border:`2px solid ${t.emerald}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:24 }}>✉</div>
          <div style={{ fontSize:22,fontWeight:700,color:t.t1,marginBottom:12,textAlign:"center" }}>Check Your Email</div>
          <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,maxWidth:260,marginBottom:32 }}>We've sent a password reset link to <span style={{ color:t.t1,fontWeight:600 }}>{email || "your email"}</span>.</div>
          <Btn variant="secondary" onClick={onBack}>Back to Sign In</Btn>
        </div>
      )}
    </div>
  );
};

const BookTestScreen = ({ onNavigate, onBack, subTarget, clearSubTarget }) => {
  const t = useTheme();
  const [loc, setLoc] = useState("home");
  const [pkg, setPkg] = useState("elite");
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(0);
  const [step, setStep] = useState("form");
  const [cardForm, setCardForm] = useState({number:"",expiry:"",cvc:"",name:""});
  const uc = (k,v) => setCardForm({...cardForm,[k]:v});
  const [addrCountry, setAddrCountry] = useState("United Arab Emirates");
  const [addrCity, setAddrCity] = useState("");
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [idType, setIdType] = useState("eid");
  const [eidVal, setEidVal] = useState("");
  const [passportVal, setPassportVal] = useState("");
  const [idUpload, setIdUpload] = useState("none"); // none | picking | loading | done
  const formatEid = (v) => { const d = v.replace(/\D/g,"").slice(0,15); let r = ""; if(d.length>0) r=d.slice(0,3); if(d.length>3) r+="-"+d.slice(3,7); if(d.length>7) r+="-"+d.slice(7,14); if(d.length>14) r+="-"+d.slice(14,15); return r; };
  const areaMap = {"United Arab Emirates":["Dubai","Abu Dhabi","Sharjah","Ajman","Ras Al Khaimah","Fujairah","Umm Al Quwain"],"Saudi Arabia":["Riyadh","Jeddah","Dammam","Mecca","Medina","Khobar"],"Bahrain":["Manama","Muharraq","Riffa"],"Kuwait":["Kuwait City","Hawalli","Salmiya"],"Oman":["Muscat","Salalah","Sohar"],"Qatar":["Doha","Al Wakrah","Al Khor"]};
  const idValid = idType==="eid" ? eidVal.length===18 : passportVal.length>=5;
  const addrValid = addrLine1.trim()&&addrLine2.trim()&&addrCity;
  const bookingValid = addrValid && idValid && day>=0 && time>=0;
  useEffect(()=>{if(subTarget){setStep(subTarget);clearSubTarget?.()}},[subTarget]);

  // Processing screen
  if (step==="processing") return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px` }}>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:32 }}><EVAFullLogo width={80}/></div>
      <div style={{ width:64,height:64,borderRadius:"50%",border:`3px solid ${t.s2}`,borderTopColor:t.purple,animation:"spin 1s linear infinite",marginBottom:28 }}/>
      <div style={{ fontSize:20,fontWeight:700,color:t.t1,marginBottom:8 }}>Processing Payment</div>
      <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.6 }}>Securely processing via Stripe. Do not close the app.</div>
    </div>
  );

  // Payment screen
  if (step==="payment") return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={()=>setStep("form")}/>
      <Title sub="All transactions are encrypted and processed securely.">Payment Details</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card style={{ background:`${t.purple}06`,border:`1px solid ${t.purple}15`,marginBottom:20 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{pkg==="bloodintel"?"Blood Intelligence":pkg==="core"?"Elite Core":pkg==="elite"?"Elite":"Blood Intelligence"}</span>
            <span style={{ fontSize:18,fontWeight:700,color:t.t1 }}>{pkg==="bloodintel"?"USD 399":pkg==="blood"?"USD 399":pkg==="elite"?"USD 2,699":"USD 1,999"}</span>
          </div>
        </Card>
        <div onClick={()=>{setStep("processing");setTimeout(()=>setStep("confirmed"),1500)}} style={{ background:"#000",border:"1px solid #000",borderRadius:12,padding:"16px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",marginBottom:10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          <span style={{ fontSize:16,fontWeight:600,color:"#FFF" }}>Apple Pay</span>
        </div>
        <div onClick={()=>{setStep("processing");setTimeout(()=>setStep("confirmed"),1500)}} style={{ background:"#FFF",border:"1px solid #dadce0",borderRadius:12,padding:"16px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",marginBottom:16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span style={{ fontSize:16,fontWeight:600,color:"#3c4043" }}>Google Pay</span>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:16 }}>
          <input placeholder="Promo code" style={{ flex:1,boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"14px 17px",border:`1px solid ${t.b2}`,fontSize:14,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
          <div style={{ background:`${t.purple}12`,border:`1px solid ${t.purple}25`,borderRadius:10,padding:"14px 19px",fontSize:14,fontWeight:600,color:t.purple,cursor:"pointer" }}>Apply</div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:16 }}>
          <div style={{ flex:1,height:1,background:t.b2 }}/><span style={{ fontSize:13,color:t.t3,fontWeight:500 }}>or pay with card</span><div style={{ flex:1,height:1,background:t.b2 }}/>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CARD NUMBER</div>
          <div style={{ position:"relative" }}>
            <input value={cardForm.number} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(\d{4})/g,"$1 ").trim();uc("number",v)}} placeholder="1234 5678 9012 3456" inputMode="numeric" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 54px 17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1 }}/>
            <div style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",display:"flex",gap:6 }}>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><rect width="24" height="16" rx="2" fill="#1A1F71"/><circle cx="9" cy="8" r="5" fill="#EB001B" opacity=".8"/><circle cx="15" cy="8" r="5" fill="#F79E1B" opacity=".8"/></svg>
            </div>
          </div>
        </div>
        <div style={{ display:"flex",gap:14,marginBottom:16 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>EXPIRY</div>
            <input value={cardForm.expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);if(v.length>=3)v=v.slice(0,2)+"/"+v.slice(2);uc("expiry",v)}} placeholder="MM/YY" inputMode="numeric" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1 }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CVC</div>
            <input value={cardForm.cvc} onChange={e=>uc("cvc",e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" inputMode="numeric" type="password" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:2 }}/>
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CARDHOLDER NAME</div>
          <input value={cardForm.name} onChange={e=>uc("name",e.target.value)} placeholder="Name on card" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
        </div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"16px 0 8px",borderTop:`1px solid ${t.b1}`,marginTop:8 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="10" rx="2" stroke={t.t3} strokeWidth="1.3"/><path d="M5 4V3a3 3 0 016 0v1" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="9.5" r="1.5" fill={t.t3}/></svg>
          <span style={{ fontSize:12,color:t.t4 }}>Powered by</span>
          <span style={{ fontSize:14,fontWeight:700,color:t.t3,letterSpacing:.5 }}>stripe</span>
          <span style={{ fontSize:12,color:t.t4 }}>· 256-bit SSL · PCI DSS</span>
        </div>
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        <div style={{ fontSize:12,color:t.t3,textAlign:"center",marginBottom:12,lineHeight:1.6 }}>By proceeding, you agree to our <span style={{color:t.purple,cursor:"pointer",textDecoration:"underline"}} onClick={(e)=>{e.stopPropagation();toast.show("Full refund within 14 days of purchase if tests not yet completed. Contact support@eva.com","info")}}>refund policy</span></div><Btn onClick={()=>{setStep("processing");setTimeout(()=>setStep("confirmed"),1500)}}>{pkg==="bloodintel"?"Pay USD 399":pkg==="blood"?"Pay USD 399":pkg==="elite"?"Pay USD 2,699":"Pay USD 1,999"}</Btn>
      </div>
    </div>
  );

  if (step==="confirmed") return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 24px` }}>
      <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.emerald}12`,border:`2px solid ${t.emerald}30`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24 }}><CheckIcon size={32} color={t.emerald}/></div>
      <div style={{ fontSize:24,fontWeight:700,color:t.t1,marginBottom:12,textAlign:"center" }}>Booking Confirmed</div>
      <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,maxWidth:280,marginBottom:32 }}>Your appointment is confirmed. We'll send a confirmation to your email.</div>
      <Card style={{ width:"100%",marginBottom:16 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}><span style={{ fontSize:13,color:t.t3 }}>Time</span><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>10:00 AM</span></div>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}><span style={{ fontSize:13,color:t.t3 }}>Date</span><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{day>0?day:"6"} {["March","April","May","June","July","August","September","October","November","December"][month]} 2026</span></div>
        <div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ fontSize:13,color:t.t3 }}>Location</span><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{"Home Visit"}</span></div>
      </Card>
      <Btn onClick={()=>{const d=new Date();d.setDate(d.getDate()+7);const ds=d.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";const de=new Date(d.getTime()+3600000).toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=EVA+Biology+Test&dates="+ds+"/"+de+"&location=Dubai+Healthcare+City&details=EVA+biology+test+appointment","_blank")}} variant="secondary" style={{ width:"100%",marginBottom:10 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke={t.purple} strokeWidth="1.3"/><path d="M5 1v3M11 1v3M2 7h12" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span>Add to Calendar</span>
        </div>
      </Btn>
      <Btn onClick={()=>onNavigate("fanfare")} style={{ width:"100%" }}>Continue →</Btn>
    </div>
  );
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub={"One appointment. DNA and 70+ blood biomarkers analysed."}>Book Your Biology Test</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
                <Label>Package <span style={{color:t.red,fontSize:11}}>*</span></Label>
        {/* Tier toggle */}
        <div style={{ display:"flex",gap:6,marginBottom:14,background:t.s2,borderRadius:10,padding:3 }}>
          <div style={{ fontSize:13,fontWeight:600,color:t.t1 }}>Select Package</div>
        </div>
        <div style={{ marginTop:14,marginBottom:20 }}>
            {[{id:"elite",n:"Elite",p:"USD 2,699",s:"DNA + Blood (quarterly)",tag:"RECOMMENDED",feat:["DNA analysis + 70+ biomarker blood panel","Quarterly blood monitoring (4x/year)","Clinician review + personalised protocol","DEVA™ daily insights"]},{id:"core",n:"Elite Core",p:"USD 1,999",s:"DNA + Blood (6-monthly)",tag:null,feat:["DNA analysis + 70+ biomarker blood panel","6-monthly blood monitoring (2x/year)","Clinician review + personalised protocol","DEVA™ daily insights"]},{id:"blood",n:"Blood Intelligence",p:"USD 399",s:"70+ biomarkers, no DNA",tag:null,feat:["70+ biomarker blood panel","Clinician review + personalised protocol","DEVA™ daily insights","No DNA analysis"]}].map(p=>(
              <div key={p.id} onClick={()=>setPkg(p.id)} style={{ background:pkg===p.id?`${t.purple}08`:t.s1,border:`1.5px solid ${pkg===p.id?t.purple:t.b1}`,borderRadius:14,padding:"14px 16px",cursor:"pointer",transition:"all .2s",position:"relative",marginBottom:8 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${pkg===p.id?t.purple:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center" }}>{pkg===p.id&&<div style={{ width:10,height:10,borderRadius:"50%",background:t.purple }}/>}</div>
                    <div><div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{p.n}</div><div style={{ fontSize:12,color:t.t3 }}>{p.s}</div></div>
                  </div>
                  <div style={{ textAlign:"right" }}><div style={{ fontSize:16,fontWeight:800,color:t.purple }}>{p.p}</div>{p.tag&&<div style={{ fontSize:9,fontWeight:700,color:t.purple,background:`${t.purple}12`,padding:"2px 8px",borderRadius:4,marginTop:2 }}>{p.tag}</div>}</div>
                </div>
                {pkg===p.id&&<div style={{ marginTop:10,paddingTop:10,borderTop:`1px solid ${t.b1}` }}>{p.feat.map((f,fi)=><div key={fi} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:t.t2 }}><CheckIcon size={10} color={t.emerald}/>{f}</div>)}</div>}
              </div>
            ))}
          </div>


        <Label>Location</Label>
        <div style={{ background:`${t.purple}12`,border:`1.5px solid ${t.purple}`,borderRadius:14,padding:"17px 15px",textAlign:"center",marginBottom:20 }}>
          <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Home Visit</div>
          <div style={{ fontSize:12,color:t.t3,marginTop:3 }}>We come to you</div>
        </div>
        <div style={{marginBottom:20}}>
          <Label>Home Visit Address <span style={{color:t.red,fontSize:11}}>*</span></Label>
          <input value={addrLine1} onChange={e=>setAddrLine1(e.target.value)} placeholder="Building / Villa name or number *" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:8}}/>
          <input value={addrLine2} onChange={e=>setAddrLine2(e.target.value)} placeholder="Street / Area *" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:8}}/>
          <input placeholder="District / Neighbourhood" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:8}}/>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <div style={{flex:1}}>
              <select value={addrCountry} onChange={e=>{setAddrCountry(e.target.value);setAddrCity("")}} style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:t.t1,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
                {Object.keys(areaMap).map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{flex:1}}>
              <select value={addrCity} onChange={e=>setAddrCity(e.target.value)} style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:15,color:addrCity?t.t1:t.t3,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
                <option value="">{({"United Arab Emirates":"Emirate","Saudi Arabia":"Region","Bahrain":"Governorate","Kuwait":"Governorate","Oman":"Governorate","Qatar":"Municipality"})[addrCountry]||"Area"} *</option>
                {(areaMap[addrCountry]||[]).map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,padding:"12px 14px",background:t.s1,borderRadius:12,border:`1px solid ${t.b1}`}}>
            <div><div style={{fontSize:14,fontWeight:600,color:t.t1}}>Deliver supplements to this address?</div><div style={{fontSize:12,color:t.t3,marginTop:2}}>If no, you can set a different delivery address in Profile Settings.</div></div>
            <div style={{width:44,height:26,borderRadius:13,background:t.purple,padding:2,cursor:"pointer",flexShrink:0,marginLeft:12}}><div style={{width:22,height:22,borderRadius:"50%",background:"#FFF",transform:"translateX(18px)",transition:"transform .2s"}}/></div>
          </div>
        </div>
        <div style={{marginBottom:20}}>
          <Label>Identity Document <span style={{color:t.red,fontSize:11}}>*</span></Label>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {[{id:"eid",l:"Emirates ID"},{id:"passport",l:"Passport"}].map(t2=>(
              <div key={t2.id} onClick={()=>setIdType(t2.id)} style={{flex:1,background:idType===t2.id?`${t.purple}12`:t.s2,border:`1.5px solid ${idType===t2.id?t.purple:t.b2}`,borderRadius:10,padding:"11px 0",textAlign:"center",fontSize:14,fontWeight:600,color:idType===t2.id?t.purple:t.t1,cursor:"pointer",transition:"all .2s"}}>{t2.l}</div>
            ))}
          </div>
          {idType==="eid"?<>
            <div style={{fontSize:12,color:t.t3,marginBottom:8,fontWeight:600,letterSpacing:.5}}>EMIRATES ID NUMBER</div>
            <input value={eidVal} onChange={e=>setEidVal(formatEid(e.target.value))} placeholder="784-XXXX-XXXXXXX-X" inputMode="numeric" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${eidVal.length===18?t.emerald:t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1,transition:"border .2s"}}/>
            {eidVal.length>0&&eidVal.length<18&&<div style={{fontSize:12,color:t.gold,marginTop:6,fontWeight:500}}>Format: 784-XXXX-XXXXXXX-X (15 digits)</div>}
            {eidVal.length===18&&<div style={{fontSize:12,color:t.emerald,marginTop:6,fontWeight:500}}>Valid format</div>}
          </>:<>
            <div style={{fontSize:12,color:t.t3,marginBottom:8,fontWeight:600,letterSpacing:.5}}>PASSPORT NUMBER</div>
            <input value={passportVal} onChange={e=>setPassportVal(e.target.value.toUpperCase().slice(0,12))} placeholder="e.g. AB1234567" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",letterSpacing:1}}/>
          </>}

          <div style={{marginTop:12}}>
            <div style={{fontSize:12,color:t.t3,marginBottom:8,fontWeight:600,letterSpacing:.5}}>UPLOAD {idType==="eid"?"EMIRATES ID":"PASSPORT"} IMAGE</div>
            {idUpload==="done"?
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:`${t.emerald}06`,borderRadius:12,border:`1.5px solid ${t.emerald}25`}}>
                <div style={{width:44,height:44,borderRadius:8,background:`${t.purple}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke={t.purple} strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="2" stroke={t.purple} strokeWidth="1.3"/><path d="M3 16l5-5 4 4 3-3 6 6" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600,color:t.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{idType==="eid"?"emirates_id_front.jpg":"passport_scan.jpg"}</div>
                  <div style={{fontSize:12,color:t.emerald,fontWeight:500}}>Uploaded successfully</div>
                </div>
                <div onClick={()=>setIdUpload("none")} style={{fontSize:12,color:t.red,cursor:"pointer",fontWeight:600,flexShrink:0}}>Remove</div>
              </div>
            :idUpload==="loading"?
              <div style={{border:`2px dashed ${t.purple}`,borderRadius:12,padding:"20px 16px",textAlign:"center",background:`${t.purple}04`}}>
                <div style={{width:28,height:28,borderRadius:"50%",border:`2.5px solid ${t.s2}`,borderTopColor:t.purple,animation:"spin 1s linear infinite",margin:"0 auto 8px"}}/>
                <div style={{fontSize:13,color:t.purple,fontWeight:500}}>Processing image...</div>
              </div>
            :idUpload==="picking"?
              <div style={{borderRadius:14,overflow:"hidden",border:`1px solid ${t.b2}`,background:t.s1}}>
                {[{l:"Take Photo",ic:"M12 15.2V3m0 0L8 7m4-4l4 4",sub:"Open camera"},{l:"Photo Library",ic:"M3 3h18v18H3zM3 16l5-5 4 4 3-3 6 6M8.5 8.5a2 2 0 110 .01",sub:"Choose existing"},{l:"Browse Files",ic:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",sub:"PDF, JPG, PNG"}].map((opt,oi)=>(
                  <div key={oi} onClick={()=>{setIdUpload("loading");setTimeout(()=>setIdUpload("done"),1200)}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer",borderBottom:oi<2?`1px solid ${t.b1}`:"none"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={opt.ic} stroke={t.purple} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div><div style={{fontSize:15,fontWeight:600,color:t.t1}}>{opt.l}</div><div style={{fontSize:12,color:t.t3}}>{opt.sub}</div></div>
                  </div>
                ))}
                <div onClick={()=>setIdUpload("none")} style={{padding:"12px 16px",textAlign:"center",borderTop:`1px solid ${t.b1}`,cursor:"pointer"}}>
                  <span style={{fontSize:14,fontWeight:600,color:t.t3}}>Cancel</span>
                </div>
              </div>
            :
              <div onClick={()=>setIdUpload("picking")} style={{border:`2px dashed ${t.b2}`,borderRadius:12,padding:"16px",textAlign:"center",cursor:"pointer",background:t.s1,transition:"all .2s"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={t.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{fontSize:14,fontWeight:600,color:t.purple}}>Tap to upload</span>
                  <span style={{fontSize:12,color:t.t3}}>JPG / PNG</span>
                </div>
              </div>
            }
          </div>
          <div style={{fontSize:12,color:t.t3,marginTop:8}}>Required for blood test registration at the laboratory.</div>
        </div>
        <Label>Month <span style={{color:t.red,fontSize:11}}>*</span></Label>
        <div style={{ display:"flex",gap:0,overflowX:"auto",marginBottom:20,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none" }}>
          {["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i)=>(
            <div key={i} onClick={()=>{setMonth(i);setDay(-1)}} style={{ flexShrink:0,padding:"10px 19px",borderRadius:20,background:month===i?t.purple:"transparent",fontSize:14,fontWeight:month===i?700:500,color:month===i?"#FFF":t.t3,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap" }}>{m} {"2026"}</div>
          ))}
        </div>
        <Label>Day <span style={{color:t.red,fontSize:11}}>*</span></Label>
        <div style={{ display:"flex",gap:8,overflowX:"auto",marginBottom:20,paddingBottom:4,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none" }}>
          {(()=>{
            const dim=[31,28,31,30,31,30,31,31,30,31,30,31][month];
            const dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const yr=2025;
            return Array.from({length:dim},(_,i)=>{
              const d=i+1;
              const dt=new Date(yr,month,d);
              const wd=dt.getDay();
              const isWE=wd===0||wd===6;
              const past=month<1||(month===1&&d<3);
              const avail=!isWE&&!past;
              return <div key={d} onClick={avail?()=>setDay(d):undefined} style={{ flexShrink:0,width:44,textAlign:"center",padding:"8px 0",borderRadius:12,background:day===d?t.purple:avail?"transparent":"transparent",border:day===d?`1.5px solid ${t.purple}`:"1.5px solid transparent",cursor:avail?"pointer":"default",opacity:avail?1:.3,transition:"all .15s" }}>
                <div style={{ fontSize:11,color:day===d?"#FFF":t.t3,fontWeight:500,marginBottom:3 }}>{dayNames[wd]}</div>
                <div style={{ fontSize:18,fontWeight:day===d?700:600,color:day===d?"#FFF":t.t1 }}>{d}</div>
              </div>;
            });
          })()}
        </div>
        <Label>Time <span style={{color:t.red,fontSize:11}}>*</span></Label>
        <div style={{ display:"flex",gap:8,overflowX:"auto",marginBottom:20,paddingBottom:4,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none" }}>
          {["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30"].map((tm,i)=>(
            <div key={i} onClick={()=>setTime(i)} style={{ flexShrink:0,padding:"10px 17px",borderRadius:10,background:time===i?`${t.purple}15`:"transparent",border:`1.5px solid ${time===i?t.purple:t.b2}`,fontSize:14,fontWeight:time===i?600:500,color:time===i?t.purple:t.t1,cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap" }}>{tm}{i<8?" AM":" PM"}</div>
          ))}
        </div>
      </div>
      <div style={{ flexShrink:0,paddingTop:12,paddingBottom:8 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"0 4px" }}>
          <span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{pkg==="bloodintel"?"Blood Intelligence":pkg==="core"?"Elite Core":pkg==="elite"?"Elite":"Blood Intelligence"}</span>
          <span style={{ fontSize:17,fontWeight:700,color:t.purple }}>{pkg==="bloodintel"?"USD 399":pkg==="blood"?"USD 399":pkg==="elite"?"USD 2,699":"USD 1,999"}</span>
        </div>
        <Btn onClick={bookingValid?()=>setStep("payment"):undefined} style={{opacity:bookingValid?1:.4}}>Proceed to Payment</Btn>
      </div>
    </div>
  );
};

const CreateAccountScreen = ({ onNavigate, onBack, gender, setGender }) => {
  const t = useTheme();
  const [pdplOpen, setPdplOpen] = useState(false);
  const [form, setForm] = useState({name:"",email:"",phone:"",pass:""});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCreate = () => { setLoading(true); setTimeout(()=>onNavigate("email-verify"),400); };
  const [countryCode, setCountryCode] = useState("+971");
  const [codeOpen, setCodeOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const selGender = gender || "male";
  const u = (k,v) => setForm({...form,[k]:v});
  const codes = [
    {c:"+971",f:"🇦🇪",n:"UAE",ph:"50 XXX XXXX",top:true},
    {c:"+966",f:"🇸🇦",n:"KSA",ph:"5X XXX XXXX",top:true},
    {c:"+44",f:"🇬🇧",n:"GBR",ph:"7XXX XXXXXX",top:true},
    {c:"+1",f:"🇺🇸",n:"USA",ph:"(XXX) XXX-XXXX",top:true},
    {c:"+91",f:"🇮🇳",n:"IND",ph:"XXXXX XXXXX",top:true},
    {c:"---"},
    {c:"+93",f:"🇦🇫",n:"AFG",ph:"XX XXX XXXX"},
    {c:"+355",f:"🇦🇱",n:"ALB",ph:"XX XXX XXXX"},
    {c:"+213",f:"🇩🇿",n:"DZA",ph:"XXX XX XX XX"},
    {c:"+54",f:"🇦🇷",n:"ARG",ph:"XX XXXX XXXX"},
    {c:"+61",f:"🇦🇺",n:"AUS",ph:"4XX XXX XXX"},
    {c:"+43",f:"🇦🇹",n:"AUT",ph:"XXX XXXXXXX"},
    {c:"+973",f:"🇧🇭",n:"BHR",ph:"XXXX XXXX"},
    {c:"+880",f:"🇧🇩",n:"BGD",ph:"XXXX XXXXXX"},
    {c:"+32",f:"🇧🇪",n:"BEL",ph:"XXX XX XX XX"},
    {c:"+55",f:"🇧🇷",n:"BRA",ph:"XX XXXXX XXXX"},
    {c:"+1",f:"🇨🇦",n:"CAN",ph:"(XXX) XXX-XXXX"},
    {c:"+86",f:"🇨🇳",n:"CHN",ph:"XXX XXXX XXXX"},
    {c:"+57",f:"🇨🇴",n:"COL",ph:"XXX XXX XXXX"},
    {c:"+45",f:"🇩🇰",n:"DNK",ph:"XX XX XX XX"},
    {c:"+20",f:"🇪🇬",n:"EGY",ph:"XX XXXX XXXX"},
    {c:"+358",f:"🇫🇮",n:"FIN",ph:"XX XXX XXXX"},
    {c:"+33",f:"🇫🇷",n:"FRA",ph:"6 XX XX XX XX"},
    {c:"+49",f:"🇩🇪",n:"DEU",ph:"1XX XXXXXXXX"},
    {c:"+233",f:"🇬🇭",n:"GHA",ph:"XX XXX XXXX"},
    {c:"+30",f:"🇬🇷",n:"GRC",ph:"XXX XXX XXXX"},
    {c:"+852",f:"🇭🇰",n:"HKG",ph:"XXXX XXXX"},
    {c:"+36",f:"🇭🇺",n:"HUN",ph:"XX XXX XXXX"},
    {c:"+62",f:"🇮🇩",n:"IDN",ph:"XXX XXXX XXXX"},
    {c:"+353",f:"🇮🇪",n:"IRL",ph:"XX XXX XXXX"},
    {c:"+972",f:"🇮🇱",n:"ISR",ph:"XX XXX XXXX"},
    {c:"+39",f:"🇮🇹",n:"ITA",ph:"XXX XXX XXXX"},
    {c:"+81",f:"🇯🇵",n:"JPN",ph:"XX XXXX XXXX"},
    {c:"+962",f:"🇯🇴",n:"JOR",ph:"X XXXX XXXX"},
    {c:"+254",f:"🇰🇪",n:"KEN",ph:"XXX XXXXXX"},
    {c:"+82",f:"🇰🇷",n:"KOR",ph:"XX XXXX XXXX"},
    {c:"+965",f:"🇰🇼",n:"KWT",ph:"XXXX XXXX"},
    {c:"+961",f:"🇱🇧",n:"LBN",ph:"XX XXX XXX"},
    {c:"+60",f:"🇲🇾",n:"MYS",ph:"XX XXXX XXXX"},
    {c:"+52",f:"🇲🇽",n:"MEX",ph:"XX XXXX XXXX"},
    {c:"+212",f:"🇲🇦",n:"MAR",ph:"XX XXX XXXX"},
    {c:"+31",f:"🇳🇱",n:"NLD",ph:"6 XXXXXXXX"},
    {c:"+64",f:"🇳🇿",n:"NZL",ph:"XX XXX XXXX"},
    {c:"+234",f:"🇳🇬",n:"NGA",ph:"XXX XXX XXXX"},
    {c:"+47",f:"🇳🇴",n:"NOR",ph:"XXX XX XXX"},
    {c:"+968",f:"🇴🇲",n:"OMN",ph:"XXXX XXXX"},
    {c:"+92",f:"🇵🇰",n:"PAK",ph:"XXX XXXXXXX"},
    {c:"+63",f:"🇵🇭",n:"PHL",ph:"XXX XXX XXXX"},
    {c:"+48",f:"🇵🇱",n:"POL",ph:"XXX XXX XXX"},
    {c:"+351",f:"🇵🇹",n:"PRT",ph:"XXX XXX XXX"},
    {c:"+974",f:"🇶🇦",n:"QAT",ph:"XXXX XXXX"},
    {c:"+40",f:"🇷🇴",n:"ROU",ph:"XXX XXX XXX"},
    {c:"+7",f:"🇷🇺",n:"RUS",ph:"XXX XXX XX XX"},
    {c:"+65",f:"🇸🇬",n:"SGP",ph:"XXXX XXXX"},
    {c:"+27",f:"🇿🇦",n:"ZAF",ph:"XX XXX XXXX"},
    {c:"+34",f:"🇪🇸",n:"ESP",ph:"XXX XXX XXX"},
    {c:"+94",f:"🇱🇰",n:"LKA",ph:"XX XXX XXXX"},
    {c:"+46",f:"🇸🇪",n:"SWE",ph:"XX XXX XXXX"},
    {c:"+41",f:"🇨🇭",n:"CHE",ph:"XX XXX XX XX"},
    {c:"+886",f:"🇹🇼",n:"TWN",ph:"XXX XXX XXX"},
    {c:"+66",f:"🇹🇭",n:"THA",ph:"XX XXX XXXX"},
    {c:"+90",f:"🇹🇷",n:"TUR",ph:"XXX XXX XXXX"},
    {c:"+256",f:"🇺🇬",n:"UGA",ph:"XXX XXXXXX"},
    {c:"+380",f:"🇺🇦",n:"UKR",ph:"XX XXX XXXX"},
    {c:"+84",f:"🇻🇳",n:"VNM",ph:"XX XXX XXXX"},
  ];
  const selCode = codes.find(x=>x.c===countryCode)||codes[0];
  const passRules = [
    {l:"8+ characters",ok:form.pass.length>=8},
    {l:"One uppercase",ok:/[A-Z]/.test(form.pass)},
    {l:"One number",ok:/[0-9]/.test(form.pass)},
    {l:"One special character",ok:/[^A-Za-z0-9]/.test(form.pass)},
  ];
  const nameValid = form.name.trim().split(/\s+/).filter(w=>w.length>=2).length>=2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const phoneDigits = form.phone.replace(/\D/g,"");
  const phoneValid = phoneDigits.length>=7 && phoneDigits.length<=15;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Your data. Your biology. Always secure.">Create Your Account</Title>
      <div style={{ flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch",minHeight:0 }}>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke={t.t3} strokeWidth="1.5"/><path d="M2 14c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg>FULL NAME</div>
          <input value={form.name} onChange={e=>u("name",e.target.value)} placeholder="Enter your full name" type="text" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${form.name.length>0?(nameValid?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          {form.name.length>0&&!nameValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter first and last name</div>}
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke={t.t3} strokeWidth="1.5"/><path d="M2 4l6 5 6-5" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/></svg>EMAIL</div>
          <input value={form.email} onChange={e=>u("email",e.target.value)} placeholder="you@example.com" type="email" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${form.email.length>0?(emailValid?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          {form.email.length>0&&!emailValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter a valid email address</div>}
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="4" y="1" width="8" height="14" rx="2" stroke={t.t3} strokeWidth="1.5"/><path d="M7 12h2" stroke={t.t3} strokeWidth="1.3" strokeLinecap="round"/></svg>PHONE</div>
          <div style={{ position:"relative",width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,border:`1px solid ${form.phone.length>0?(phoneValid?t.emerald:`${t.gold}80`):t.b2}`,display:"flex",alignItems:"center",transition:"border .2s" }}>
            <div onClick={()=>setCodeOpen(!codeOpen)} style={{ display:"flex",alignItems:"center",gap:6,padding:"14px 0 14px 14px",cursor:"pointer",flexShrink:0,borderRight:`1px solid ${t.b2}`,paddingRight:10,marginRight:2 }}>
              <span style={{ fontSize:16 }}>{selCode.f}</span><span style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{countryCode}</span><ChevronRight size={9}/>
            </div>
            <input value={form.phone} onChange={e=>u("phone",e.target.value)} placeholder={selCode.ph} type="tel" style={{ flex:1,minWidth:0,boxSizing:"border-box",background:"transparent",border:"none",padding:"17px 19px 17px 13px",fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
            {codeOpen&&<><div onClick={()=>setCodeOpen(false)} style={{ position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9 }}/><div style={{ position:"absolute",top:"100%",left:0,marginTop:6,background:t.s1,border:`1px solid ${t.b2}`,borderRadius:12,overflow:"hidden",zIndex:10,maxHeight:240,overflowY:"auto",boxShadow:"0 8px 24px rgba(0,0,0,.2)",width:"100%" }}>
              {codes.map((cc,ci)=>(
                <div key={ci} onClick={e=>{e.stopPropagation();setCountryCode(cc.c);setCodeOpen(false)}} style={{ padding:"13px 17px",display:"flex",alignItems:"center",gap:12,fontSize:14,color:t.t1,borderBottom:`1px solid ${t.b1}`,background:countryCode===cc.c?`${t.purple}08`:"transparent",cursor:"pointer" }}>
                  <span style={{ fontSize:17 }}>{cc.f}</span><span style={{ fontWeight:600,minWidth:32 }}>{cc.n}</span><span style={{ color:t.t3,flex:1 }}>{cc.c}</span>{countryCode===cc.c&&<CheckIcon size={12} color={t.purple}/>}
                </div>
              ))}
            </div></>}
          </div>
          {form.phone.length>0&&!phoneValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter a valid phone number</div>}
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>BIOLOGICAL SEX</div>
          <div style={{ display:"flex",gap:10 }}>
            {["Male","Female"].map(g=>(
              <div key={g} onClick={()=>setGender(g.toLowerCase())} style={{ flex:1,background:selGender===g.toLowerCase()?`${t.purple}12`:t.s2,border:`1.5px solid ${selGender===g.toLowerCase()?t.purple:t.b2}`,borderRadius:12,padding:"14px 0",textAlign:"center",fontSize:15,fontWeight:600,color:selGender===g.toLowerCase()?t.purple:t.t1,cursor:"pointer",transition:"all .2s" }}>{g}</div>
            ))}
          </div>
          <div style={{ fontSize:12,color:t.t3,marginTop:6 }}>Required for accurate biomarker analysis and protocol design.</div>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700,display:"flex",alignItems:"center",gap:6 }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke={t.t3} strokeWidth="1.5"/><path d="M5 7V5a3 3 0 016 0v2" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg>PASSWORD</div>
          <div style={{ position:"relative" }}>
            <input value={form.pass} onChange={e=>u("pass",e.target.value)} placeholder="Create a password" type={showPass?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${form.pass.length>0?(passRules.every(r=>r.ok)?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
            <div onClick={()=>setShowPass(!showPass)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showPass}/></div>
          </div>
          {form.pass.length>0&&<div style={{ display:"flex",flexWrap:"wrap",gap:10,marginTop:10 }}>
            {passRules.map((r,ri)=>(
              <div key={ri} style={{ display:"flex",alignItems:"center",gap:6 }}>
                <div style={{ width:14,height:14,borderRadius:"50%",background:r.ok?t.emerald:`${t.t3}30`,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }}>{r.ok&&<CheckIcon size={8} color="#FFF"/>}</div>
                <span style={{ fontSize:12,color:r.ok?t.emerald:t.t3,fontWeight:500,transition:"color .2s" }}>{r.l}</span>
              </div>
            ))}
          </div>}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:14,margin:"10px 0 12px" }}>
          <div style={{ flex:1,height:1,background:t.b2 }}/><span style={{ fontSize:13,color:t.t3,fontWeight:500 }}>or sign up with</span><div style={{ flex:1,height:1,background:t.b2 }}/>
        </div>
        <div onClick={()=>onNavigate("email-verify")} style={{ background:"#000",borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer",marginBottom:8 }}>
          <AppleIcon size={24} color="#FFF"/><span style={{ fontSize:15,fontWeight:600,color:"#FFF" }}>Sign up with Apple</span>
        </div>
        <div onClick={()=>onNavigate("email-verify")} style={{ background:t.s2,border:`1px solid ${t.b2}`,borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer" }}>
          <GoogleIcon size={18}/><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Sign up with Google</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12,margin:"14px 0 12px" }}>
          <div onClick={()=>setConsent(!consent)} style={{ width:20,height:20,borderRadius:5,background:consent?t.purple:`${t.purple}15`,border:`1.5px solid ${consent?t.purple:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",cursor:"pointer",flexShrink:0 }}>{consent&&<CheckIcon size={10} color="#FFF"/>}</div>
          <span style={{ fontSize:13,color:t.t2 }}>I consent to data processing per <span onClick={(e)=>{e.stopPropagation();setPdplOpen(true)}} style={{ color:t.purple,textDecoration:"underline",cursor:"pointer",fontWeight:600 }}>UAE PDPL</span></span>
        </div>
        {pdplOpen&&<InfoModal title="UAE Personal Data Protection Law (PDPL)" text="EVA™ processes your personal health data in compliance with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL). This includes: explicit consent before collecting any data, data minimisation (we only collect what’s needed), encryption at rest and in transit, UAE-based data residency (your health data stays on UAE servers), and your right to access, rectify, or erase your data at any time. Your biological data (DNA, blood biomarkers) is processed solely for providing personalised health recommendations and is never sold to third parties." onClose={()=>setPdplOpen(false)}/>}
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        <LoadingBtn loading={loading} onClick={nameValid&&emailValid&&phoneValid&&passRules.every(r=>r.ok)&&consent?handleCreate:undefined} style={{ opacity:nameValid&&emailValid&&phoneValid&&passRules.every(r=>r.ok)&&consent?1:.4 }}>Create Account</LoadingBtn>
      </div>
    </div>
  );
};


const TermsScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [agreed, setAgreed] = useState(false);
  const [optIn, setOptIn] = useState(false);
  const S = (props) => <div style={{ fontWeight:600,color:t.t1,marginBottom:4,marginTop:14,...(props.style||{}) }}>{props.children}</div>;
  const P = (props) => <div style={{ marginBottom:10,...(props.style||{}) }}>{props.children}</div>;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Please review and accept before continuing.">Informed Consent</Title>
      <div style={{ flex:1,overflowY:"auto",background:t.s1,borderRadius:14,padding:16,border:`1px solid ${t.b1}`,fontSize:13,color:t.t2,lineHeight:1.8 }}>
        <div style={{ fontWeight:700,color:t.t1,marginBottom:8 }}>Informed Consent for Blood & DNA Testing, Analysis, and Data Use</div>

        <S style={{marginTop:0}}>1. Purpose and Scope</S>
        <P>You consent to the collection and analysis of your blood (via venepuncture) and/or DNA (via cheek swab) to generate personalised health insights.</P>
        <P>Results are used to generate personalised recommendations, not medical diagnoses. EVA™ is designed for health optimisation. It is informational and preventive in nature, and does not replace professional medical evaluation.</P>

        <S>2. Risks and Discomforts</S>
        <P><span style={{fontWeight:600,color:t.t1}}>Blood Collection:</span> May cause mild pain, bruising, or minor bleeding. Infection, dizziness, or fainting are very rare.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>DNA Collection:</span> Non-invasive cheek swab; very rarely, minor gum irritation or slight contact bleeding may occur.</P>

        <S>3. Understanding Your Results</S>
        <P><span style={{fontWeight:600,color:t.t1}}>Blood:</span> Reflects your current physiological state. Tests measure biomarkers related to heart health, metabolism, inflammation, nutrition, hormones, liver and kidney health, and other markers of general health.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>DNA:</span> Analyses genetic variations relevant to nutrition, methylation, and disease risks. Results indicate genetic probabilities and tendencies, not certainties or diagnoses. Scientific understanding of genetics may evolve over time.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Limitations:</span> Not all conditions can be detected. If abnormal results are found, you may be advised to seek independent medical care.</P>

        <S>4. Voluntary Participation and Your Rights</S>
        <P>Your participation is completely voluntary. Under UAE law, you have the right to:</P>
        <div style={{ paddingLeft:12,marginBottom:10 }}>
          <div style={{ marginBottom:4 }}>• Withdraw consent at any time without affecting your access to medical care</div>
          <div style={{ marginBottom:4 }}>• Access, correct, or request deletion of your personal data (subject to legal retention requirements)</div>
          <div>• Decline DNA testing and still utilise other EVA™ services</div>
        </div>

        <S>5. Data Privacy, Storage, and Sharing</S>
        <P>In compliance with the UAE Personal Data Protection Law (PDPL) and applicable UAE health data regulations, including relevant federal and Emirate-level health authorities (such as MoHAP, DHA, DoH, and other competent authorities across the UAE).</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Processing:</span> Your personal, health, and genetic data will only be used to generate insights, ensure clinical safety, and improve your tracking experience.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Security & Storage:</span> Data is encrypted, restricted to authorised personnel, and securely stored on UAE-based servers. Retained only as long as legally required.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Sharing:</span> Your data is shared only with licensed testing labs, your healthcare providers, and mandatory UAE health information exchanges (e.g. Riayati, Malaffi, NABIDH).</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Protection:</span> Your data will not be sold or used for marketing purposes.</P>
        <P><span style={{fontWeight:600,color:t.t1}}>Platform Improvement:</span> EVA™ uses de-identified (anonymised) data, with personal identifiers removed, to improve health outcomes, research insights, and platform performance. You may opt out of this use at any time.</P>

        <S>6. Consent Declaration</S>
        <P>By selecting "I Agree" below, you provide legally valid electronic consent under UAE law (equivalent to a written signature), confirming that you have read this information, understand the risks and limitations, and voluntarily agree to blood and/or DNA sample collection and processing and use of your health and genetic data for personalised insights.</P>
      </div>
      <div style={{ paddingTop:16 }}>
        <div onClick={()=>setAgreed(!agreed)} style={{ display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",marginBottom:12 }}>
          <div style={{ width:22,height:22,borderRadius:6,border:`1.5px solid ${agreed?t.purple:t.b2}`,background:agreed?t.purple:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",flexShrink:0,marginTop:1 }}>{agreed&&<CheckIcon size={12}/>}</div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.5 }}>I have read and agree to the <span style={{ color:t.purple,fontWeight:600 }}>Informed Consent</span> for blood & DNA testing, analysis, and data use</div>
        </div>
        <div onClick={()=>setOptIn(!optIn)} style={{ display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",marginBottom:16 }}>
          <div style={{ width:22,height:22,borderRadius:6,border:`1.5px solid ${optIn?t.emerald:t.b2}`,background:optIn?t.emerald:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",flexShrink:0,marginTop:1 }}>{optIn&&<CheckIcon size={12}/>}</div>
          <div style={{ fontSize:13,color:t.t3,lineHeight:1.5 }}>I agree to allow EVA™ to use my de-identified data (with personal identifiers removed) to improve health outcomes and platform performance. <span style={{fontStyle:"italic",fontSize:12}}>Optional</span></div>
        </div>
        <Btn onClick={agreed?()=>onNavigate("questionnaire"):undefined} style={{ opacity:agreed?1:.4 }}>I Agree</Btn>
      </div>
    </div>
  );
};

const QuestionnaireScreen = ({ onNavigate, onBack, gender }) => {
  const t = useTheme();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [goals, setGoals] = useState(new Set([4]));
  const [extraGoals, setExtraGoals] = useState(new Set());
  const [symptoms, setSymptoms] = useState(new Set([2,5]));
  const [height, setHeight] = useState("178");
  const [weight, setWeight] = useState("82");
  const [goalWeight, setGoalWeight] = useState("");
  const [exerciseDays, setExerciseDays] = useState(2);
  const [exerciseType, setExerciseType] = useState(2);
  const [dietPref, setDietPref] = useState(0);
  const [fishFreq, setFishFreq] = useState(1);
  const [trackProtein, setTrackProtein] = useState(1);
  const [smoke, setSmoke] = useState(0);
  const [alcohol, setAlcohol] = useState(1);
  const [alcDrinks, setAlcDrinks] = useState(0);
  const [currentSupps, setCurrentSupps] = useState(0);
  const [meds, setMeds] = useState(new Set([7]));
  const [conditions, setConditions] = useState(new Set());
  const [allergies, setAllergies] = useState(new Set([3]));
  const [stress, setStress] = useState(4);
  const [sleepQ, setSleepQ] = useState(6);
  const [familyHx, setFamilyHx] = useState(new Set());
  const [libido, setLibido] = useState(1);
  const [menstrualStage, setMenstrualStage] = useState(-1);
  const [lastPeriod, setLastPeriod] = useState(-1);
  const [cycleDay, setCycleDay] = useState(-1);
  const [yearsPost, setYearsPost] = useState(-1);
  const [wLibido, setWLibido] = useState(-1);
  const togSet = (set,setter,i,noneIdx) => {
    const s = new Set(set);
    if (noneIdx !== undefined && i === noneIdx) {
      // Tapping "None" clears everything else
      setter(s.has(i) ? new Set() : new Set([i]));
      return;
    }
    if (noneIdx !== undefined && s.has(noneIdx)) {
      // Tapping anything else deselects "None"
      s.delete(noneIdx);
    }
    s.has(i) ? s.delete(i) : s.add(i);
    setter(s);
  };
  const Chip = ({label,active,onClick}) => <div onClick={onClick} style={{ background:active?`${t.purple}10`:t.s2,border:`1.5px solid ${active?t.purple:t.b2}`,borderRadius:10,padding:"12px 16px",fontSize:14,fontWeight:500,color:active?t.purple:t.t1,cursor:"pointer",transition:"all .15s" }}>{label}</div>;
  const Radio = ({label,active,onClick}) => <div onClick={onClick} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 0",cursor:"pointer" }}><div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${active?t.purple:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{active&&<div style={{ width:10,height:10,borderRadius:"50%",background:t.purple }}/>}</div><span style={{ fontSize:15,color:t.t1 }}>{label}</span></div>;
  const Slider = ({value,onChange,min=1,max=10}) => {
    const pct = ((value - min) / (max - min)) * 100;
    return (
      <div style={{ marginBottom:8 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
          <span style={{ fontSize:12,color:t.t3 }}>{min}</span>
          <span style={{ fontSize:20,fontWeight:800,color:t.purple }}>{value}</span>
          <span style={{ fontSize:12,color:t.t3 }}>{max}</span>
        </div>
        <div style={{ position:"relative",height:40,display:"flex",alignItems:"center" }}>
          <div style={{ position:"absolute",left:0,right:0,height:6,borderRadius:3,background:t.s2 }}>
            <div style={{ width:pct+"%",height:"100%",borderRadius:3,background:t.purple,transition:"width .1s" }}/>
          </div>
          <input type="range" min={min} max={max} value={value} onChange={e=>onChange(parseInt(e.target.value))} style={{ position:"absolute",left:0,right:0,width:"100%",height:40,opacity:0,cursor:"pointer",margin:0 }}/>
          <div style={{ position:"absolute",left:`calc(${pct}% - 16px)`,width:32,height:32,borderRadius:"50%",background:t.purple,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.2)",pointerEvents:"none",transition:"left .1s" }}>
            <span style={{ fontSize:12,fontWeight:700,color:"#FFF" }}>{value}</span>
          </div>
        </div>
      </div>
    );
  };
  const Input = ({placeholder,value,onChange,type="text"}) => <input placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} type={type} inputMode={type==="number"?"numeric":undefined} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>;
  const SectionNote = ({text}) => <div style={{ background:`${t.purple}06`,borderRadius:10,padding:"10px 14px",fontSize:13,color:t.purple,marginBottom:16,marginTop:-4 }}>{text}</div>;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
        <div onClick={step>1?()=>setStep(step-1):onBack} style={{ fontSize:15,color:t.t3,cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:6 }}><ChevronLeft size={12}/> Back</div>
        <div style={{ fontSize:13,color:t.t3 }}>{step} of {totalSteps}</div>
      </div>
      <div style={{ height:3,background:t.s2,borderRadius:2,marginBottom:20 }}><div style={{ width:`${(step/totalSteps)*100}%`,height:"100%",background:t.brandGrad,borderRadius:2,transition:"width .3s" }}/></div>
      <div style={{ flex:1,overflowY:"auto",scrollbarWidth:"none",paddingBottom:24 }}>
        {step===1?<>
          <Title sub="Choose one primary goal.">What matters most?</Title>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:20 }}>
            {["Fat loss","Muscle gain / strength","Improve energy & focus","Improve sleep","Support long-term health","Gut health & digestion","Hormone balance","Mood & stress resilience","Skin & hair health"].map((g,i)=><Chip key={i} label={g} active={goals.has(i)} onClick={()=>setGoals(new Set([i]))}/>)}
          </div>
          <SectionNote text="We'll prioritise your protocol around this." />
          <Label>Any additional goals?</Label>
          <div style={{ fontSize:13,color:t.t3,marginBottom:10 }}>Select any that also apply.</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:20 }}>
            {["Fat loss","Muscle gain / strength","Improve energy & focus","Improve sleep","Support long-term health","Gut health & digestion","Hormone balance","Mood & stress resilience","Skin & hair health"].filter((_,i)=>!goals.has(i)).map((g,i)=><Chip key={`extra${i}`} label={g} active={extraGoals.has(g)} onClick={()=>{const s=new Set(extraGoals);s.has(g)?s.delete(g):s.add(g);setExtraGoals(s)}}/>)}
          </div>
          <Label>How are you feeling lately?</Label>
          <div style={{ fontSize:13,color:t.t3,marginBottom:10 }}>Select any that apply.</div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>SLEEP</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
            {["Difficulty falling asleep","Waking up during the night"].map((s,i)=><Chip key={i} label={s} active={symptoms.has(i)} onClick={()=>togSet(symptoms,setSymptoms,i)}/>)}
          </div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>ENERGY & BRAIN</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
            {["Low energy","Brain fog / trouble focusing"].map((s,i)=><Chip key={`e${i}`} label={s} active={symptoms.has(i+2)} onClick={()=>togSet(symptoms,setSymptoms,i+2)}/>)}
          </div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>STRESS & MOOD</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
            {["Feeling anxious or stressed"].map((s,i)=><Chip key={`s${i}`} label={s} active={symptoms.has(i+4)} onClick={()=>togSet(symptoms,setSymptoms,i+4)}/>)}
          </div>
          <div style={{ fontSize:11,color:t.purple,fontWeight:700,letterSpacing:1,marginBottom:8 }}>GUT & BODY</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:8 }}>
            {["Bloating","Constipation","Muscle cramps","Joint pain"].map((s,i)=><Chip key={`g${i}`} label={s} active={symptoms.has(i+5)} onClick={()=>togSet(symptoms,setSymptoms,i+5)}/>)}
          </div>
          <SectionNote text="This helps EVA™ personalise your daily recommendations." />
        </>:step===2?<>
          <Title sub="Your starting point.">Your Baseline</Title>
          <div style={{ display:"flex",gap:12,marginBottom:20 }}>
            <div style={{ flex:1 }}><Label>Height (cm)</Label><Input placeholder="178" value={height} onChange={setHeight} type="number"/></div>
            <div style={{ flex:1 }}><Label>Weight (kg)</Label><Input placeholder="82" value={weight} onChange={setWeight} type="number"/></div>
          </div>
          <div style={{ marginBottom:24 }}><Label>Goal weight (optional)</Label><Input placeholder="Optional" value={goalWeight} onChange={setGoalWeight} type="number"/></div>
          <Label>Exercise days per week</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["0","1–2","3–4","5+"].map((d,i)=><Chip key={i} label={d} active={exerciseDays===i} onClick={()=>setExerciseDays(i)}/>)}
          </div>
          <Label>Exercise type</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
            {["Strength","Cardio","Both","None"].map((e,i)=><Chip key={i} label={e} active={exerciseType===i} onClick={()=>setExerciseType(i)}/>)}
          </div>
        </>:step===3?<>
          <Title sub="What you eat matters.">Nutrition</Title>
          <Label>Dietary preference</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["Balanced whole-food","High carb / low fat","Low carb / keto","High protein","Vegetarian","Vegan","Mediterranean","No structure","Lots of processed / takeout"].map((d,i)=><Chip key={i} label={d} active={dietPref===i} onClick={()=>setDietPref(i)}/>)}
          </div>
          <Label>How often do you eat fatty fish?</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["Rarely/never","Once/week","2+ times/week"].map((f,i)=><Chip key={i} label={f} active={fishFreq===i} onClick={()=>setFishFreq(i)}/>)}
          </div>
          <Label>Do you track protein intake?</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["Yes","No"].map((p,i)=><Chip key={i} label={p} active={trackProtein===i} onClick={()=>setTrackProtein(i)}/>)}
          </div>
        </>:step===4?<>
          <Title sub="Lifestyle and current supplements.">Lifestyle</Title>
          <Label>Do you smoke or vape?</Label>
          <div style={{ marginBottom:16 }}>{["Never","Used to (quit)","Yes"].map((s,i)=><Radio key={i} label={s} active={smoke===i} onClick={()=>setSmoke(i)}/>)}</div>
          <Label>Do you drink alcohol?</Label>
          <div style={{ marginBottom:16 }}>{["No","Occasionally (1–2/week)","Regularly (3+/week)"].map((a,i)=><Radio key={i} label={a} active={alcohol===i} onClick={()=>setAlcohol(i)}/>)}</div>
          <Label>Currently taking supplements?</Label>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["No","Yes"].map((s,i)=><Chip key={i} label={s} active={currentSupps===i} onClick={()=>setCurrentSupps(i)}/>)}
          </div>
          <Label>Current medications</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["GLP-1 (Ozempic, Mounjaro, Retatrutide)","Warfarin","Blood thinners","Statins","Antidepressants","Metformin","Testosterone (TRT)","Other","None"].map((m,i)=><Chip key={i} label={m} active={meds.has(i)} onClick={()=>togSet(meds,setMeds,i,8)}/>)}
          </div>
        </>:step===5?<>
          <Title sub="For your safety and protocol design.">Medical Background</Title>
          <Label>Diagnosed conditions</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["High cholesterol","High blood pressure","Diabetes/pre-diabetes","Thyroid issues","PCOS/Endometriosis","Autoimmune","Depression/anxiety","Gut conditions","Heart condition","Kidney disease","Liver disease","Gout","None"].map((c,i)=><Chip key={i} label={c} active={conditions.has(i)} onClick={()=>togSet(conditions,setConditions,i,12)}/>)}
          </div>
          <Label>Allergies or sensitivities</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["Foods (nuts, dairy, gluten)","Medications","Supplements","None"].map((a,i)=><Chip key={i} label={a} active={allergies.has(i)} onClick={()=>togSet(allergies,setAllergies,i,3)}/>)}
          </div>
          <Label>Current stress level (1–10)</Label>
          <Slider value={stress} onChange={setStress}/>
          <div style={{ marginTop:16 }}><Label>Sleep quality (1–10)</Label></div>
          <Slider value={sleepQ} onChange={setSleepQ}/>
          <div style={{ marginBottom:20 }}/>
        </>:<>
          <Title sub="Final step — family and personal health.">Family & Health</Title>
          <Label>Family history (parent or sibling)</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
            {["Heart attack/stroke before 55","Colon/colorectal cancer","Prostate cancer","Breast/ovarian cancer","Diabetes","Alzheimer's (Dementia)","None"].map((f,i)=><Chip key={i} label={f} active={familyHx.has(i)} onClick={()=>togSet(familyHx,setFamilyHx,i,6)}/>)}
          </div>
          {gender==="male"?<>
            <Label>Men’s Health</Label>
            <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>Have you noticed a decrease in libido or morning erections?</div>
            <div style={{ display:"flex",gap:10,marginBottom:20 }}>{["Yes","No"].map((l,i)=><Chip key={i} label={l} active={libido===i} onClick={()=>setLibido(i)}/>)}</div>
          </>:<>
            <Label>Women’s Health</Label>
            <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>Which best describes your current menstrual status?</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:8 }}>
              {["Regular cycle","Irregular cycle","Perimenopause","Post-menopause","Pregnant","Postpartum"].map((s,i)=><Chip key={i} label={s} active={menstrualStage===i} onClick={()=>setMenstrualStage(i)}/>)}
            </div>
            <div style={{ background:`${t.purple}06`,borderRadius:10,padding:"10px 14px",fontSize:13,color:t.purple,marginBottom:16 }}>Menstrual status directly affects hormonal balance, bone density, and cardiovascular risk markers. This helps EVA™ calibrate your biomarker reference ranges accurately.</div>
            {menstrualStage===0&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>What day of your cycle will you be on during your blood test?</div>
              <div style={{ background:`${t.purple}06`,borderRadius:10,padding:"10px 14px",fontSize:13,color:t.purple,marginBottom:8 }}>Cycle day is critical for accurate hormone interpretation. Day 1 = first day of your period.</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:16 }}>
                {Array.from({length:28},(_,i)=>i+1).map(d=><div key={d} onClick={()=>setCycleDay(d)} style={{ width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,background:cycleDay===d?`${t.purple}15`:t.s2,border:`1.5px solid ${cycleDay===d?t.purple:t.b2}`,color:cycleDay===d?t.purple:t.t1,cursor:"pointer",transition:"all .15s" }}>{d}</div>)}
              </div>
            </>}
            {(menstrualStage>=0&&menstrualStage<=2)&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>When was the first day of your last period?</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:16 }}>
                {["Within the last week","1–2 weeks ago","2–4 weeks ago","More than 4 weeks ago","Prefer not to say"].map((s,i)=><Chip key={`lp${i}`} label={s} active={lastPeriod===i} onClick={()=>setLastPeriod(i)}/>)}
              </div>
            </>}
            {menstrualStage===3&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>How long ago did your periods stop?</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:16 }}>
                {["Less than 1 year","1–3 years","3–5 years","5–10 years","10+ years"].map((s,i)=><Chip key={`mp${i}`} label={s} active={yearsPost===i} onClick={()=>setYearsPost(i)}/>)}
              </div>
            </>}
            {menstrualStage>=0&&<>
              <div style={{ fontSize:14,color:t.t2,marginBottom:8 }}>Have you noticed a drop in libido recently?</div>
              <div style={{ display:"flex",gap:10,marginBottom:16 }}>{["Yes","No"].map((l,i)=><Chip key={`wl${i}`} label={l} active={wLibido===i} onClick={()=>setWLibido(i)}/>)}</div>
            </>}
          </>}
        </>}
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        <Btn onClick={()=>{if(step<totalSteps)setStep(step+1);else onNavigate("book-test")}}>{step<totalSteps?"Next →":"Book Your Biology Test →"}</Btn>
      </div>
    </div>
  );
};


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

const WaitingScreen = ({ onNavigate, onBack, subTarget, clearSubTarget }) => {
  const t = useTheme();
  const [phase, setPhase] = useState("blood-pending");
  useEffect(()=>{if(subTarget){setPhase(subTarget);clearSubTarget?.()}},[subTarget]); // blood-pending | blood-ready | dna-pending | all-ready
  const phases = {
    "blood-pending": {title:"Your Tests Are Processing",sub:"Blood analysis takes 1–2 days. DNA takes 3–4 weeks. We'll notify you at each step.",steps:[
      {l:"Blood Test Completed",s:"done",d:"Collected 4 Feb 2025"},
      {l:"Blood Analysis",s:"active",d:"~1 day remaining"},
      {l:"DNA Taken",s:"done",d:"Registered 6 Feb 2025"},
      {l:"DNA Analysis",s:"pending",d:"~4 weeks"},
      {l:"Clinician Review",s:"pending",d:"24–48 hrs after results"},
      {l:"Supplement Protocol",s:"pending",d:"Your personalised regimen"},
      {l:"Daily DEVA™ Check-in",s:"pending",d:"Your longevity ritual begins"},
    ]},
    "blood-ready": {title:"Blood Results Ready!",sub:"Your clinician has reviewed your biomarkers. DNA analysis continues in the background.",steps:[
      {l:"Blood Test Completed",s:"done",d:"Collected 4 Feb 2025"},
      {l:"Blood Analysis",s:"done",d:"Complete — 70 biomarkers analysed"},
      {l:"DNA Taken",s:"done",d:"Registered 6 Feb 2025"},
      {l:"DNA Analysis",s:"active",d:"~3 weeks remaining"},
      {l:"Clinician Review (Blood)",s:"done",d:"Reviewed by Dr. Nival"},
      {l:"Initial Protocol Ready",s:"done",d:"Based on blood results"},
      {l:"Daily DEVA™ Active",s:"done",d:"Your daily briefing is live"},
    ]},
    "dna-pending": {title:"DNA Still Processing",sub:"Your blood-based protocol is active. DNA results will refine it further.",steps:[
      {l:"Blood Panel",s:"done",d:"70 biomarkers — Complete"},
      {l:"DNA Kit Processing",s:"active",d:"~1 week remaining"},
      {l:"Clinician Review (Blood)",s:"done",d:"Protocol active"},
      {l:"DNA Variant Analysis",s:"pending",d:"5+ variants expected"},
      {l:"Protocol Refinement",s:"pending",d:"DNA-informed updates"},
    ]},
    "all-ready": {title:"All Results Are In!",sub:"Blood + DNA combined. Your full biological profile is ready to explore.",steps:[
      {l:"Blood Panel",s:"done",d:"70 biomarkers analysed"},
      {l:"DNA Analysis",s:"done",d:"5 significant variants identified"},
      {l:"Clinician Review",s:"done",d:"Full review by Dr. Nival"},
      {l:"Supplement Protocol",s:"done",d:"DNA + Blood optimised"},
      {l:"DEVA™ Personalised",s:"done",d:"Fully calibrated to your biology"},
    ]},
  };
  const p = phases[phase];
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub={p.sub}>{p.title}</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        {(phase==="blood-ready"||phase==="all-ready")&&<Card style={{ background:`${t.emerald}08`,border:`1.5px solid ${t.emerald}20`,marginBottom:16 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <CheckIcon size={18} color={t.emerald}/>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{phase==="all-ready"?"Full results available — tap below to view":"Blood results are in! Tap below to view your biomarkers."}</div>
          </div>
        </Card>}
        {p.steps.map((st,i,a)=>(
          <div key={i} style={{ display:"flex",gap:16 }}>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
              <div style={{ width:30,height:30,borderRadius:"50%",background:st.s==="done"?t.emerald:st.s==="active"?t.purple:t.s2,border:st.s==="pending"?`1.5px solid ${t.b2}`:"none",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:st.s==="active"?`0 0 14px ${t.purple}50`:"none" }}>{st.s==="done"?<CheckIcon size={14}/>:st.s==="active"?<div style={{ width:10,height:10,borderRadius:"50%",background:"#FFF",animation:"pulse 1.5s ease infinite" }}/>:null}</div>
              {i<a.length-1&&<div style={{ width:2,height:32,background:st.s==="done"?`${t.emerald}50`:t.b1,borderRadius:1 }}/>}
            </div>
            <div style={{ paddingTop:5,paddingBottom:20 }}>
              <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{st.l}</div>
              <div style={{ fontSize:13,color:st.s==="active"?t.cyan:st.s==="done"?t.emerald:t.t3,marginTop:6,fontWeight:500 }}>{st.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}>
        {(phase==="blood-ready"||phase==="all-ready")?<Btn onClick={()=>onNavigate("results")}>View Your Results →</Btn>:<div><div style={{ fontSize:13,color:t.t2,textAlign:"center",marginBottom:12,lineHeight:1.6 }}>We'll notify you when your results are ready. In the meantime, explore the app.</div><Btn variant="secondary" onClick={()=>onNavigate("today")}>Explore EVA™ →</Btn></div>}
        <div style={{ marginTop:16,paddingTop:12,borderTop:`1px dashed ${t.b2}` }}>
          <div style={{ fontSize:10,fontWeight:700,color:t.t4,letterSpacing:2,textAlign:"center",marginBottom:6 }}>TEST STATUS SIMULATOR</div>
          <div style={{ display:"flex",gap:8 }}>
            {[{id:"blood-pending",l:"Waiting"},{id:"blood-ready",l:"Blood Ready"},{id:"dna-pending",l:"DNA Wait"},{id:"all-ready",l:"All Ready"}].map(ph=>(
              <div key={ph.id} onClick={()=>setPhase(ph.id)} style={{ flex:1,background:phase===ph.id?`${t.t4}15`:t.s2,border:`1px dashed ${phase===ph.id?t.t4:t.b2}`,borderRadius:6,padding:"6px 0",textAlign:"center",fontSize:10,fontWeight:600,color:phase===ph.id?t.t3:t.t4,cursor:"pointer" }}>{ph.l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsWowScreen = ({ onNavigate, onBack, subTarget, clearSubTarget }) => {
  const t = useTheme();
  const [view, setView] = useState("blood");
  useEffect(()=>{if(subTarget){setView(subTarget);clearSubTarget?.()}},[subTarget]);
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ flexShrink:0,padding:`${SAFE_TOP}px 24px 0`,display:"flex",justifyContent:"center",paddingTop:SAFE_TOP+8 }}><EVAFullLogo width={70}/></div>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 24px 0" }}>
        {view==="blood"&&<div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
          <Label>Your Blood Results Are Ready</Label>
          <div onClick={()=>onNavigate("eva-age")} style={{ position:"relative",width:240,marginBottom:16,animation:"scaleIn .6s ease .2s both",cursor:"pointer",textAlign:"center" }}>
            <div style={{ position:"relative",height:120,overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,bottom:0,left:0,width:30,background:"linear-gradient(90deg,"+t.bg+",transparent)",zIndex:3 }}/>
              <div style={{ position:"absolute",top:0,bottom:0,right:0,width:30,background:"linear-gradient(90deg,transparent,"+t.bg+")",zIndex:3 }}/>
              <MiniDNA w={240} h={120} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/>
              <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:4 }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ width:100,height:60,borderRadius:"50%",background:t.bg,filter:"blur(20px)",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",opacity:0.85 }}/>
                  <div style={{ position:"relative",fontSize:50,fontWeight:800,color:t.emerald,letterSpacing:-2,animation:"fadeUp .5s ease .9s both" }}>34</div>
                  <div style={{ position:"relative",fontSize:12,color:t.emerald,fontWeight:600,marginTop:-2 }}>-4 years</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign:"center",marginBottom:20,animation:"fadeUp .5s ease 1.1s both" }}>
            <div style={{ fontSize:17,color:t.emerald,fontWeight:700 }}>4 years younger than chronological</div>
            <div onClick={()=>onNavigate("eva-age")} style={{ fontSize:13,color:t.emerald,marginTop:5,cursor:"pointer",textDecoration:"underline",textDecorationStyle:"dotted",textUnderlineOffset:4 }}>Tap to explore your EVA™ Age</div>
          </div>
          <div style={{ width:"100%",display:"flex",gap:12,marginBottom:14,animation:"fadeUp .5s ease 1.2s both" }}>
            {[{l:"Optimal",n:4,c:t.emerald,ic:<CheckIcon size={14} color={t.emerald}/>},{l:"Attention",n:3,c:t.gold,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L1 12h12L7 2z" stroke={t.gold} strokeWidth="1.3" fill="none"/><path d="M7 6v3M7 10.5v.5" stroke={t.gold} strokeWidth="1.3" strokeLinecap="round"/></svg>},{l:"Action Needed",n:1,c:t.red,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={t.red} strokeWidth="1.3"/><path d="M7 4v4M7 10v.5" stroke={t.red} strokeWidth="1.3" strokeLinecap="round"/></svg>}].map(c=>(
              <div key={c.l} style={{ flex:1,background:t.s1,borderRadius:14,padding:"17px 10px",textAlign:"center",border:`1px solid ${t.b1}` }}>
                <div style={{ display:"flex",justifyContent:"center",marginBottom:4 }}>{c.ic}</div>
                <div style={{ fontSize:26,fontWeight:800,color:c.c }}>{c.n}</div>
                <div style={{ fontSize:11,color:t.t2,marginTop:6,fontWeight:600 }}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>}
        {view==="dna"&&<div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
          <Label color={t.purple}>Your DNA Results Are In</Label>
          <div style={{ width:120,height:120,borderRadius:"50%",background:`${t.purple}08`,border:`3px solid ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,animation:"scaleIn .6s ease .2s both" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:38,fontWeight:800,color:t.purple,letterSpacing:-1 }}>5</div>
              <div style={{ fontSize:11,color:t.t2,fontWeight:500 }}>Variants</div>
            </div>
          </div>
          <div style={{ width:"100%",marginBottom:14 }}>
            {[{g:"MTHFR",v:"C677T",r:"Moderate"},{g:"TRPM6",v:"rs11144134",r:"Moderate"},{g:"VDR",v:"FokI",r:"Moderate"},{g:"APOE",v:"ε3/ε3",r:"Low"},{g:"CYP1A2",v:"Fast",r:"Low"}].map((d,i)=>(
              <Card key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,animation:`fadeUp .4s ease ${.1*i}s both` }}>
                <div><span style={{ fontSize:15,fontWeight:700,color:t.purple }}>{d.g}</span><span style={{ fontSize:13,color:t.t3,marginLeft:8 }}>{d.v}</span></div>
                <div style={{ fontSize:11,fontWeight:600,color:d.r==="Low"?t.emerald:t.gold,background:d.r==="Low"?`${t.emerald}12`:`${t.gold}12`,padding:"5px 10px",borderRadius:4 }}>{d.r}</div>
              </Card>
            ))}
          </div>
          <div style={{ fontSize:14,color:t.t2,textAlign:"center",lineHeight:1.6 }}>Protocol refined with DNA-specific adjustments. DEVA™ insights are now fully personalised.</div>
        </div>}
        {view==="combined"&&<div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
          <Label color={t.cyan}>Your Complete Profile</Label>
          <div style={{ fontSize:15,color:t.t2,textAlign:"center",lineHeight:1.7,marginBottom:20 }}>Blood biomarkers and DNA variants combined into your complete longevity picture.</div>
          <div style={{ width:"100%",display:"flex",gap:12,marginBottom:14 }}>
            {[{l:"Biomarkers",v:"70+",c:t.cyan},{l:"DNA Variants",v:"5",c:t.purple},{l:"Protocol Items",v:"7",c:t.emerald}].map(s=>(
              <div key={s.l} style={{ flex:1,background:t.s1,borderRadius:12,padding:"17px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
                <div style={{ fontSize:24,fontWeight:800,color:s.c }}>{s.v}</div>
                <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ width:"100%",display:"flex",gap:12,marginBottom:14 }}>
            {[{l:"EVA™ Age",v:"34",c:t.emerald},{l:"Chronological",v:"38",c:t.t3},{l:"Difference",v:"-4",c:t.emerald}].map(s=>(
              <div key={s.l} onClick={s.l==="EVA™ Age"?()=>onNavigate("eva-age"):undefined} style={{ flex:1,background:s.l==="EVA™ Age"?`linear-gradient(135deg, ${t.emerald}12, ${t.emerald}06)`:t.s1,borderRadius:12,padding:"12px 8px",textAlign:"center",border:s.l==="EVA™ Age"?`1.5px solid ${t.emerald}25`:`1px solid ${t.b1}`,cursor:s.l==="EVA™ Age"?"pointer":"default" }}>
                {s.l==="EVA™ Age"&&<div style={{ display:"flex",justifyContent:"center",marginBottom:2 }}><MiniDNA w={50} h={24} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/></div>}
                <div style={{ fontSize:24,fontWeight:800,color:s.c }}>{s.v}</div>
                <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>}
      </div>
      <div style={{ flexShrink:0,padding:"0 24px 8px" }}>
        <Btn onClick={()=>onNavigate("today")}>View My Protocol →</Btn>
        <div style={{ marginTop:12,paddingTop:8,borderTop:`1px dashed ${t.b2}` }}>
          <div style={{ fontSize:10,fontWeight:700,color:t.t4,letterSpacing:2,textAlign:"center",marginBottom:6 }}>RESULT VIEW SIMULATOR</div>
          <div style={{ display:"flex",gap:8 }}>
            {[{id:"blood",l:"Blood"},{id:"dna",l:"DNA"},{id:"combined",l:"Combined"}].map(v=>(
              <div key={v.id} onClick={()=>setView(v.id)} style={{ flex:1,background:view===v.id?`${t.t4}15`:t.s2,border:`1px dashed ${view===v.id?t.t4:t.b2}`,borderRadius:6,padding:"6px 0",textAlign:"center",fontSize:10,fontWeight:600,color:view===v.id?t.t3:t.t4,cursor:"pointer" }}>{v.l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════
// NEW: Results Tab (My Biology)
// ══════════════════════════════════════════
const ResultsTabScreen = ({ onNavigate, subTarget, clearSubTarget, gender }) => {
  const t = useTheme();
  const [tab, setTab] = useState("blood");
  useEffect(()=>{if(subTarget){setTab(subTarget);clearSubTarget?.()}},[subTarget]);
  const [expandedMarker, setExpandedMarker] = useState(null);
  const [expandedSystems, setExpandedSystems] = useState(new Set());
  const [bioFilter, setBioFilter] = useState("all");
  const [expandedDNA, setExpandedDNA] = useState(new Set());
  const [dnaShowAll, setDnaShowAll] = useState(new Set());

  const toggleSys = (id) => { const s = new Set(expandedSystems); s.has(id)?s.delete(id):s.add(id); setExpandedSystems(s); };
  const toggleDnaSys = (id) => { const s = new Set(expandedDNA); s.has(id)?s.delete(id):s.add(id); setExpandedDNA(s); };
  const toggleDnaAll = (id) => { const s = new Set(dnaShowAll); s.has(id)?s.delete(id):s.add(id); setDnaShowAll(s); };

  /* ── Blood Systems Data (from Blood Markers Tab spec) ── */
  const bloodSystems = [
    { id:"cardio", letter:"A", name:"Heart & Blood Vessels", ic:"\u2665",
      main:[
        { name:"ApoB",val:"112",unit:"mg/dL",status:"suboptimal",optimal:"<100 mg/dL (target-dependent)",meaning:"ApoB counts the number of cholesterol particles that can enter arteries and cause plaque buildup, driving heart attack risk.",action:"Supports ApoB reduction using Berberine to improve cholesterol clearance." },
        { name:"Lipoprotein(a)",val:"22",unit:"mg/dL",status:"optimal",optimal:"<30 mg/dL",meaning:"Lp(a) is an inherited cholesterol particle that increases the risk of heart attack and stroke.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"LDL Cholesterol",val:"118",unit:"mg/dL",status:"suboptimal",optimal:"<100 mg/dL",meaning:"LDL carries cholesterol through the bloodstream and contributes to plaque formation when elevated.",action:"Supports cholesterol metabolism through dietary optimisation." },
        { name:"HDL Cholesterol",val:"58",unit:"mg/dL",status:"optimal",optimal:"50–90 mg/dL",meaning:"HDL helps remove excess cholesterol from the bloodstream and transport it back to the liver.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Triglycerides",val:"142",unit:"mg/dL",status:"suboptimal",optimal:"<90 mg/dL",meaning:"Triglycerides measure circulating fats and reflect metabolic health and insulin sensitivity.",action:"Supports fat metabolism using Omega-3 fatty acids." },
      ]
    },
    { id:"sugar", letter:"B", name:"Blood Sugar Control", ic:"\u25C9",
      main:[
        { name:"HOMA-IR",val:"2.1",unit:"",status:"suboptimal",optimal:"≤1.5",meaning:"HOMA-IR estimates how resistant your body is to insulin, a key driver of metabolic disease.",action:"Supports insulin sensitivity using Berberine and Magnesium." },
        { name:"TG/HDL Ratio",val:"2.4",unit:"",status:"suboptimal",optimal:"≤1.5",meaning:"This ratio reflects how efficiently your body processes energy and indicates insulin resistance risk.",action:"Supports metabolic health using Omega-3 and Berberine." },
      ],
      expanded:[
        { name:"Fasting Glucose",val:"92",unit:"mg/dL",status:"optimal",optimal:"<95 mg/dL",meaning:"Fasting glucose measures how well your body maintains stable blood sugar levels.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Fasting Insulin",val:"9.2",unit:"µIU/mL",status:"suboptimal",optimal:"<6 µIU/mL",meaning:"Fasting insulin shows how much insulin your body needs to regulate blood sugar.",action:"Supports insulin sensitivity using Berberine." },
      ]
    },
    { id:"inflam", letter:"C", name:"Inflammation & Liver", ic:"\u26A0",
      main:[
        { name:"hs-CRP",val:"2.8",unit:"mg/L",status:"abnormal",optimal:"<0.6 mg/L",meaning:"hs-CRP measures inflammation in the body and is linked to chronic disease risk.",action:"Supports inflammation reduction using Omega-3 and Vitamin C." },
        { name:"GGT",val:"24",unit:"U/L",status:"suboptimal",optimal:"<11 U/L",meaning:"GGT is a liver enzyme that reflects oxidative stress and detoxification burden.",action:"Supports liver detox and metabolic recovery." },
      ],
      expanded:[
        { name:"AST",val:"28",unit:"U/L",status:"optimal",optimal:"17–30 U/L",meaning:"AST reflects liver and metabolic stress.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"ALT",val:"32",unit:"U/L",status:"suboptimal",optimal:"<29 U/L",meaning:"ALT measures liver cell stress and damage. It is more specific to liver stress compared to AST.",action:"Supports liver health through metabolic optimisation." },
        { name:"Uric Acid",val:"5.8",unit:"mg/dL",status:"optimal",optimal:"<6 mg/dL",meaning:"Uric acid reflects purine metabolism and is linked to inflammation, gout, and metabolic risk.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
    { id:"nutrition", letter:"D", name:"Nutrition", ic:"\u2726",
      main:[
        { name:"Vitamin B12",val:"380",unit:"pg/mL",status:"suboptimal",optimal:">400 pg/mL",meaning:"Vitamin B12 supports nerve function, energy production, and methylation pathways.",action:"Supports methylation using Vitamin B12 supplementation." },
        { name:"Folate",val:"14",unit:"ng/mL",status:"optimal",optimal:"≥11 ng/mL",meaning:"Folate supports DNA repair and methylation processes.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Homocysteine",val:"11.2",unit:"µmol/L",status:"suboptimal",optimal:"<9 µmol/L",meaning:"Homocysteine rises when methylation is impaired and is linked to cardiovascular and brain risk.",action:"Supports methylation using L-Methylfolate and Vitamin B12." },
        { name:"Magnesium (RBC)",val:"4.2",unit:"mEq/L",status:"suboptimal",optimal:"≥4.5 mEq/L",meaning:"Magnesium supports energy production, sleep, and nervous system balance.",action:"Supports recovery using Magnesium Glycinate." },
        { name:"Vitamin D",val:"18",unit:"ng/mL",status:"abnormal",optimal:"50–80 ng/mL",meaning:"Vitamin D regulates immune function, bone health, and metabolic balance.",action:"Optimises levels using Vitamin D3 + K2." },
      ],
      expanded:[
        { name:"Zinc",val:"74",unit:"µg/dL",status:"suboptimal",optimal:"80–130 µg/dL",meaning:"Zinc supports immune function, hormone production, and cellular repair.",action:"Supports immune and hormone health using Zinc." },
        { name:"Ferritin",val:"89",unit:"ng/mL",status:"optimal",optimal:"70–200 ng/mL",meaning:"Ferritin reflects iron storage and oxygen delivery capacity, affecting energy, sleep, and hair/skin.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Hemoglobin",val:"14.8",unit:"g/dL",status:"optimal",optimal:">13 g/dL",meaning:"Hemoglobin carries oxygen in the blood and reflects overall oxygen transport.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
    { id:"hormones", letter:"E", name:"Hormones", ic:"\u2642",
      main: gender === "male" ? [
        { name:"Testosterone",val:"680",unit:"ng/dL",status:"optimal",optimal:"500–900 ng/dL",meaning:"Testosterone regulates energy, muscle mass, mood, and metabolic health.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Cortisol (AM)",val:"14",unit:"µg/dL",status:"optimal",optimal:"6–20 µg/dL",meaning:"Cortisol regulates stress response, energy levels, and daily rhythm.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"IGF-1",val:"218",unit:"ng/mL",status:"optimal",optimal:"Age-adjusted median",meaning:"IGF-1 reflects growth hormone activity linked to muscle maintenance and metabolic health.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ] : [
        { name:"Estrogen (Estradiol)",val:"—",unit:"pg/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"Estrogen regulates reproductive health, bone strength, and metabolic balance.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"Progesterone",val:"—",unit:"ng/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"Progesterone supports menstrual balance, fertility, and mood regulation.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"LH",val:"—",unit:"mIU/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"LH regulates ovulation and reproductive hormone signalling.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"Cortisol (AM)",val:"14",unit:"µg/dL",status:"optimal",optimal:"6–20 µg/dL",meaning:"Cortisol regulates stress response, energy levels, and daily rhythm.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"TSH",val:"2.1",unit:"mIU/L",status:"optimal",optimal:"0.5–2.5 mIU/L",meaning:"TSH indicates thyroid function which regulates metabolism, energy, and body temperature.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Free T3",val:"0.38",unit:"ng/dL",status:"optimal",optimal:">0.35 ng/dL",meaning:"Free T3 is the active thyroid hormone that regulates metabolism at the cellular level.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Free T4",val:"1.2",unit:"ng/dL",status:"optimal",optimal:">1.0 ng/dL",meaning:"Free T4 is converted to active T3 and reflects thyroid output.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        ...(gender === "male" ? [
          { name:"SHBG",val:"38",unit:"nmol/L",status:"optimal",optimal:"Reference range",meaning:"SHBG binds testosterone and regulates free hormone availability.",action:"Book a telehealth consult with an EVA™ physician." },
          { name:"PSA",val:"0.8",unit:"ng/mL",status:"optimal",optimal:"<4.0 ng/mL",meaning:"PSA screens for prostate health and inflammation.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        ] : [
          { name:"FSH",val:"—",unit:"mIU/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"FSH controls ovarian function and reproductive hormone balance.",action:"Book a telehealth consult with an EVA™ physician." },
        ]),
        { name:"DHEA",val:"320",unit:"µg/dL",status:"optimal",optimal:"Reference range",meaning:"DHEA is a precursor hormone supporting vitality and immune function.",action:"Book a telehealth consult with an EVA™ physician." },
      ]
    },
    { id:"kidney", letter:"F", name:"Kidney & Electrolytes", ic:"\u25CE",
      main:[
        { name:"Creatinine",val:"1.0",unit:"mg/dL",status:"optimal",optimal:"<1.2 mg/dL",meaning:"Creatinine reflects kidney function and filtration capacity.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Sodium",val:"141",unit:"mmol/L",status:"optimal",optimal:"138–145 mmol/L",meaning:"Sodium regulates fluid balance and nerve function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Potassium",val:"4.2",unit:"mmol/L",status:"optimal",optimal:"3.8–5.5 mmol/L",meaning:"Potassium supports heart rhythm and muscle function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"BUN",val:"16",unit:"mg/dL",status:"optimal",optimal:"7–20 mg/dL",meaning:"BUN reflects protein metabolism and kidney function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Chloride",val:"102",unit:"mmol/L",status:"optimal",optimal:"98–106 mmol/L",meaning:"Chloride helps maintain fluid balance and acid-base stability.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
  ];

  /* ── DNA Data (from DNA Tab spec) ── */
  const dnaSystems = [
    { id:"methylation", name:"Methylation Pathway", desc:"Supports DNA repair, detoxification, neurotransmitters, and long-term disease prevention.",
      rule:"Shows only impaired genes. Tap 'See all' for complete panel.",
      markers:[
        { gene:"MTHFR",status:"impaired",level:"orange",meaning:"MTHFR controls conversion of folate into its active form used for DNA repair and methylation.",action:"Supports methylation using L-Methylfolate and Vitamin B12." },
        { gene:"FOLH1",status:"normal",level:"green",meaning:"FOLH1 regulates absorption of folate from food in the gut.",action:"No action needed." },
        { gene:"DHFR",status:"normal",level:"green",meaning:"DHFR converts synthetic folic acid into active folate in the body.",action:"No action needed." },
        { gene:"MTR",status:"normal",level:"green",meaning:"MTR helps recycle homocysteine into methionine, a key step in methylation.",action:"No action needed." },
        { gene:"MTRR",status:"impaired",level:"orange",meaning:"MTRR regenerates active B12 required for methylation to function properly.",action:"Supports methylation using Vitamin B12." },
        { gene:"CUBN",status:"normal",level:"green",meaning:"CUBN affects absorption of Vitamin B12 from the gut.",action:"No action needed." },
        { gene:"PDXK",status:"normal",level:"green",meaning:"PDXK activates Vitamin B6, which supports homocysteine metabolism.",action:"No action needed." },
        { gene:"COMT",status:"impaired",level:"orange",meaning:"COMT controls the breakdown of dopamine, adrenaline, and oestrogen. Slow variants cause slower clearance of stress hormones, amplifying the anxiety and stress response.",action:"Regulate COMT activity via targeted Magnesium, Omega-3, and Vitamin C dosing." },
      ]
    },
    { id:"diet", name:"Diet & Sensitivities", desc:"Determines how your body responds to macronutrients and potential food triggers.",
      rule:"Shows macronutrient response and positive sensitivities only.",
      macros:[
        { name:"Carbohydrate Response",result:"Intermediate response",color:"gold",meaning:"Indicates how efficiently your body processes carbohydrates and regulates blood sugar.",action:"Personalises carbohydrate intake and plate structure." },
        { name:"Fat Response",result:"Worse response",color:"red",meaning:"Indicates how your body responds to dietary fats, especially saturated fats.",action:"Guides fat intake and saturated fat restriction." },
        { name:"Protein Response",result:"Better response",color:"emerald",meaning:"Indicates how effectively your body uses protein for muscle and metabolism.",action:"Sets personalised daily protein targets." },
      ],
      sensitivities:[
        { name:"Lactose Sensitivity",detected:true,meaning:"Indicates reduced ability to digest lactose, leading to bloating or discomfort.",action:"Initiate 3-week lactose elimination protocol." },
        { name:"Gluten Sensitivity",detected:false,meaning:"Indicates increased likelihood of sensitivity to gluten-containing foods.",action:"No sensitivity detected." },
        { name:"Histamine Sensitivity",detected:false,meaning:"Indicates reduced ability to break down histamine from foods.",action:"No sensitivity detected." },
        { name:"Oxalate Sensitivity",detected:false,meaning:"Indicates increased sensitivity to oxalate-rich foods.",action:"No sensitivity detected." },
        { name:"Salicylate Sensitivity",detected:false,meaning:"Indicates sensitivity to salicylates found in fruits, spices, and medications.",action:"No sensitivity detected." },
      ]
    },
    { id:"risk", name:"Disease Risks", desc:"Represents genetic predisposition — not diagnosis. Results indicate probabilities, not certainties.",
      rule:"Shows only higher/increased risk markers.",
      markers:[
        { name:"Coronary Artery Disease",category:"Cardiovascular",risk:"higher",variants:"1,049,366",meaning:"Estimates inherited risk of plaque buildup in heart arteries, the process that causes heart attacks.",action:"Aggressively optimise ApoB, inflammation, and insulin resistance." },
        { name:"Type 2 Diabetes",category:"Metabolic",risk:"average",variants:"1,048,858",meaning:"Estimates your genetic risk of developing Type 2 Diabetes, which is shaped by both lifestyle and genetics.",action:"No increased genetic risk detected." },
        { name:"Alzheimer's Disease (ApoE)",category:"Neurological",risk:"average",variants:"ApoE",alleles:"E3/E3",meaning:"Driven by ApoE genotype. One copy of E4 = slightly elevated risk. Two copies = significantly elevated. No E4 = average risk.",action:"No increased genetic risk detected." },
        { name:"Colorectal Cancer",category:"Cancer",risk:"average",variants:"1,049,410",meaning:"Indicates increased inherited risk of colon cancer.",action:"No increased genetic risk detected." },
        { name:"Prostate Cancer",category:"Cancer",risk:"higher",variants:"1,049,413",meaning:"Indicates increased inherited risk of prostate cancer.",action:"Initiate early screening including PSA blood test." },
        { name:"Lung Cancer",category:"Cancer",risk:"average",variants:"849,819",meaning:"Indicates increased inherited risk of lung cancer.",action:"No increased genetic risk detected." },
        { name:"Breast Cancer",category:"Cancer",risk:"average",variants:"TBC",meaning:"Indicates inherited risk of breast cancer.",action:"No increased genetic risk detected." },
        { name:"Ovarian Cancer",category:"Cancer",risk:"average",variants:"TBC",meaning:"Indicates inherited risk of ovarian cancer.",action:"No increased genetic risk detected." },
        { name:"Stroke",category:"Disease Risks",risk:"average",variants:"1,030,648",meaning:"Estimates inherited risk of stroke based on cardiovascular and clotting genetic markers.",action:"Optimise blood pressure, inflammation, and cardiovascular health." },
        { name:"Melanoma",category:"Disease Risks",risk:"average",variants:"1,049,396",meaning:"Indicates inherited risk of melanoma skin cancer.",action:"Prioritise sun protection and regular skin checks." },
        { name:"Pancreatic Cancer",category:"Disease Risks",risk:"average",variants:"35,160",meaning:"Indicates inherited risk of pancreatic cancer.",action:"Early screening." },
      ]
    },
  ];

  const statusColor = s => s === "optimal" ? t.emerald : s === "suboptimal" ? t.gold : t.red;
  const levelColor = l => l === "green" ? t.emerald : l === "orange" ? t.gold : t.red;
  const allFlat = bloodSystems.flatMap(sys => [...sys.main, ...sys.expanded]);
  const optCount = allFlat.filter(m=>m.status==="optimal").length;
  const subCount = allFlat.filter(m=>m.status==="suboptimal").length;
  const abnCount = allFlat.filter(m=>m.status==="abnormal").length;

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
          <div><div style={{ fontSize:14,color:t.t3,fontWeight:500 }}>Daniel Salewski</div><div style={{ fontSize:24,fontWeight:700,color:t.t1,letterSpacing:-.3 }}>My Biology</div></div>
          <div onClick={()=>onNavigate("eva-age")} style={{ background:`linear-gradient(135deg, ${t.emerald}15, ${t.emerald}08)`,borderRadius:14,padding:"10px 18px",border:`1.5px solid ${t.emerald}30`,cursor:"pointer",textAlign:"center" }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:2 }}><MiniDNA w={50} h={28} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/></div>
            <div style={{ fontSize:26,fontWeight:800,color:t.emerald }}>34</div>
            <div style={{ fontSize:10,color:t.emerald,fontWeight:600,letterSpacing:1 }}>EVA™ AGE</div>
            <div style={{ fontSize:9,color:t.emerald,marginTop:2,opacity:.7 }}>{"-4 yrs →"}</div>
          </div>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:16 }}>
          {[{id:"blood",l:"Blood",ic:<svg width="14" height="14" viewBox="0 0 14 15" fill="none"><path d="M7 1C7 1 2 6 2 9.5a5 5 0 0010 0c0-3.5-5-8.5-5-8.5z" stroke={tab==="blood"?"#FFF":t.t3} strokeWidth="1.3" fill="none"/></svg>},
            {id:"dna",l:"DNA",ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 1v12M10 1v12" stroke={tab==="dna"?"#FFF":t.t3} strokeWidth="1.2"/><path d="M4 4h6M4 7h6M4 10h6" stroke={tab==="dna"?"#FFF":t.t3} strokeWidth="1" strokeLinecap="round"/></svg>},
            {id:"progress",l:"Progress",ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11l3-4 3 2 4-6" stroke={tab==="progress"?"#FFF":t.t3} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          ].map(tb=>(
            <div key={tb.id} onClick={()=>setTab(tb.id)} style={{ flex:1,background:tab===tb.id?t.purple:t.s2,border:tab===tb.id?`1.5px solid ${t.purple}`:`1px solid ${t.b2}`,borderRadius:12,padding:"10px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontSize:14,fontWeight:600,color:tab===tb.id?"#FFF":t.t3,cursor:"pointer",transition:"all .2s" }}>{tb.ic}{tb.l}</div>
          ))}
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"0 24px",paddingBottom:8 }}>

        {/* ═══ BLOOD TAB ═══ */}
        {tab === "blood" ? (
          <>
            {/* Summary counters */}
            <div style={{ display:"flex",gap:12,marginBottom:10 }}>
              {[{l:"Optimal",n:optCount,c:t.emerald},{l:"Suboptimal",n:subCount,c:t.gold},{l:"Abnormal",n:abnCount,c:t.red}].map(s=>(
                <div key={s.l} style={{ flex:1,background:t.s1,borderRadius:12,padding:"15px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
                  <div style={{ fontSize:22,fontWeight:800,color:s.c }}>{s.n}</div>
                  <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Filter chips */}
            <div style={{ display:"flex",gap:8,marginBottom:14,marginTop:8 }}>
              {[{l:"All",v:"all"},{l:"Optimal",v:"optimal"},{l:"Suboptimal",v:"suboptimal"},{l:"Abnormal",v:"abnormal"}].map(f=>(
                <div key={f.v} onClick={()=>setBioFilter(f.v)} style={{ flex:1,background:bioFilter===f.v?`${t.purple}15`:t.s2,border:`1.5px solid ${bioFilter===f.v?t.purple:t.b2}`,borderRadius:8,padding:"8px 0",textAlign:"center",fontSize:12,fontWeight:600,color:bioFilter===f.v?t.purple:t.t3,cursor:"pointer",transition:"all .2s" }}>{f.l}</div>
              ))}
            </div>

            {/* Systems */}
            <VideoCard title="Why Our Blood Panel is Superior" duration="2:00"/>
            {bloodSystems.map(sys => {
              const sysMarkers = [...sys.main, ...(expandedSystems.has(sys.id) ? sys.expanded : [])];
              const filtered = bioFilter === "all" ? sysMarkers : sysMarkers.filter(m=>m.status===bioFilter);
              if (filtered.length === 0 && bioFilter !== "all") return null;
              const sysAbn = [...sys.main,...sys.expanded].filter(m=>m.status==="abnormal").length;
              const sysSub = [...sys.main,...sys.expanded].filter(m=>m.status==="suboptimal").length;
              const worstColor = sysAbn > 0 ? t.red : sysSub > 0 ? t.gold : t.emerald;
              return (
                <div key={sys.id} style={{ marginBottom:16 }}>
                  {/* System header */}
                  <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${worstColor}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:worstColor,fontWeight:700 }}>{sys.letter}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>{sys.main.length} key markers{sys.expanded.length > 0 ? ` · ${sys.expanded.length} more` : ""}</div>
                    </div>
                    <div style={{ display:"flex",gap:3 }}>
                      {sysAbn > 0 && <div style={{ width:8,height:8,borderRadius:4,background:t.red }}/>}
                      {sysSub > 0 && <div style={{ width:8,height:8,borderRadius:4,background:t.gold }}/>}
                      {sysAbn === 0 && sysSub === 0 && <div style={{ width:8,height:8,borderRadius:4,background:t.emerald }}/>}
                    </div>
                  </div>

                  {/* Markers */}
                  {filtered.map((m, mi) => {
                    const mKey = sys.id + "-" + mi;
                    const isExp = expandedMarker === mKey;
                    return (
                      <Card key={mi} onClick={()=>setExpandedMarker(isExp?null:mKey)} style={{ padding:14,cursor:"pointer",transition:"all .2s",marginBottom:8,border:isExp?`1.5px solid ${statusColor(m.status)}30`:undefined }}>
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4 }}>
                          <span style={{ fontSize:15,fontWeight:600,color:t.t1,flex:1 }}>{m.name}</span>
                          <div style={{ display:"flex",alignItems:"baseline",gap:6 }}>
                            <span style={{ fontSize:17,fontWeight:700,color:statusColor(m.status) }}>{m.val}</span>
                            <span style={{ fontSize:12,color:t.t3 }}>{m.unit}</span>
                          </div>
                          <div style={{ marginLeft:8,transition:"transform .2s",transform:isExp?"rotate(90deg)":"none" }}><ChevronRight size={10} color={t.t3}/></div>
                        </div>
                        <div style={{ display:"flex",justifyContent:"space-between",marginTop:5 }}>
                          <span style={{ fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:1,padding:"4px 8px",borderRadius:4,background:`${statusColor(m.status)}12`,color:statusColor(m.status) }}>{m.status}</span>
                          <span style={{ fontSize:11,color:t.t3 }}>Optimal: {m.optimal}</span>
                        </div>
                        {isExp && (
                          <div style={{ marginTop:12,paddingTop:12,borderTop:`1px solid ${t.b1}`,animation:"fadeUp .25s ease both" }}>
                            <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:6 }}>WHAT THIS MEANS</div>
                            <div style={{ fontSize:13,color:t.t2,lineHeight:1.6,marginBottom:12 }}>{m.meaning}</div>
                            <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:6 }}>EVA™ ACTION</div>
                            <div style={{ fontSize:13,color:t.emerald,lineHeight:1.6 }}>{m.action}</div>
                          </div>
                        )}
                      </Card>
                    );
                  })}

                  {/* See more / less toggle */}
                  {sys.expanded.length > 0 && (
                    <div onClick={()=>toggleSys(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",cursor:"pointer" }}>
                      <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{expandedSystems.has(sys.id) ? "See less" : `See ${sys.expanded.length} more markers`}</span>
                      <div style={{ transform:expandedSystems.has(sys.id)?"rotate(-90deg)":"rotate(90deg)",transition:"transform .2s" }}><ChevronRight size={10} color={t.purple}/></div>
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{marginTop:20}}>
              <Btn variant="secondary" onClick={()=>onNavigate("report-viewer")} style={{width:"100%"}}>Download My Blood Reports</Btn>
            </div>
          </>

        /* ═══ DNA TAB ═══ */
        ) : tab === "dna" ? (
          <>
            <Card style={{ background:`${t.purple}08`,border:`1px solid ${t.purple}18`,marginBottom:16 }}>
              <div style={{ fontSize:14,color:t.t2,lineHeight:1.6 }}>EVA™ screens over 200 million genetic variants, calculates composite risk scores, and surfaces only what’s most relevant to your biology.</div>
            </Card>

            <VideoCard title="How We Read Your DNA" duration="2:45"/>

            {/* ── 1. Methylation ── */}
            {(() => {
              const sys = dnaSystems[0];
              const abnormal = sys.markers.filter(m=>m.status==="impaired");
              const showAll = dnaShowAll.has(sys.id);
              const visible = showAll ? sys.markers : abnormal;
              return (
                <div style={{ marginBottom:20 }}>
                  <div onClick={()=>toggleDnaSys(sys.id)} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:t.purple }}>1</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>{abnormal.length} impaired gene{abnormal.length!==1?"s":""} of {sys.markers.length}</div>
                    </div>
                    <div style={{ transform:expandedDNA.has(sys.id)?"rotate(90deg)":"none",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                  {expandedDNA.has(sys.id) && (
                    <div style={{ animation:"fadeUp .2s ease both" }}>
                      <div style={{ fontSize:12,color:t.t3,marginBottom:10,lineHeight:1.5 }}>{sys.desc}</div>
                      {visible.map((m,i) => (
                        <Card key={i} style={{ padding:14,marginBottom:8,borderLeft:`3px solid ${levelColor(m.level)}` }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                            <div style={{ fontSize:16,fontWeight:700,color:t.purple,letterSpacing:.5 }}>{m.gene}</div>
                            <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:m.level==="green"?`${t.emerald}12`:`${t.gold}12`,color:m.level==="green"?t.emerald:t.gold }}>{m.status==="impaired"?"Slightly Impaired":"Normal"}</div>
                          </div>
                          <div style={{ fontSize:13,color:t.t2,lineHeight:1.5,marginBottom:6 }}>{m.meaning}</div>
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <div style={{ width:5,height:5,borderRadius:"50%",background:m.status==="impaired"?t.gold:t.emerald }}/>
                            <span style={{ fontSize:12,color:m.status==="impaired"?t.gold:t.emerald,fontWeight:500 }}>{m.action}</span>
                          </div>
                        </Card>
                      ))}
                      {sys.markers.length > abnormal.length && (
                        <div onClick={()=>toggleDnaAll(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",cursor:"pointer" }}>
                          <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{showAll ? "Show impaired only" : `See all ${sys.markers.length} genes`}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── 2. Diet & Sensitivities ── */}
            {(() => {
              const sys = dnaSystems[1];
              const showAll = dnaShowAll.has(sys.id);
              const posSens = sys.sensitivities.filter(s=>s.detected);
              const visSens = showAll ? sys.sensitivities : posSens;
              return (
                <div style={{ marginBottom:20 }}>
                  <div onClick={()=>toggleDnaSys(sys.id)} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${t.gold}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:t.gold }}>2</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>3 macros · {posSens.length} sensitivity detected</div>
                    </div>
                    <div style={{ transform:expandedDNA.has(sys.id)?"rotate(90deg)":"none",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                  {expandedDNA.has(sys.id) && (
                    <div style={{ animation:"fadeUp .2s ease both" }}>
                      <div style={{ fontSize:12,color:t.t3,marginBottom:10,lineHeight:1.5 }}>{sys.desc}</div>
                      {/* Macronutrient Response */}
                      <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8 }}>MACRONUTRIENT RESPONSE</div>
                      {sys.macros.map((m,i) => (
                        <Card key={i} style={{ padding:14,marginBottom:8 }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                            <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{m.name}</div>
                            <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:`${t[m.color]}12`,color:t[m.color] }}>{m.result}</div>
                          </div>
                          <div style={{ fontSize:12,color:t.t3,lineHeight:1.5,marginBottom:4 }}>{m.meaning}</div>
                          <div style={{ fontSize:12,color:t.emerald,fontWeight:500 }}>{m.action}</div>
                        </Card>
                      ))}
                      {/* Sensitivities */}
                      <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8,marginTop:14 }}>FOOD SENSITIVITIES</div>
                      {visSens.map((s,i) => (
                        <Card key={i} style={{ padding:14,marginBottom:8,borderLeft:`3px solid ${s.detected?t.red:t.emerald}` }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                            <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{s.name}</div>
                            <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:s.detected?`${t.red}12`:`${t.emerald}12`,color:s.detected?t.red:t.emerald }}>{s.detected?"Detected":"Not detected"}</div>
                          </div>
                          <div style={{ fontSize:12,color:t.t3,lineHeight:1.5,marginBottom:4 }}>{s.meaning}</div>
                          <div style={{ fontSize:12,color:s.detected?t.gold:t.emerald,fontWeight:500 }}>{s.action}</div>
                        </Card>
                      ))}
                      {sys.sensitivities.length > posSens.length && (
                        <div onClick={()=>toggleDnaAll(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",cursor:"pointer" }}>
                          <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{showAll ? "Show positive only" : `See all ${sys.sensitivities.length} sensitivities`}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── 3. Disease Risks ── */}
            {(() => {
              const sys = dnaSystems[2];
              const showAll = dnaShowAll.has(sys.id);
              const elevated = sys.markers.filter(m=>m.risk==="higher");
              const visible = showAll ? sys.markers : elevated;
              return (
                <div style={{ marginBottom:20 }}>
                  <div onClick={()=>toggleDnaSys(sys.id)} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",paddingBottom:8,borderBottom:`1px solid ${t.b1}` }}>
                    <div style={{ width:30,height:30,borderRadius:8,background:`${t.red}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:t.red }}>3</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{sys.name}</div>
                      <div style={{ fontSize:11,color:t.t3 }}>{elevated.length} higher risk</div>
                    </div>
                    <div style={{ transform:expandedDNA.has(sys.id)?"rotate(90deg)":"none",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                  {expandedDNA.has(sys.id) && (
                    <div style={{ animation:"fadeUp .2s ease both" }}>
                      <div style={{ fontSize:12,color:t.t3,marginBottom:10,lineHeight:1.5 }}>{sys.desc}</div>
                      {visible.map((m,i) => {
                        const riskColor = m.risk==="higher"?t.red:t.emerald;
                        return (
                          <Card key={i} style={{ padding:14,marginBottom:8,borderLeft:`3px solid ${riskColor}` }}>
                            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
                              <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{m.name}</div>
                              <div style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:`${riskColor}12`,color:riskColor }}>{m.risk==="higher"?"Higher risk":"Average risk"}</div>
                            </div>
                            <div style={{ fontSize:10,fontWeight:600,color:t.t3,letterSpacing:.5,marginBottom:2 }}>{m.category}</div>
                            {m.variants&&<div style={{ fontSize:10,color:t.t3,marginBottom:4 }}>{m.variants==="ApoE"?`Alleles: ${m.alleles||"—"}`:`${m.variants} variants analysed`}{m.variants==="TBC"?" (pending)":""}</div>}
                            <div style={{ fontSize:12,color:t.t3,lineHeight:1.5,marginBottom:6 }}>{m.meaning}</div>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <div style={{ width:5,height:5,borderRadius:"50%",background:m.risk==="higher"?t.gold:t.emerald }}/>
                              <span style={{ fontSize:12,color:m.risk==="higher"?t.gold:t.emerald,fontWeight:500 }}>{m.action}</span>
                            </div>
                          </Card>
                        );
                      })}
                      {sys.markers.length > elevated.length && (
                        <div onClick={()=>toggleDnaAll(sys.id)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",cursor:"pointer" }}>
                          <span style={{ fontSize:13,fontWeight:600,color:t.purple }}>{showAll ? "Show higher risk only" : `See all ${sys.markers.length} conditions`}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          <div style={{marginTop:20}}>
              <Btn variant="secondary" onClick={()=>onNavigate("dna-report")} style={{width:"100%"}}>Download My DNA Reports</Btn>
            </div>
          </>

        /* ═══ PROGRESS TAB ═══ */
        ) : (
          <>
            <VideoCard title="Six Months In — A Message from Daniel" duration="2:15"/>
            <Card style={{ background:`${t.emerald}06`,border:`1px solid ${t.emerald}20`,marginBottom:16 }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:`${t.emerald}14`,display:"flex",alignItems:"center",justifyContent:"center" }}><CheckIcon size={18} color={t.emerald}/></div>
                <div><div style={{ fontSize:16,fontWeight:700,color:t.t1 }}>3 markers improved</div><div style={{ fontSize:13,color:t.emerald,fontWeight:500 }}>since your last panel</div></div>
              </div>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                {[{m:"Vitamin D",d:"+14 ng/mL",c:t.emerald},{m:"Omega-3",d:"+1.4%",c:t.emerald},{m:"Magnesium",d:"+0.8 mEq/L",c:t.emerald}].map((x,i)=>(
                  <div key={i} style={{ background:`${x.c}10`,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,color:x.c }}>{x.m} {x.d} ↑</div>
                ))}
              </div>
            </Card>
            <Card style={{ background:`${t.gold}06`,border:`1px solid ${t.gold}20`,marginBottom:16 }}>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:`${t.gold}14`,display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={t.gold} strokeWidth="1.5"/><path d="M8 5v4M8 11h.01" stroke={t.gold} strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                <div><div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>1 marker needs attention</div><div style={{ fontSize:13,color:t.gold,fontWeight:500 }}>hs-CRP still elevated — protocol adjusted</div></div>
              </div>
            </Card>
            {[
              {name:"Vitamin D",unit:"ng/mL",target:50,data:[{q:"Feb 25",v:18},{q:"May 25",v:26},{q:"Aug 25",v:32},{q:"Nov 25",v:38}],status:"improving"},
              {name:"hs-CRP",unit:"mg/L",target:0.6,data:[{q:"Feb 25",v:2.8},{q:"May 25",v:2.1},{q:"Aug 25",v:1.4},{q:"Nov 25",v:1.1}],status:"improving",lower:true},
              {name:"Homocysteine",unit:"µmol/L",target:9.0,data:[{q:"Feb 25",v:11.2},{q:"May 25",v:10.4},{q:"Aug 25",v:9.8},{q:"Nov 25",v:9.1}],status:"improving",lower:true},
              {name:"Magnesium",unit:"mEq/L",target:4.5,data:[{q:"Feb 25",v:4.2},{q:"May 25",v:4.4},{q:"Aug 25",v:4.6},{q:"Nov 25",v:4.8}],status:"improving"},
            ].map((marker,mi)=>{
              const latest = marker.data[marker.data.length-1].v;
              const first = marker.data[0].v;
              const pctChange = Math.round(Math.abs((latest-first)/first)*100);
              const improving = marker.lower ? latest < first : latest > first;
              const reachedTarget = marker.lower ? latest <= marker.target : latest >= marker.target;
              const lineColor = reachedTarget ? t.emerald : improving ? t.gold : t.red;
              return (
              <Card key={mi} style={{ padding:16,marginBottom:12 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4 }}>
                  <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{marker.name}</div>
                  <div style={{ fontSize:13,fontWeight:700,color:lineColor }}>{latest} {marker.unit} {improving?"↑":"↓"} {pctChange}%</div>
                </div>
                <div style={{ fontSize:11,color:t.t3,marginBottom:10 }}>Target: {marker.target} {marker.unit}</div>
                <div style={{ height:100,marginLeft:-10,marginRight:-5 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marker.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.b1} vertical={false}/>
                      <XAxis dataKey="q" tick={{fontSize:10,fill:t.t3}} axisLine={false} tickLine={false}/>
                      <YAxis hide domain={["dataMin-2","dataMax+5"]}/>
                      <ReferenceLine y={marker.target} stroke={t.emerald} strokeDasharray="4 4" strokeWidth={1.5}/>
                      <Line type="monotone" dataKey="v" stroke={lineColor} strokeWidth={2.5} dot={{r:4,fill:lineColor,stroke:t.bg,strokeWidth:2}} activeDot={{r:6}}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,padding:"8px 0 0",borderTop:`1px solid ${t.b1}` }}>
                  <div style={{ fontSize:12,color:t.t3 }}>Baseline: <span style={{fontWeight:600,color:t.t2}}>{first}</span></div>
                  <div style={{ fontSize:12,color:t.t3 }}>Latest: <span style={{fontWeight:700,color:lineColor}}>{latest}</span></div>
                  <div style={{ fontSize:11,fontWeight:600,color:lineColor,background:`${lineColor}10`,padding:"3px 8px",borderRadius:6 }}>{reachedTarget?"✓ Target reached":"On track"}</div>
                </div>
              </Card>
            );})}
            <Card onClick={()=>onNavigate("retest")} style={{ background:`${t.emerald}08`,border:`1px solid ${t.emerald}18`,marginTop:8,cursor:"pointer" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div><div style={{ fontSize:14,fontWeight:600,color:t.t1,marginBottom:4 }}>Next Re-Test</div>
                <div style={{ fontSize:13,color:t.t2,lineHeight:1.6 }}>Scheduled in ~90 days. Continue your protocol.</div></div>
                <ChevronRight color={t.emerald}/>
              </div>
            </Card>
          </>
        )}
      </div>
      <TabBar active="results-tab" onNavigate={id => onNavigate(id)} />
    </div>
  );
};

// ══════════════════════════════════════════
// NEW: Profile Tab
// ══════════════════════════════════════════
const ConsentToggles = () => {
  const t = useTheme();
  const toast = useToast();
  const [consents, setConsents] = useState([
    {l:"Essential Data Processing",s:"Required for core platform functionality",on:true,required:true,info:"We process your blood biomarker data, DNA analysis results, and supplement protocol information to provide personalised health recommendations. This processing is essential for EVA™ to function and cannot be disabled."},
    {l:"Clinical Communications",s:"Messages from your clinician",on:true,required:true,info:"Your clinician needs to communicate protocol updates, result reviews, and health alerts. This is a core part of the clinician-in-the-loop model that ensures your safety."},
    {l:"Anonymous Research Participation",s:"De-identified data for longevity research",on:false,info:"When enabled, your biological data is stripped of all personal identifiers and contributed to aggregate longevity research. No individual can be identified. Data is anonymised using k-anonymity techniques compliant with UAE PDPL. You can opt out at any time."},
    {l:"Marketing Communications",s:"Product updates and offers",on:false,info:"Occasional emails about new EVA™ features, health content, and partner offers. We never share your data with third parties for marketing. Unsubscribe anytime."},
  ]);
  const [infoModal, setInfoModal] = useState(null);
  const toggle = idx => {
    if (consents[idx].required) return;
    const next = [...consents];
    next[idx] = {...next[idx], on: !next[idx].on};
    setConsents(next);
  };
  return (
    <div>
      {infoModal!==null&&<InfoModal title={consents[infoModal].l} text={consents[infoModal].info} onClose={()=>setInfoModal(null)}/>}
      {consents.map((n,i)=>(
      <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{n.l}</div>
            {n.info&&<div onClick={()=>setInfoModal(i)} style={{ cursor:"pointer" }}><InfoIcon size={14} color={t.t3}/></div>}
          </div>
          <div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{n.s}{n.required&&<span style={{ color:t.gold,fontWeight:600 }}> · Required</span>}</div>
        </div>
        <div onClick={()=>toggle(i)} style={{ width:44,height:26,borderRadius:13,background:n.on?t.purple:t.b2,padding:2,cursor:n.required?"not-allowed":"pointer",opacity:n.required?.6:1,transition:"background .2s" }}>
          <div style={{ width:22,height:22,borderRadius:"50%",background:"#FFF",transition:"transform .2s",transform:n.on?"translateX(18px)":"translateX(0)" }}/>
        </div>
      </div>
    ))}
      <Btn variant="muted" onClick={()=>toast.show("Export requested. Check your email within 24 hours.","info")} style={{ marginTop:20 }}>Request Data Export</Btn>
    </div>
  );
};


const NotificationToggles = () => {
  const t = useTheme();
  const [notifs, setNotifs] = useState([
    {l:"DEVA™ Daily Briefing",s:"Morning push notification",on:true,ic:"deva",hasDeva:true},
    {l:"Supplement Reminders",s:"Morning & evening alerts",on:true,ic:"pill"},
    {l:"Re-Test Reminders",s:"90-day blood test prompt",on:true,ic:"cal"},
    {l:"Clinician Messages",s:"Direct messages from your clinician",on:true,ic:"doc"},
    {l:"Marketing & Updates",s:"Product news and offers",on:false,ic:"mega"},
  ]);
  const toggle = idx => {
    const next = [...notifs];
    next[idx] = {...next[idx], on: !next[idx].on};
    setNotifs(next);
  };
  return (
    <div>{notifs.map((n,i)=>(
      <div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}>
        <div style={{ width:30,height:30,borderRadius:9,background:`${t.purple}08`,border:`1px solid ${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          {n.ic==="deva"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={t.purple} strokeWidth="1.3"/><circle cx="8" cy="8" r="2" fill={t.purple}/></svg>}
          {n.ic==="pill"&&<PillIcon size={14}/>}
          {n.ic==="cal"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke={t.purple} strokeWidth="1.3"/><path d="M5 1v3M11 1v3M2 7h12" stroke={t.purple} strokeWidth="1.1" strokeLinecap="round"/></svg>}
          {n.ic==="doc"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke={t.purple} strokeWidth="1.3" fill="none"/><path d="M3 14c0-2 2-3.5 5-3.5s5 1.5 5 3.5" stroke={t.purple} strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>}
          {n.ic==="mega"&&<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 3v8l-4-2H4a1 1 0 01-1-1V6a1 1 0 011-1h5l4-2z" stroke={t.purple} strokeWidth="1.3" fill="none"/><path d="M5 9v3" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round"/></svg>}
        </div>
        <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{n.l}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{n.s}</div></div>
        <div onClick={()=>toggle(i)} style={{ width:44,height:26,borderRadius:13,background:n.on?t.purple:t.b2,padding:2,cursor:"pointer",transition:"background .2s" }}>
          <div style={{ width:22,height:22,borderRadius:"50%",background:"#FFF",transition:"transform .2s",transform:n.on?"translateX(18px)":"translateX(0)" }}/>
        </div>
      </div>
    ))}</div>
  );
};

const PersonalInfoEditor = () => {
  const t = useTheme();
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [fields, setFields] = useState([
    {l:"Full Name",v:"Daniel Salewski",k:"name",tp:"text"},
    {l:"Email",v:"daniel@eva.ae",k:"email",tp:"email"},
    {l:"Phone",v:"+971 50 XXX XXXX",k:"phone",tp:"tel"},
    {l:"Date of Birth",v:"15 March 1982",k:"dob",tp:"text"},
    {l:"Gender",v:"Male",k:"gender",tp:"text"},
  ]);
  const [addresses, setAddresses] = useState([
    {id:1,label:"Home",line1:"Villa 42, Al Barari",line2:"Dubailand",line3:"",country:"United Arab Emirates",city:"Dubai",pobox:"",postcode:"",preferred:true},
  ]);
  const [editAddr, setEditAddr] = useState(null);
  const updateField = (idx, val) => {
    const next = [...fields];
    next[idx] = {...next[idx], v: val};
    setFields(next);
  };
  const setPreferred = (id) => setAddresses(prev=>prev.map(a=>({...a,preferred:a.id===id})));
  const deleteAddr = (id) => { const next = addresses.filter(a=>a.id!==id); if(next.length&&!next.find(a=>a.preferred)) next[0].preferred=true; setAddresses(next); };
  const addAddr = () => { if(addresses.length>=3) return; setAddresses([...addresses,{id:Date.now(),label:"New Address",line1:"",line2:"",line3:"",country:"",city:"",pobox:"",postcode:"",preferred:false}]); setEditAddr(addresses.length); };
  const updateAddr = (idx,k,v) => { const next=[...addresses]; next[idx]={...next[idx],[k]:v}; setAddresses(next); };
  const addrField = (idx,key,placeholder) => <input value={addresses[idx]?.[key]||""} onChange={e=>updateAddr(idx,key,e.target.value)} placeholder={placeholder} style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1px solid ${t.b2}`,fontSize:14,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:6}}/>;
  return (
    <div>
      {fields.map((f,i)=>(
        <div key={i} style={{ padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ fontSize:12,color:t.t3,marginBottom:12,fontWeight:600,letterSpacing:.5 }}>{f.l}</div>
            <div onClick={()=>setEditing(editing===i?null:i)} style={{ fontSize:13,color:t.mode==="dark"?t.cyan:t.purple,cursor:"pointer",fontWeight:600 }}>{editing===i?"Done":"Edit"}</div>
          </div>
          {editing===i?(
            <input value={f.v} onChange={e=>updateField(i,e.target.value)} type={f.tp} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"13px 17px",border:`1.5px solid ${t.purple}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",marginTop:4 }}/>
          ):(
            <div style={{ fontSize:16,color:t.t1,fontWeight:500 }}>{f.v}</div>
          )}
        </div>
      ))}
      <div style={{ padding:"18px 0 8px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:.5 }}>DELIVERY ADDRESSES</div>
          {addresses.length<3&&<div onClick={addAddr} style={{ fontSize:13,color:t.mode==="dark"?t.cyan:t.purple,cursor:"pointer",fontWeight:600 }}>+ Add</div>}
        </div>
        {addresses.map((a,ai)=>(
          <Card key={a.id} style={{ marginBottom:8,border:a.preferred?`1.5px solid ${t.emerald}30`:`1px solid ${t.b1}`,padding:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:editAddr===ai?10:0 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{a.label||"Address"}</div>
                {a.preferred&&<div style={{ fontSize:10,fontWeight:700,color:t.emerald,background:`${t.emerald}12`,padding:"3px 8px",borderRadius:4 }}>PREFERRED</div>}
              </div>
              <div style={{ display:"flex",gap:12 }}>
                {!a.preferred&&<div onClick={()=>setPreferred(a.id)} style={{ fontSize:12,color:t.emerald,cursor:"pointer",fontWeight:600 }}>Set preferred</div>}
                <div onClick={()=>setEditAddr(editAddr===ai?null:ai)} style={{ fontSize:12,color:t.mode==="dark"?t.cyan:t.purple,cursor:"pointer",fontWeight:600 }}>{editAddr===ai?"Done":"Edit"}</div>
                {addresses.length>1&&<div onClick={()=>deleteAddr(a.id)} style={{ fontSize:12,color:t.red,cursor:"pointer",fontWeight:600 }}>Delete</div>}
              </div>
            </div>
            {editAddr===ai?<div style={{ marginTop:8 }}>
              <input value={a.label} onChange={e=>updateAddr(ai,"label",e.target.value)} placeholder="Label (e.g. Home, Office)" style={{width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1.5px solid ${t.purple}`,fontSize:14,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:6}}/>
              {addrField(ai,"line1","Building / Villa name or number")}
              {addrField(ai,"line2","Street / Area")}
              {addrField(ai,"line3","District / Neighbourhood")}
              <div style={{display:"flex",gap:6,marginBottom:6}}>
                <select value={a.country} onChange={e=>{updateAddr(ai,"country",e.target.value);updateAddr(ai,"city","")}} style={{flex:1,boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1px solid ${t.b2}`,fontSize:14,color:a.country?t.t1:t.t3,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
                  <option value="">Country</option>
                  {["United Arab Emirates","Saudi Arabia","Bahrain","Kuwait","Oman","Qatar"].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <select value={a.city} onChange={e=>updateAddr(ai,"city",e.target.value)} style={{flex:1,boxSizing:"border-box",background:t.s2,borderRadius:10,padding:"11px 14px",border:`1px solid ${t.b2}`,fontSize:14,color:a.city?t.t1:t.t3,outline:"none",fontFamily:"inherit",appearance:"none",WebkitAppearance:"none"}}>
                  <option value="">{({"United Arab Emirates":"Emirate","Saudi Arabia":"Region","Bahrain":"Governorate","Kuwait":"Governorate","Oman":"Governorate","Qatar":"Municipality"})[a.country]||"Area"}</option>
                  {({"United Arab Emirates":["Dubai","Abu Dhabi","Sharjah","Ajman","Ras Al Khaimah","Fujairah","Umm Al Quwain"],"Saudi Arabia":["Riyadh","Jeddah","Dammam","Mecca","Medina","Khobar"],"Bahrain":["Manama","Muharraq","Riffa"],"Kuwait":["Kuwait City","Hawalli","Salmiya"],"Oman":["Muscat","Salalah","Sohar"],"Qatar":["Doha","Al Wakrah","Al Khor"]}[a.country]||[]).map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>

            </div>:<div style={{ fontSize:14,color:t.t2,marginTop:6 }}>{[a.line1,a.line2,a.line3,a.city,a.country].filter(Boolean).join(", ")}{a.pobox?` \u2022 ${a.pobox}`:""}</div>}
          </Card>
        ))}
        {addresses.length>=3&&<div style={{ fontSize:12,color:t.t3,marginTop:4 }}>Maximum 3 addresses reached.</div>}
      </div>
      <Btn variant="secondary" onClick={()=>{setEditing(null);setEditAddr(null);toast.show("Changes saved successfully")}} style={{ marginTop:12 }}>Save Changes</Btn>
    </div>
  );
};

const FAQAccordion = () => {
  const t = useTheme();
  const [open, setOpen] = useState(null);
  const faqVideo = true;
  const faqs = [
    {q:"How does EVA™ work?",a:"EVA™ combines your DNA and blood data to give you personalised health guidance. Your DNA is your blueprint (what you are born with), while your blood results show your current biological state. Together, this allows EVA™ to create and continuously adjust a protocol tailored to your body."},
    {q:"How often should I re-test?",a:"We recommend a follow-up blood test every 90 days. This allows enough time for your supplement protocol to take effect and gives us measurable data to track your progress and adjust your regimen."},
    {q:"What's included in my subscription?",a:"The Core subscription is USD 1,999 per year, including a DNA test, two 6-monthly blood biomarker panels, and personalised recommendations. Elite upgrade available for an additional USD 700 (total USD 2,699/year), which includes two extra blood tests per year for quarterly monitoring. The personalised supplement subscription is USD 199/month."},
    {q:"How are supplements personalised?",a:"Your supplement protocol is built from the intersection of your DNA variants and blood biomarker results. A clinician reviews all data and creates a protocol targeting your specific deficiencies and genetic predispositions."},
    {q:"Who reviews my results?",a:"Every protocol is reviewed and approved by a qualified clinician from Elite Vita's clinical team. No supplement recommendation reaches you without human expert oversight."},
    {q:"How do I cancel my subscription?",a:"You can contact our support team via the app or email support@eva.com. We require 30 days notice for supplement subscription cancellation. Your biological data and reports remain accessible."},
  ];
  return (
    <div>{faqs.map((f,i)=>(
      <Card key={i} onClick={()=>setOpen(open===i?null:i)} style={{ padding:16,cursor:"pointer",transition:"all .2s" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ fontSize:15,fontWeight:500,color:t.t1,flex:1,paddingRight:12 }}>{f.q}</div>
          <div style={{ fontSize:16,color:t.t4,transition:"transform .2s",transform:open===i?"rotate(90deg)":"none" }}>›</div>
        </div>
        {open===i&&<div style={{ fontSize:14,color:t.t2,lineHeight:1.7,marginTop:12,paddingTop:12,borderTop:`1px solid ${t.b1}` }}>{f.a}</div>}
      </Card>
    ))}

    <div style={{marginTop:24,paddingTop:20,borderTop:`1px solid ${t.b1}`}}>
      <div style={{fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:12}}>EVA™ VIDEO LIBRARY</div>
      <div style={{fontSize:13,color:t.t2,marginBottom:14,lineHeight:1.5}}>All explainer videos in one place. Tap to watch.</div>
      {[
        {t:"Welcome to EVA™ — Daniel's Story",d:"2:45"},
        {t:"Understanding DEVA™",d:"1:15"},
        {t:"The Biological Age Reality Check",d:"0:40"},
        {t:"Biological Age vs. Chronological Age",d:"0:55"},
        {t:"The Hidden Inflammation Threat",d:"0:40"},
        {t:"Why Our Blood Panel is Superior",d:"2:00"},
        {t:"How We Read Your DNA",d:"2:45"},
        {t:"Six Months In — A Message from Daniel",d:"2:15"},
        {t:"How Your Protocol Was Built",d:"1:45"},
        {t:"Supplement Quality & Certifications",d:"2:45"},
        {t:"The Clinical Difference",d:"0:40"},
        {t:"What to Expect — Your Phlebotomist Visit",d:"1:15"},
        {t:"Your Results Are In — Dr. Nival",d:"2:15"},
      ].map((v,i)=><VideoCard key={i} title={v.t} duration={v.d} permanent/>)}
    </div>
    </div>
  );
};



const DeviceConnectionList = ({onNavigate}) => {
  const t = useTheme();
  const toast = useToast();
  const [devices, setDevices] = useState([
    {n:"Apple Health",s:"Sync activity, sleep & vitals",synced:"2h ago",connected:true},
    {n:"Google Fit",s:"Activity tracking & workouts",synced:"4h ago",connected:true},
    {n:"Whoop",s:"HRV, strain & recovery scores",connected:false},
    {n:"Oura",s:"Sleep stages & readiness score",connected:false},
    {n:"Garmin",s:"HRV, Body Battery & sleep",connected:false},
    {n:"Fitbit",s:"Sleep, activity & stress",connected:false},
    {n:"Ultrahuman",s:"Metabolic & recovery scores",connected:false},
    {n:"Samsung",s:"Sleep, stress & heart rate",connected:false},
  ]);
  const [connecting, setConnecting] = useState(null);
  const toggleDevice = (idx) => {
    if (devices[idx].connected) {
      const next = [...devices]; next[idx] = {...next[idx],connected:false,synced:undefined}; setDevices(next);
      toast.show(devices[idx].n + " disconnected","info");
    } else {
      setConnecting(idx);
      setTimeout(()=>{
        const next = [...devices]; next[idx] = {...next[idx],connected:true,synced:"Just now"}; setDevices(next);
        setConnecting(null);
        toast.show(devices[idx].n + " connected!","success");
      },1200);
    }
  };
  return (
    <div>
      <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:16 }}>Connect your wearable to enable real-time protocol adjustments based on your HRV, sleep, and activity data.</div>
      {devices.map((d,i)=>(
        <Card key={i} style={{ display:"flex",alignItems:"center",gap:16,padding:16 }}>
          <div style={{ width:42,height:42,borderRadius:12,background:d.connected?`${t.emerald}10`:t.s2,border:`1px solid ${d.connected?`${t.emerald}20`:t.b2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <div style={{ fontSize:11,fontWeight:800,color:d.connected?t.emerald:t.t3,letterSpacing:.5 }}>{d.n.split(" ")[0].slice(0,4).toUpperCase()}</div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{d.n}</div>
            <div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{d.s}{d.synced&&<span style={{ color:t.emerald,fontWeight:500 }}> · Last: {d.synced}</span>}</div>
          </div>
          <div onClick={()=>toggleDevice(i)} style={{ background:connecting===i?"transparent":(d.connected?`${t.emerald}14`:t.s2),border:`1px solid ${connecting===i?t.purple:(d.connected?t.emerald:t.b2)}`,borderRadius:10,padding:"10px 17px",fontSize:13,fontWeight:600,color:connecting===i?t.purple:(d.connected?t.emerald:t.purple),cursor:"pointer",minWidth:80,textAlign:"center" }}>
            {connecting===i?"Connecting...":(d.connected?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><CheckIcon size={10} color={t.emerald}/>Connected</span>:"Connect")}
          </div>
        </Card>
      ))}
    </div>
  );
};


const ReferralSection = ({toast, onNavigate}) => {
  const t = useTheme();
  const [inviteMethod, setInviteMethod] = useState("email");
  const [inviteInput, setInviteInput] = useState("");
  const [slots, setSlots] = useState([
    {email:"sarah@example.com",status:"subscribed",date:"Joined 12 Mar 2025"},
    {email:"james@example.com",status:"signed-up",date:"Signed up 9 Mar 2025"},
    {email:null,status:"empty",date:null},
  ]);
  const [showTerms, setShowTerms] = useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inviteInput);
  const sendInvite = () => {
    if (!emailValid) return;
    const next = [...slots];
    const emptyIdx = next.findIndex(s=>s.status==="empty");
    if (emptyIdx===-1) { toast.show("All 3 invitation slots are used","warning"); return; }
    next[emptyIdx] = {email:inviteInput,status:"invited",date:"Invited just now"};
    setSlots(next);
    setInviteInput("");
    toast.show("Invitation sent to "+inviteInput,"success");
  };
  const rewardCount = slots.filter(s=>s.status==="subscribed").length;
  const statusColor = {subscribed:t.emerald,"signed-up":t.gold,invited:t.cyan,empty:t.t4};
  const statusLabel = {subscribed:"Subscribed","signed-up":"Signed Up",invited:"Invited",empty:"Available"};
  return (
    <div>
      <Card style={{ background:`${t.purple}06`,border:`1.5px solid ${t.purple}15`,marginBottom:16 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:8 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:`${t.emerald}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <div style={{ fontSize:18,fontWeight:800,color:t.emerald }}>{rewardCount}</div>
          </div>
          <div>
            <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{rewardCount>0?`${rewardCount} free month${rewardCount>1?"s":""} earned!`:"No rewards yet"}</div>
            <div style={{ fontSize:12,color:t.t3,marginTop:2 }}>{rewardCount>0?"Unlocks at Month 3 of their membership":"Invite friends to earn free months"}</div>
          </div>
        </div>
        <div style={{ fontSize:13,color:t.t2,lineHeight:1.6 }}>When a friend subscribes, <span style={{ color:t.t1,fontWeight:600 }}>both of you receive 1 free month of supplements</span>.</div>
      </Card>
      <Label>Your Referral Code</Label>
      <Card style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:16,marginBottom:16 }}>
        <div>
          <div style={{ fontSize:20,fontWeight:700,color:t.purple,letterSpacing:2 }}>EVA-DANIEL-2025</div>
          <div style={{ fontSize:11,color:t.t3,marginTop:4 }}>Share this code or send a direct invitation below</div>
        </div>
        <div onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText("EVA-DANIEL-2025");toast.show("EVA-DANIEL-2025 copied!","success")}} style={{ background:`${t.purple}12`,border:`1px solid ${t.purple}25`,borderRadius:10,padding:"10px 17px",fontSize:13,fontWeight:600,color:t.purple,cursor:"pointer" }}>Copy</div>
      </Card>
      <Label>Quick Share</Label>
      <div style={{ display:"flex",gap:12,marginBottom:20 }}>
        {[
          {l:"WhatsApp",c:"#25D366",bg:"#25D36612",bd:"#25D36620",ic:<svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>,fn:()=>window.open("https://wa.me/?text=Join%20me%20on%20EVA%E2%84%A2%20%E2%80%94%20use%20code%20EVA-DANIEL-2025%20to%20get%20started.%20https://eva.ae","_blank")},
          {l:"SMS",c:t.t1,bg:t.s2,bd:t.b2,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="9" rx="2" stroke={t.t1} strokeWidth="1.2"/><path d="M4 6h3M4 8.5h5" stroke={t.t1} strokeWidth="1" strokeLinecap="round"/></svg>,fn:()=>toast.show("SMS app opening...","info")},
          {l:"Email",c:t.t1,bg:t.s2,bd:t.b2,ic:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke={t.t1} strokeWidth="1.2"/><path d="M1 4l6 4 6-4" stroke={t.t1} strokeWidth="1.2" strokeLinecap="round"/></svg>,fn:()=>toast.show("Email app opening...","info")},
        ].map((sh,i)=>(
          <div key={i} onClick={sh.fn} style={{ flex:1,background:sh.bg,border:`1px solid ${sh.bd}`,borderRadius:12,padding:"12px 0",textAlign:"center",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
            {sh.ic}
            <div style={{ fontSize:12,fontWeight:600,color:sh.c }}>{sh.l}</div>
          </div>
        ))}
      </div>
      <Label>Invitation Slots</Label>
      {slots.map((s,i)=>(
        <Card key={i} onClick={s.status==="empty"?()=>{}:undefined} style={{ display:"flex",alignItems:"center",gap:14,padding:14,background:s.status==="empty"?`${t.bg}`:(s.status==="subscribed"?`${t.emerald}04`:t.s1),borderStyle:s.status==="empty"?"dashed":"solid" }}>
          <div style={{ width:36,height:36,borderRadius:"50%",background:`${statusColor[s.status]}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            {s.status==="subscribed"?<CheckIcon size={16} color={t.emerald}/>:s.status==="signed-up"?<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke={t.gold} strokeWidth="1.3"/><path d="M7 4v3.5" stroke={t.gold} strokeWidth="1.3" strokeLinecap="round"/></svg>:s.status==="invited"?<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 2L5 9M12 2l-3 10-2-4-4-2 10-3z" stroke={t.cyan} strokeWidth="1.2" fill="none"/></svg>:<div style={{ fontSize:18,color:t.t4,fontWeight:300 }}>+</div>}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14,fontWeight:600,color:s.email?t.t1:t.t4 }}>{s.email||"Empty slot"}</div>
            {s.date&&<div style={{ fontSize:12,color:t.t3,marginTop:2 }}>{s.date}</div>}
          </div>
          <div style={{ fontSize:11,fontWeight:600,color:statusColor[s.status],background:`${statusColor[s.status]}12`,padding:"5px 10px",borderRadius:4 }}>{statusLabel[s.status]}</div>
        </Card>
      ))}
      <Label style={{ marginTop:16 }}>Send Invitation</Label>
      <div style={{ display:"flex",gap:10,marginBottom:12 }}>
        {["email","phone"].map(m=>(
          <div key={m} onClick={()=>setInviteMethod(m)} style={{ flex:1,background:inviteMethod===m?`${t.purple}12`:t.s2,border:`1.5px solid ${inviteMethod===m?t.purple:t.b2}`,borderRadius:10,padding:"10px 0",textAlign:"center",fontSize:13,fontWeight:600,color:inviteMethod===m?t.purple:t.t3,cursor:"pointer",transition:"all .2s" }}>{m==="email"?"By Email":"By Phone"}</div>
        ))}
      </div>
      <input value={inviteInput} onChange={e=>setInviteInput(e.target.value)} placeholder={inviteMethod==="email"?"friend@example.com":"+971 50 XXX XXXX"} type={inviteMethod==="email"?"email":"tel"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${inviteInput.length>0?(emailValid?t.emerald:`${t.gold}60`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",marginBottom:12,transition:"border .2s" }}/>
      <Btn onClick={sendInvite} style={{ opacity:(inviteMethod==="email"&&emailValid)||(inviteMethod==="phone"&&inviteInput.length>7)?1:.4 }}>Send Invitation</Btn>
      <Card style={{ marginTop:16,padding:14 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
          <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5 }}>HOW IT WORKS</div>
          <div onClick={()=>setShowTerms(!showTerms)} style={{ fontSize:12,color:t.purple,fontWeight:600,cursor:"pointer" }}>{showTerms?"Hide":"Terms"}</div>
        </div>
        <div style={{ fontSize:13,color:t.t2,lineHeight:1.8 }}>1. Send up to 3 invitations via email, phone, or share link<br/>2. Your friend signs up and subscribes to EVA™<br/>3. Both of you receive 1 free month of supplements<br/>4. Reward unlocks at Month 3 of their membership</div>
        {showTerms&&<div style={{ marginTop:10,paddingTop:10,borderTop:`1px solid ${t.b1}`,fontSize:12,color:t.t3,lineHeight:1.7,animation:"fadeUp .2s ease both" }}>Referral rewards are limited to 3 per user. Free months apply to the supplement subscription only (USD 199 value). Both referrer and referee must maintain active subscriptions. Rewards cannot be transferred or exchanged for cash. Elite Vita reserves the right to modify or discontinue the referral programme.</div>}
      </Card>
    </div>
  );
};

const ChangePasswordForm = ({toast}) => {
  const t = useTheme();
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const rules = [
    {l:"8+ characters",ok:newPw.length>=8},
    {l:"One uppercase",ok:/[A-Z]/.test(newPw)},
    {l:"One number",ok:/[0-9]/.test(newPw)},
    {l:"One special character",ok:/[^A-Za-z0-9]/.test(newPw)},
  ];
  const allValid = rules.every(r=>r.ok) && newPw===confirm && current.length>0;
  const matching = confirm.length>0 && newPw===confirm;
  const notMatching = confirm.length>0 && newPw!==confirm;
  return (
    <div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CURRENT PASSWORD</div>
        <div style={{ position:"relative" }}>
          <input value={current} onChange={e=>setCurrent(e.target.value)} placeholder="Enter current password" type={showCurrent?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
          <div onClick={()=>setShowCurrent(!showCurrent)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showCurrent}/></div>
        </div>
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>NEW PASSWORD</div>
        <div style={{ position:"relative" }}>
          <input value={newPw} onChange={e=>setNewPw(e.target.value)} placeholder="Create new password" type={showNew?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${newPw.length>0?(rules.every(r=>r.ok)?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          <div onClick={()=>setShowNew(!showNew)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showNew}/></div>
        </div>
        {newPw.length>0&&<div style={{ display:"flex",flexWrap:"wrap",gap:10,marginTop:10 }}>
          {rules.map((r,ri)=>(
            <div key={ri} style={{ display:"flex",alignItems:"center",gap:6 }}>
              <div style={{ width:14,height:14,borderRadius:"50%",background:r.ok?t.emerald:`${t.t3}30`,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }}>{r.ok&&<CheckIcon size={8} color="#FFF"/>}</div>
              <span style={{ fontSize:12,color:r.ok?t.emerald:t.t3,fontWeight:500,transition:"color .2s" }}>{r.l}</span>
            </div>
          ))}
        </div>}
      </div>
      <div style={{ marginBottom:16,marginTop:16 }}>
        <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>CONFIRM NEW PASSWORD</div>
        <div style={{ position:"relative" }}>
          <input value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm new password" type={showConfirm?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${notMatching?`${t.red}80`:matching?t.emerald:t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          <div onClick={()=>setShowConfirm(!showConfirm)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showConfirm}/></div>
        </div>
        {notMatching&&<div style={{ fontSize:12,color:t.red,marginTop:6,fontWeight:500 }}>Passwords do not match</div>}
        {matching&&<div style={{ fontSize:12,color:t.emerald,marginTop:6,fontWeight:500 }}>Passwords match</div>}
      </div>
      <Btn onClick={allValid?()=>toast.show("Password updated successfully"):undefined} style={{ opacity:allValid?1:.4 }}>Update Password</Btn>
    </div>
  );
};

const ProfileScreen = ({ onNavigate, onToggleTheme, isDark, subTarget, clearSubTarget, profileSection, setProfileSection }) => {
  const t = useTheme();
  const toast = useToast();
  const activeSection = profileSection;
  const [suppTab, setSuppTab] = useState("morning");
  const [reportTab, setReportTab] = useState("Blood Reports");
  const scrollRef = useRef(null);
  const scrollPos = useRef(0);
  const setActiveSection = (s) => {
    if (s !== null && scrollRef.current) scrollPos.current = scrollRef.current.scrollTop;
    setProfileSection(s);
  };
  useEffect(() => {
    if (activeSection === null && scrollRef.current) {
      setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollPos.current; }, 10);
    }
  }, [activeSection]);
  useEffect(()=>{if(subTarget){setActiveSection(subTarget);clearSubTarget?.()}},[subTarget]);

  const pIcon = (ic) => {
    const s = {width:32,height:32,borderRadius:10,background:`${t.purple}08`,border:`1px solid ${t.purple}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0};
    const p = {stroke:t.purple,strokeWidth:"1.3",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"};
    const icons = {
      person:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="5" r="3"/><path d="M2 14c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5"/></svg>,
      clipboard:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><rect x="3" y="1" width="10" height="14" rx="1.5"/><path d="M6 5h4M6 8h4M6 11h2"/></svg>,
      bell:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M4 6a4 4 0 018 0c0 2 1 3.5 1.5 4.5H2.5C3 9.5 4 8 4 6z"/><path d="M6 12a2 2 0 004 0"/></svg>,
      shield:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M8 1L2 4v4c0 3.5 2.5 5.8 6 7 3.5-1.2 6-3.5 6-7V4L8 1z"/><path d="M6 8l1.5 1.5L10 6"/></svg>,
      doctor:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="5.5" r="2.5"/><path d="M3 14c0-2 2-3.5 5-3.5s5 1.5 5 3.5"/><path d="M12 4V2M11 3h2"/></svg>,
      question:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="8" r="6.5"/><path d="M6 6a2 2 0 013.5 1.5c0 1-1.5 1.5-1.5 1.5M8 12v.5"/></svg>,
      doc:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M4 1h5l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/><path d="M9 1v4h4M6 9h4M6 12h2"/></svg>,
      send:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M14 2L7 9M14 2l-4 12-3-5-5-3 12-4z"/></svg>,
      info:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><circle cx="8" cy="8" r="6.5"/><path d="M8 5v.5M8 7.5v4"/></svg>,
      link:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M7 9a3.5 3.5 0 005 0l1.5-1.5a3.5 3.5 0 00-5-5L7 4M9 7a3.5 3.5 0 00-5 0L2.5 8.5a3.5 3.5 0 005 5L9 12"/></svg>,
      bag:<svg width="15" height="15" viewBox="0 0 16 16" {...p}><path d="M2 5h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V5z"/><path d="M5 5V3a3 3 0 016 0v2"/></svg>,
    };
    return <div style={s}>{icons[ic]||icons.info}</div>;
  };
  // Sub-screen renderer
  if (activeSection) {
    const sections = {
      personal: { title:"Personal Information", content: (
        <PersonalInfoEditor/>
      )},
      questionnaire: { title:"Health Questionnaire", content: (
        <div>{[{l:"Primary Goal",v:"Longevity optimisation",opts:["Longevity optimisation","Weight management","Athletic performance","Hormone balance","Disease prevention","General wellness"]},{l:"Activity Level",v:"Moderate (3-4x/week)",opts:["Sedentary","Light (1-2x/week)","Moderate (3-4x/week)","Active (5-6x/week)","Very active (daily)"]},{l:"Sleep Quality",v:"Variable (5-7 hours)",opts:["Poor (<5 hours)","Variable (5-7 hours)","Good (7-8 hours)","Excellent (8+ hours)"]},{l:"Dietary Preferences",v:"No restrictions",opts:["No restrictions","Vegetarian","Vegan","Keto","Halal","Gluten-free","Dairy-free"]},{l:"Family History",v:"Cardiovascular (paternal)",opts:["None known","Cardiovascular (paternal)","Cardiovascular (maternal)","Diabetes","Cancer","Alzheimer's/Dementia","Multiple"]},{l:"Current Supplements",v:"None prior to EVA™",opts:["None prior to EVA™","Multivitamin only","Several supplements","Prescribed medications"]}].map((f,i)=>(
          <div key={i} style={{ padding:"14px 0",borderBottom:`1px solid ${t.b1}` }}><div style={{ fontSize:12,color:t.t3,marginBottom:12,fontWeight:600,letterSpacing:.5 }}>{f.l}</div><select defaultValue={f.v} onChange={()=>{}} style={{ fontSize:16,color:t.t1,fontWeight:500,background:"transparent",border:"none",borderBottom:`1px dashed ${t.b2}`,paddingBottom:4,width:"100%",outline:"none",fontFamily:"inherit",cursor:"pointer" }}>{f.opts&&f.opts.map((o,oi)=><option key={oi}>{o}</option>)}</select></div>
        ))}<Btn variant="secondary" onClick={()=>toast.show("Questionnaire updated!","success")} style={{ marginTop:20 }}>Save Changes</Btn></div>
      )},
      notifications: { title:"Notifications", content: (
        <NotificationToggles/>
      )},
      subscription: { title:"Subscription", content: (
        <div style={{ textAlign:"center",padding:"20px 0" }}><Btn onClick={()=>onNavigate("subscription")}>Manage Subscription</Btn></div>
      )},
      password: { title:"Change Password", content: (
        <ChangePasswordForm toast={toast}/>
      )},
      consent: { title:"Consent Management", content: (
        <ConsentToggles/>
      )},
      integrations: { title:"Connected Devices", content: (<DeviceConnectionList onNavigate={onNavigate}/>)},
      _unused_integrations: { title:"_", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:20 }}>Connect wearables and health platforms to enrich your EVA™ data with activity, sleep, and recovery metrics.</div>
          {[
            {n:"Apple Health",s:"Sync activity, sleep & vitals",synced:"2h ago",logo:<svg width="24" height="24" viewBox="0 0 1080 1080" fill="none"><defs><linearGradient id="ah" x1="540" y1="100" x2="540" y2="979" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FF61AD"/><stop offset="1" stopColor="#FF2616"/></linearGradient></defs><path d="M540.4,978.9c-25.4,0-174.1-80.3-313.2-211.9C116.8,662.7,36.9,509.2,36.9,371c0-125.1,104.9-270.5,274.4-270.5c165.1,0,201.4,88.9,229.1,88.9c22.1,0,66-88.9,229.1-88.9c179,0,274.4,159.8,274.4,270.5c0,138.1-73.9,286-190.2,396C718.1,895.2,565.8,978.9,540.4,978.9z" fill="url(#ah)"/></svg>,connected:false},
            {n:"Google Fit",s:"Activity tracking & workouts",synced:"4h ago",logo:<svg width="24" height="24" viewBox="0 0 236.2 200" fill="none"><path fill="#EA4335" d="M22.6 105.8l11.9 11.9 25.7-25.6-11.8-11.9-5.4-5.4c-4.3-4.3-6.6-9.9-6.6-16 0-5.3 1.8-10.1 4.9-13.9 4.2-5.3 10.6-8.7 17.8-8.7 6.1 0 11.7 2.4 16.1 6.7l5.3 5.1 11.9 12 25.8-25.6-12-11.9-5.4-5.2C90.1 6.6 75.4 0 59.1 0 26.4 0 0 26.4 0 58.9c0 8.1 1.6 15.8 4.6 22.9 3 7.1 7.3 13.4 12.7 18.7l5.3 5.3"/><path fill="#FBBC04" d="M81.5 122.2l36.7-36.5-25.8-25.7-32.2 32.1-25.7 25.6 13.8 13.9 11.9 11.8z"/><path fill="#34A853" d="M143.8 175.6l58-57.9-25.8-25.6-57.9 57.8-32.2-32.1-25.7 25.6 32.2 32.2-.1.1 25.8 24.3 25.8-24.4z"/><path fill="#4285F4" d="M218.9 100.5c12-12 18.9-30.4 17-49-2.8-28.2-26.2-49.4-54.6-51.3-17.9-1.2-34.3 5.5-45.9 17.1L92.4 60l25.7 25.7 43-42.8c5.2-5.1 12.4-7.5 19.8-6.3 9.6 1.5 17.4 9.4 18.7 19 1 7.2-1.4 14.2-6.5 19.3L176 92.1l25.8 25.6 17.1-17.2z"/></svg>,connected:false},
            {n:"Whoop",s:"HRV, strain & recovery scores",logo:({t})=><svg width="28" height="28" viewBox="0 0 50 50" fill={t.t1}><polygon points="33.5,33.1 29.9,21.3 26.6,21.3 31.8,38.4 31.8,38.4 35.1,38.4 43.5,10.9 40.2,10.9"/><polygon points="9.9,10.9 6.7,10.9 11.9,28 15.1,28"/><polygon points="23.4,10.9 15.1,38.4 18.3,38.4 26.7,10.9"/></svg>,connected:false},
            {n:"Oura",s:"Sleep stages & readiness score",logo:({t})=><svg width="28" height="28" viewBox="0 0 50 50" fill={t.t1}><path d="M8.2,28.6c0-9.3,7.6-16.8,16.8-16.8c9.3,0,16.8,7.6,16.8,16.9c0,9.3-7.5,16.8-16.8,16.8C15.7,45.5,8.2,37.9,8.2,28.6z M24.9,41.9C31.9,42,38,36.2,38.2,29c0.2-7.4-5.6-13.4-13.1-13.6C18.2,15.2,12,21.1,11.8,28C11.6,35.7,17.3,41.7,24.9,41.9z"/><path d="M16.6,4.5c5.6,0,11,0,16.4,0c0.1,0,0.2,0.1,0.3,0.1c0,1.1,0,2.3,0,3.5c-5.6,0-11.1,0-16.7,0C16.6,6.9,16.6,5.7,16.6,4.5z"/></svg>,connected:false},
            {n:"Garmin",s:"HRV, Body Battery & sleep",logo:({t})=><div style={{fontSize:12,fontWeight:800,color:t.t1,letterSpacing:1}}>GARMIN</div>,connected:false},
            {n:"Fitbit",s:"Sleep, activity & stress",logo:({t})=><div style={{fontSize:12,fontWeight:800,color:"#00B0B9",letterSpacing:.5}}>fitbit</div>,connected:false},
            {n:"Ultrahuman",s:"Metabolic & recovery scores",logo:({t})=><div style={{fontSize:11,fontWeight:800,color:t.t1,letterSpacing:.5}}>ULTRA</div>,connected:false},
            {n:"Samsung",s:"Sleep, stress & heart rate",logo:({t})=><div style={{fontSize:11,fontWeight:800,color:"#1428A0",letterSpacing:.5}}>Samsung</div>,connected:false},
          ].map((d,i)=>(
            <Card key={i} style={{ display:"flex",alignItems:"center",gap:16,padding:16 }}>
              <div style={{ width:42,height:42,borderRadius:12,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{typeof d.logo==="function"?d.logo({t}):d.logo}</div>
              <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{d.n}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{d.s}{d.synced&&<span style={{ color:t.emerald,fontWeight:500 }}> · Last: {d.synced}</span>}</div></div>
              <div style={{ background:d.connected?t.emerald:t.purple,borderRadius:8,padding:"9px 17px",fontSize:12,fontWeight:700,color:"#FFF",letterSpacing:.3 }}>{d.connected?"Connected":"Connect"}</div>
            </Card>
          ))}
        </div>
      )},
      clinician: { title:"Contact Clinician", content: (
        <div>
          <Card style={{ display:"flex",alignItems:"center",gap:16,padding:18 }}>
            <div style={{ width:48,height:48,borderRadius:"50%",background:`${t.emerald}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:t.emerald }}>NK</div>
            <div><div style={{ fontSize:17,fontWeight:700,color:t.t1 }}>Dr. Nival</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Lead Clinician · Elite Vita</div><div style={{ fontSize:13,color:t.emerald,marginTop:6,fontWeight:600 }}>Typically responds within 24 hours</div></div>
          </Card>
          <Btn onClick={()=>onNavigate("clinician-chat")} style={{ marginTop:16 }}>Send Message</Btn>
          <Btn variant="secondary" onClick={()=>window.open("https://wa.me/971501234567?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation","_blank")} style={{ marginTop:10 }}>Book Consultation — USD 200</Btn>
          <div style={{ marginTop:20,padding:"16px 0",borderTop:`1px solid ${t.b1}` }}>
            <Label color="#25D366">EV.AI™ — INSTANT SUPPORT</Label>
            <Card onClick={()=>window.open("https://wa.me/971501234567?text=Hi%20EV.AI","_blank")} glow="#25D366" style={{ display:"flex",alignItems:"center",gap:16,cursor:"pointer" }}>
              <div style={{ width:44,height:44,borderRadius:14,background:"#25D36612",border:"1px solid #25D36620",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15,fontWeight:700,color:t.t1,display:"flex",alignItems:"center",gap:8 }}>Chat with EV.AI™ <span style={{ fontSize:10,fontWeight:600,color:"#25D366",background:"#25D36612",padding:"4px 8px",borderRadius:4,letterSpacing:.5 }}>BETA</span></div>
                <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>Get instant answers about your biology, protocol, and health goals via WhatsApp</div>
              </div>
              <ChevronRight size={12} color="#25D366"/>
            </Card>
          </div>
        </div>
      )},
      help: { title:"Help & FAQ", content: (
        <FAQAccordion/>
      )},
      "supplements": { title:"My Supplements", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:16 }}>Your personalised supplement stack, built from your DNA and blood data.</div>
          <div style={{ display:"flex",gap:6,marginBottom:16,background:t.s2,borderRadius:10,padding:3 }}>
            {["morning","evening"].map(tb=>(
              <div key={tb} onClick={()=>setSuppTab(tb)} style={{ flex:1,background:suppTab===tb?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:suppTab===tb?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
                <div style={{ fontSize:13,fontWeight:600,color:suppTab===tb?t.t1:t.t3,textTransform:"capitalize" }}>{tb}</div>
              </div>
            ))}
          </div>
          {(suppTab==="morning"?[{n:"Vitamin D3",d:"4,000 IU",desc:"Supports immune function, bone density, and mood regulation. Higher dose compensates for your VDR gene variant."},{n:"Omega-3",d:"2,000mg",desc:"Pharmaceutical-grade EPA/DHA targeting systemic inflammation and cardiovascular protection."},{n:"CoQ10",d:"200mg",desc:"Essential for mitochondrial energy production, cardiovascular function, and exercise recovery."},{n:"Vitamin K2",d:"200mcg",desc:"Directs calcium to bones and prevents arterial calcification. Safety pairing with high-dose D3."},{n:"B-Complex",d:"1 capsule",desc:"Pre-activated methylated forms bypass your MTHFR C677T variant for optimal folate metabolism."}]:[{n:"Magnesium Glycinate",d:"600mg",desc:"Chelated glycinate form selected for your TRPM6 variant. Supports sleep, muscle recovery, and 300+ enzymatic reactions."},{n:"Zinc Picolinate",d:"30mg",desc:"Highest bioavailability zinc form. Supports immune function, testosterone maintenance, and wound healing."}]).map((s,i)=>(
            <div key={i} style={{display:"flex",gap:14,padding:14,background:t.s1,borderRadius:14,border:`1px solid ${t.b1}`,marginBottom:8}}>
              <div style={{width:56,height:72,borderRadius:10,background:`${t.purple}08`,border:`1px solid ${t.purple}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <div style={{fontSize:8,color:t.purple,fontWeight:700,textAlign:"center",lineHeight:1.3}}>EliteVita<br/><span style={{fontSize:6,fontWeight:400}}>SUPPLEMENTS</span></div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:600,color:t.t1}}>{s.n}</div>
                <div style={{fontSize:12,color:t.purple,fontWeight:600,marginTop:1}}>{s.d}</div>
                <div style={{fontSize:12,color:t.t2,marginTop:4,lineHeight:1.5}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )},
      "test-history": { title:"Test History", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:20 }}>Your complete testing timeline. Tap to view details.</div>
          <VideoCard title="What to Expect — Your Phlebotomist Visit" duration="1:15"/>
          <VideoCard title="Your Results Are In — Dr. Nival" duration="2:15"/>
          {[
            {type:"Blood Panel",date:"4 Feb 2025",status:"Complete",markers:70,key:"Vitamin D low, hs-CRP elevated, Magnesium below optimal"},
            {type:"DNA Analysis",date:"28 Feb 2025",status:"Complete",markers:5,key:"MTHFR, TRPM6, VDR variants identified"},
            {type:"Follow-up Blood",date:"Expected Aug 2025",status:"Scheduled",markers:null,key:"6-month re-evaluation"},
          ].map((t2,i)=>(
            <Card key={i} style={{ padding:16,opacity:t2.status==="Scheduled"?.6:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                <div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{t2.type}</div>
                <div style={{ fontSize:12,fontWeight:600,color:t2.status==="Complete"?t.emerald:t.purple,background:t2.status==="Complete"?`${t.emerald}12`:`${t.purple}12`,borderRadius:6,padding:"5px 10px" }}>{t2.status}</div>
              </div>
              <div style={{ fontSize:13,color:t.t3,marginBottom:4 }}>{t2.date}{t2.markers?` · ${t2.markers} markers`:""}</div>
              {t2.key&&<div style={{ fontSize:13,color:t.t2,lineHeight:1.5,marginBottom:8 }}>{t2.key}</div>}
              {t2.status==="Complete"&&<div onClick={()=>onNavigate("report-viewer")} style={{ background:t.purple,borderRadius:8,padding:"9px 15px",fontSize:12,fontWeight:700,color:"#FFF",letterSpacing:.3,cursor:"pointer",textAlign:"center" }}>View Report</div>}
            </Card>
          ))}
        </div>
      )},
      reports: { title:"My Reports", content: (
        <div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6,marginBottom:16 }}>Download your full reports as PDF.</div>
          <div style={{ display:"flex",gap:6,marginBottom:16,background:t.s2,borderRadius:10,padding:3 }}>
            {["Blood Reports","DNA Reports"].map(tb=>(
              <div key={tb} onClick={()=>setReportTab(tb)} style={{ flex:1,background:reportTab===tb?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:reportTab===tb?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
                <div style={{ fontSize:13,fontWeight:600,color:reportTab===tb?t.t1:t.t3 }}>{tb}</div>
              </div>
            ))}
          </div>
          {reportTab==="Blood Reports"&&[{n:"Cardiovascular Health",f:"EVA_Blood_Cardiovascular.pdf"},{n:"Blood Sugar & Metabolism",f:"EVA_Blood_Metabolic.pdf"},{n:"Inflammation & Liver",f:"EVA_Blood_Inflammation.pdf"},{n:"Nutrition & Vitamins",f:"EVA_Blood_Nutrition.pdf"},{n:"Hormones",f:"EVA_Blood_Hormones.pdf"},{n:"Kidney & Electrolytes",f:"EVA_Blood_Kidney.pdf"}].map((r,i)=>(
            <div key={`r${i}`} onClick={()=>toast.show("Downloading "+r.f,"success")} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:t.s1,borderRadius:10,border:`1px solid ${t.b1}`,marginBottom:6,cursor:"pointer" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:8,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke={t.purple} strokeWidth="1.3"/><path d="M5 7h6M5 10h4" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/></svg>
                </div>
                <div style={{ fontSize:14,fontWeight:500,color:t.t1 }}>{r.n}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
          {reportTab==="DNA Reports"&&[{n:"Methylation Pathway",f:"EVA_DNA_Methylation.pdf"},{n:"Diet & Macronutrient Response",f:"EVA_DNA_Diet.pdf"},{n:"Food Sensitivities",f:"EVA_DNA_Sensitivities.pdf"},{n:"Cardiovascular Risk",f:"EVA_DNA_Cardiovascular.pdf"},{n:"Metabolic Risk",f:"EVA_DNA_Metabolic.pdf"},{n:"Cancer Risk Panel",f:"EVA_DNA_Cancer.pdf"},{n:"Neurological Risk",f:"EVA_DNA_Neurological.pdf"},{n:"Nutrigenomics",f:"EVA_DNA_Nutrigenomics.pdf"},{n:"Detoxification Pathways",f:"EVA_DNA_Detox.pdf"},{n:"Inflammation Genetics",f:"EVA_DNA_Inflammation.pdf"},{n:"Hormone Metabolism",f:"EVA_DNA_Hormones.pdf"},{n:"Sleep & Circadian",f:"EVA_DNA_Sleep.pdf"},{n:"Athletic Performance",f:"EVA_DNA_Athletic.pdf"},{n:"Skin & Ageing",f:"EVA_DNA_Skin.pdf"}].map((r,i)=>(
            <div key={`r${i}`} onClick={()=>toast.show("Downloading "+r.f,"success")} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:t.s1,borderRadius:10,border:`1px solid ${t.b1}`,marginBottom:6,cursor:"pointer" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:8,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke={t.purple} strokeWidth="1.3"/><path d="M5 7h6M5 10h4" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/></svg>
                </div>
                <div style={{ fontSize:14,fontWeight:500,color:t.t1 }}>{r.n}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
        </div>
      )},
      referral: { title:"Refer a Friend", content: (
        <ReferralSection toast={toast} onNavigate={onNavigate}/>
      )},
            shop: { title:"EVA™ Store", content: (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",textAlign:"center" }}>
          <div style={{ width:80,height:80,borderRadius:"50%",background:`${t.purple}08`,border:`2px dashed ${t.purple}25`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M4 8h2l3 12h14l3-10H10" stroke={t.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="24" r="2" fill={t.purple}/><circle cx="22" cy="24" r="2" fill={t.purple}/></svg>
          </div>
          <div style={{ fontSize:22,fontWeight:700,color:t.t1,marginBottom:8 }}>Coming Soon</div>
          <div style={{ fontSize:15,color:t.t2,lineHeight:1.7,maxWidth:260,marginBottom:24 }}>The EVA™ Store will let you re-order supplements, browse longevity products, and manage your subscription directly.</div>
          <div style={{ fontSize:13,color:t.t3 }}>We'll notify you when the store launches.</div>
        </div>
      )},
      about: { title:"About EVA™", content: (
        <div style={{ textAlign:"center",padding:"20px 0",display:"flex",flexDirection:"column",alignItems:"center" }}>
          <VideoCard title="The Clinical Difference" duration="0:40"/>
          <EVAFullLogo width={100} />
          <div style={{ fontSize:15,color:t.t2,marginTop:16,lineHeight:1.7 }}>EVA™ is your gateway to longevity — a clinically guided platform that makes biohacking and longevity science accessible to everyone.</div>
          <div style={{ fontSize:13,color:t.t3,marginTop:16 }}>Version 1.0.0</div>
          <div style={{ fontSize:13,color:t.t3,marginTop:4 }}>by Elite Vita · Dubai, UAE</div>
          <div style={{ display:"flex",gap:14,marginTop:24,marginBottom:16 }}>
            {[{l:"Halal Certified",i:"HC"},{l:"ISO 27001",i:"ISO"},{l:"UAE PDPL",i:"PDPL"}].map((cert,i)=>(
              <div key={i} style={{ flex:1,background:t.s2,borderRadius:10,padding:"15px 8px",textAlign:"center",border:`1px solid ${t.b2}` }}>
                <div style={{ fontSize:13,fontWeight:800,color:t.emerald,letterSpacing:.5 }}>{cert.i}</div>
                <div style={{ fontSize:10,color:t.t3,marginTop:3,fontWeight:500 }}>{cert.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:11,color:t.t4,marginTop:8,lineHeight:1.6 }}>EVA™ is a wellness platform designed to support health optimisation. It is not intended to diagnose, treat, cure, or prevent any disease.</div>
        </div>
      )},
    };
    const sec = sections[activeSection];
    return (
      <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
        <div style={{ padding:`${SAFE_TOP}px 24px 0` }}><TopBar onBack={()=>setActiveSection(null)}/><Title>{sec?.title}</Title></div>
        <div key={activeSection} style={{ flex:1,overflowY:"auto",padding:"0 24px",paddingBottom:20 }}>{sec?.content}</div>
        <TabBar active="profile" onNavigate={id=>{setActiveSection(null);onNavigate(id);}}/>
      </div>
    );
  }

  // Main profile view
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0` }}>
        <div style={{ fontSize:24,fontWeight:700,color:t.t1,letterSpacing:-.3,marginBottom:20 }}>Profile</div>
        <Card style={{ display:"flex",alignItems:"center",gap:18,padding:18 }}>
          <DanielAvatar size={52}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18,fontWeight:700,color:t.t1 }}>Daniel Salewski</div>
            <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>daniel@eva.ae</div>
            <div style={{ fontSize:12,color:t.t3,marginTop:2 }}>Member since Feb 2026</div>
          </div>
        </Card>
      </div>
      <div ref={scrollRef} style={{ flex:1,overflowY:"auto",padding:"0 24px",paddingBottom:8 }}>
        <div style={{ display:"flex",gap:12,margin:"6px 0 18px" }}>
          {/* Profile stat tiles */}
          <div onClick={()=>onNavigate("eva-age")} style={{ flex:1,background:`linear-gradient(135deg, ${t.emerald}12, ${t.emerald}06)`,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1.5px solid ${t.emerald}25`,cursor:"pointer" }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:2 }}><MiniDNA w={50} h={24} emerald={t.emerald} gold={t.gold} cyan={t.cyan}/></div>
            <div style={{ fontSize:22,fontWeight:800,color:t.emerald }}>34</div>
            <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>EVA™ Age</div>
          </div>
          <div onClick={()=>setActiveSection("test-history")} style={{ flex:1,background:t.s1,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1px solid ${t.b1}`,cursor:"pointer" }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:6 }}><svg width="28" height="28" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 1 2.5 5.5 2.5 9a4.5 4.5 0 009 0c0-3.5-4.5-8-4.5-8z" stroke={t.purple} strokeWidth="1.2" fill={`${t.purple}15`}/><circle cx="7" cy="9" r="1.5" fill={t.purple} opacity=".4"/></svg></div>
            <div style={{ fontSize:22,fontWeight:800,color:t.purple }}>2</div>
            <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>Tests</div>
          </div>
          <div style={{ flex:1,background:t.s1,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:6 }}><svg width="28" height="28" viewBox="0 0 14 14" fill="none"><path d="M7 1L5.5 5.5h3L5.5 13l2-5H4l3-7z" fill={`${t.emerald}15`} stroke={t.emerald} strokeWidth="1"/></svg></div>
            <div style={{ fontSize:22,fontWeight:800,color:t.emerald }}>87</div>
            <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.5 }}>Days Active</div>
          </div>
        </div>

        <Label>Refer & Earn</Label>
        <Card onClick={()=>setActiveSection("referral")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer",background:`${t.purple}04`,border:`1px solid ${t.purple}12` }}>
          {pIcon("send")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Refer a Friend</div><div style={{ fontSize:13,color:t.emerald,marginTop:6,fontWeight:500 }}>Earn 1 free month per referral</div></div>
          <ChevronRight/>
        </Card>

        <Label>Account</Label>
        {[
          { id:"personal",label:"Personal Information",sub:"Name, email, phone",icon:"person" },
          { id:"questionnaire",label:"Health Questionnaire",sub:"Update your health goals",icon:"clipboard" },
          { id:"subscription",label:"Subscription",sub:"Plan, billing & payment history",icon:"bag" },
          { id:"password",label:"Change Password",sub:"Update your account password",icon:"shield" },
        ].map((item)=>(
          <Card key={item.id} onClick={()=>setActiveSection(item.id)} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
            {item.icon&&pIcon(item.icon)}
            <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{item.label}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{item.sub}</div></div>
            <ChevronRight/>
          </Card>
        ))}

        <Label>Privacy & Notifications</Label>
        {[
          { id:"notifications",label:"Notification Preferences",sub:"Push, email, SMS settings",icon:"bell" },
          { id:"consent",label:"Consent & Data",sub:"Data processing, UAE PDPL",icon:"shield" },
        ].map((item)=>(
          <Card key={item.id} onClick={()=>setActiveSection(item.id)} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
            {item.icon&&pIcon(item.icon)}
            <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{item.label}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{item.sub}</div></div>
            <ChevronRight/>
          </Card>
        ))}

        <Label>Connected Devices</Label>
        <Card onClick={()=>setActiveSection("integrations")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          {pIcon("link")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Health Integrations</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Apple Health, Google Fit, Whoop, Oura + 4 more</div></div>
          <ChevronRight/>
        </Card>

        <Label>Support & Data</Label>
        {[
          { id:"clinician",label:"Contact Clinician",sub:"Message Dr. Nival directly",icon:"doctor" },
          { id:"help",label:"Help & FAQ",sub:"Common questions and guides",icon:"question" },
          { id:"test-history",label:"Test History",sub:"Your complete testing timeline",icon:"clipboard" },
          { id:"reports",label:"My Reports",sub:"Blood & DNA report PDFs",icon:"doc" },
          { id:"supplements",label:"My Supplements",sub:"Your supplement stack & product details",icon:"pill" },
        ].map((item)=>(
          <Card key={item.id} onClick={()=>setActiveSection(item.id)} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
            {item.icon&&pIcon(item.icon)}
            <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{item.label}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{item.sub}</div></div>
            <ChevronRight/>
          </Card>
        ))}

        <Label>Appearance</Label>
        <Card style={{ padding:16 }}>
          <div style={{ display:"flex",background:t.s2,borderRadius:10,padding:3 }}>
            {[
              {id:"light",l:"Light",ic:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.8 3.8l1 1M11.2 11.2l1 1M3.8 12.2l1-1M11.2 4.8l1-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,fn:()=>{if(isDark)onToggleTheme()}},
              {id:"dark",l:"Dark",ic:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 8A4 4 0 118 4a3.2 3.2 0 004 4z" stroke="currentColor" strokeWidth="1.3"/></svg>,fn:()=>{if(!isDark)onToggleTheme()}},
              {id:"system",l:"System",ic:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,fn:()=>{const d=window.matchMedia&&window.matchMedia("(prefers-color-scheme:dark)").matches;if(d!==isDark)onToggleTheme();toast.show(d?"Switched to system dark mode":"Switched to system light mode","success")}},
            ].map(opt=>{
              const active = (opt.id==="dark"&&isDark)||(opt.id==="light"&&!isDark);
              return (
              <div key={opt.id} onClick={opt.fn} style={{ flex:1,background:active?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:active?"0 1px 3px rgba(0,0,0,.1)":"none" }}>
                <div style={{ display:"flex",justifyContent:"center",marginBottom:3,color:active?t.t1:t.t3 }}>{opt.ic}</div><div style={{ fontSize:12,fontWeight:active?600:500,color:active?t.t1:t.t3 }}>{opt.l}</div>
              </div>
            );})
            }
          </div>
        </Card>

        <Label>More</Label>
        <Card onClick={()=>setActiveSection("shop")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          {pIcon("bag")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>EVA™ Store</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Supplements & products</div></div>
          <div style={{ fontSize:11,fontWeight:700,color:t.purple,background:`${t.purple}12`,borderRadius:6,padding:"6px 13px",letterSpacing:.5 }}>COMING SOON</div>
        </Card>
        <Card onClick={()=>setActiveSection("about")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          {pIcon("info")}
          <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1 }}>About EVA™</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>Version 1.0 · by Elite Vita</div></div>
          <ChevronRight/>
        </Card>

        <Label>Account Actions</Label>
        <Card onClick={()=>onNavigate("welcome")} style={{ display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 2H4a2 2 0 00-2 2v10a2 2 0 002 2h3M12 13l4-4-4-4M16 9H7" stroke={t.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div style={{ fontSize:15,fontWeight:600,color:t.red }}>Sign Out</div>
        </Card>
        <div onClick={()=>toast.show("To delete your account, please email support@eva.com","warning")} style={{ textAlign:"center",padding:"16px 0 4px",cursor:"pointer" }}>
          <span style={{ fontSize:13,color:t.t4,fontWeight:500 }}>Delete Account</span>
        </div>
        <div style={{ textAlign:"center",padding:"20px 0 12px" }}>
          <div style={{ display:"flex",justifyContent:"center" }}><EVAFullLogo width={70} color={t.t4} /></div>
          <div style={{ fontSize:11,color:t.t4,marginTop:10,letterSpacing:1 }}>Clinically guided longevity</div>
          <div style={{ fontSize:10,color:t.t4,marginTop:4 }}>Version 1.0.0 (Build 92)</div>
        </div>
      </div>
      <TabBar active="profile" onNavigate={id => onNavigate(id)} />
    </div>
  );
};


// ── Safety Gate Alerts ──
const SafetyGateAlert = ({level="red",marker="hs-CRP",value="22.4 mg/L",threshold="Critical: > 20.0 mg/L",onBook,onDismiss}) => {
  const t = useTheme();
  const isRed = level==="red";
  const color = isRed ? "#DC2626" : "#F59E0B";
  const bgColor = isRed ? "#DC262608" : "#F59E0B08";
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ background:bgColor,borderBottom:`2px solid ${color}`,padding:`${SAFE_TOP}px 24px 16px`,display:"flex",alignItems:"center",gap:14 }}>
        <div style={{ width:36,height:36,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L1 16h16L9 2z" fill="none" stroke="#FFF" strokeWidth="1.8"/><path d="M9 7v4M9 13v1" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </div>
        <div>
          <div style={{ fontSize:14,fontWeight:800,color:color,letterSpacing:1,textTransform:"uppercase" }}>{isRed?"CRITICAL ALERT":"URGENT ALERT"}</div>
          <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>{isRed?"Immediate medical attention required":"Physician review within 48–72 hours"}</div>
        </div>
      </div>
      <div style={{ flex:1,padding:"28px 28px",overflowY:"auto" }}>
        <div style={{ fontSize:22,fontWeight:700,color:t.t1,marginBottom:12,lineHeight:1.3 }}>{marker} is outside safe range</div>
        <div style={{ fontSize:15,color:t.t2,lineHeight:1.6,marginBottom:20 }}>Your result requires {isRed?"immediate":"prompt"} medical evaluation. All optimisation recommendations for this marker have been paused.</div>
        <Card style={{ border:`1.5px solid ${color}30`,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8 }}>
            <span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{marker}</span>
            <span style={{ fontSize:20,fontWeight:700,color:color }}>{value}</span>
          </div>
          <div style={{ height:6,background:t.bg,borderRadius:3 }}>
            <div style={{ width:"95%",height:"100%",background:color,borderRadius:3 }}/>
          </div>
          <div style={{ fontSize:12,color:color,fontWeight:600,marginTop:6 }}>{threshold}</div>
        </Card>
        <Card style={{ background:`${color}06`,padding:16 }}>
          <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8 }}>WHAT THIS MEANS</div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.7 }}>{isRed?"This result is in the critical range and may indicate a serious condition requiring emergency evaluation. Please contact your physician or visit an emergency facility.":"This result is significantly outside optimal range and needs medical assessment. Our clinical team has been notified and will review your case within 48–72 hours."}</div>
        </Card>
        <Card style={{ padding:16 }}>
          <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8 }}>OPTIMISATION STATUS</div>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:color }}/>
            <div style={{ fontSize:14,color:t.t2 }}>All supplement recommendations for {marker} are <span style={{ fontWeight:600,color:color }}>paused</span> until cleared by your physician.</div>
          </div>
        </Card>
      </div>
      <div style={{ padding:"0 24px 16px",display:"flex",flexDirection:"column",gap:12 }}>
        <Btn onClick={onBook} style={{ background:color }}>{isRed?"Call Physician Now":"Book Physician Consultation"}</Btn>
        {!isRed&&onDismiss&&<Btn variant="muted" onClick={onDismiss}>I understand — remind me later</Btn>}
      </div>
    </div>
  );
};

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

const DEVAInsightScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [expanded, setExpanded] = useState(null);
  const [subTab, setSubTab] = useState({});
  const [checkedActions, setCheckedActions] = useState(new Set());
  const toggleAction = (key) => { const s = new Set(checkedActions); s.has(key)?s.delete(key):s.add(key); setCheckedActions(s); };

  const cards = [
    {
      id: "cvd",
      title: "Chronic low-grade inflammation — a silent driver of accelerated biological ageing.",
      marker: "hs-CRP", val: "2.8 mg/L", valColor: "red", pct: 72, optimal: "<0.6",
      dna: "No genetic variant — likely lifestyle-driven.",
      detail: "Your hs-CRP is elevated, indicating a state of chronic, low-grade inflammation. This is linked to cardiovascular disease, cancer, and dementia risk.",
      urgent: true,
      actions: [
        { type: "PROTOCOL", title: "Omega-3 and Vitamin C are working together.", supp: "Omega-3 + Vitamin C", dose: "3g Omega-3 + 1g Vit C · Morning · With food", suppId: "omega3", why: "EPA/DHA in Omega-3 reduces inflammation at the cellular level while Vitamin C neutralises free radicals that drive it. Consistency drives the resolution." },
        { type: "ACTION", title: "Avoid deep-fried and ultra-processed food today.", why: "These are key dietary drivers of systemic inflammation. Prioritise whole foods, fatty fish, leafy greens, and extra virgin olive oil." },
        { type: "NARRATIVE", title: "Month 2: Your inflammatory markers are responding.", why: "Your body is adapting to the protocol. Consistency now compounds into measurable hs-CRP reduction at your 6-month blood test." },
      ],
      outcomes: [
        { text: "Better recovery, reduced brain fog and fatigue.", timeframe: "SHORT-TERM", color: t.cyan },
        { text: "Significantly reduced hs-CRP at 6-month assessment.", timeframe: "MEDIUM-TERM", color: t.purple },
        { text: "Slower biological ageing, reduced risk of all major chronic diseases.", timeframe: "LONG-TERM", color: t.emerald },
      ]
    },
    {
      id: "vitd",
      title: "Vitamin D is deficient — impacting immunity, bone health, and hormonal balance.",
      marker: "Vitamin D", val: "18 ng/mL", valColor: "gold", pct: 22, optimal: "50–80",
      dna: "VDR FokI polymorphism — receptor efficiency reduced.",
      detail: "Your Vitamin D is deficient, impacting immunity, bone health, hormonal health, and cardiovascular health all at once. Your VDR variant requires higher doses.",
      urgent: false,
      actions: [
        { type: "PROTOCOL", title: "Double-dose loading protocol for your VDR variant.", supp: "Vitamin D3 + K2", dose: "8,000 IU · Morning · With fat (loading × 1 month, then 4,000 IU)", suppId: "vitd3", why: "Loading protocol to quickly replete stores. K2 ensures the calcium your Vitamin D helps absorb goes to your bones, not arteries." },
        { type: "ACTION", title: "Get 15 minutes of early morning sunlight today.", why: "UVB exposure supports Vitamin D synthesis and your circadian rhythm. In Dubai, morning sun before 10am is optimal." },
        { type: "NARRATIVE", title: "Month 2: Building your reserves.", why: "Vitamin D is fat-soluble and takes time to accumulate. Stay consistent — your 6-month assessment will show the trajectory." },
      ],
      outcomes: [
        { text: "Improved immunity within 2–4 weeks.", timeframe: "SHORT-TERM", color: t.cyan },
        { text: "Optimal Vitamin D levels at 6-month assessment.", timeframe: "MEDIUM-TERM", color: t.purple },
        { text: "Reduced risk of hospitalisation and sustained immune function.", timeframe: "LONG-TERM", color: t.emerald },
      ]
    },
    {
      id: "mag",
      title: "Magnesium is suboptimal — high-leverage for sleep, stress, and recovery.",
      marker: "Magnesium (RBC)", val: "4.2 mEq/L", valColor: "gold", pct: 38, optimal: "4.5–5.5",
      dna: "TRPM6 gene variant — reduced absorption efficiency.",
      detail: "RBC magnesium reflects cellular levels. Supports 300+ enzymatic reactions including sleep, recovery, and stress response.",
      urgent: false,
      actions: [
        { type: "PROTOCOL", title: "Bisglycinate form — most bioavailable for your TRPM6 variant.", supp: "Magnesium Bisglycinate", dose: "300mg · 1 cap AM, 2 caps before sleep", suppId: "magnesium", why: "Split dosing is intentional: the morning dose supports energy and cognition, while the evening dose supports sleep and recovery." },
        { type: "ACTION", title: "Eat magnesium-rich foods today: dark chocolate (85%+), pumpkin seeds, spinach.", why: "Dietary magnesium complements supplementation. These are the densest natural sources." },
        { type: "NARRATIVE", title: "Month 2: Your sleep architecture is shifting.", why: "Magnesium’s effects on sleep are among the first you’ll notice. Deep sleep and HRV should be trending up." },
      ],
      outcomes: [
        { text: "Improved sleep quality and reduced stress within 1–2 weeks.", timeframe: "SHORT-TERM", color: t.cyan },
        { text: "Magnesium levels reaching optimal range at 6-month assessment.", timeframe: "MEDIUM-TERM", color: t.purple },
        { text: "A more resilient nervous system and better recovery.", timeframe: "LONG-TERM", color: t.emerald },
      ]
    }
  ];

  const totalActions = cards.length * 3;
  const progress = checkedActions.size;

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0`,flexShrink:0 }}>
        <TopBar onBack={onBack}/>
        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:12 }}>
          <MiniDEVA size={48}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:22,fontWeight:700,color:t.t1,letterSpacing:-.3 }}>Today’s DEVA™</div>
            <div style={{ fontSize:12,color:t.t2,marginTop:2 }}>3 insights · each with actions and outcomes</div>
          </div>
          <div style={{ position:"relative",width:44,height:44 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke={t.s2} strokeWidth="3"/>
              <circle cx="22" cy="22" r="18" fill="none" stroke={progress===totalActions?t.emerald:t.purple} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(progress/totalActions)*113} 113`} transform="rotate(-90 22 22)" style={{transition:"stroke-dasharray .5s ease"}}/>
            </svg>
            <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:11,fontWeight:800,color:progress===totalActions?t.emerald:t.purple }}>{progress}/{totalActions}</div>
          </div>
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"0 24px 20px" }}>
        {cards.map((card, ci) => {
          const isOpen = expanded === ci;
          const tab = subTab[ci] || "actions";
          return (
            <div key={ci} style={{ background:t.s1,borderRadius:18,marginBottom:14,border:`1px solid ${isOpen?t[card.valColor]+"30":t.b1}`,borderLeft:`3px solid ${t[card.valColor]}`,overflow:"hidden",transition:"all .2s",animation:`fadeUp .3s ease ${ci*0.08}s both` }}>
              {/* Insight header — always visible */}
              <div onClick={()=>setExpanded(isOpen?null:ci)} style={{ padding:16,cursor:"pointer" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                  <div style={{ fontSize:15,fontWeight:600,color:t.t1,lineHeight:1.4,flex:1,paddingRight:8 }}>
                    {card.urgent && <span style={{ fontSize:9,fontWeight:700,color:t.red,background:`${t.red}12`,padding:"3px 7px",borderRadius:3,letterSpacing:.5,marginRight:6,verticalAlign:"middle" }}>URGENT</span>}
                    {card.title}
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <div style={{ display:"flex",gap:4 }}>
                      {[t.purple, t.gold, t.emerald].map((c,i) => <div key={i} style={{ width:6,height:6,borderRadius:3,background:c+"60" }}/>)}
                    </div>
                    <div style={{ transform:isOpen?"rotate(90deg)":"rotate(0)",transition:"transform .2s" }}><ChevronRight size={12} color={t.t3}/></div>
                  </div>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:6 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ height:4,background:`${t.t4}12`,borderRadius:2 }}><div style={{ width:`${card.pct}%`,height:"100%",background:t[card.valColor],borderRadius:2 }}/></div>
                  </div>
                  <span style={{ fontSize:14,fontWeight:700,color:t[card.valColor],flexShrink:0 }}>{card.val}</span>
                </div>
                <div style={{ fontSize:12,color:t.purple,fontWeight:500 }}>{card.dna}</div>
              </div>

              {/* Expanded: nested actions + outcomes */}
              {isOpen && (
                <div style={{ borderTop:`1px solid ${t.b1}`,animation:"fadeUp .2s ease both" }}>
                  {/* Detail text */}
                  <div style={{ padding:"12px 16px 0",fontSize:13,color:t.t2,lineHeight:1.7 }}>{card.detail}</div>
                  {card.urgent&&<div style={{padding:"8px 16px 0"}}><VideoCard title="The Hidden Inflammation Threat" duration="0:40"/></div>}

                  {/* Sub-tabs: Actions | Outcomes */}
                  <div style={{ display:"flex",gap:6,padding:"12px 16px 0" }}>
                    {[{id:"actions",l:"3 Actions",c:t.gold},{id:"outcomes",l:"3 Outcomes",c:t.emerald}].map(s=>(
                      <div key={s.id} onClick={()=>setSubTab({...subTab,[ci]:s.id})} style={{ flex:1,background:tab===s.id?`${s.c}12`:t.s2,border:`1.5px solid ${tab===s.id?s.c:t.b2}`,borderRadius:8,padding:"8px 0",textAlign:"center",cursor:"pointer",transition:"all .2s" }}>
                        <div style={{ fontSize:12,fontWeight:700,color:tab===s.id?s.c:t.t4 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding:"10px 16px 16px" }}>
                    {tab === "actions" && card.actions.map((act, ai) => {
                      const actionKey = ci + "-" + ai;
                      const checked = checkedActions.has(actionKey);
                      const typeColor = act.type === "PROTOCOL" ? t.purple : act.type === "ACTION" ? t.gold : t.cyan;
                      return (
                        <div key={ai} style={{ background:t.bg,borderRadius:12,padding:12,marginBottom:ai<2?8:0,border:`1px solid ${checked?t.emerald+"30":t.b1}`,transition:"all .2s" }}>
                          <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                            <div onClick={(e)=>{e.stopPropagation();toggleAction(actionKey)}} style={{ width:24,height:24,borderRadius:6,background:checked?`${t.emerald}12`:`${typeColor}08`,border:`1.5px solid ${checked?t.emerald:typeColor+"30"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,marginTop:2,transition:"all .2s" }}>
                              {checked && <CheckIcon size={12} color={t.emerald}/>}
                            </div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:9,fontWeight:700,color:typeColor,background:`${typeColor}10`,padding:"3px 7px",borderRadius:3,letterSpacing:.5,display:"inline-block",marginBottom:4 }}>{act.type}</div>
                              <div style={{ fontSize:13,fontWeight:600,color:checked?t.t3:t.t1,textDecoration:checked?"line-through":"none",lineHeight:1.4,marginBottom:4 }}>{act.title}</div>
                              <div style={{ fontSize:12,color:t.t3,lineHeight:1.6 }}>{act.why}</div>
                              {act.supp && (
                                <div onClick={()=>onNavigate("supplement-detail")} style={{ display:"flex",alignItems:"center",gap:10,background:`${t.purple}06`,borderRadius:8,padding:"10px 12px",marginTop:8,cursor:"pointer" }}>
                                  <PillIcon size={14}/>
                                  <div style={{ flex:1 }}><div style={{ fontSize:12,fontWeight:600,color:t.t1 }}>{act.supp}</div><div style={{ fontSize:11,color:t.t3 }}>{act.dose}</div></div>
                                  <ChevronRight size={10} color={t.purple}/>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {tab === "outcomes" && card.outcomes.map((out, oi) => (
                      <div key={oi} style={{ background:t.bg,borderRadius:12,padding:12,marginBottom:oi<2?8:0,borderLeft:`3px solid ${out.color}`,border:`1px solid ${t.b1}`,borderLeftWidth:3,borderLeftColor:out.color }}>
                        <div style={{ fontSize:9,fontWeight:700,color:out.color,background:`${out.color}10`,padding:"3px 7px",borderRadius:3,letterSpacing:.5,display:"inline-block",marginBottom:6 }}>{out.timeframe}</div>
                        <div style={{ fontSize:14,color:t.t1,lineHeight:1.5,fontWeight:500 }}>{out.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <TabBar active="today" onNavigate={id=>onNavigate(id)}/>
    </div>
  );
};

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

const DEVAActionScreen = ({ onNavigate, onBack }) => {
  useEffect(() => { onNavigate("deva-insight"); }, []);
  return null;
};

const ProtocolScreen = ({ onNavigate, onBack, subTarget, clearSubTarget }) => {
  const t = useTheme();
  const [tab, setTab] = useState("morning");
  useEffect(()=>{if(subTarget){setTab(subTarget);clearSubTarget?.()}},[subTarget]);
  const [taken, setTaken] = useState(new Set([2,4]));
  const [suppInfo, setSuppInfo] = useState(null);
    const sups = { morning:[{n:"Vitamin D3",d:"4,000 IU",r:"Below optimal",why:"Your Vitamin D is at 18 ng/mL (optimal: 50–80). Your VDR gene variant reduces receptor efficiency, requiring higher supplementation.",info:"Vitamin D3 (cholecalciferol) supports immune function, bone density, mood regulation, and calcium absorption. Take with a fat-containing meal for optimal absorption. Your VDR FokI polymorphism means standard doses are insufficient — 4,000 IU compensates for reduced receptor binding. Paired with K2 (200mcg) to direct calcium to bones, not arteries. Expected improvement: 10–15 ng/mL increase over 90 days. Re-test to confirm."},{n:"Omega-3",d:"2,000mg",r:"Inflammation",why:"Your hs-CRP is elevated at 2.8 mg/L. EPA/DHA at this dose targets systemic inflammation and cardiovascular markers.",info:"Omega-3 fatty acids (EPA 1,340mg + DHA 660mg) are pharmaceutical-grade fish oil targeting systemic inflammation. Your hs-CRP at 2.8 mg/L indicates low-grade chronic inflammation. Take with breakfast. Minimum 90 days for measurable hs-CRP reduction. Also supports cardiovascular health, brain function, and joint mobility. No significant interactions with your current protocol."},{n:"CoQ10",d:"200mg",r:"Mitochondrial",why:"Supports cellular energy production and mitochondrial health. Essential for cardiovascular function and exercise recovery.",info:"Coenzyme Q10 (ubiquinol form, 200mg) is essential for mitochondrial ATP production. Levels naturally decline after age 30. Supports cardiovascular function, exercise recovery, and cellular energy. Take with a fat-containing meal. Particularly important if you experience fatigue or engage in regular exercise. Synergistic with Omega-3 for cardiovascular protection."},{n:"Vitamin K2",d:"200mcg",r:"Paired with D3",why:"K2 directs calcium to bones rather than arteries. Always paired with D3 supplementation for safe, effective absorption.",info:"Vitamin K2 (MK-7 form, 200mcg) activates osteocalcin (directs calcium to bones) and Matrix GLA protein (prevents arterial calcification). Essential safety pairing with high-dose D3. Without K2, excess calcium from D3 can deposit in arteries. Take together with D3 in the morning. No known upper limit toxicity for K2."},{n:"B-Complex",d:"1 capsule",r:"MTHFR variant",why:"Your MTHFR C677T variant reduces folate metabolism. Methylated B-Complex bypasses this genetic bottleneck.",info:"Methylated B-Complex contains pre-activated forms: L-Methylfolate (400mcg), Methylcobalamin B12 (1000mcg), P5P B6, and Riboflavin 5-Phosphate. Your MTHFR C677T heterozygous variant reduces folate conversion by ~35%. Methylated forms bypass this bottleneck entirely. Supports homocysteine metabolism, energy production, and nervous system function. Take in the morning — B vitamins can be stimulating."}], evening:[{n:"Magnesium Glycinate",d:"600mg",r:"Recovery & sleep",adjusted:true,adjustNote:"Wearable: +200mg for 7 days (Day 2/7)",why:"Your RBC magnesium is 4.2 mEq/L (optimal: 4.5–5.5). TRPM6 variant reduces absorption. Glycinate form maximises bioavailability and supports sleep.",info:"Magnesium Bisglycinate (600mg = 100mg elemental per capsule × 6). Glycinate form chosen specifically for your TRPM6 rs11144134 variant which reduces intestinal absorption. This chelated form bypasses the compromised transport channel. Supports 300+ enzymatic reactions, sleep quality (GABA agonist), muscle recovery, and cardiovascular function. Take with dinner — glycinate promotes relaxation. Currently adjusted +200mg due to HRV drop detected by your wearable."},{n:"Zinc Picolinate",d:"30mg",r:"Immune support",why:"Supports immune function, testosterone maintenance, and wound healing. Picolinate form offers superior absorption.",info:"Zinc Picolinate (25mg elemental from 150mg picolinate, with 1mg copper). Picolinate form has highest bioavailability among zinc forms. Supports immune cell production, testosterone synthesis, wound healing, and taste/smell function. Copper included to prevent zinc-induced copper depletion. Take with dinner to avoid nausea. Do not take within 2 hours of iron supplements."}] };
  const tog = i => { const s = new Set(taken); s.has(i)?s.delete(i):s.add(i); setTaken(s); };
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0` }}>
        <TopBar onBack={onBack}/><Title sub="Reviewed by Dr. Nival · Updated 6 Mar 2025">Your Protocol</Title>
        <VideoCard title="How Your Protocol Was Built" duration="1:45"/>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"12px 16px",background:`${t.cyan}06`,borderRadius:14,border:`1px solid ${t.cyan}18` }}>
          <div style={{ width:36,height:36,borderRadius:10,background:`${t.cyan}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12l-1 8H3L2 4z" stroke={t.cyan} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12a1 1 0 100 2 1 1 0 000-2zM11 12a1 1 0 100 2 1 1 0 000-2z" fill={t.cyan}/></svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>Next delivery: 1 Apr 2026</div>
            <div style={{ fontSize:12,color:t.t3 }}>7 supplements · 30-day supply</div>
          </div>
          <div onClick={()=>toast.show("Your next box ships 1 Apr: Vitamin D3, Omega-3, CoQ10, K2, B-Complex, Magnesium, Zinc","info")} style={{ cursor:"pointer" }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={t.purple} strokeWidth="1.2"/><path d="M8 5v3M8 10h.01" stroke={t.purple} strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:18 }}>
          {["morning","evening"].map(tb=>(<div key={tb} onClick={()=>{setTab(tb);setTaken(tb==="morning"?new Set([2,4]):new Set());}} style={{ flex:1,background:tab===tb?t.purple:t.s2,border:tab===tb?`1.5px solid ${t.purple}`:`1px solid ${t.b2}`,borderRadius:12,padding:"11px 0",textAlign:"center",fontSize:14,fontWeight:600,color:tab===tb?"#FFF":t.t3,cursor:"pointer",transition:"all .2s",textTransform:"capitalize" }}>{tb}</div>))}
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"0 24px" }}>
        {(sups[tab]&&sups[tab].every((_,i)=>taken.has(i)))?<div style={{textAlign:"center",padding:"60px 20px"}}><div style={{width:64,height:64,borderRadius:"50%",background:`${t.emerald}12`,border:`2px solid ${t.emerald}30`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><CheckIcon size={28} color={t.emerald}/></div><div style={{fontSize:17,fontWeight:600,color:t.t1,marginBottom:8}}>All logged!</div><div style={{fontSize:14,color:t.t3,lineHeight:1.6}}>Your {tab} supplements are recorded. Great job staying consistent.</div></div>:(sups[tab]||[]).map((s,i)=>(
          <div key={`${tab}-${i}`} style={{ background:t.s1,borderRadius:16,padding:taken.has(i)?"0 16px":"14px 16px",marginBottom:taken.has(i)?0:10,border:`1px solid ${taken.has(i)?"transparent":t.b1}`,cursor:"pointer",transition:"all .35s ease",maxHeight:taken.has(i)?0:200,opacity:taken.has(i)?0:1,overflow:"hidden" }}>
            <div onClick={()=>tog(i)} style={{ display:"flex",alignItems:"center",gap:16 }}>
              <div style={{ width:38,height:38,borderRadius:11,background:taken.has(i)?`${t.emerald}14`:`${t.purple}10`,border:`1.5px solid ${taken.has(i)?t.emerald:t.purple}25`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s" }}>{taken.has(i)?<CheckIcon size={16} color={t.emerald}/>:<div style={{width:10,height:10,borderRadius:"50%",border:`1.5px solid ${t.purple}40`}}/>}</div>
              <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:600,color:t.t1,flex:1 }}>{s.n}{s.adjusted&&<span style={{ fontSize:9,fontWeight:700,color:"#F59E0B",background:"#F59E0B12",padding:"4px 8px",borderRadius:4,marginLeft:6,letterSpacing:.5,verticalAlign:"middle" }}>ADJUSTED</span>}</div><div style={{ fontSize:13,color:t.t3,marginTop:2 }}>{s.d} · {s.r}</div></div>
              <div onClick={(e)=>{e.stopPropagation();setSuppInfo(s)}} style={{cursor:"pointer",padding:4}}><InfoIcon size={16} color={t.purple}/></div>
            </div>
            {s.why&&<div style={{ marginTop:10,paddingTop:10,borderTop:`1px solid ${t.b1}`,fontSize:13,color:t.t2,lineHeight:1.6 }}>{s.why}{s.adjustNote&&<div style={{ marginTop:8,fontSize:12,color:"#F59E0B",fontWeight:600,display:"flex",alignItems:"center",gap:8 }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.5"/><path d="M8 4v5l3 2" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round"/></svg>{s.adjustNote}</div>}</div>}
          </div>
        ))}

        <VideoCard title="Supplement Quality & Certifications" duration="2:45"/>
      </div>
      {suppInfo&&<InfoModal title={suppInfo.n} text={suppInfo.info||suppInfo.why} onClose={()=>setSuppInfo(null)} video={true}/>}
      <TabBar active="protocol" onNavigate={id=>onNavigate(id)}/>
    </div>
  );
};

const BioAgeScreen = ({ onBack, onNavigate }) => {
  const t = useTheme();
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [openMarker, setOpenMarker] = useState(null);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => setPhase(4), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);
  const bio=34, chron=38, diff=chron-bio, pace=0.88, pacePos=((pace+1)/4)*100;
  const sc = t.emerald;
  const hist = [{d:"Feb",v:36},{d:"May",v:35},{d:"Aug",v:34.5},{d:"Nov",v:34}];
  const minV=30, maxV=42;
  const mks = [
    {n:"hs-CRP",lb:"Inflammation",s:"improving",pct:50,info:"Measures systemic inflammation. Trending down with Omega-3 protocol. Target: below 1.0 mg/L."},
    {n:"HbA1c",lb:"Blood Sugar",s:"optimal",pct:85,info:"Average blood sugar over 3 months. Healthy glucose metabolism. Maintained with chromium and berberine."},
    {n:"Vitamin D",lb:"Immune",s:"improving",pct:62,info:"Supports immune function, bone health, mood. Your VDR variant needs higher doses. Currently on 4,000 IU D3 + K2."},
    {n:"Testosterone",lb:"Hormones",s:"optimal",pct:90,info:"Key androgen for muscle, energy, mood. Levels within optimal range. No intervention needed."},
    {n:"Triglycerides",lb:"Heart",s:"optimal",pct:88,info:"Blood fat linked to cardiovascular risk. Levels healthy, supported by Omega-3 and dietary guidance."},
    {n:"eGFR",lb:"Kidney",s:"optimal",pct:92,info:"Estimated kidney filtration rate. Kidney function is excellent. No concerns."},
  ];

  /* Canvas DNA helix */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || phase < 2) return;
    const ctx = canvas.getContext("2d");
    const W = 340, H = 180;
    canvas.width = W; canvas.height = H;
    const cy=H/2, amp=60, numPts=60, twists=1.5;
    const emerald=t.emerald, gold=t.gold, cyan=t.cyan;
    let f=0, raf;
    const draw = () => {
      f++;
      const rot = f * 0.003;
      ctx.clearRect(0, 0, W, H);
      const s1=[], s2=[];
      for (let i=0; i<numPts; i++) {
        const frac=i/(numPts-1), x=frac*W, a1=frac*Math.PI*2*twists+rot;
        s1.push({x, y:cy+Math.sin(a1)*amp, z:(Math.cos(a1)+1)/2});
        s2.push({x, y:cy+Math.sin(a1+Math.PI)*amp, z:(Math.cos(a1+Math.PI)+1)/2});
      }
      const drawStrand = (pts, col) => {
        for (let i=0; i<pts.length-1; i++) {
          const a=pts[i], b=pts[i+1], z=(a.z+b.z)/2;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=col; ctx.lineWidth=1+z*3; ctx.globalAlpha=0.08+z*0.75; ctx.lineCap="round"; ctx.stroke();
        }
      };
      drawStrand(s1, emerald); drawStrand(s2, gold);
      for (let i=3; i<numPts-3; i+=4) {
        const a=s1[i], b=s2[i], avgZ=(a.z+b.z)/2;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=i%8===0?gold:emerald; ctx.lineWidth=0.8+avgZ*1.5; ctx.globalAlpha=0.06+avgZ*0.3; ctx.stroke();
        [{pt:a,col:emerald},{pt:b,col:gold}].forEach(({pt,col})=>{
          ctx.beginPath(); ctx.arc(pt.x,pt.y,1.2+pt.z*2.5,0,Math.PI*2);
          ctx.fillStyle=col; ctx.globalAlpha=0.15+pt.z*0.7; ctx.fill();
        });
      }
      const eI1=Math.floor((f*0.008)%numPts), eI2=Math.floor((f*0.008+numPts/2)%numPts);
      [s1[eI1],s2[eI2]].forEach(pt=>{
        if(!pt)return; ctx.beginPath(); ctx.arc(pt.x,pt.y,1.5+pt.z*2,0,Math.PI*2);
        ctx.fillStyle=cyan; ctx.globalAlpha=0.2+pt.z*0.5; ctx.fill();
      });
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return ()=>cancelAnimationFrame(raf);
  }, [phase>=2, t.emerald, t.gold, t.cyan]);

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0`,flexShrink:0 }}>
        <TopBar onBack={onBack}/>
      </div>
      <div style={{ flex:1,overflowY:"auto",scrollbarWidth:"none" }}>

        {/* DNA HELIX HERO */}
        <div style={{ position:"relative",width:"100%",height:180,marginBottom:4,overflow:"hidden" }}>
          <div style={{ position:"absolute",top:0,bottom:0,left:0,width:40,background:"linear-gradient(90deg, "+t.bg+", transparent)",zIndex:3 }}/>
          <div style={{ position:"absolute",top:0,bottom:0,right:0,width:40,background:"linear-gradient(90deg, transparent, "+t.bg+")",zIndex:3 }}/>
          <canvas ref={canvasRef} style={{ width:340,height:180,display:"block",margin:"0 auto",opacity:phase>=2?1:0,transition:"opacity 2s ease",willChange:"contents" }}/>
          <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:4 }}>
            <div style={{ textAlign:"center",position:"relative",opacity:phase>=1?1:0,transform:phase>=1?"scale(1)":"scale(0.4)",filter:phase>=1?"blur(0)":"blur(12px)",transition:"all 1s cubic-bezier(.2,0,.2,1)" }}>
              <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:140,height:90,borderRadius:"50%",background:t.bg,filter:"blur(28px)",opacity:0.9,zIndex:0 }}/>
              <div style={{ position:"relative",zIndex:1,fontSize:52,fontWeight:800,color:sc,letterSpacing:-3,lineHeight:1 }}>{bio}</div>
              <div style={{ position:"relative",zIndex:1,fontSize:11,color:sc,fontWeight:900,letterSpacing:3,marginTop:5 }}>EVA™ AGE</div>
            </div>
          </div>
        </div>

        {/* Years younger */}
        <div style={{ textAlign:"center",marginBottom:14,opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(10px)",transition:"all .8s ease .5s" }}>
          <span style={{ fontSize:16,fontWeight:700,color:sc }}>{diff} years younger</span>
        </div>

        {/* TRAJECTORY CARD */}
        <div style={{ margin:"0 24px",background:t.s1,borderRadius:18,border:"1px solid "+t.b1,overflow:"hidden",opacity:phase>=3?1:0,transform:phase>=3?"translateY(0)":"translateY(20px)",transition:"all .8s ease" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px 0" }}>
            <div>
              <div style={{ fontSize:13,fontWeight:700,color:t.t1 }}>Your Trajectory</div>
              <div style={{ fontSize:10,color:t.t3,marginTop:2 }}>Trending younger each quarter</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:20,fontWeight:800,color:t.gold,lineHeight:1 }}>{chron}</div>
              <div style={{ fontSize:8,fontWeight:700,color:t.t4,letterSpacing:1.5,marginTop:3 }}>ACTUAL AGE</div>
            </div>
          </div>
          <div style={{ position:"relative",height:120,padding:"8px 16px 0" }}>
            <svg style={{ position:"absolute",top:16,left:16,right:16,width:"calc(100% - 32px)",height:2 }}><line x1="0" y1="1" x2="100%" y2="1" stroke={t.gold} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/></svg>
            <svg width="100%" height="120" viewBox="0 0 280 120" preserveAspectRatio="none">
              <defs><linearGradient id="trajFill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={sc} stopOpacity="0.15"/><stop offset="100%" stopColor={sc} stopOpacity="0"/></linearGradient></defs>
              {phase>=3&&(()=>{const pts=hist.map((h,i)=>({x:20+(i/(hist.length-1))*240,y:12+((maxV-h.v)/(maxV-minV))*85}));const pathD=pts.map((pt,i)=>(i===0?"M":"L")+pt.x+" "+pt.y).join(" ");return <path d={pathD+" L"+pts[pts.length-1].x+" 100 L"+pts[0].x+" 100 Z"} fill="url(#trajFill2)" opacity={1} style={{transition:"opacity .8s ease"}}/>;})()}
              {hist.map((h,i)=>{const x=20+(i/(hist.length-1))*240;const y=12+((maxV-h.v)/(maxV-minV))*85;const isLast=i===hist.length-1;return(<g key={i}>{hist[i+1]&&<line x1={x} y1={y} x2={20+((i+1)/(hist.length-1))*240} y2={12+((maxV-hist[i+1].v)/(maxV-minV))*85} stroke={sc} strokeWidth="2.5" strokeLinecap="round" opacity={phase>=3?1:0} style={{transition:"opacity .5s ease "+(0.3+i*0.2)+"s"}}/>}<circle cx={x} cy={y} r={isLast?6:4} fill={isLast?sc:t.s1} stroke={sc} strokeWidth={isLast?2.5:1.5} opacity={phase>=3?1:0} style={{transition:"opacity .5s ease "+(0.3+i*0.2)+"s"}}>{isLast&&<animate attributeName="r" values="6;8;6" dur="2.5s" repeatCount="indefinite"/>}</circle><text x={x} y={y-12} textAnchor="middle" fill={isLast?sc:t.t3} fontSize={isLast?"13":"11"} fontWeight={isLast?"800":"600"} opacity={phase>=3?1:0} style={{transition:"opacity .5s ease "+(0.4+i*0.2)+"s"}}>{h.v}</text><text x={x} y="115" textAnchor="middle" fill={t.t4} fontSize="9" fontWeight="500">{h.d}</text></g>);})}
            </svg>
          </div>
          <div style={{ display:"flex",justifyContent:"center",gap:20,padding:"12px 16px 14px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:5 }}><div style={{ width:14,height:2.5,borderRadius:2,background:sc }}/><span style={{ fontSize:9,color:t.t3,fontWeight:600 }}>EVA™ Age</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:5 }}><div style={{ width:14,height:0,borderTop:"1.5px dashed "+t.gold,opacity:0.6 }}/><span style={{ fontSize:9,color:t.t3,fontWeight:600 }}>Actual Age ({chron})</span></div>
          </div>
        </div>

        {/* PACE OF AGING */}
        <div style={{ padding:"16px 24px 0",opacity:phase>=3?1:0,transform:phase>=3?"translateY(0)":"translateY(20px)",transition:"all .8s ease .1s" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8 }}>
            <span style={{ fontSize:10,fontWeight:700,color:t.t3,letterSpacing:2 }}>PACE OF AGING</span>
            <span style={{ fontSize:22,fontWeight:800,color:sc }}>{pace}x</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ fontSize:9,color:t.t4 }}>Slow</span>
            <div style={{ flex:1,position:"relative",height:5,borderRadius:3,background:t.s2 }}>
              <div style={{ position:"absolute",left:0,top:0,height:"100%",borderRadius:3,width:phase>=3?pacePos+"%":"0%",background:`linear-gradient(90deg,${sc},${t.cyan})`,transition:"width 2s cubic-bezier(.25,.1,.25,1) .3s" }}/>
              <div style={{ position:"absolute",top:-4,left:phase>=3?pacePos+"%":"0%",transform:"translateX(-50%)",width:13,height:13,borderRadius:"50%",background:sc,border:"2.5px solid "+t.bg,boxShadow:"0 0 8px "+sc+"50",transition:"left 2s cubic-bezier(.25,.1,.25,1) .3s" }}/>
            </div>
            <span style={{ fontSize:9,color:t.t4 }}>Fast</span>
          </div>
        </div>

        {/* POWERED BY YOUR BLOOD */}
        <div style={{ background:t.s1,borderRadius:14,border:"1px solid "+t.b1,padding:"14px 12px",margin:"16px 24px 14px",opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .3s" }}>
          <div style={{ fontSize:10,fontWeight:700,color:t.t3,letterSpacing:2,marginBottom:12 }}>POWERED BY YOUR BLOOD</div>
          {mks.map((m,i)=>{
            const bc=m.s==="optimal"?sc:t.gold;
            const isOpen=openMarker===i;
            return(<div key={i} style={{ marginBottom:i<5?4:0 }}><div onClick={()=>setOpenMarker(isOpen?null:i)} style={{ cursor:"pointer",padding:"6px 0" }}><div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3 }}><div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:12,fontWeight:600,color:t.t1 }}>{m.n}</span><span style={{ fontSize:10,color:t.t3 }}>{m.lb}</span></div><div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:9,fontWeight:600,color:bc,textTransform:"uppercase" }}>{m.s}</span><svg width="10" height="10" viewBox="0 0 10 10" style={{transform:isOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}><path d="M2 3.5l3 3 3-3" stroke={t.t3} strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg></div></div><div style={{ height:3,borderRadius:2,background:t.s2 }}><div style={{ height:"100%",borderRadius:2,background:bc,width:phase>=4?m.pct+"%":"0%",transition:"width 1.5s cubic-bezier(.25,.1,.25,1) "+(0.5+i*0.1)+"s" }}/></div></div>{isOpen&&<div style={{ padding:"8px 0",fontSize:12,color:t.t2,lineHeight:1.7,borderBottom:"1px solid "+t.b1 }}>{m.info}</div>}</div>);
          })}
        </div>

        {/* HOW IT WORKS */}
        <div style={{ padding:"0 24px" }}>
          <Card style={{ marginBottom:14,opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .45s" }}>
            <div style={{ fontSize:15,fontWeight:700,color:t.t1,marginBottom:8 }}>How EVA™ Calculates This</div>
            <div style={{ fontSize:13,color:t.t2,lineHeight:1.8 }}>Your EVA™ Age comes directly from your blood — not a wearable estimate. We use the Klemera–Doubal Method, trained on the NHANES dataset, combining markers from metabolism, inflammation, cardiovascular health, and organ function.</div>
          </Card>
          <VideoCard title="The Biological Age Reality Check" duration="0:40"/>
          <Card style={{ marginBottom:14,opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .6s" }}>
            <div style={{ fontSize:15,fontWeight:700,color:t.t1,marginBottom:12 }}>EVA™ vs. Wearable Ages</div>
            <div style={{ display:"flex",gap:10 }}>
              <div style={{ flex:1,background:t.s2,borderRadius:12,padding:14 }}>
                <div style={{ fontSize:11,fontWeight:700,color:t.t3,letterSpacing:1,marginBottom:6 }}>WEARABLES</div>
                <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>Surface signals — sleep, heart rate, steps. Helpful but short-term noise.</div>
              </div>
              <div style={{ flex:1,background:sc+"08",borderRadius:12,padding:14,border:"1px solid "+sc+"18" }}>
                <div style={{ fontSize:11,fontWeight:700,color:sc,letterSpacing:1,marginBottom:6 }}>EVA™ AGE</div>
                <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>70+ internal blood markers. True long-term health trajectory.</div>
              </div>
            </div>
          </Card>
          <Card style={{ marginBottom:14,opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .75s" }}>
            <div style={{ fontSize:15,fontWeight:700,color:t.t1,marginBottom:12 }}>Why It Matters</div>
            <div style={{ background:sc+"08",borderRadius:12,padding:14,marginBottom:10,border:"1px solid "+sc+"15" }}>
              <div style={{ fontSize:13,fontWeight:700,color:sc,marginBottom:4 }}>Younger than actual age</div>
              <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>Your body is performing like someone {diff} years younger. Strong foundation for long-term health.</div>
            </div>
            <div style={{ background:t.red+"08",borderRadius:12,padding:14,border:"1px solid "+t.red+"15" }}>
              <div style={{ fontSize:13,fontWeight:700,color:t.red,marginBottom:4 }}>Older than actual age</div>
              <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>Added physiological stress — but an opportunity to intervene. Exactly what EVA™ addresses.</div>
            </div>
          </Card>
          <VideoCard title="Biological Age vs. Chronological Age" duration="0:55"/>
          <div style={{ fontSize:11,color:t.t3,textAlign:"center",lineHeight:1.6,fontStyle:"italic",paddingBottom:20 }}>EVA™ Age is a directional signal, not a diagnosis.</div>
        </div>
      </div>
    </div>
  );
};

const RetestScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/><Label color={t.gold}>Re-Evaluation Due</Label>
      <Title sub="90 days since your last panel.">Time to re-test.</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card>
          <div style={{ fontSize:11,color:t.t3,marginBottom:14,letterSpacing:2,fontWeight:700 }}>YOUR PROGRESS</div>
          {/* Improvement Summary */}
            <Card style={{ background:`${t.emerald}06`,border:`1px solid ${t.emerald}18`,marginBottom:12,padding:14 }}>
              <div style={{ fontSize:11,fontWeight:700,color:t.emerald,letterSpacing:1,marginBottom:8 }}>IMPROVED</div>
              {[{m:"Vitamin D",from:"18",to:"32",u:"ng/mL",d:"Protocol: 4,000 IU D3 + K2"},{m:"Magnesium",from:"4.2",to:"4.8",u:"mEq/L",d:"Protocol: 600mg Glycinate"}].map((x,i)=>(
                <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:i>0?`1px solid ${t.emerald}15`:"none" }}>
                  <span style={{ fontSize:14,fontWeight:500,color:t.t1 }}>{x.m}</span>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <span style={{ fontSize:13,color:t.t3 }}>{x.from}</span>
                    <span style={{ fontSize:12,color:t.emerald }}>→</span>
                    <span style={{ fontSize:14,fontWeight:700,color:t.emerald }}>{x.to} {x.u}</span>
                  </div>
                </div>
              ))}
            </Card>
            <Card style={{ background:`${t.gold}06`,border:`1px solid ${t.gold}18`,marginBottom:12,padding:14 }}>
              <div style={{ fontSize:11,fontWeight:700,color:t.gold,letterSpacing:1,marginBottom:8 }}>STILL WORKING ON</div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0" }}>
                <span style={{ fontSize:14,fontWeight:500,color:t.t1 }}>hs-CRP</span>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <span style={{ fontSize:13,color:t.t3 }}>2.8</span>
                  <span style={{ fontSize:12,color:t.gold }}>→</span>
                  <span style={{ fontSize:14,fontWeight:700,color:t.gold }}>1.4 mg/L</span>
                </div>
              </div>
              <div style={{ fontSize:12,color:t.t3,marginTop:4 }}>Target: &lt;1.0 · Protocol adjusted: Omega-3 dose increased, curcumin added</div>
            </Card>
            <div style={{ fontSize:11,fontWeight:700,color:t.t3,letterSpacing:2,marginBottom:10,marginTop:16 }}>KEY MARKERS TO COMPARE</div>
            {[{l:"Vitamin D",f:"18 ng/mL",to:"40+ ng/mL",dir:"up"},{l:"Magnesium",f:"4.2 mEq/L",to:"4.5+ mEq/L",dir:"up"},{l:"hs-CRP",f:"2.8 mg/L",to:"<1.0 mg/L",dir:"down"}].map((r,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderTop:i>0?`1px solid ${t.bg}`:"none" }}>
              <span style={{ fontSize:14,color:t.t1,flex:1,fontWeight:500 }}>{r.l}</span><span style={{ fontSize:14,fontWeight:600,color:t.red }}>{r.f}</span><span style={{ fontSize:12,color:t.t4,margin:"0 6px" }}>{r.dir==="down"?<svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{verticalAlign:"middle"}}><path d="M5 2v6M5 8L2.5 5.5M5 8l2.5-2.5" stroke={t.emerald} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>:<svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{verticalAlign:"middle"}}><path d="M5 8V2M5 2L2.5 4.5M5 2l2.5 2.5" stroke={t.emerald} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</span><span style={{ fontSize:14,fontWeight:600,color:t.emerald }}>{r.to}</span>
            </div>
          ))}
        </Card>
      </div>
      <div style={{ flexShrink:0,paddingBottom:8 }}><Btn onClick={()=>onNavigate("book-test")}>Book Re-Test</Btn><div onClick={onBack} style={{ textAlign:"center",fontSize:14,color:t.t3,marginTop:12,cursor:"pointer" }}>Remind me later</div></div>
    </div>
  );
};

// ══════════════════════════════════════════
// NAVIGATION & MAIN APP
// ══════════════════════════════════════════


const DNAReportScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <Title>DNA Analysis Report</Title>
        <div style={{ display:"flex",gap:10 }}>
          <div onClick={()=>toast.show("Downloading report...","info")} style={{ width:36,height:36,borderRadius:10,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M8 10l-3-3M8 10l3-3M3 14h10" stroke={t.t1} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div onClick={()=>toast.show("Share link copied!","success")} style={{ width:36,height:36,borderRadius:10,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="12" cy="4" r="2" stroke={t.t1} strokeWidth="1.3"/><circle cx="4" cy="8" r="2" stroke={t.t1} strokeWidth="1.3"/><circle cx="12" cy="12" r="2" stroke={t.t1} strokeWidth="1.3"/><path d="M6 7l4-2M6 9l4 2" stroke={t.t1} strokeWidth="1.3"/></svg>
          </div>
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card style={{ padding:22,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14 }}>
            <div><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>PATIENT</div><div style={{ fontSize:16,fontWeight:600,color:t.t1,marginTop:4 }}>Daniel Salewski</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>DATE</div><div style={{ fontSize:16,fontWeight:600,color:t.t1,marginTop:4 }}>28 Feb 2025</div></div>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between" }}>
            <div><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>PROVIDER</div><div style={{ fontSize:14,fontWeight:500,color:t.t2,marginTop:4 }}>OmicsEdge Genomics</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:12,color:t.t3,fontWeight:600,letterSpacing:1 }}>VARIANTS</div><div style={{ fontSize:14,fontWeight:500,color:t.t2,marginTop:4 }}>5 clinically significant</div></div>
          </div>
        </Card>
        <Label>Significant Variants</Label>
        {[
          {gene:"MTHFR",variant:"C677T Heterozygous",impact:"Reduced folate metabolism",risk:"medium",action:"Methylated B-Complex added to protocol"},
          {gene:"TRPM6",variant:"rs11144134",impact:"Reduced magnesium absorption",risk:"medium",action:"Higher Mg dosage + glycinate form prescribed"},
          {gene:"VDR",variant:"FokI polymorphism",impact:"Vitamin D receptor efficiency reduced",risk:"medium",action:"4,000 IU D3 protocol (higher than standard)"},
          {gene:"APOE",variant:"ε3/ε3",impact:"Standard cardiovascular risk profile",risk:"low",action:"No additional intervention required"},
          {gene:"CYP1A2",variant:"Fast metaboliser",impact:"Rapid caffeine clearance",risk:"low",action:"No caffeine restriction needed"},
        ].map((g,i)=>(
          <Card key={i} style={{ padding:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ fontSize:16,fontWeight:700,color:t.purple }}>{g.gene}</div>
                <div style={{ fontSize:12,color:t.t3 }}>{g.variant}</div>
              </div>
              <div style={{ fontSize:11,fontWeight:600,color:g.risk==="low"?t.emerald:t.gold,background:g.risk==="low"?`${t.emerald}12`:`${t.gold}12`,padding:"5px 10px",borderRadius:4 }}>{g.risk==="low"?"LOW":"MODERATE"}</div>
            </div>
            <div style={{ fontSize:14,fontWeight:500,color:t.t1,marginBottom:4 }}>{g.impact}</div>
            <div style={{ fontSize:13,color:t.t2 }}>{g.action}</div>
          </Card>
        ))}
        <div style={{ textAlign:"center",padding:"20px 0",fontSize:13,color:t.t4 }}>Full report: 24 pages · PDF available for download</div>
      </div>
    </div>
  );
};

const SubscriptionScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  const [showCancel, setShowCancel] = useState(false);
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Manage your EVA™ membership.">Subscription</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card style={{ background:`${t.purple}06`,border:`1.5px solid ${t.purple}20`,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:t.purple,letterSpacing:1,marginBottom:4 }}>ACTIVE PLAN</div>
              <div style={{ fontSize:20,fontWeight:700,color:t.t1 }}>Core Package</div>
            </div>
            <div style={{ background:t.emerald,borderRadius:8,padding:"7px 15px",fontSize:12,fontWeight:700,color:"#FFF",letterSpacing:.5 }}>ACTIVE</div>
          </div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6 }}>DNA + Blood Panel + Clinician Review + Supplement Protocol + DEVA™ Daily Insights</div>
        </Card>
        <Label>Supplement Subscription</Label>
        <Card>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10 }}>
            <span style={{ fontSize:16,fontWeight:600,color:t.t1 }}>Monthly Supplements</span>
            <span style={{ fontSize:18,fontWeight:700,color:t.t1 }}>USD 199<span style={{ fontSize:12,color:t.t3,fontWeight:500 }}>/mo</span></span>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3,marginBottom:4 }}><span>Next renewal</span><span style={{ color:t.t1,fontWeight:500 }}>15 April 2025</span></div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3,marginBottom:4 }}><span>Payment method</span><span style={{ color:t.t1,fontWeight:500 }}>•••• 4242</span></div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3 }}><span>Member since</span><span style={{ color:t.t1,fontWeight:500 }}>February 2025</span></div>
        </Card>
        <Label>Payment History</Label>
        {[{d:"15 Mar 2025",a:"USD 199",s:"Supplements",st:"Paid"},{d:"15 Feb 2025",a:"USD 199",s:"Supplements",st:"Paid"},{d:"4 Feb 2025",a:"USD 1,999",s:"Elite Core",st:"Paid"}].map((p,i)=>(
          <Card key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:14 }}>
            <div><div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{p.s}</div><div style={{ fontSize:12,color:t.t3,marginTop:2 }}>{p.d}</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{p.a}</div><div style={{ fontSize:11,color:t.emerald,fontWeight:600,marginTop:2 }}>{p.st}</div></div>
          </Card>
        ))}
        <div style={{ marginTop:16 }}>
          <Btn variant="secondary" onClick={()=>toast.show("Payment method updated","success")}>Update Payment Method</Btn>
          <div onClick={()=>setShowCancel(true)} style={{ textAlign:"center",padding:"16px 0",cursor:"pointer" }}><span style={{ fontSize:13,color:t.red,fontWeight:500 }}>Cancel Subscription</span></div>
        {showCancel&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div onClick={()=>setShowCancel(false)} style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(2px)"}}/><div style={{background:t.s1,borderRadius:20,padding:24,maxWidth:320,width:"100%",position:"relative",border:`1px solid ${t.b1}`,boxShadow:"0 16px 48px rgba(0,0,0,.2)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:17,fontWeight:700,color:t.t1}}>Cancel Subscription?</div><div onClick={()=>setShowCancel(false)} style={{width:32,height:32,borderRadius:16,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg></div></div><div style={{fontSize:14,color:t.t2,lineHeight:1.8,marginBottom:20}}>You will lose access to Daily DEVA insights, personalised protocols, clinician oversight, and wearable adjustments. Your data and reports remain accessible. Takes effect at end of billing period.</div><Btn onClick={()=>{setShowCancel(false);toast.show("Subscription cancelled.","success")}} style={{width:"100%",marginBottom:10}}>Confirm Cancellation</Btn><Btn variant="secondary" onClick={()=>setShowCancel(false)} style={{width:"100%"}}>Keep Subscription</Btn></div></div>}
        </div>
      </div>
    </div>
  );
};


const ReportViewerScreen = ({ onNavigate, onBack, subTarget, clearSubTarget }) => {
  const t = useTheme();
  const toast = useToast();
  const [rTab, setRTab] = useState(subTarget==="dna"?"dna":"blood");
  useEffect(()=>{if(subTarget){setRTab(subTarget);clearSubTarget?.()}},[subTarget]);
  const bloodReports = [{n:"Cardiovascular Health",f:"EVA_Blood_Cardiovascular.pdf",d:"4 Feb 2025"},{n:"Blood Sugar & Metabolism",f:"EVA_Blood_Metabolic.pdf",d:"4 Feb 2025"},{n:"Inflammation & Liver",f:"EVA_Blood_Inflammation.pdf",d:"4 Feb 2025"},{n:"Nutrition & Vitamins",f:"EVA_Blood_Nutrition.pdf",d:"4 Feb 2025"},{n:"Hormones",f:"EVA_Blood_Hormones.pdf",d:"4 Feb 2025"},{n:"Kidney & Electrolytes",f:"EVA_Blood_Kidney.pdf",d:"4 Feb 2025"}];
  const dnaReports = [{n:"Methylation Pathway",f:"EVA_DNA_Methylation.pdf"},{n:"Diet & Macronutrient Response",f:"EVA_DNA_Diet.pdf"},{n:"Food Sensitivities",f:"EVA_DNA_Sensitivities.pdf"},{n:"Cardiovascular Risk",f:"EVA_DNA_Cardiovascular.pdf"},{n:"Metabolic Risk",f:"EVA_DNA_Metabolic.pdf"},{n:"Cancer Risk Panel",f:"EVA_DNA_Cancer.pdf"},{n:"Neurological Risk",f:"EVA_DNA_Neurological.pdf"},{n:"Nutrigenomics",f:"EVA_DNA_Nutrigenomics.pdf"},{n:"Detoxification Pathways",f:"EVA_DNA_Detox.pdf"},{n:"Inflammation Genetics",f:"EVA_DNA_Inflammation.pdf"},{n:"Hormone Metabolism",f:"EVA_DNA_Hormones.pdf"},{n:"Sleep & Circadian",f:"EVA_DNA_Sleep.pdf"},{n:"Athletic Performance",f:"EVA_DNA_Athletic.pdf"},{n:"Skin & Ageing",f:"EVA_DNA_Skin.pdf"}];
  const reports = rTab==="blood"?bloodReports:dnaReports;
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Download your full reports as PDF.">My Reports</Title>
      <div style={{ display:"flex",gap:6,marginBottom:16,background:t.s2,borderRadius:10,padding:3 }}>
        {[{id:"blood",l:"Blood Reports"},{id:"dna",l:"DNA Reports"}].map(tb=>(
          <div key={tb.id} onClick={()=>setRTab(tb.id)} style={{ flex:1,background:rTab===tb.id?t.bg:"transparent",borderRadius:8,padding:"10px 0",textAlign:"center",cursor:"pointer",transition:"all .2s",boxShadow:rTab===tb.id?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
            <div style={{ fontSize:13,fontWeight:600,color:rTab===tb.id?t.t1:t.t3 }}>{tb.l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        {reports.map((r,i)=>(
          <div key={i} onClick={()=>toast.show(`Downloading ${r.f}`,"success")} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:t.s1,borderRadius:12,border:`1px solid ${t.b1}`,marginBottom:8,cursor:"pointer",transition:"all .15s" }}>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:`${t.purple}08`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke={t.purple} strokeWidth="1.3"/><path d="M5 7h6M5 10h4" stroke={t.purple} strokeWidth="1" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{r.n}</div>
                <div style={{ fontSize:11,color:t.t3,marginTop:2 }}>{r.f}</div>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke={t.purple} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ))}
        <div onClick={()=>toast.show("Downloading all reports as ZIP","success")} style={{ marginTop:12,padding:"14px 0",textAlign:"center",border:`1.5px solid ${t.purple}`,borderRadius:12,cursor:"pointer" }}>
          <span style={{ fontSize:14,fontWeight:600,color:t.purple }}>Download All {rTab==="blood"?"Blood":"DNA"} Reports</span>
        </div>
      </div>
    </div>
  );
};


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


const SupplementDetailScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:20 }}>
        <div style={{ width:52,height:52,borderRadius:16,background:`${t.purple}10`,border:`1.5px solid ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center" }}><PillIcon size={28}/></div>
        <div><div style={{ fontSize:22,fontWeight:700,color:t.t1 }}>Magnesium Glycinate</div><div style={{ fontSize:14,color:t.t3,marginTop:2 }}>SKU: 52438 · Capsule</div></div>
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        <div style={{ display:"flex",gap:10,marginBottom:16 }}>
          {[{l:"Dose",v:"600mg",c:t.purple},{l:"Frequency",v:"Evening",c:t.cyan},{l:"With",v:"Dinner",c:t.emerald}].map(d=>(
            <div key={d.l} style={{ flex:1,background:t.s1,borderRadius:10,padding:"15px 8px",textAlign:"center",border:`1px solid ${t.b1}` }}>
              <div style={{ fontSize:17,fontWeight:700,color:d.c }}>{d.v}</div>
              <div style={{ fontSize:10,color:t.t3,marginTop:6,fontWeight:600,letterSpacing:.3 }}>{d.l}</div>
            </div>
          ))}
        </div>
        <Card style={{ background:"#F59E0B08",border:"1.5px solid #F59E0B20",marginBottom:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.3"/><path d="M8 4v5l3 2" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <div style={{ fontSize:12,fontWeight:700,color:"#F59E0B",letterSpacing:.5 }}>WEARABLE ADJUSTMENT ACTIVE</div>
          </div>
          <div style={{ fontSize:13,color:t.t2,lineHeight:1.5 }}>+200mg added due to HRV drop. Day 2 of 7. Base dose: 400mg.</div>
        </Card>
        <Label>Why This Supplement</Label>
        <Card>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.7 }}>Your RBC magnesium is 4.2 mEq/L (optimal: 4.5–5.5). Your TRPM6 gene variant (rs11144134) indicates reduced magnesium absorption efficiency, requiring the glycinate form for maximum bioavailability. Magnesium supports recovery, sleep quality, cardiovascular function, and over 300 enzymatic reactions.</div>
        </Card>
        <Label>Biological Targets</Label>
        {[{m:"Magnesium (RBC)",f:"4.2 mEq/L",tgt:"4.8 mEq/L",by:"Next re-test"},{m:"Deep Sleep",f:"Variable",tgt:"Improvement within 14 days",by:"Wearable tracking"}].map((tg,i)=>(
          <Card key={i} style={{ padding:14 }}>
            <div style={{ fontSize:14,fontWeight:600,color:t.t1,marginBottom:4 }}>{tg.m}</div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3 }}><span>Current: <span style={{ color:t.gold,fontWeight:600 }}>{tg.f}</span></span><span>Target: <span style={{ color:t.emerald,fontWeight:600 }}>{tg.tgt}</span></span></div>
            <div style={{ fontSize:12,color:t.t4,marginTop:4 }}>{tg.by}</div>
          </Card>
        ))}
        <Label>Adherence</Label>
        <Card>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8 }}>
            <span style={{ fontSize:14,fontWeight:600,color:t.t1 }}>Last 30 days</span>
            <span style={{ fontSize:18,fontWeight:700,color:t.emerald }}>87%</span>
          </div>
          <div style={{ height:6,background:t.bg,borderRadius:3 }}><div style={{ width:"87%",height:"100%",background:t.emerald,borderRadius:3 }}/></div>
          <div style={{ fontSize:12,color:t.t3,marginTop:6 }}>26 of 30 days taken · Excellent consistency</div>
        </Card>
        <Label>Interactions</Label>
        <Card style={{ padding:14 }}>
          <div style={{ fontSize:13,color:t.t2,lineHeight:1.6 }}>• Take 2+ hours apart from iron supplements (reduces absorption)<br/>• Safe to combine with all other EVA™ protocol supplements<br/>• Glycinate form is gentle on the stomach — no food timing restriction required</div>
        </Card>
      </div>
    </div>
  );
};


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

const SCREENS = {
  // ── Launch ──
  splash:{C:SplashScreen,j:"Launch",n:"Splash"},
  // ── Guest ──
  welcome:{C:WelcomeScreen,j:"Guest",n:"Welcome"},
  learn:{C:LearnScreen,j:"Guest",n:"Learn More"},
  // ── Auth ──
  signin:{C:SignInScreen,j:"Auth",n:"Sign In"},
  "otp-verify":{C:OTPVerifyScreen,j:"Auth",n:"Verify OTP"},
  "forgot-password":{C:ForgotPasswordScreen,j:"Auth",n:"Forgot Password"},
  "biometric-prompt":{C:BiometricPromptScreen,j:"Auth",n:"Biometric Setup"},
  "welcome-back":{C:WelcomeBackScreen,j:"Auth",n:"Welcome Back"},
  // ── Onboarding ──
  "book-test":{C:BookTestScreen,j:"Onboarding",n:"Book Biology Test"},
  "create-account":{C:CreateAccountScreen,j:"Onboarding",n:"Create Account"},
  "email-verify":{C:EmailVerifyScreen,j:"Onboarding",n:"Verify Email"},
  terms:{C:TermsScreen,j:"Onboarding",n:"Informed Consent"},
  questionnaire:{C:QuestionnaireScreen,j:"Onboarding",n:"Questionnaire"},
  fanfare:{C:FanfareScreen,j:"Onboarding",n:"All Set"},
  waiting:{C:WaitingScreen,j:"Onboarding",n:"Waiting Period"},
  results:{C:ResultsWowScreen,j:"Onboarding",n:"Results Reveal"},
  // ── Daily DEVA™ ──
  today:{C:TodayScreen,j:"Daily DEVA™",n:"Today"},
  "deva-insight":{C:DEVAInsightScreen,j:"Daily DEVA™",n:"DEVA™ Insight"},
  "supplement-detail":{C:SupplementDetailScreen,j:"Daily DEVA™",n:"Supplement Detail"},
  notifications:{C:NotificationCentreScreen,j:"Daily DEVA™",n:"Notifications"},
  protocol:{C:ProtocolScreen,j:"Daily DEVA™",n:"Protocol"},
  "eva-age":{C:BioAgeScreen,j:"Daily DEVA™",n:"EVA™ Age"},
  retest:{C:RetestScreen,j:"Daily DEVA™",n:"Re-Evaluation"},
  "deva-action":{C:DEVAActionScreen,j:"Daily DEVA™",n:"DEVA™ Action"},
  // ── Tabs ──
  "results-tab":{C:ResultsTabScreen,j:"Tabs",n:"My Biology"},
  "safety-demo":{C:({onBack,onNavigate})=><SafetyGateAlert level="red" marker="hs-CRP" value="22.4 mg/L" threshold="Critical: > 20.0 mg/L" onBook={()=>onNavigate("today")} onDismiss={()=>onNavigate("today")}/>,j:"Tabs",n:"Safety Gate (Demo)"},
  profile:{C:ProfileScreen,j:"Tabs",n:"Profile"},
  "dna-report":{C:(props)=><ReportViewerScreen {...props} subTarget="dna"/>,j:"Tabs",n:"DNA Reports"},
  subscription:{C:SubscriptionScreen,j:"Tabs",n:"Subscription"},
  "report-viewer":{C:ReportViewerScreen,j:"Tabs",n:"Report Viewer"},
  "clinician-chat":{C:EVAIChatScreen,j:"Tabs",n:"EV.AI™ Chat"},
};

// ══════════════════════════════════════════
// IA MAP DATA
// ══════════════════════════════════════════
const JOURNEYS = [
  { key:"Launch", color:"#64748B", screens:["splash"], flow:"Splash (2.2s) → Welcome",
    notes:"App entry. Animated EVA™ logo with gradient pulse. BioIntel tagline. Auto-advances after 2.2 seconds." },
  { key:"Guest", color:"#00EFE3", screens:["welcome","learn"], flow:"Welcome → Get Started / Learn More / Sign In",
    notes:"First-time visitor. Three-pillar icons (DNA/Blood/Supplements). Get Started routes to Create Account. Learn More opens 5 educational cards with in-app browser." },
  { key:"Auth", color:"#DDB76A", screens:["signin","otp-verify","forgot-password","biometric-prompt","welcome-back"], flow:"Sign In → OTP → Biometric Setup → Welcome Back → Today",
    notes:"Returning user authentication. Email/password + Apple/Google social login (with processing overlay). 2FA via SMS/email OTP toggle. Biometric prompt. Welcome back auto-advance." },
  { key:"Onboarding", color:"#4623BE", screens:["create-account","email-verify","terms","questionnaire","book-test","fanfare"],
    flow:"Create Account (incl. biological sex) → Verify Email → Terms → Questionnaire (6 steps, gender-gated) → Book Test + Pay → Fanfare → Today",
    notes:"Account created BEFORE payment (attributable). Biological sex captured at signup gates questionnaire step 6 (male: libido, female: menstrual/menopause). Address entry: structured 3-line + GCC country/emirate dropdowns. Profile supports up to 3 delivery addresses with preferred selection. Fanfare celebration then lands on Today with progress card." },
  { key:"Daily DEVA™", color:"#00AD80", screens:["today","deva-insight","supplement-detail","notifications","protocol","retest","waiting","results"],
    flow:"Today (progress card + DEVA™ + protocol) → DEVA™ Insight → Supplement Detail → Protocol → Re-Test",
    notes:"Daily engagement hub. Today shows test progress card (pending/ready/active states), DEVA™ 3×3×3 with section tabs and action checkboxes, morning protocol, stats, clinician message, EV.AI™. Results Reveal triggered from progress banner. Waiting detail accessible from progress card." },
  { key:"Tabs", color:"#00C5F1", screens:["results-tab","safety-demo","profile","subscription","report-viewer","dna-report","clinician-chat"],
    flow:"My Biology | Safety Gate | Profile (15 subs) | Subscription | Reports | EV.AI™ Chat",
    notes:"Tab screens. My Biology with Blood/DNA/Progress tabs and icons. Profile menu: Refer & Earn (top), Account, Privacy, Devices, Support, Appearance (Light/Dark/System segmented), More, Account Actions. 15 interactive sub-screens (incl. My Supplements, Help & FAQ with Video Library, About EVA™, EVA™ Store)." },

];

const SCREEN_META = {

  "deva-action":{ tab:false, desc:"Expanded DEVA™ action detail with protocol supplements, dose info, and deep-link to supplement detail." },
  splash:{ tab:false, desc:"Animated EVA™ logo with gradient pulse, BioIntel tagline, auto-advance 2.2s" },
  welcome:{ tab:false, desc:"Centred logo, three-pillar icons (DNA/Blood/Supplements), Get Started → Create Account, Learn More, Sign In" },
  learn:{ tab:false, desc:"5 swipeable cards: DNA, Blood, Supplements, DEVA™, Clinician-in-the-Loop" },
  signin:{ tab:false, desc:"Email/password with validation + error states, Forgot Password, Apple + Google social login" },
  "otp-verify":{ tab:false, desc:"6-digit OTP, phone number display, Use email instead link, Resend with confirmation, error states" },
  "forgot-password":{ tab:false, desc:"Email entry with validation → Send Reset Link (disabled until valid) → Check Your Email" },
  "biometric-prompt":{ tab:false, desc:"Enable Quick Login — Face ID or fingerprint. Enable Biometrics / Not Now buttons" },
  "welcome-back":{ tab:false, desc:"Daniel avatar with animation, Welcome back message, auto-advances to Today (1.8s)" },
  "book-test":{ tab:false, desc:"3 accordion packages (Elite/Elite Core/Blood Intelligence). Home visit: structured address (GCC countries, country-dependent emirate/area), supplement delivery toggle. Emirates ID (auto-formatted 784-XXXX-XXXXXXX-X) or passport. Month/day/time selectors. Stripe/Apple Pay/Google Pay. Mandatory field validation.",
    subs:["Booking Form","Payment (Apple Pay / Google Pay / Card / Promo Code)","Processing","Booking Confirmed + Add to Calendar"] },
  "create-account":{ tab:false, desc:"Full Name, Email, Phone (50+ countries), Biological Sex (Male/Female — gates questionnaire step 6), Password (live rules with indicators), Apple/Google social signup, PDPL consent checkbox. Button disabled until all valid." },
  "email-verify":{ tab:false, desc:"Check Your Email screen with resend toast, routes to Terms" },
  terms:{ tab:false, desc:"Informed Consent for Blood & DNA Testing (6 sections), mandatory consent checkbox + optional de-identified data opt-in, disabled Continue until agreed" },
  questionnaire:{ tab:false, desc:"6-step questionnaire: Goals, Baseline, Nutrition, Lifestyle, Medical Background, Family & Gender-Specific Health. Step 6 gender-gated: male shows libido questions, female shows menstrual status (incl. perimenopause, post-menopause with follow-up) + hormonal justification text. Progress bar." },
  fanfare:{ tab:false, desc:"Celebration screen: CheckIcon animation, Step 1: Complete your test (check email for fasting instructions) → Step 2: Sample processing (blood ~5 days, DNA ~5 weeks) → Step 3: Protocol activation on Day 7 icons. Start Exploring EVA™ → routes to Today (with progress card)." },
  waiting:{ tab:false, desc:"4 stateful phases: Blood Pending, Blood Ready, DNA Pending, All Ready. Phase selector for demo.",
    subs:["Blood Pending (initial state)","Blood Ready (results in, DNA processing)","DNA Pending (blood protocol active)","All Ready (full profile complete)"] },
  results:{ tab:false, desc:"3 views: Blood Results (bio age ring), DNA Results (5 variants), Combined (full picture). Tab selector for demo.",
    subs:["Blood Results (bio age 34, biomarker summary)","DNA Results (5 gene variants with risk levels)","Combined (70+ biomarkers + 5 variants + 7 protocol items)"] },
  today:{ tab:true, desc:"VideoCards: Welcome to EVA™, Understanding DEVA™, Bio Age Reality Check. Test progress card (pending/ready/active demo states), wearable adjustment card, DEVA™ card (3×3×3 badges + CTA), Morning Protocol card, EVA Age/Streak/Next Test stats, Dr. Nival message, EV.AI™ WhatsApp card. Demo bar for test status simulation." },
  "deva-insight":{ tab:false, desc:"Section-tabbed view: Insights (purple, expandable with deep links + VideoCard on inflammation insight), Actions (gold, checkboxes with completion tracking), Outcomes (emerald, verification methods). Progress counter. Section navigation links." },
  "supplement-detail":{ tab:false, desc:"Full supplement page: SKU, dose/frequency/timing, wearable adjustment card, clinical rationale, biological targets, 87% adherence, interactions" },
  notifications:{ tab:false, desc:"6 typed notifications (deva/protocol/wearable/clinician/retest/system), read/unread states, type icons, timestamps" },
  protocol:{ tab:true, desc:"VideoCards: How Your Protocol Was Built (top), Supplement Quality & Certifications (footer). Shipping card, Morning/Evening tabs, 7 supplements with expandable rationale, ADJUSTED badge, animated completion. Supplement ⓘ modals include per-supplement video.",
    subs:["Morning Protocol (5 supplements)","Evening Protocol (2 supplements)","Expandable clinical rationale per supplement"] },
  retest:{ tab:false, desc:"Improvement summary (Improved + Still Working On cards), 90-day comparison with directional arrows (up/down), 3 key markers, Book Re-Test CTA" },
  "results-tab":{ tab:true, desc:"Blood (VideoCard: Why Our Blood Panel is Superior. 6 systems A–F with main/expanded view, meanings, ranges, EVA actions, gender-specific hormones, per-marker supplement videos on suboptimal markers, Download My Blood Reports button). DNA (VideoCard: How We Read Your DNA. 3 systems: Methylation incl. COMT/Diet & Sensitivities/Disease Risks with variant counts + ApoE stratification, Download My DNA Reports button). Progress (VideoCard: Six Months In. Line charts with targets)",
    subs:["Blood Biomarkers (filterable: All/Optimal/Attention/Action)","DNA Insights (5 gene variants)","Progress (4 biomarker trend charts)","Calculated Metrics (EVA™ Age, HOMA-IR, TG/HDL with InfoModal)"] },
  "safety-demo":{ tab:false, desc:"Red Gate critical alert: hs-CRP 22.4 mg/L. Non-skippable. Call Physician Now button." },
  profile:{ tab:true, desc:"Daniel avatar, 3 stats (EVA™ Age/Tests/Days Active), Refer & Earn (top, purple highlight), Account, Privacy & Notifications, Connected Devices, Support & Data, Appearance (Light/Dark/System segmented control), More, Account Actions. 15 sub-screens incl. My Supplements. Scroll position preserved on back.",
    subs:["My Supplements (supplement stack gallery with product details, morning/evening tabs), Personal Info + Addresses (per-field edit, up to 3 addresses with preferred delivery)","Health Questionnaire (6 fields + Update button)","Notification Preferences (5 toggles with icons)","Subscription (plan, billing, payment history, cancel flow)","Change Password (live rules, match validation, show/hide)","Consent Management (4 toggles with (i) pop-outs, data export)","Connected Devices (8 wearables, Connect/Connecting/Connected flow)","Contact Clinician (Dr. Nival card + EV.AI™ WhatsApp)","Help & FAQ (6-question accordion + EVA™ Video Library with all 13 explainer videos)","Test History (3 tests with status badges, View Report buttons, VideoCards: Phlebotomist Visit + Your Results Are In)","My Reports (Blood + DNA PDF download lists, no markers)","Refer a Friend (code, WhatsApp/SMS/Email share, 3-slot status tracker)","EVA™ Store (Coming Soon)","About EVA™ (logo, certs, version, disclaimer)"] },
  subscription:{ tab:false, desc:"Active plan card, supplement subscription details, payment history (3 items), Update Payment, Cancel with InfoModal confirmation" },
  "report-viewer":{ tab:false, desc:"Unified reports hub. Blood/DNA tab toggle. Blood: patient card, summary stats (optimal/attention/action), 5 key findings, 6 downloadable system reports. DNA: patient card, 6 significant variants with risk badges, 14 downloadable reports. Download All as ZIP." },
  "dna-report":{ tab:false, desc:"Opens unified Report Viewer on DNA tab. OmicsEdge provider, 6 significant variants (MTHFR, COMT, TRPM6, VDR, APOE, CYP1A2), 14 downloadable DNA reports." },
  "clinician-chat":{ tab:false, desc:"EV.AI™ branded chat with Dr. Nival. 5 demo messages, chat bubbles, message input, send button. Phase 2: becomes 5th tab." },
};

// ══// ══════════════════════════════════════════
// IA MAP VIEW
// ══════════════════════════════════════════
const IAMapView = ({ theme, onNavigateToScreen }) => {
  const [focusJourney, setFocusJourney] = useState(null);

  return (
    <div style={{ padding:"28px 36px",maxWidth:1200,margin:"0 auto",overflowY:"auto",maxHeight:"calc(100vh - 80px)" }}>
      {/* Full IA Overview */}
      {!focusJourney && <>
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:11,letterSpacing:2.5,color:theme.cyan,textTransform:"uppercase",fontWeight:700,marginBottom:6 }}>INFORMATION ARCHITECTURE</div>
          <div style={{ fontSize:24,fontWeight:700,color:theme.t1,marginBottom:6 }}>Complete Platform Map</div>
          <div style={{ fontSize:15,color:theme.t2,lineHeight:1.6,maxWidth:600 }}>18 screens across 6 journeys + 20 sub-screens. Tap a journey to explore its flow, or tap any screen to jump to the prototype.</div>
        </div>

        {/* Tab Structure */}
        <div style={{ background:theme.s1,borderRadius:16,padding:20,marginBottom:20,border:`1px solid ${theme.b1}` }}>
          <div style={{ fontSize:11,letterSpacing:2.5,color:theme.gold,textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>BOTTOM TAB NAVIGATION</div>
          <div style={{ display:"flex",gap:12 }}>
            {[{l:"Today",s:"DEVA™ Ritual",c:theme.emerald},{l:"My Biology",s:"Blood + DNA",c:theme.cyan},{l:"Protocol",s:"Supplements",c:theme.purple},{l:"Profile",s:"Settings",c:theme.sky}].map(t=>(
              <div key={t.l} style={{ flex:1,background:theme.s2,borderRadius:12,padding:"17px 13px",textAlign:"center",border:`1px solid ${t.c}15` }}>
                <div style={{ fontSize:15,fontWeight:700,color:theme.t1 }}>{t.l}</div>
                <div style={{ fontSize:12,color:theme.t3,marginTop:3 }}>{t.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Flow Cards */}
        {JOURNEYS.map(j => (
          <div key={j.key} onClick={()=>setFocusJourney(j.key)} style={{ background:theme.s1,borderRadius:16,padding:20,marginBottom:12,border:`1px solid ${j.color}18`,cursor:"pointer",transition:"all .2s" }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
              <div style={{ width:10,height:10,borderRadius:"50%",background:j.color,boxShadow:`0 0 10px ${j.color}40` }}/>
              <div style={{ fontSize:16,fontWeight:700,color:j.color }}>{j.key}</div>
              <div style={{ fontSize:13,color:theme.t3 }}>({j.screens.length} screens)</div>
              <div style={{ marginLeft:"auto",fontSize:12,color:theme.t4,fontWeight:500 }}>Tap to explore →</div>
            </div>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:12 }}>
              {j.screens.map((id,i)=>(
                <div key={id} style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ background:`${j.color}0C`,border:`1px solid ${j.color}20`,borderRadius:8,padding:"9px 15px",fontSize:13,color:theme.t1,fontWeight:500 }}>
                    {SCREENS[id]?.n || id}
                  </div>
                  {i < j.screens.length - 1 && <span style={{ color:theme.t4,fontSize:13 }}>→</span>}
                </div>
              ))}
            </div>
            <div style={{ fontSize:13,color:theme.t3,fontStyle:"italic" }}>{j.flow}</div>
          </div>
        ))}

        {/* Screen Inventory Grid */}
        <div style={{ background:theme.s1,borderRadius:16,padding:20,marginTop:8,border:`1px solid ${theme.b1}` }}>
          <div style={{ fontSize:11,letterSpacing:2.5,color:theme.t3,textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>FULL SCREEN INVENTORY — {Object.keys(SCREENS).length} SCREENS</div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
            {Object.entries(SCREENS).map(([id,s])=>{
              const j = JOURNEYS.find(j=>j.screens?.includes(id)) || JOURNEYS.find(j=>j.key===s.j);
              const c = j?.color || theme.t3;
              const meta = SCREEN_META[id];
              const subCount = meta?.subs?.length || 0;
              return (
                <div key={id} onClick={(e)=>{e.stopPropagation();onNavigateToScreen(id);}} style={{ background:theme.s2,borderRadius:10,padding:"13px 17px",cursor:"pointer",border:`1px solid ${theme.b1}`,transition:"all .15s" }}>
                  <div style={{ fontSize:13,fontWeight:600,color:theme.t1 }}>{s.n}</div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4 }}>
                    <div style={{ fontSize:11,color:c,fontWeight:600 }}>{s.j}</div>
                    <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                      {subCount>0&&<div style={{ fontSize:10,color:theme.gold,fontWeight:600 }}>{subCount} subs</div>}
                      <div style={{ fontSize:10,color:meta?.tab?theme.emerald:theme.t4,fontWeight:600 }}>{meta?.tab?"TAB":"FLOW"}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>}

      {/* Single Journey Deep Dive */}
      {focusJourney && (() => {
        const j = JOURNEYS.find(x=>x.key===focusJourney);
        return <>
          <div onClick={()=>setFocusJourney(null)} style={{ fontSize:14,color:theme.t3,cursor:"pointer",fontWeight:500,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}>
            <ChevronLeft size={14}/> Back to Overview
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:8 }}>
            <div style={{ width:12,height:12,borderRadius:"50%",background:j.color,boxShadow:`0 0 12px ${j.color}40` }}/>
            <div style={{ fontSize:22,fontWeight:700,color:theme.t1 }}>{j.key}</div>
          </div>
          <div style={{ fontSize:15,color:theme.t2,lineHeight:1.6,marginBottom:12,maxWidth:600 }}>{j.notes}</div>
          <div style={{ fontSize:14,color:j.color,fontWeight:600,marginBottom:28,fontStyle:"italic" }}>{j.flow}</div>

          {/* Vertical flow */}
          <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
            {j.screens.map((id,i)=>(
              <div key={id}>
                <div style={{ background:theme.s1,borderRadius:14,border:`1px solid ${j.color}20`,overflow:"hidden" }}>
                  <div onClick={()=>onNavigateToScreen(id)} style={{ padding:18,cursor:"pointer",display:"flex",gap:18 }}>
                    <div style={{ width:42,minHeight:42,borderRadius:12,background:`${j.color}10`,border:`1px solid ${j.color}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <div style={{ fontSize:16,fontWeight:800,color:j.color }}>{i+1}</div>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                        <div style={{ fontSize:16,fontWeight:700,color:theme.t1 }}>{SCREENS[id]?.n}</div>
                        <div style={{ fontSize:11,fontWeight:600,color:SCREEN_META[id]?.tab?theme.emerald:theme.t4,background:SCREEN_META[id]?.tab?`${theme.emerald}12`:theme.s2,padding:"4px 9px",borderRadius:4 }}>{SCREEN_META[id]?.tab?"TAB BAR":"FLOW"}</div>
                      </div>
                      <div style={{ fontSize:12,color:theme.purple,fontWeight:500,marginBottom:4 }}>Screen ID: {id}</div>
                      <div style={{ fontSize:13,color:theme.t2,lineHeight:1.5 }}>{SCREEN_META[id]?.desc}</div>
                    </div>
                    <div style={{ fontSize:12,color:theme.t4,fontWeight:500,flexShrink:0,alignSelf:"center" }}>Open →</div>
                  </div>
                  {SCREEN_META[id]?.subs && (
                    <div style={{ padding:"0 18px 14px 76px" }}>
                      <div style={{ fontSize:11,letterSpacing:2,color:theme.t3,fontWeight:700,marginBottom:8 }}>SUB-SCREENS</div>
                      {SCREEN_META[id].subs.map((sub,si)=>(
                        <div key={si} onClick={()=>onNavigateToScreen(id)} style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 15px",background:theme.s2,borderRadius:8,marginBottom:12,cursor:"pointer",border:`1px solid ${theme.b1}` }}>
                          <div style={{ width:6,height:6,borderRadius:"50%",background:`${j.color}60` }}/>
                          <div style={{ fontSize:13,color:theme.t2,fontWeight:500 }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {i < j.screens.length - 1 && (
                  <div style={{ display:"flex",justifyContent:"center",padding:"4px 0" }}>
                    <div style={{ width:2,height:20,background:`${j.color}25`,borderRadius:1 }}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>;
      })()}
    </div>
  );
};

// ══════════════════════════════════════════
// DESIGN TOKENS VIEW
// ══════════════════════════════════════════
const TokensView = ({ theme, isDark }) => {
  const brandColors = [
    { name:"purple",hex:"#4623BE",use:"Primary brand, CTAs, active states" },
    { name:"violet",hex:"#9717CC",use:"Gradient midpoint, secondary accent" },
    { name:"cyan",hex:"#00EFE3",use:"Dark mode accent, data highlights" },
    { name:"emerald",hex:"#00AD80",use:"Success, optimal biomarkers" },
    { name:"gold",hex:"#DDB76A",use:"Attention/warning states" },
    { name:"red",hex:"#EF4444",use:"Action-required, errors" },
    { name:"deepTeal",hex:"#002B38",use:"Secondary brand" },
    { name:"sky",hex:"#00C5F1",use:"Light mode accent" },
    { name:"ice",hex:"#CCFCF9",use:"Subtle highlights" },
    { name:"taupe",hex:"#9B7E7C",use:"Neutral accent" },
  ];
  const surfacesDark = [
    { tok:"bg",hex:"#060A12" },{ tok:"surface1",hex:"#0D1117" },{ tok:"surface2",hex:"#151B28" },
    { tok:"surface3",hex:"#1C2333" },{ tok:"border1",hex:"#1E2A3A" },{ tok:"border2",hex:"#2A3548" },
    { tok:"text1",hex:"#F1F5F9" },{ tok:"text2",hex:"#94A3B8" },{ tok:"text3",hex:"#64748B" },{ tok:"text4",hex:"#3E4C5E" },
  ];
  const surfacesLight = [
    { tok:"bg",hex:"#FFFFFF" },{ tok:"surface1",hex:"#F8FAFE" },{ tok:"surface2",hex:"#EFF3F9" },
    { tok:"surface3",hex:"#E5EAF2" },{ tok:"border1",hex:"#E0E5ED" },{ tok:"border2",hex:"#CDD4DE" },
    { tok:"text1",hex:"#0F172A" },{ tok:"text2",hex:"#475569" },{ tok:"text3",hex:"#94A3B8" },{ tok:"text4",hex:"#CBD5E1" },
  ];
  const typo = [
    { el:"Hero Display",sz:"34px",wt:"800",tr:"-0.8px" },
    { el:"Screen Title",sz:"22px",wt:"700",tr:"-0.3px" },
    { el:"Card Title",sz:"16px",wt:"700",tr:"0" },
    { el:"Body Text",sz:"13px",wt:"400–500",tr:"0" },
    { el:"Section Label",sz:"9.5px",wt:"700",tr:"2.5px" },
    { el:"Tab Label",sz:"8.5px",wt:"600",tr:"0.5px" },
    { el:"Button",sz:"14px",wt:"600",tr:"0.2px" },
    { el:"Status Badge",sz:"8.5px",wt:"600",tr:"1px" },
  ];
  const spacing = [
    { el:"Screen padding",v:"24px horiz, 20px top" },
    { el:"Card padding",v:"18px" },
    { el:"Card radius",v:"16px" },
    { el:"Button radius",v:"14px" },
    { el:"Input radius",v:"12px" },
    { el:"Card gap",v:"12px" },
    { el:"Badge radius",v:"4px" },
  ];

  const Swatch = ({ hex, label, sub }) => (
    <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:6 }}>
      <div style={{ width:32,height:32,borderRadius:8,background:hex,border:`1px solid ${theme.b1}`,flexShrink:0 }}/>
      <div>
        <div style={{ fontSize:13,fontWeight:600,color:theme.t1 }}>{label || hex}</div>
        {sub && <div style={{ fontSize:11,color:theme.t3 }}>{sub}</div>}
      </div>
      <div style={{ marginLeft:"auto",fontSize:12,color:theme.t3,fontFamily:"monospace" }}>{hex}</div>
    </div>
  );

  return (
    <div style={{ padding:"28px 36px",maxWidth:1200,margin:"0 auto",overflowY:"auto",maxHeight:"calc(100vh - 80px)" }}>
      <div style={{ fontSize:11,letterSpacing:2.5,color:theme.purple,textTransform:"uppercase",fontWeight:700,marginBottom:6 }}>DESIGN TOKENS</div>
      <div style={{ fontSize:24,fontWeight:700,color:theme.t1,marginBottom:6 }}>Visual System Reference</div>
      <div style={{ fontSize:15,color:theme.t2,lineHeight:1.6,marginBottom:28,maxWidth:600 }}>From Brand Guidelines v8.0. Every colour, weight, and spacing value used across all 15 screens.</div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
        {/* Brand Palette */}
        <div style={{ background:theme.s1,borderRadius:16,padding:20,border:`1px solid ${theme.b1}` }}>
          <div style={{ fontSize:11,letterSpacing:2.5,color:theme.cyan,textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>BRAND PALETTE</div>
          {brandColors.map(c => <Swatch key={c.name} hex={c.hex} label={c.name} sub={c.use} />)}
          <div style={{ marginTop:14,height:32,borderRadius:10,background:"linear-gradient(135deg, #4623BE 0%, #9717CC 40%, #00EFE3 100%)" }}/>
          <div style={{ fontSize:11,color:theme.t3,marginTop:6 }}>Brand gradient: #4623BE → #9717CC → #00EFE3</div>
        </div>

        {/* Surfaces */}
        <div style={{ background:theme.s1,borderRadius:16,padding:20,border:`1px solid ${theme.b1}` }}>
          <div style={{ fontSize:11,letterSpacing:2.5,color:theme.gold,textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>
            {isDark ? "DARK MODE SURFACES" : "LIGHT MODE SURFACES"} (active)
          </div>
          {(isDark ? surfacesDark : surfacesLight).map(s => <Swatch key={s.tok} hex={s.hex} label={s.tok} />)}
        </div>

        {/* Typography */}
        <div style={{ background:theme.s1,borderRadius:16,padding:20,border:`1px solid ${theme.b1}` }}>
          <div style={{ fontSize:11,letterSpacing:2.5,color:"#9717CC",textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>TYPOGRAPHY</div>
          <div style={{ fontSize:13,color:theme.t2,marginBottom:14 }}>Gilroy (Plus Jakarta Sans fallback)</div>
          {typo.map(t => (
            <div key={t.el} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${theme.b1}` }}>
              <div style={{ fontSize:13,fontWeight:600,color:theme.t1 }}>{t.el}</div>
              <div style={{ display:"flex",gap:14 }}>
                <div style={{ fontSize:12,color:theme.t3 }}>{t.sz}</div>
                <div style={{ fontSize:12,color:theme.t3 }}>w{t.wt}</div>
                <div style={{ fontSize:12,color:theme.t3 }}>{t.tr}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Spacing & Radii */}
        <div style={{ background:theme.s1,borderRadius:16,padding:20,border:`1px solid ${theme.b1}` }}>
          <div style={{ fontSize:11,letterSpacing:2.5,color:theme.emerald,textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>SPACING & RADII</div>
          {spacing.map(s => (
            <div key={s.el} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${theme.b1}` }}>
              <div style={{ fontSize:13,fontWeight:500,color:theme.t1 }}>{s.el}</div>
              <div style={{ fontSize:13,color:theme.cyan,fontWeight:600 }}>{s.v}</div>
            </div>
          ))}
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:11,letterSpacing:2.5,color:theme.emerald,textTransform:"uppercase",fontWeight:700,marginBottom:10 }}>COMPONENTS</div>
            {["Btn (primary / secondary / ghost / muted)","Card (surface1, 16px radius, optional glow)","TabBar (4 tabs, cyan active, bottom-fixed)","TopBar (back + right content)","Label (9.5px, uppercase, 2.5px tracking)","Title (22px w700 + optional subtitle)","Pill (toggle selector, purple active)"].map(c=>(
              <div key={c} style={{ fontSize:10.5,color:theme.t2,padding:"4px 0",lineHeight:1.5 }}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════
// User Flow View — Process Flow Diagram
// ══════════════════════════════════════════
const UserFlowView = ({ theme, onNavigateToScreen }) => {
  const t = theme;
  const [activeNode, setActiveNode] = useState(null);
  const canvasRef = useRef(null);

  const CW = 1398, CH = 1564;

  const regions = [
    { id:"signup",     name:"SIGNUP FLOW",              x:6,   y:6,   w:246, h:396, c:t.emerald },
    { id:"login",      name:"LOGIN FLOW",               x:262, y:6,   w:514, h:520, c:t.purple },
    { id:"signal",     name:"DAILY SIGNAL CYCLE",       x:842, y:6,   w:524, h:210, c:t.gold },
    { id:"review",     name:"6-MONTH REVIEW CYCLE",     x:6,   y:550, w:1208,h:516, c:t.cyan },
    { id:"supplement", name:"MONTHLY SUPPLEMENT CYCLE",  x:6,   y:1106, w:504, h:396, c:t.purple },
    { id:"admin",      name:"ADMIN INTERVENTION",       x:622, y:1106, w:266, h:148, c:t.red },
    { id:"profflow",   name:"PROFILE SETTINGS",          x:920, y:1106, w:470, h:396, c:t.sky },
  ];

  // Node: {id, x, y, w, t, type, screen?, desc}
  // type: process | decision | event | detail | external
  const nodes = [
    // ── SIGNUP (region x:8 y:8 w:255 h:310) ──
    {id:"s1", x:24,y:40, w:210,t:"Signup",              type:"process", screen:"welcome",       desc:"User taps Get Started."},
    {id:"s2", x:24,y:102, w:210,t:"Welcome intro",       type:"process", screen:"learn",          desc:"Swipeable pillar cards: DNA, Blood, Supplements, DEVA™, Clinician."},
    {id:"s3", x:24,y:164,w:210,t:"Personal details",    type:"process", screen:"create-account", desc:"Name, email, phone (50+ countries), biological sex (male/female), password with live rules. Gender gates questionnaire step 6 and blood results hormones."},
    {id:"s4", x:24,y:226,w:210,t:"Consent",             type:"process", screen:"terms",          desc:"Informed consent — 6 sections + optional de-identified data opt-in."},
    {id:"s5", x:24,y:288,w:210,t:"Signup complete",     type:"process", screen:"fanfare",        desc:"Celebration screen. Account created."},
    {id:"se1",x:24,y:350,w:210,t:"Signup successful event",type:"event",                         desc:"Account created. On next visit, user enters Login flow."},

    // ── LOGIN (region x:272 y:8 w:470 h:420) ──
    {id:"l1", x:280,y:40, w:220,t:"Login (Email & Password)",type:"process",screen:"signin",     desc:"Email + password, social auth (Google/Apple), forgot password."},
    {id:"l1f",x:528,y:40, w:230,t:"Invalid credentials event",type:"event",                      desc:"Wrong email/password — error shown."},
    {id:"l2", x:280,y:102, w:220,t:"2-Factor authentication",type:"decision",screen:"otp-verify", desc:"Mobile OTP if enabled."},
    {id:"l2v",x:528,y:102, w:230,t:"OTP validation event",type:"event",screen:"otp-verify",       desc:"Code validated."},
    {id:"l3", x:280,y:164,w:220,t:"Check for subscription",type:"decision",                      desc:"Routes: subscribed → home, not subscribed → questionnaire."},
    {id:"l4", x:528,y:164,w:230,t:"Home page (no review)",type:"process",screen:"today",         desc:"Today screen — step X of Y + pre-review signal."},
    {id:"l4d",x:528,y:102,w:230,t:"Pre-results: progress tracker, waiting tips, no DEVA™",type:"detail",desc:"Before results arrive: onboarding progress (blood: ~5 days, DNA: ~5 weeks), preparation tips, no daily signal yet. DEVA™ activates after first clinician review."},
    {id:"l5", x:528,y:226,w:230,t:"Home page (review done)",type:"process",screen:"today",       desc:"Today screen — daily signal, next review date, context."},
    {id:"l5d",x:528,y:288,w:230,t:"Shows: review date, signal, context",type:"detail",           desc:"Active user home page state after clinician review."},
    {id:"l6", x:280,y:226,w:220,t:"Health questionnaire",type:"process",screen:"questionnaire",  desc:"6-step assessment. Step 1: primary goal + additional goals multi-select. Step 4: GLP-1 (Ozempic/Mounjaro/Retatrutide), Testosterone (TRT). Step 5: Diabetes + Alzheimer’s in family history. Step 6 gender-gated: male → libido, female → menstrual (cycle day 1–28, last period, years post-menopause, libido)."},
    {id:"l7", x:280,y:288,w:220,t:"Subscription & pay",type:"process",screen:"book-test",        desc:"3 accordion packages (Elite/Elite Core/Blood Intelligence). Home visit: structured address (GCC countries, country-dependent emirate/area), supplement delivery toggle. Emirates ID (auto-formatted) or passport number. Calendar + payment."},
    {id:"l7s",x:528,y:350,w:230,t:"Payment successful event",type:"event",                       desc:"Payment confirmed. Begins onboarding."},
    {id:"l7f",x:528,y:412,w:230,t:"Payment failed event",type:"event",                           desc:"Declined — retry."},
    {id:"l8", x:280,y:350,w:220,t:"Start review",type:"process",screen:"waiting",          desc:"Initiates 6-month review cycle."},
    {id:"l9", x:280,y:412,w:220,t:"Appointments",type:"process",screen:"book-test",           desc:"Upcoming and past appointments."},
    {id:"l10",x:528,y:474,w:230,t:"My plan",type:"process",screen:"protocol",                    desc:"Current supplement protocol."},

    // ── DAILY SIGNAL (region x:752 y:8 w:440 h:230) ──
    {id:"d1", x:860,y:40, w:260,t:"Daily signal event", type:"event",                            desc:"DEVA™ engine evaluates all active triggers."},
    {id:"d2", x:860,y:102, w:260,t:"Daily health card (EVA™ Age)",type:"process",screen:"deva-insight",desc:"3 insights · 3 actions · 3 outcomes. Bio-age display."},
    {id:"d3", x:860,y:164,w:260,t:"Daily signal generator",type:"process",                       desc:"Priority scoring, 14-day rotation, 7 trigger domains, goal modifiers."},
    {id:"d4", x:1148,y:102,w:200,t:"Update current plan",type:"detail",                           desc:"Feeds protocol and wearable-adjusted doses."},
    {id:"d5", x:1148,y:164,w:200,t:"My plan",type:"process",screen:"protocol",                   desc:"Full supplement protocol with timing."},

    // ── 6-MONTH REVIEW (region x:8 y:440 w:1184 h:400) ──
    {id:"r1", x:24, y:642,w:190,t:"Re-book blood test",  type:"process",screen:"book-test",       desc:"6-month re-test booking. Same book-test screen, re-entry for returning users."},
    {id:"r2", x:24, y:704,w:190,t:"Select slot",        type:"process",                          desc:"Calendar date and time."},
    {id:"r3", x:24, y:766,w:190,t:"Confirm booking",    type:"process",                          desc:"Review and confirm."},
    {id:"r4", x:24, y:828,w:190,t:"Create appointment", type:"process",                          desc:"Appointment in system."},
    {id:"r4e",x:242,y:828,w:220,t:"Appointment created event",type:"event",                      desc:"Triggers Unilab API call."},
    {id:"r5", x:242,y:766,w:220,t:"Waiting for sample", type:"process",screen:"waiting",         desc:"Pending blood draw."},
    {id:"r5c",x:242,y:704,w:220,t:"Call Unilab API",    type:"process",                          desc:"System retrieves status."},
    {id:"r5e",x:490,y:766,w:200,t:"Sample collected (Unilab)",type:"event",                      desc:"Lab confirms received."},
    {id:"r6", x:490,y:704,w:200,t:"First review?",      type:"decision",                         desc:"First → blood only. Subsequent → blood + DNA."},
    {id:"r7a",x:490,y:642,w:200,t:"Wait for blood report",type:"process",screen:"waiting",       desc:"~2 business days."},
    {id:"r7b",x:718,y:642,w:240,t:"Wait for DNA + blood",type:"process",screen:"waiting",        desc:"DNA ~4 weeks."},
    {id:"r7c",x:490,y:580,w:200,t:"Report from Unilab", type:"external",                         desc:"Blood panel results."},
    {id:"r7d",x:718,y:580,w:240,t:"Report from SelfDecode",type:"external",                      desc:"DNA results. (OmicsEdge — confirm with Daniel.)"},
    {id:"r7f",x:986,y:580,w:210,t:"Failed to receive report",type:"event",                       desc:"Error — admin notified."},
    {id:"r8", x:718,y:704,w:240,t:"Reports received",   type:"event",                            desc:"All reports arrived."},
    {id:"r9", x:718,y:766,w:240,t:"Run recommendation engine",type:"process",screen:"results",   desc:"Safety gates → optimisation → protocol."},
    {id:"r10",x:986,y:704,w:210,t:"Calculate EVA™ Age", type:"process",screen:"eva-age",         desc:"Klemera-Doubal method, 6 markers, NHANES."},
    {id:"r11",x:986,y:766,w:210,t:"Run safety gates",   type:"process",screen:"safety-demo",     desc:"Red (critical) / Orange (urgent) checks."},
    {id:"r11e",x:986,y:828,w:210,t:"Safety gates triggered",type:"event",                        desc:"Physician booking enabled."},
    {id:"r12",x:718,y:828,w:240,t:"Generate supplement plan",type:"process",screen:"protocol",    desc:"Trigger tables, 12 SKUs, goal modifiers."},
    {id:"r12e",x:490,y:890,w:200,t:"Protocol generated event",type:"event",                      desc:"Ready for clinician review."},
    {id:"r13",x:24, y:952,w:190,t:"Book review appointment",type:"process",screen:"book-test",   desc:"Clinician reviews results."},
    {id:"r14",x:272, y:952,w:220,t:"Reminder event",     type:"event",                            desc:"Push notification."},
    {id:"r15",x:24,y:1014,w:190,t:"Is subscribed?",     type:"decision",screen:"subscription",   desc:"Check for re-test."},
    {id:"r16",x:272,y:1014,w:220,t:"6-month timer",      type:"event",screen:"retest",            desc:"Re-test reminder at ~90 days."},

    // ── MONTHLY SUPPLEMENT (region x:8 y:860 w:570 h:320) ──
    {id:"m1", x:272,y:1140,w:220,t:"Monthly timer",      type:"event",                            desc:"Auto-triggers order."},
    {id:"m2", x:272,y:1202,w:220,t:"Generate monthly order",type:"process",                       desc:"Based on active protocol."},
    {id:"m2e",x:272,y:1264,w:220,t:"Order generation event",type:"event",                         desc:"Queued for fulfilment."},
    {id:"m3", x:272,y:1326,w:220,t:"Is subscribed?",    type:"decision",screen:"subscription",   desc:"Check subscription."},
    {id:"m4", x:24, y:1202,w:220,t:"Order fulfilment",   type:"process",                          desc:"Warehouse picks & packs."},
    {id:"m4e",x:24, y:1140,w:220,t:"Order dispatch event",type:"event",                           desc:"Courier dispatched."},
    {id:"m5", x:24, y:1264,w:220,t:"Order dispatched",   type:"process",                          desc:"In transit."},
    {id:"m6", x:24, y:1326,w:220,t:"Delivery to client",type:"process",                          desc:"Delivered."},
    {id:"m6e",x:24, y:1388,w:220,t:"Order delivery event",type:"event",                          desc:"Delivery confirmed."},
    {id:"m7", x:272,y:1388,w:220,t:"Early reorder event", type:"event",                          desc:"System triggers early reorder based on usage patterns or low inventory."},
    {id:"m8", x:24, y:1450,w:220,t:"Low inventory event",type:"event",                           desc:"Triggers early reorder."},

    // ── ADMIN (region x:600 y:860 w:300 h:180) ──
    {id:"a1", x:640,y:1140,w:230,t:"Manual override",    type:"decision",                         desc:"Admin/clinician flags for review."},
    {id:"a2", x:640,y:1202,w:230,t:"Admin intervention",  type:"process",                          desc:"Manual action on protocol, alert, or order."},
    // Profile Settings nodes
    {id:"p1", x:938,y:1140,w:210,t:"Profile hub",         type:"process",screen:"profile",          desc:"Avatar, stats, menu. Entry to all settings."},
    {id:"p2", x:938,y:1202,w:210,t:"Personal info",       type:"process",screen:"profile",          desc:"Name, email, phone, DOB, gender, addresses (up to 3)."},
    {id:"p3", x:938,y:1264,w:210,t:"Health questionnaire", type:"process",screen:"profile",         desc:"Update goals, lifestyle, medical background."},
    {id:"p4", x:938,y:1326,w:210,t:"Notifications",       type:"process",screen:"profile",          desc:"DEVA™, supplement, re-test, clinician, marketing toggles."},
    {id:"p5", x:938,y:1388,w:210,t:"Consent & privacy",   type:"process",screen:"profile",          desc:"Consent toggles, data export, PDPL controls."},
    {id:"p6", x:1166,y:1140,w:210,t:"Subscription",       type:"process",screen:"subscription",     desc:"Plan, billing, payment history, cancel."},
    {id:"p7", x:1166,y:1202,w:210,t:"Connected devices",  type:"process",screen:"profile",          desc:"Wearable integrations (8 devices)."},
    {id:"p8", x:1166,y:1264,w:210,t:"Contact clinician",  type:"process",screen:"clinician-chat",   desc:"Dr. Nival card + EV.AI™ chat."},
    {id:"p9", x:1166,y:1326,w:210,t:"Reports & history",  type:"process",screen:"profile",          desc:"Test history, blood + DNA report PDFs."},
    {id:"p10",x:1166,y:1388,w:210,t:"Refer a friend",     type:"process",screen:"profile",          desc:"Referral code, share, status tracker."},

    // Signal sub-screens
    ["d3","d6"],["d6","d7"],
  ];

  // ── Arrows: [from, to, exitDir?, entryDir?] ──
  const arrows = [
    // Signup internal
    ["s1","s2"],["s2","s3"],["s3","s4"],["s4","s5"],["s5","se1"],
    // Signup → Login (cross — R→L through gap x:257)
    ["se1","l1","R","L"],
    // Login internal
    ["l1","l2"],["l1","l1f"],["l2","l2v"],["l2","l3"],
    ["l3","l4"],["l3","l6"],["l4","l4d"],["l4","l5"],["l5","l5d"],
    ["l6","l7"],["l7","l7s"],["l7","l7f"],["l7","l8"],
    ["l8","l9"],["l9","l10","D","U"],
    // Login → Review (cross — L→U, drop through signup-login gap)
    ["l8","r1","L","U"],
    // Login → Signal (cross — R→L, home-done triggers daily signal)
    ["l5","d1","R","L"],
    
    // Daily Signal internal
    ["d1","d2"],["d2","d3"],["d2","d4"],["d4","d5"],["d3","d5"],
    // 6-Month Review internal
    ["r1","r2"],["r2","r3"],["r3","r4"],["r4","r4e"],
    ["r4e","r5"],["r5","r5c"],["r5","r5e"],
    ["r5c","r6"],["r6","r7a"],["r6","r7b"],
    ["r7c","r7a"],["r7d","r7b"],["r7b","r7f"],
    ["r8","r9"],["r9","r10"],["r9","r11"],
    ["r11","r11e"],["r9","r12"],["r12","r12e"],
    ["r13","r14"],["r14","r15","D","U"],["r15","r16"],
    // Review → Supplement (cross)
    ["r16","m1"],
    // Review → Admin (cross — D→U through gap y:984)
    ["r11e","a1","D","U"],
    // Supplement internal
    ["m1","m2"],["m2","m2e"],["m2","m4"],
    ["m4","m4e"],["m4","m5"],["m5","m6"],["m6","m6e"],
    ["m2e","m3"],["m3","m7"],
    ["m6e","m8"],["m8","m7"],
    // Admin internal
    ["a1","a2"],
    // Admin → Supplement (cross)
    ["a2","m2"],
    // Profile Settings internal
    ["p1","p2"],["p1","p6"],
    ["p2","p3"],["p3","p4"],["p4","p5"],
    ["p6","p7"],["p7","p8"],["p8","p9"],["p9","p10"],
  ];

  const NH = 34;
  const nMap = {}; nodes.forEach(n => nMap[n.id] = n);

  const nCx = n => n.x + n.w / 2;
  const nCy = n => n.y + NH / 2;

  const autoDir = (f, to) => {
    const dx = nCx(to) - nCx(f), dy = nCy(to) - nCy(f);
    if (Math.abs(dy) > Math.abs(dx)) return dy > 0 ? ["D","U"] : ["U","D"];
    return dx > 0 ? ["R","L"] : ["L","R"];
  };

  const getRegion = (n) => regions.find(r => n.x >= r.x && n.x < r.x + r.w && n.y >= r.y && n.y < r.y + r.h);
  const isCross = (f, to) => { const rf = getRegion(f), rt = getRegion(to); return rf && rt && rf.id !== rt.id; };

  // ── Port distribution: resolve directions, then space arrows along each edge ──
  const resolved = arrows.map(([fId, tId, eD, nD]) => {
    const f = nMap[fId], to = nMap[tId];
    if (!f || !to) return null;
    const [ed, nd] = eD && nD ? [eD, nD] : autoDir(f, to);
    return { fId, tId, ed, nd, f, to };
  }).filter(Boolean);

  const edgePorts = {};
  resolved.forEach((a, i) => {
    const ek = `${a.fId}::${a.ed}`;
    const nk = `${a.tId}::${a.nd}`;
    if (!edgePorts[ek]) edgePorts[ek] = [];
    if (!edgePorts[nk]) edgePorts[nk] = [];
    edgePorts[ek].push({ i, otherId: a.tId, exit: true });
    edgePorts[nk].push({ i, otherId: a.fId, exit: false });
  });

  const PAD = 8;
  const portXY = {};
  Object.entries(edgePorts).forEach(([key, conns]) => {
    const [nodeId, dir] = key.split("::");
    const n = nMap[nodeId];
    if (!n) return;
    // Sort by other node's perpendicular position to minimise crossings
    if (dir === "U" || dir === "D") {
      conns.sort((a, b) => nCx(nMap[a.otherId]) - nCx(nMap[b.otherId]));
    } else {
      conns.sort((a, b) => nCy(nMap[a.otherId]) - nCy(nMap[b.otherId]));
    }
    const cnt = conns.length;
    conns.forEach((c, slot) => {
      let px, py;
      if (dir === "U" || dir === "D") {
        py = dir === "U" ? n.y : n.y + NH;
        const span = n.w - 2 * PAD;
        px = n.x + PAD + (cnt === 1 ? span / 2 : slot * span / (cnt - 1));
      } else {
        px = dir === "L" ? n.x : n.x + n.w;
        const span = NH - 2 * PAD;
        py = n.y + PAD + (cnt === 1 ? span / 2 : slot * span / (cnt - 1));
      }
      // Store [x, y, slot, count] for staggered channel offsets
      portXY[`${c.i}::${c.exit ? "e" : "n"}`] = [Math.round(px), Math.round(py), slot, cnt];
    });
  });

  const G = 16; // clearance gap from node edges
  const buildPath = (idx) => {
    const a = resolved[idx];
    if (!a) return null;
    const ep = portXY[`${idx}::e`], np = portXY[`${idx}::n`];
    if (!ep || !np) return null;
    const [sx, sy, eSlot, eCnt] = ep, [ex, ey] = np;

    // ── Priority 1: Force straight line for aligned nodes ──
    const fcx = nCx(a.f), tcx = nCx(a.to), fcy = nCy(a.f), tcy = nCy(a.to);
    if (Math.abs(fcx - tcx) < 3) {
      // Same centre x → straight vertical between nearest edges
      const [top, bot] = a.f.y < a.to.y ? [a.f, a.to] : [a.to, a.f];
      return `M${fcx} ${top.y + NH}L${tcx} ${bot.y}`;
    }
    if (Math.abs(fcy - tcy) < 3) {
      // Same centre y → straight horizontal between nearest edges
      const [lft, rgt] = a.f.x < a.to.x ? [a.f, a.to] : [a.to, a.f];
      return `M${lft.x + lft.w} ${fcy}L${rgt.x} ${tcy}`;
    }

    // ── Priority 2: Port-based routing with staggered offsets ──
    // Straight vertical (ports aligned)
    if (Math.abs(sx - ex) < 3 && Math.abs(sy - ey) > 1) return `M${sx} ${sy}L${ex} ${ey}`;
    // Straight horizontal (ports aligned)
    if (Math.abs(sy - ey) < 3 && Math.abs(sx - ex) > 1) return `M${sx} ${sy}L${ex} ${ey}`;

    // Tighter turns: single exit = G/2, multi = staggered
    const gOff = eCnt > 1 ? G * (eSlot + 1) / eCnt : G / 2;
    const eH = a.ed === "R" || a.ed === "L";
    const nH = a.nd === "R" || a.nd === "L";

    if (eH && nH) {
      const tx = sx + (a.ed === "R" ? gOff : -gOff);
      return `M${sx} ${sy}L${tx} ${sy}L${tx} ${ey}L${ex} ${ey}`;
    }
    if (!eH && !nH) {
      const my = (sy + ey) / 2;
      return `M${sx} ${sy}L${sx} ${my}L${ex} ${my}L${ex} ${ey}`;
    }
    // Perpendicular: tight 8px turn on exit side
    if (eH && !nH) {
      const pOff = 8;
      const tx = sx + (a.ed === "R" ? pOff : -pOff);
      const ty = ey + (a.nd === "U" ? -G : G);
      return `M${sx} ${sy}L${tx} ${sy}L${tx} ${ty}L${ex} ${ty}L${ex} ${ey}`;
    }
    const pOff = 8;
    const ty = sy + (a.ed === "D" ? pOff : -pOff);
    const tx = ex + (a.nd === "L" ? -G : G);
    return `M${sx} ${sy}L${sx} ${ty}L${tx} ${ty}L${tx} ${ey}L${ex} ${ey}`;
  }

  const handleClick = (e, node) => {
    e.stopPropagation();
    setActiveNode(activeNode?.id === node.id ? null : node);
  };

  // ── Node colors with solid contrast ──
  const nColor = (type) => ({
    process:  { bg:`${t.emerald}15`, bdr:t.emerald },
    decision: { bg:`${t.purple}15`,  bdr:t.purple },
    event:    { bg:`${t.gold}15`,    bdr:t.gold },
    detail:   { bg:t.s2,            bdr:t.b2 },
    external: { bg:`${t.red}10`,     bdr:`${t.red}80` },
  }[type] || { bg:t.s2, bdr:t.b2 });

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:t.bg}}>
      {/* Header */}
      <div style={{padding:"20px 36px 0",flexShrink:0}}>
        <div style={{fontSize:22,fontWeight:700,color:t.t1,letterSpacing:-.3}}>EVA™ Platform User Flow</div>
        <div style={{fontSize:13,color:t.t3,marginTop:4,marginBottom:14}}>Tap any node for details and screen navigation. Scroll to explore.</div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:14,padding:"10px 16px",background:t.s1,borderRadius:10,border:`1px solid ${t.b1}`}}>
          {[["Process step",t.emerald,8],["Decision point",t.purple,4],["System event",t.gold,17],["Details box",t.b2,6],["External factor",t.red,6]].map(([label,c,r])=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:16,height:11,borderRadius:r,background:`${c}15`,border:`1px ${label==="Details box"?"dashed":"solid"} ${c}${label==="Details box"?"":"60"}`}}/>
              <span style={{fontSize:11,color:t.t2,fontWeight:500}}>{label}</span>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:16,height:0,borderTop:`2px dashed ${t.emerald}`}}/>
            <span style={{fontSize:11,color:t.t2,fontWeight:500}}>Cross-section</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={canvasRef} onClick={()=>setActiveNode(null)} style={{flex:1,overflow:"auto",position:"relative"}}>
        <div style={{position:"relative",width:CW,height:CH,margin:"0 36px 36px"}}>

          {/* Region backgrounds */}
          {regions.map(r=>(
            <div key={r.id} style={{position:"absolute",left:r.x,top:r.y,width:r.w,height:r.h,borderRadius:14,background:`${r.c}05`,border:`1.5px solid ${r.c}20`}}>
              <div style={{padding:"7px 14px",fontSize:9,fontWeight:700,letterSpacing:2.5,color:r.c,opacity:0.65,textTransform:"uppercase"}}>{r.name}</div>
            </div>
          ))}

          {/* SVG arrows */}
          <svg style={{position:"absolute",left:0,top:0,width:CW,height:CH,pointerEvents:"none",overflow:"visible"}}>
            <defs>
              <marker id="ufa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M1 1.5L8.5 5L1 8.5" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="ufa-cross" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1 1.5L8.5 5L1 8.5" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>
            {resolved.map((a, i) => {
              const d = buildPath(i);
              if (!d) return null;
              const cross = isCross(a.f, a.to);
              return <path key={i} d={d} fill="none"
                stroke={cross ? t.emerald : `${t.t3}50`}
                strokeWidth={cross ? 2 : 1.2}
                strokeDasharray={cross ? "6 4" : ""}
                markerEnd={cross ? "url(#ufa-cross)" : "url(#ufa)"}
                strokeLinejoin="round"
              />;
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(n => {
            const nc = nColor(n.type);
            const isAct = activeNode?.id === n.id;
            return (
              <div key={n.id} onClick={e=>handleClick(e,n)} style={{
                position:"absolute", left:n.x, top:n.y, width:n.w, height:NH,
                display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                padding:"0 12px", boxSizing:"border-box",
                borderRadius: n.type==="event" ? NH/2 : n.type==="decision" ? 6 : 10,
                background: isAct ? `${nc.bdr}25` : nc.bg,
                border: `${isAct?2:1}px ${n.type==="detail"?"dashed":"solid"} ${isAct?nc.bdr:`${nc.bdr}60`}`,
                fontSize:11, fontWeight:500, color:t.t1, cursor:"pointer",
                transition:"all .12s", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                ...(n.type==="external" ? {background:`repeating-linear-gradient(45deg,${t.red}06,${t.red}06 3px,${t.red}14 3px,${t.red}14 6px)`} : {}),
              }}>
                {n.type==="decision" && <svg width="10" height="10" style={{flexShrink:0}}><polygon points="5,0.5 9.5,5 5,9.5 0.5,5" fill={`${t.purple}20`} stroke={t.purple} strokeWidth="1"/></svg>}
                <span style={{overflow:"hidden",textOverflow:"ellipsis"}}>{n.t}</span>
                {n.screen && <span style={{fontSize:9,color:t.emerald,fontWeight:700,flexShrink:0}}>→</span>}
              </div>
            );
          })}

          {/* Popover */}
          {activeNode && (() => {
            const n = activeNode;
            const nc = nColor(n.type);
            const rok=n.x+n.w+280<CW;const px=rok?n.x+n.w+12:Math.max(n.x-274,10);const py=Math.min(Math.max(n.y,10),CH-220);
            return (
              <div onClick={e=>e.stopPropagation()} style={{position:"absolute",left:px,top:py,zIndex:50,width:260,background:t.bg,border:`1.5px solid ${t.b2}`,borderRadius:14,padding:18,boxShadow:`0 10px 40px ${t.t1}15`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:6,background:nc.bg,border:`1px solid ${nc.bdr}50`,color:t.t1}}>{n.type}</div>
                  <div onClick={()=>setActiveNode(null)} style={{fontSize:16,color:t.t4,cursor:"pointer",padding:"0 4px"}}>×</div>
                </div>
                <div style={{fontSize:14,fontWeight:600,color:t.t1,marginBottom:6,lineHeight:1.4}}>{n.t}</div>
                <div style={{fontSize:12,color:t.t2,lineHeight:1.7,marginBottom:14}}>{n.desc}</div>
                {n.screen ? (
                  <div onClick={()=>{onNavigateToScreen(n.screen);setActiveNode(null);}} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 18px",borderRadius:10,background:`${t.emerald}12`,border:`1px solid ${t.emerald}35`,fontSize:12,fontWeight:600,color:t.emerald,cursor:"pointer"}}>Go to screen →</div>
                ) : (
                  <div style={{fontSize:11,color:t.t4,fontStyle:"italic"}}>Backend process — no prototype screen</div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Footer */}
        <div style={{margin:"0 36px 36px",padding:14,background:t.s1,borderRadius:12,border:`1px solid ${t.b1}`,fontSize:12,color:t.t3,lineHeight:1.6}}>
          EVA™ platform user flow · v10.11.37 · 7 sections · {nodes.length} nodes · {arrows.length} connections
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════
// MAIN APP — v10.11.37 with IA Map + Tokens + Prototype
// ══════════════════════════════════════════
export default function EVAPrototype() {
  const [view, setView] = useState("prototype"); // "ia" | "tokens" | "flow" | "prototype"
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState([]);
  const [anim, setAnim] = useState("none");
  const [isDark, setIsDark] = useState(false);
  const [profileSection, setProfileSection] = useState(null);
  const [navOpen, setNavOpen] = useState(new Set(["Guest","Auth","Onboarding","Daily DEVA™","Tabs","v103"]));
  const [subTarget, setSubTarget] = useState(null);
  const [gender, setGender] = useState("male");
  const theme = isDark ? themes.dark : themes.light;

  const nav = useCallback(target => {
    if (target === "profile" && screen !== "profile") setProfileSection(null);
    setAnim("out");
    setHistory(h => [...h, screen]);
    setTimeout(() => { setScreen(target); setAnim("in"); setTimeout(() => setAnim("none"), 300); }, 180);
  }, [screen]);

  const back = useCallback(() => {
    if (!history.length) return;
    setAnim("outB");
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setTimeout(() => { setScreen(prev); setAnim("inB"); setTimeout(() => setAnim("none"), 300); }, 180);
  }, [history]);

  const jumpToScreen = (id) => {
    setView("prototype");
    setHistory(h => [...h, screen]);
    setAnim("out");
    setTimeout(() => { setScreen(id); setAnim("in"); setTimeout(() => setAnim("none"), 300); }, 180);
  };

  const cur = SCREENS[screen];
  const Comp = cur?.C;
  const jColor = cur?.j==="Guest"?theme.cyan:cur?.j==="Onboarding"?theme.purple:cur?.j==="Daily DEVA™"?theme.emerald:cur?.j==="Tabs"?theme.sky:theme.t3;
  const as = { none:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(-30px)",transition:"all .18s"},in:{opacity:1,transform:"translateX(0)",transition:"all .3s cubic-bezier(.2,0,0,1)"},outB:{opacity:0,transform:"translateX(30px)",transition:"all .18s"},inB:{opacity:1,transform:"translateX(0)",transition:"all .3s cubic-bezier(.2,0,0,1)"} };

  return (
    <ThemeCtx.Provider value={theme}>
    <ToastProvider>
      <div style={{ fontFamily:FONT,background:theme.shellBg,minHeight:"100vh",display:"flex",flexDirection:"column",transition:"background .4s" }}>
        <style>{CSS}</style>

        {/* ── Top Bar with View Toggle ── */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"19px 36px",borderBottom:`1px solid ${theme.b1}`,background:theme.bg,flexShrink:0 }}>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <EVALogo width={52} color={theme.purple} />
            <div>
              <div style={{ fontSize:16,fontWeight:700,color:theme.t1 }}>EVA™ Platform</div>
              <div style={{ fontSize:12,color:theme.t3 }}>v10.11.37 — Architecture + Prototype</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            {[{id:"ia",l:"IA Map"},{id:"tokens",l:"Tokens"},{id:"flow",l:"User Flow"},{id:"prototype",l:"Prototype"}].map(v=>(
              <div key={v.id} onClick={()=>setView(v.id)} style={{ background:view===v.id?theme.purple:"transparent",border:`1.5px solid ${view===v.id?theme.purple:theme.b2}`,borderRadius:10,padding:"10px 22px",fontSize:14,fontWeight:600,color:view===v.id?"#FFF":theme.t3,cursor:"pointer",transition:"all .2s" }}>{v.l}</div>
            ))}
            <div style={{ width:1,height:24,background:theme.b1,margin:"0 8px" }}/>
            <div onClick={()=>setIsDark(!isDark)} style={{ fontSize:12,color:theme.t3,cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:28,height:16,borderRadius:8,background:isDark?theme.purple:theme.b2,padding:1,transition:"all .3s" }}>
                <div style={{ width:14,height:14,borderRadius:"50%",background:"#FFF",transition:"all .3s",transform:isDark?"translateX(12px)":"translateX(0)" }}/>
              </div>
              {isDark ? "Dark" : "Light"}
            </div>
          </div>
        </div>

        {/* ── Content Area ── */}
        <div style={{ flex:1,overflow:"hidden" }}>

          {/* IA MAP VIEW */}
          {view === "ia" && <IAMapView theme={theme} onNavigateToScreen={jumpToScreen} />}

          {/* TOKENS VIEW */}
          {view === "tokens" && <TokensView theme={theme} isDark={isDark} />}

          {/* USER FLOW VIEW */}
          {view === "flow" && <UserFlowView theme={theme} onNavigateToScreen={jumpToScreen} />}

          {/* PROTOTYPE VIEW */}
          {view === "prototype" && (
            <div style={{ display:"flex",justifyContent:"center",alignItems:"center",padding:24,gap:36,minHeight:"calc(100vh - 60px)" }}>
              {/* Side Nav */}
              <div style={{ width:220,flexShrink:0,maxHeight:740,display:"flex",flexDirection:"column" }}>
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:15,fontWeight:700,color:theme.t1 }}>Screen Navigator</div>
                  <div style={{ fontSize:12,color:theme.t3,marginTop:2 }}>{Object.keys(SCREENS).length} screens • {isDark?"Dark":"Light"} mode</div>
                </div>
                <div style={{ flex:1,overflowY:"auto" }}>
                  {JOURNEYS.map(j=>{
                    const jScreens = Object.entries(SCREENS).filter(([_,v])=>v.j===j.key);
                    const isOpen = navOpen.has(j.key);
                    return (
                    <div key={j.key} style={{ marginBottom:4 }}>
                      <div onClick={()=>setNavOpen(s=>{const n=new Set(s);n.has(j.key)?n.delete(j.key):n.add(j.key);return n})} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 13px",borderRadius:8,cursor:"pointer",background:isOpen?`${j.color}08`:"transparent",transition:"all .15s" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                          <div style={{ width:7,height:7,borderRadius:"50%",background:j.color }}/>
                          <div style={{ fontSize:12,letterSpacing:1.5,color:isOpen?theme.t1:theme.t3,textTransform:"uppercase",fontWeight:700 }}>{j.key}</div>
                        </div>
                        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                          <div style={{ fontSize:11,color:theme.t4 }}>{jScreens.length}</div>
                          <div style={{ fontSize:12,color:theme.t4,transition:"transform .2s",transform:isOpen?"rotate(90deg)":"none" }}>›</div>
                        </div>
                      </div>
                      {isOpen&&<div style={{ paddingLeft:10,paddingBottom:6 }}>
                        {jScreens.map(([id,v])=>(
                          <div key={id}>
                            <div onClick={()=>{setHistory(h=>[...h,screen]);setAnim("out");setTimeout(()=>{setScreen(id);setAnim("in");setTimeout(()=>setAnim("none"),300);},180);}} style={{ padding:"8px 14px",borderRadius:7,marginBottom:1,cursor:"pointer",background:screen===id?`${j.color}15`:"transparent",border:screen===id?`1px solid ${j.color}25`:"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                              <div style={{ fontSize:13,fontWeight:screen===id?600:400,color:screen===id?theme.t1:theme.t3 }}>{v.n}</div>
                              {SCREEN_META[id]?.subs&&<div style={{ fontSize:10,color:j.color,fontWeight:600 }}>{SCREEN_META[id].subs.length}</div>}
                            </div>
                            {screen===id&&SCREEN_META[id]?.subs&&<div style={{ paddingLeft:12,paddingBottom:4 }}>
                              {SCREEN_META[id].subs.map((sub,si)=>{
                                const subIds = id==="profile"?["personal","questionnaire","subscription","password","notifications","consent","integrations","clinician","help","supplements","test-history","reports","referral","shop","about"]:id==="book-test"?["form","payment","processing","confirmed"]:id==="results-tab"?["blood","dna","progress"]:id==="protocol"?["morning","evening",null]:id==="waiting"?["blood-pending","blood-ready","dna-pending","all-ready"]:id==="results"?["blood","dna","combined"]:[];
                                const target = subIds[si]||null;
                                return (
                                <div key={si} onClick={target?()=>{if(screen===id){setSubTarget(null);setTimeout(()=>setSubTarget(target),10);}else{setSubTarget(target);setHistory(h=>[...h,screen]);setAnim("out");setTimeout(()=>{setScreen(id);setAnim("in");setTimeout(()=>setAnim("none"),300);},180);}}:undefined} style={{ fontSize:12,color:target?theme.t2:theme.t3,padding:"7px 10px",borderRadius:6,display:"flex",alignItems:"center",gap:8,cursor:target?"pointer":"default",background:"transparent",transition:"all .15s" }}>
                                  <div style={{ width:4,height:4,borderRadius:"50%",background:`${j.color}50` }}/>{sub}
                                </div>);
                              })}
                            </div>}
                          </div>
                        ))}
                      </div>}
                    </div>
                  );})}

                </div>
                <div style={{ borderTop:`1px solid ${theme.b1}`,paddingTop:10 }}>
                  <div onClick={()=>{setHistory([]);setScreen("splash");}} style={{ fontSize:12,color:theme.t3,cursor:"pointer",fontWeight:500 }}>⟲ Restart from Splash</div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <div style={{ width:390,height:780,borderRadius:48,overflow:"hidden",border:`2.5px solid ${theme.mode==="dark"?theme.s3:theme.b1}`,background:theme.bg,boxShadow:theme.glow,position:"relative",transition:"all .4s" }}>
                  <div style={{ position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",width:120,height:32,background:theme.mode==="dark"?"#000":"#1a1a2e",borderRadius:20,zIndex:20 }}>
                    <div style={{ position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:50,height:5,borderRadius:3,background:theme.mode==="dark"?"#111":"#333" }}/>
                  </div>
                  <div style={{ height:"100%",...as[anim] }}>
                    {Comp && <Comp onNavigate={nav} onBack={history.length>0?back:undefined} onNext={()=>nav("welcome")} onToggleTheme={()=>setIsDark(!isDark)} isDark={isDark} subTarget={subTarget} clearSubTarget={()=>setSubTarget(null)} profileSection={profileSection} setProfileSection={setProfileSection} gender={gender} setGender={setGender} />}
                  </div>
                </div>
                <div style={{ width:130,height:4,borderRadius:2,background:theme.b1,margin:"10px auto 0" }}/>
              </div>

              {/* Info Panel */}
              <div style={{ width:240,flexShrink:0 }}>
                <div style={{ fontSize:11,letterSpacing:2.5,color:jColor,textTransform:"uppercase",fontWeight:700,marginBottom:6 }}>{cur?.j}</div>
                <div style={{ fontSize:22,fontWeight:700,color:theme.t1,marginBottom:6 }}>{cur?.n}</div>
                <div style={{ fontSize:13,color:theme.t2,lineHeight:1.5,marginBottom:16 }}>{SCREEN_META[screen]?.desc}</div>
                <Card style={{ background:`${theme.s1}90` }}>
                  <div style={{ fontSize:12,fontWeight:700,color:theme.t1,marginBottom:12,letterSpacing:.5 }}>QUICK JUMP</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {[{id:"welcome",l:"Start",c:theme.cyan},{id:"book-test",l:"Book",c:theme.purple},{id:"results",l:"Results",c:"#9717CC"},{id:"today",l:"Today",c:theme.emerald},{id:"results-tab",l:"Biology",c:theme.sky},{id:"profile",l:"Profile",c:theme.gold}].map(q=>(
                      <div key={q.id} onClick={()=>{setHistory(h=>[...h,screen]);setAnim("out");setTimeout(()=>{setScreen(q.id);setAnim("in");setTimeout(()=>setAnim("none"),300);},180);}} style={{ background:`${q.c}10`,border:`1px solid ${q.c}22`,borderRadius:8,padding:"7px 14px",fontSize:12,color:q.c,cursor:"pointer",fontWeight:600 }}>{q.l}</div>
                    ))}
                  </div>
                </Card>
                <Card style={{ background:`${theme.s1}90`,marginTop:10 }}>
                  <div style={{ fontSize:12,fontWeight:700,color:theme.t1,marginBottom:12,letterSpacing:.5 }}>SCREEN INFO</div>
                  <div style={{ fontSize:12,color:theme.t3 }}>ID: <span style={{ color:theme.cyan,fontWeight:600,fontFamily:"monospace" }}>{screen}</span></div>
                  <div style={{ fontSize:12,color:theme.t3,marginTop:3 }}>Tab Bar: <span style={{ color:SCREEN_META[screen]?.tab?theme.emerald:theme.t4,fontWeight:600 }}>{SCREEN_META[screen]?.tab?"Yes":"No"}</span></div>
                  <div style={{ fontSize:12,color:theme.t3,marginTop:3 }}>History: <span style={{ color:theme.t2,fontWeight:500 }}>{history.length} deep</span></div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToastProvider>
    </ThemeCtx.Provider>
  );
}
