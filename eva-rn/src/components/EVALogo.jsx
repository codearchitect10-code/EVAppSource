import Svg, { Path } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { LOGO } from "../assets/logo";

const EVALogo = ({ width = 120, color }) => {
  const t = useTheme();
  const c = color || t.logoColor;
  const height = width * (581.48 / 792.34);
  return (
    <Svg width={width} height={height} viewBox={LOGO.evaVB}>
      <Path d={LOGO.pSym} fill={c} />
      <Path d={LOGO.pE} fill={c} />
      <Path d={LOGO.pV} fill={c} />
      <Path d={LOGO.pA} fill={c} />
    </Svg>
  );
};

export default EVALogo;
