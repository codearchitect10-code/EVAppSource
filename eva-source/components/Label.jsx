import { useTheme } from "../context/ThemeContext";

const Label = ({ children, color }) => { const t = useTheme(); return <div style={{ fontSize:11,letterSpacing:2.5,color:color||t.cyan,textTransform:"uppercase",marginBottom:12,fontWeight:700 }}>{children}</div>; };

export default Label;
