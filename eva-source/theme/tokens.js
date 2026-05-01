/**
 * EVA™ Design Tokens
 * Light and dark theme palettes, typography, spacing
 */

const themes = {
  dark: {
    mode: "dark",
    bg: "#060A12", s1: "#111827", s2: "#1A2332", s3: "#1C2333",
    b1: "#283848", b2: "#354558",
    t1: "#F1F5F9", t2: "#94A3B8", t3: "#8899AB", t4: "#566878",
    // Brand colors stay consistent
    purple: "#4623BE", violet: "#9717CC", cyan: "#00EFE3",
    emerald: "#00AD80", gold: "#DDB76A", red: "#EF4444",
    sky: "#00C5F1", ice: "#CCFCF9", deepTeal: "#002B38", taupe: "#9B7E7C",
    white: "#FFFFFF",
    brandGrad: "linear-gradient(135deg, #4623BE 0%, #9717CC 40%, #00EFE3 100%)",
    glow: "0 0 60px rgba(70,35,190,0.2), 0 0 120px rgba(151,23,204,0.06)",
    logoColor: "#FFFFFF",
    shellBg: "#020308",
  },
  light: {
    mode: "light",
    bg: "#FFFFFF", s1: "#F8FAFE", s2: "#EFF3F9", s3: "#E5EAF2",
    b1: "#E0E5ED", b2: "#CDD4DE",
    t1: "#0F172A", t2: "#475569", t3: "#94A3B8", t4: "#CBD5E1",
    purple: "#4623BE", violet: "#9717CC", cyan: "#00AD80",
    emerald: "#00AD80", gold: "#B8960A", red: "#DC2626",
    sky: "#0891B2", ice: "#CCFCF9", deepTeal: "#002B38", taupe: "#9B7E7C",
    white: "#FFFFFF",
    brandGrad: "linear-gradient(135deg, #4623BE 0%, #9717CC 40%, #00C5F1 100%)",
    glow: "0 0 60px rgba(70,35,190,0.08), 0 0 120px rgba(0,173,128,0.04)",
    logoColor: "#4623BE",
    shellBg: "#F0F2F5",
  },
};


export const typography = {
  family: "'Gilroy', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  weights: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
  sizes: { xs: 9, sm: 11, body: 13, md: 14, lg: 15, xl: 17, xxl: 22, hero: 26, display: 48 }
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, safeTop: 52 };
export const radii = { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 };
export const shadows = {
  card: "0 1px 4px rgba(0,0,0,0.08)",
  modal: "0 20px 60px rgba(0,0,0,.2)",
  elevated: "0 4px 20px rgba(0,0,0,.12)"
};

export default themes;
