import Svg, { Path } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { LOGO } from "../assets/logo";

const EVASymbol = ({ size = 40, color }) => {
  const t = useTheme();
  const c = color || t.logoColor;
  const aspectRatio = 267.22 / 264.57;
  return (
    <Svg width={size} height={size * aspectRatio} viewBox={LOGO.symbolVB}>
      <Path d={LOGO.symbolD} fill={c} />
    </Svg>
  );
};

export default EVASymbol;
