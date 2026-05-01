import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";

/**
 * MiniDNA — animated SVG double helix.
 * Replaces the web canvas version with react-native-svg paths that update via
 * Animated to simulate the rotating helix effect.
 */
const NUM_PTS = 20;
const TWISTS = 1;

const buildHelixPath = (w, h, phase, strand) => {
  const cy = h / 2;
  const amp = h * 0.35;
  let d = "";
  for (let i = 0; i < NUM_PTS; i++) {
    const frac = i / (NUM_PTS - 1);
    const x = frac * w;
    const a = frac * Math.PI * 2 * TWISTS + phase + (strand === 1 ? 0 : Math.PI);
    const y = cy + Math.sin(a) * amp;
    d += i === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
};

const buildRungs = (w, h, phase) => {
  const cy = h / 2;
  const amp = h * 0.35;
  const rungs = [];
  for (let i = 2; i < NUM_PTS - 2; i += 4) {
    const frac = i / (NUM_PTS - 1);
    const x = frac * w;
    const a1 = frac * Math.PI * 2 * TWISTS + phase;
    const a2 = a1 + Math.PI;
    const y1 = cy + Math.sin(a1) * amp;
    const y2 = cy + Math.sin(a2) * amp;
    rungs.push({ x, y1, y2 });
  }
  return rungs;
};

const FRAMES = 60;
const PHASE_STEP = (2 * Math.PI) / FRAMES;

const MiniDNA = ({ w = 60, h = 40, emerald: emeraldProp, gold: goldProp }) => {
  const t = useTheme();
  const emerald = emeraldProp || t.emerald;
  const gold = goldProp || t.gold;

  const phaseRef = useRef(new Animated.Value(0)).current;
  const frameRef = useRef(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(phaseRef, {
        toValue: FRAMES,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [phaseRef]);

  // Derive static snapshots for each frame — use a simple interpolation trick
  // by rendering at a fixed phase and re-rendering via state driven by Animated listener.
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = phaseRef.addListener(({ value }) => {
      setPhase((value % FRAMES) * PHASE_STEP);
    });
    return () => phaseRef.removeListener(id);
  }, [phaseRef]);

  const s1 = buildHelixPath(w, h, phase, 1);
  const s2 = buildHelixPath(w, h, phase, 2);
  const rungs = buildRungs(w, h, phase);

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {rungs.map((rng, idx) => (
          <Path
            key={idx}
            d={`M${rng.x.toFixed(1)},${rng.y1.toFixed(1)} L${rng.x.toFixed(1)},${rng.y2.toFixed(1)}`}
            stroke={emerald}
            strokeWidth="0.7"
            strokeOpacity={0.18}
          />
        ))}
        <Path d={s1} stroke={emerald} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeOpacity={0.8} />
        <Path d={s2} stroke={gold} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeOpacity={0.8} />
      </Svg>
    </View>
  );
};

export default MiniDNA;

export default MiniDNA;
