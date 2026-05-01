import { useState } from "react";
import { View, Text, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { DANIEL_IMG } from "../assets/logo";

const DanielAvatar = ({ size = 52, border: b }) => {
  const t = useTheme();
  const [err, setErr] = useState(false);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: b || `${t.purple}40`,
    flexShrink: 0,
    backgroundColor: `${t.purple}20`,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <View style={containerStyle}>
      {err ? (
        <Text
          style={{
            fontSize: size * 0.38,
            fontWeight: "700",
            color: t.t1,
            fontFamily: "PlusJakartaSans_700Bold",
          }}
        >
          DS
        </Text>
      ) : (
        <Image
          source={DANIEL_IMG}
          onError={() => setErr(true)}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default DanielAvatar;
