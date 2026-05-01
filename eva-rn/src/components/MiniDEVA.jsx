import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";

const AnimatedG = Animated.createAnimatedComponent(G);

const MiniDEVA = ({ size = 48 }) => {
  const t = useTheme();
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 60000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const r = 100;
  const circ = 2 * Math.PI * r;
  const gap = 6;
  const segArc = circ / 9;

  const segs = [
    { c: t.purple, pct: 85 },
    { c: t.gold, pct: 75 },
    { c: t.emerald, pct: 90 },
    { c: t.purple, pct: 70 },
    { c: t.gold, pct: 88 },
    { c: t.emerald, pct: 82 },
    { c: t.purple, pct: 78 },
    { c: t.gold, pct: 92 },
    { c: t.emerald, pct: 80 },
  ];

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg width={size} height={size} viewBox="0 0 240 240">
          {segs.map((seg, i) => {
            const available = segArc - gap;
            const filled = available * (seg.pct / 100);
            const rotation = -90 + i * 40 + (gap / circ) * 180;
            return (
              <G key={i} rotation={rotation} originX={120} originY={120}>
                <Circle
                  cx="120"
                  cy="120"
                  r={r}
                  fill="none"
                  stroke={t.mode === "dark" ? t.s2 : t.b1}
                  strokeWidth="11"
                  strokeDasharray={`${available} ${circ - available}`}
                />
                <Circle
                  cx="120"
                  cy="120"
                  r={r}
                  fill="none"
                  stroke={seg.c}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray={`${filled} ${circ - filled}`}
                  strokeOpacity={0.85}
                />
              </G>
            );
          })}
        </Svg>
      </Animated.View>
    </View>
  );
};

export default MiniDEVA;
