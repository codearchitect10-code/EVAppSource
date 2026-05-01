import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import Card from "./Card";
import Btn from "./Btn";

const WarningIcon = ({ color }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M9 2L1 16h16L9 2z" fill="none" stroke="#FFF" strokeWidth="1.8" />
    <Path d="M9 7v4M9 13v1" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const SafetyGateAlert = ({
  level = "red",
  marker = "hs-CRP",
  value = "22.4 mg/L",
  threshold = "Critical: > 20.0 mg/L",
  onBook,
  onDismiss,
}) => {
  const t = useTheme();
  const isRed = level === "red";
  const color = isRed ? "#DC2626" : "#F59E0B";
  const bgColor = isRed ? "#DC262608" : "#F59E0B08";

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Alert header */}
      <View
        style={{
          backgroundColor: bgColor,
          borderBottomWidth: 2,
          borderBottomColor: color,
          paddingTop: 16,
          paddingBottom: 16,
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <WarningIcon color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "800",
              color,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontFamily: "PlusJakartaSans_800ExtraBold",
            }}
          >
            {isRed ? "CRITICAL ALERT" : "URGENT ALERT"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: t.t2,
              marginTop: 2,
              fontFamily: "PlusJakartaSans_400Regular",
            }}
          >
            {isRed
              ? "Immediate medical attention required"
              : "Physician review within 48–72 hours"}
          </Text>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: t.t1,
            marginBottom: 12,
            lineHeight: 22 * 1.3,
            fontFamily: "PlusJakartaSans_700Bold",
          }}
        >
          {marker} is outside safe range
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: t.t2,
            lineHeight: 15 * 1.6,
            marginBottom: 20,
            fontFamily: "PlusJakartaSans_400Regular",
          }}
        >
          Your result requires {isRed ? "immediate" : "prompt"} medical evaluation. All
          optimisation recommendations for this marker have been paused.
        </Text>

        {/* Marker result card */}
        <Card style={{ borderWidth: 1.5, borderColor: `${color}30`, marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: t.t1,
                fontFamily: "PlusJakartaSans_600SemiBold",
              }}
            >
              {marker}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color,
                fontFamily: "PlusJakartaSans_700Bold",
              }}
            >
              {value}
            </Text>
          </View>
          <View style={{ height: 6, backgroundColor: t.bg, borderRadius: 3 }}>
            <View
              style={{ width: "95%", height: "100%", backgroundColor: color, borderRadius: 3 }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color,
              fontWeight: "600",
              marginTop: 6,
              fontFamily: "PlusJakartaSans_600SemiBold",
            }}
          >
            {threshold}
          </Text>
        </Card>

        {/* What this means */}
        <Card style={{ backgroundColor: `${color}06`, padding: 16, marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: t.t3,
              letterSpacing: 1.5,
              marginBottom: 8,
              fontFamily: "PlusJakartaSans_700Bold",
            }}
          >
            WHAT THIS MEANS
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: t.t2,
              lineHeight: 14 * 1.7,
              fontFamily: "PlusJakartaSans_400Regular",
            }}
          >
            {isRed
              ? "This result is in the critical range and may indicate a serious condition requiring emergency evaluation. Please contact your physician or visit an emergency facility."
              : "This result is significantly outside optimal range and needs medical assessment. Our clinical team has been notified and will review your case within 48–72 hours."}
          </Text>
        </Card>

        {/* Optimisation status */}
        <Card style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: t.t3,
              letterSpacing: 1.5,
              marginBottom: 8,
              fontFamily: "PlusJakartaSans_700Bold",
            }}
          >
            OPTIMISATION STATUS
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }}
            />
            <Text
              style={{
                fontSize: 14,
                color: t.t2,
                flex: 1,
                fontFamily: "PlusJakartaSans_400Regular",
              }}
            >
              All supplement recommendations for {marker} are{" "}
              <Text
                style={{ fontWeight: "600", color, fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                paused
              </Text>{" "}
              until cleared by your physician.
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Action buttons */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: 16,
          paddingTop: 8,
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={onBook}
          style={{
            width: "100%",
            borderRadius: 14,
            paddingVertical: 15,
            alignItems: "center",
            backgroundColor: color,
          }}
          activeOpacity={0.85}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#FFF",
              fontFamily: "PlusJakartaSans_600SemiBold",
            }}
          >
            {isRed ? "Call Physician Now" : "Book Physician Consultation"}
          </Text>
        </TouchableOpacity>
        {!isRed && onDismiss && (
          <Btn variant="muted" onPress={onDismiss}>
            I understand — remind me later
          </Btn>
        )}
      </View>
    </View>
  );
};

export default SafetyGateAlert;
