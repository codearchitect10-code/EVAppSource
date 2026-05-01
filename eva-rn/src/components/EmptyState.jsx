import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

const EmptyState = ({ icon, title, message }) => {
  const t = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 52,
        paddingHorizontal: 28,
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: `${t.purple}08`,
          borderWidth: 2,
          borderColor: `${t.purple}20`,
          borderStyle: "dashed",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: t.t1,
          marginBottom: 12,
          textAlign: "center",
          fontFamily: "PlusJakartaSans_700Bold",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: t.t2,
          lineHeight: 15 * 1.6,
          maxWidth: 260,
          textAlign: "center",
          fontFamily: "PlusJakartaSans_400Regular",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default EmptyState;
