import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";

const TodayIc = ({ c }) => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="10" r="8" stroke={c} strokeWidth="1.5" />
    <Circle cx="10" cy="10" r="3" fill={c} />
    <Path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
  </Svg>
);

const BioIc = ({ c }) => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Path d="M10 2C10 2 4 8 4 12a6 6 0 0012 0c0-4-6-10-6-10z" stroke={c} strokeWidth="1.5" fill={`${c}15`} />
    <Circle cx="10" cy="12" r="2" fill={c} />
  </Svg>
);

const ProtoIc = ({ c }) => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Rect x="5" y="2" width="10" height="16" rx="5" stroke={c} strokeWidth="1.5" fill={`${c}10`} />
    <Line x1="5" y1="10" x2="15" y2="10" stroke={c} strokeWidth="1.2" />
    <Circle cx="10" cy="6" r="1.5" fill={c} />
  </Svg>
);

const ProfIc = ({ c }) => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="7" r="4" stroke={c} strokeWidth="1.5" />
    <Path d="M3 18c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const TABS = [
  { id: "today", label: "Today", Ic: TodayIc },
  { id: "results-tab", label: "My Biology", Ic: BioIc },
  { id: "protocol", label: "Protocol", Ic: ProtoIc },
  { id: "profile", label: "Profile", Ic: ProfIc },
];

const TabBar = ({ active = "today", onNavigate }) => {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 10,
        paddingBottom: 28,
        borderTopWidth: 1,
        borderTopColor: t.b1,
        backgroundColor: t.bg,
        flexShrink: 0,
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onNavigate?.(tab.id)}
            style={{ alignItems: "center", paddingVertical: 6, paddingHorizontal: 16 }}
            activeOpacity={0.7}
          >
            <View style={{ marginBottom: 5 }}>
              <tab.Ic c={isActive ? t.cyan : t.t4} />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: isActive ? "700" : "500",
                color: isActive ? t.cyan : t.t4,
                letterSpacing: 0.5,
                fontFamily: isActive
                  ? "PlusJakartaSans_700Bold"
                  : "PlusJakartaSans_500Medium",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
