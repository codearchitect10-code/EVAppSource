import { useTheme } from "../context/ThemeContext";

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

export default InfoModal;
