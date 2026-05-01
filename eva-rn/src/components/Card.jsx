import { View, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";

const Card = ({ children, glow, onPress, style = {} }) => {
  const t = useTheme();

  const cardStyle = {
    backgroundColor: t.s1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: glow ? `${glow}20` : t.b1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[cardStyle, style]} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};

export default Card;
