import { useTheme } from "../context/ThemeContext";
import { LOGO, ELITE_VITA_PATHS } from "../assets/logo";

const EVAFullLogo = ({ width = 120, color }) => { const c = color || useTheme().logoColor; return <svg width={width} height={width*(685.36/792.34)} viewBox={LOGO.fullVB}><path d={LOGO.pSym} fill={c}/><path d={LOGO.pE} fill={c}/><path d={LOGO.pV} fill={c}/><path d={LOGO.pA} fill={c}/>{ELITE_VITA_PATHS.map((d,i)=><path key={i} d={d} fill={c}/>)}</svg>; };

export default EVAFullLogo;
