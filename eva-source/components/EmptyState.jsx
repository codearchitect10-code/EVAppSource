import { useTheme } from "../context/ThemeContext";

const EmptyState = ({icon,title,message}) => {
  const t = useTheme();
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"52px 28px",textAlign:"center"}}>
    <div style={{width:72,height:72,borderRadius:"50%",background:`${t.purple}08`,border:`2px dashed ${t.purple}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>{icon}</div>
    <div style={{fontSize:18,fontWeight:700,color:t.t1,marginBottom:12}}>{title}</div>
    <div style={{fontSize:15,color:t.t2,lineHeight:1.6,maxWidth:260}}>{message}</div>
  </div>;
};

export default EmptyState;
