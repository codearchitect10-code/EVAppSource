import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

const Title = ({ children, sub, size = 22 }) => {
  const t = useTheme();
  return (
    <View style={{ marginBottom: sub ? 20 : 14 }}>
      <Text
        style={{
          fontSize: size,
          fontWeight: "700",
          color: t.t1,
          lineHeight: size * 1.22,
          letterSpacing: -0.3,
          fontFamily: "PlusJakartaSans_700Bold",
        }}
      >
        {children}
      </Text>
      {sub && (
        <Text
          style={{
            fontSize: 14,
            color: t.t2,
            marginTop: 6,
            lineHeight: 14 * 1.55,
            fontFamily: "PlusJakartaSans_400Regular",
          }}
        >
          {sub}
        </Text>
      )}
    </View>
  );
};

export default Title;
