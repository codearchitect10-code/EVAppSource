import Svg, { Path } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { LOGO, ELITE_VITA_PATHS } from "../assets/logo";

const EVAFullLogo = ({ width = 120, color }) => {
  const t = useTheme();
  const c = color || t.logoColor;
  const height = width * (685.36 / 792.34);
  return (
    <Svg width={width} height={height} viewBox={LOGO.fullVB}>
      <Path d={LOGO.pSym} fill={c} />
      <Path d={LOGO.pE} fill={c} />
      <Path d={LOGO.pV} fill={c} />
      <Path d={LOGO.pA} fill={c} />
      {ELITE_VITA_PATHS.map((d, i) => (
        <Path key={i} d={d} fill={c} />
      ))}
    </Svg>
  );
};

export default EVAFullLogo;
