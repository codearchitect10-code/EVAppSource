import { useTheme } from "../context/ThemeContext";
import { ChevronLeft } from "./Icons";

const TopBar = ({ onBack, right }) => { const t = useTheme(); return <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,minHeight:28,padding:"0 0 4px" }}>{onBack?<div onClick={onBack} style={{ display:"flex",alignItems:"center",gap:8,fontSize:15,color:t.t3,cursor:"pointer",fontWeight:500 }}><ChevronLeft size={14}/> Back</div>:<div/>}{right?<div style={{ fontSize:13,color:t.t3,fontWeight:500 }}>{right}</div>:<div/>}</div>; };

// ── Toast System ──

export default TopBar;
