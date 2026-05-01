import { useTheme } from "../context/ThemeContext";
import { LOGO } from "../assets/logo";

const EVALogo = ({ width = 120, color }) => { const c = color || useTheme().logoColor; return <svg width={width} height={width*(581.48/792.34)} viewBox={LOGO.evaVB}><path d={LOGO.pSym} fill={c}/><path d={LOGO.pE} fill={c}/><path d={LOGO.pV} fill={c}/><path d={LOGO.pA} fill={c}/></svg>; };
// EVAFullLogo = EVA + "by Elite Vita" lockup

export default EVALogo;
