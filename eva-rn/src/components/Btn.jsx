import { TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

const Btn = ({ children, variant = "primary", onPress, style = {} }) => {
  const t = useTheme();

  const baseStyle = {
    width: "100%",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  };

  const textBase = {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontFamily: "PlusJakartaSans_600SemiBold",
  };

  if (variant === "ghost") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          baseStyle,
          {
            backgroundColor: `${t.cyan}0A`,
            borderWidth: 1,
            borderColor: `${t.cyan}15`,
          },
          style,
        ]}
        activeOpacity={0.75}
      >
        <Text style={[textBase, { color: t.mode === "dark" ? t.cyan : t.purple }]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          baseStyle,
          {
            backgroundColor: "transparent",
            borderWidth: 1.5,
            borderColor: `${t.purple}40`,
          },
          style,
        ]}
        activeOpacity={0.75}
      >
        <Text style={[textBase, { color: t.mode === "dark" ? t.cyan : t.purple }]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  if (variant === "muted") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          baseStyle,
          {
            backgroundColor: t.s2,
            borderWidth: 1,
            borderColor: t.b2,
          },
          style,
        ]}
        activeOpacity={0.75}
      >
        <Text style={[textBase, { color: t.t2 }]}>{children}</Text>
      </TouchableOpacity>
    );
  }

  // primary — gradient
  return (
    <TouchableOpacity onPress={onPress} style={[{ borderRadius: 14, overflow: "hidden" }, style]} activeOpacity={0.85}>
      <LinearGradient
        colors={t.brandGradColors || [t.purple, t.violet]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[baseStyle]}
      >
        <Text style={[textBase, { color: "#FFF" }]}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Btn;
