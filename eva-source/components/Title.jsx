import { useTheme } from "../context/ThemeContext";

const Title = ({ children, sub, size = 22 }) => { const t = useTheme(); return <div style={{ marginBottom:sub?20:14 }}><div style={{ fontSize:size,fontWeight:700,color:t.t1,lineHeight:1.22,letterSpacing:-.3 }}>{children}</div>{sub&&<div style={{ fontSize:14,color:t.t2,marginTop:6,lineHeight:1.55 }}>{sub}</div>}</div>; };

export default Title;
