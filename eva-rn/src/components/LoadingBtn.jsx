import { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Btn from "./Btn";

const LoadingDots = ({ color }) => {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = (anim, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    pulse(anim1, 0);
    pulse(anim2, 200);
    pulse(anim3, 400);
  }, [anim1, anim2, anim3]);

  const dotStyle = (anim) => ({
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] }) }],
  });

  return (
    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      {[anim1, anim2, anim3].map((anim, i) => (
        <Animated.Text
          key={i}
          style={[
            {
              fontSize: 20,
              color: color || "#FFF",
              fontWeight: "700",
            },
            dotStyle(anim),
          ]}
        >
          ·
        </Animated.Text>
      ))}
    </View>
  );
};

const LoadingBtn = ({ children, onPress, loading, variant = "primary", style = {}, ...props }) => {
  const t = useTheme();
  const dotColor = variant === "primary" ? "#FFF" : t.purple;

  if (loading) {
    return (
      <Btn variant={variant} style={[{ opacity: 0.7 }, style]} {...props}>
        <LoadingDots color={dotColor} />
      </Btn>
    );
  }

  return (
    <Btn variant={variant} onPress={onPress} style={style} {...props}>
      {children}
    </Btn>
  );
};

export default LoadingBtn;
