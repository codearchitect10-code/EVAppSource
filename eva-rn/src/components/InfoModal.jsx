import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";

const InfoModal = ({ title, text, onClose }) => {
  const t = useTheme();

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        {/* Backdrop */}
        <TouchableOpacity
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={onClose}
          activeOpacity={1}
        >
          <BlurView
            intensity={20}
            tint={t.mode === "dark" ? "dark" : "light"}
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          />
        </TouchableOpacity>

        {/* Card */}
        <View
          style={{
            backgroundColor: t.s1,
            borderRadius: 20,
            padding: 24,
            maxWidth: 320,
            width: "100%",
            position: "relative",
            borderWidth: 1,
            borderColor: t.b1,
            zIndex: 1,
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 16 },
                shadowOpacity: 0.2,
                shadowRadius: 24,
              },
              android: { elevation: 12 },
            }),
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: t.t1,
                fontFamily: "PlusJakartaSans_700Bold",
                flex: 1,
                marginRight: 12,
              }}
            >
              {title}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: t.s2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <Path d="M2 2l8 8M10 2l-8 8" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <Text
            style={{
              fontSize: 14,
              color: t.t2,
              lineHeight: 14 * 1.8,
              fontFamily: "PlusJakartaSans_400Regular",
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
