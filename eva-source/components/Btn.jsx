import { useTheme } from "../context/ThemeContext";
import { FONT } from "../assets/css";

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

export default Btn;
