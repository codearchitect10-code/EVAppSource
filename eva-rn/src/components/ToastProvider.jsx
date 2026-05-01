import { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Platform } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useTheme, ToastCtx } from "../context/ThemeContext";

const XIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path d="M4 4l6 6M10 4l-6 6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const WarnIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path d="M7 3v5M7 10v1" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const CheckMark = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path d="M3 7.5l3 3 5-6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoMark = () => (
  <Svg width={14} height={14} viewBox="0 0 18 18" fill="none">
    <Circle cx="9" cy="9" r="7.5" stroke="#FFF" strokeWidth="1.5" />
    <Path d="M9 5.5v.5M9 8v4.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const ICONS = { success: <CheckMark />, error: <XIcon />, info: <InfoMark />, warning: <WarnIcon /> };

const Toast = ({ msg, type, colors }) => {
  const t = useTheme();
  const slideY = useRef(new Animated.Value(-60)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideY, { toValue: 0, tension: 80, friction: 10, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [slideY, opacity]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: colors[type], transform: [{ translateY: slideY }], opacity },
      ]}
    >
      <View style={styles.iconCircle}>{ICONS[type]}</View>
      <Text style={styles.toastText}>{msg}</Text>
    </Animated.View>
  );
};

const ToastProvider = ({ children }) => {
  const t = useTheme();
  const [toasts, setToasts] = useState([]);

  const show = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3000);
  }, []);

  const colors = {
    success: t.emerald,
    error: t.red,
    info: t.purple,
    warning: t.gold,
  };

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <View style={styles.container} pointerEvents="box-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} msg={toast.msg} type={toast.type} colors={colors} />
        ))}
      </View>
    </ToastCtx.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    left: 16,
    right: 16,
    zIndex: 9999,
    gap: 10,
  },
  toast: {
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 19,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: { elevation: 8 },
    }),
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  toastText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFF",
    flex: 1,
    fontFamily: "PlusJakartaSans_500Medium",
  },
});

export default ToastProvider;
