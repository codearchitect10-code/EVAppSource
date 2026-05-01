import { useTheme } from "../context/ThemeContext";
import { LOGO } from "../assets/logo";

const EVASymbol = ({ size = 40, color }) => { const c = color || useTheme().logoColor; return <svg width={size} height={size*(267.22/264.57)} viewBox={LOGO.symbolVB}><path d={LOGO.symbolD} fill={c}/></svg>; };
// EVALogo = EVA wordmark only (no "by Elite Vita")

export default EVASymbol;
