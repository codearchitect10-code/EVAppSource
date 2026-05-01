/**
 * EVA™ Design Tokens — React Native
 *
 * Key differences from web version:
 * - brandGrad CSS string replaced with brandGradColors array + brandGradLocations
 * - glow CSS string removed (use platform shadow objects per-component as needed)
 * - fontFamily uses Expo font naming convention (e.g. "PlusJakartaSans_400Regular")
 */

const themes = {
  dark: {
    mode: "dark",
    bg: "#060A12",
    s1: "#111827",
    s2: "#1A2332",
    s3: "#1C2333",
    b1: "#283848",
    b2: "#354558",
    t1: "#F1F5F9",
    t2: "#94A3B8",
    t3: "#8899AB",
    t4: "#566878",
    purple: "#4623BE",
    violet: "#9717CC",
    cyan: "#00EFE3",
    emerald: "#00AD80",
    gold: "#DDB76A",
    red: "#EF4444",
    sky: "#00C5F1",
    ice: "#CCFCF9",
    deepTeal: "#002B38",
    taupe: "#9B7E7C",
    white: "#FFFFFF",
    brandGradColors: ["#4623BE", "#9717CC", "#00EFE3"],
    brandGradLocations: [0, 0.4, 1.0],
    logoColor: "#FFFFFF",
    shellBg: "#020308",
  },
  light: {
    mode: "light",
    bg: "#FFFFFF",
    s1: "#F8FAFE",
    s2: "#EFF3F9",
    s3: "#E5EAF2",
    b1: "#E0E5ED",
    b2: "#CDD4DE",
    t1: "#0F172A",
    t2: "#475569",
    t3: "#94A3B8",
    t4: "#CBD5E1",
    purple: "#4623BE",
    violet: "#9717CC",
    cyan: "#00AD80",
    emerald: "#00AD80",
    gold: "#B8960A",
    red: "#DC2626",
    sky: "#0891B2",
    ice: "#CCFCF9",
    deepTeal: "#002B38",
    taupe: "#9B7E7C",
    white: "#FFFFFF",
    brandGradColors: ["#4623BE", "#9717CC", "#00C5F1"],
    brandGradLocations: [0, 0.4, 1.0],
    logoColor: "#4623BE",
    shellBg: "#F0F2F5",
  },
};

export const typography = {
  // Expo font naming convention: "<FamilyName>_<Weight><Style>"
  family: "PlusJakartaSans_400Regular",
  weights: {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semibold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
    extrabold: "PlusJakartaSans_800ExtraBold",
  },
  sizes: {
    xs: 9,
    sm: 11,
    body: 13,
    md: 14,
    lg: 15,
    xl: 17,
    xxl: 22,
    hero: 26,
    display: 48,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  safeTop: 52,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export default themes;
