import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeft } from "./Icons";

const TopBar = ({ onBack, right }) => {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
        minHeight: 28,
        paddingBottom: 4,
      }}
    >
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ChevronLeft size={14} color={t.t3} />
          <Text
            style={{
              fontSize: 15,
              color: t.t3,
              fontWeight: "500",
              fontFamily: "PlusJakartaSans_500Medium",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {right ? (
        <Text
          style={{
            fontSize: 13,
            color: t.t3,
            fontWeight: "500",
            fontFamily: "PlusJakartaSans_500Medium",
          }}
        >
          {right}
        </Text>
      ) : (
        <View />
      )}
    </View>
  );
};

export default TopBar;
