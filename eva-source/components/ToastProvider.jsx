import { useState, useCallback } from "react";
import { useTheme, useToast } from "../context/ThemeContext";
import { ToastCtx } from "../context/ThemeContext";

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

export default ToastProvider;
