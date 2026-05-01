import { useTheme } from "../context/ThemeContext";

const Card = ({ children, glow, onClick, style = {} }) => { const t = useTheme(); return <div onClick={onClick} style={{ background:t.s1,borderRadius:16,padding:18,marginBottom:12,border:glow?`1px solid ${glow}20`:`1px solid ${t.b1}`,cursor:onClick?"pointer":"default",transition:"all .15s",...style }}>{children}</div>; };

export default Card;
