import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import Card from "./Card";

const Skeleton = ({ width = "100%", height = 16, radius = 8, style = {} }) => {
  const t = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmer]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: t.s2,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={[`${t.s2}00`, `${t.s3 || t.s2}CC`, `${t.s2}00`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const SkeletonCard = () => (
  <Card style={{ padding: 16 }}>
    <Skeleton width="60%" height={14} style={{ marginBottom: 12 }} />
    <Skeleton width="100%" height={10} style={{ marginBottom: 12 }} />
    <Skeleton width="80%" height={10} />
  </Card>
);

export { Skeleton, SkeletonCard };
