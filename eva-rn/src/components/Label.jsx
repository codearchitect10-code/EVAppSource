import { Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

const Label = ({ children, color }) => {
  const t = useTheme();
  return (
    <Text
      style={{
        fontSize: 11,
        letterSpacing: 2.5,
        color: color || t.cyan,
        textTransform: "uppercase",
        marginBottom: 12,
        fontWeight: "700",
        fontFamily: "PlusJakartaSans_700Bold",
      }}
    >
      {children}
    </Text>
  );
};

export default Label;
