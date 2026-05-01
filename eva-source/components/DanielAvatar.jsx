import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { DANIEL_IMG } from "../assets/logo";

const DanielAvatar = ({size=52,border:b}) => { const t = useTheme(); const [err,setErr] = useState(false); return <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",border:b||`2px solid ${t.purple}40`,flexShrink:0,background:`${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center"}}>{err?<span style={{fontSize:size*0.38,fontWeight:700,color:t.t1}}>DS</span>:<img src={DANIEL_IMG} onError={()=>setErr(true)} width={size} height={size} style={{width:size,height:size,objectFit:"cover",display:"block"}} alt=""/>}</div>; };

export default DanielAvatar;
