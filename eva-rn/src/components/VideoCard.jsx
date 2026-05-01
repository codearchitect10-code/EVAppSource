import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";

const PlayIcon = ({ color = "#FFF", size = 14 }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path d="M4 2l10 6-10 6V2z" fill={color} />
  </Svg>
);

const PauseIcon = ({ size = 14 }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Rect x="3" y="2" width="4" height="12" rx="1" fill="#FFF" />
    <Rect x="9" y="2" width="4" height="12" rx="1" fill="#FFF" />
  </Svg>
);

const CloseIcon = ({ size = 12, color = "#FFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <Path d="M2 2l8 8M10 2l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const SkipBackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
    <Path d="M10 4V1L6 5l4 4V6a6 6 0 11-1.5 11.5" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SkipFwdIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
    <Path d="M10 4V1l4 4-4 4V6a6 6 0 101.5 11.5" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const parseDurationSecs = (duration) => {
  if (!duration || !duration.includes(":")) return 0;
  const [m, s] = duration.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
};

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const VideoCard = ({ title, duration, permanent }) => {
  const t = useTheme();
  const [playing, setPlaying] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlTimer = useRef(null);
  const intervalRef = useRef(null);

  const hideControls = () => {
    if (controlTimer.current) clearTimeout(controlTimer.current);
    controlTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    if (playing && !paused) hideControls();
    return () => { if (controlTimer.current) clearTimeout(controlTimer.current); };
  }, [playing, paused]);

  useEffect(() => {
    if (!playing || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          setPaused(false);
          return 0;
        }
        return p + 0.15;
      });
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [playing, paused]);

  const durSec = parseDurationSecs(duration);
  const elapsed = Math.floor((progress / 100) * durSec);

  const handleTapScreen = () => {
    setShowControls(true);
    hideControls();
  };

  if (!permanent && removed) return null;

  if (!permanent && dismissed) {
    return (
      <View style={styles.minimisedRow}>
        <TouchableOpacity
          onPress={() => setDismissed(false)}
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <PlayIcon color={t.purple} size={12} />
          <Text style={[styles.minimisedText, { color: t.purple }]}>Watch: {title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRemoved(true)}
          style={[styles.miniCloseBtn, { backgroundColor: `${t.t3}15` }]}
        >
          <CloseIcon size={8} color={t.t3} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {/* Fullscreen player modal */}
      <Modal
        visible={playing}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => { setPlaying(false); setPaused(false); setProgress(0); }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleTapScreen}
          style={styles.playerBg}
        >
          {/* Faux video background */}
          <View style={styles.fakePoster}>
            <Svg width={64} height={64} viewBox="0 0 64 64" fill="none">
              <Circle cx="32" cy="32" r="28" stroke="#FFF" strokeWidth="1.5" opacity={0.15} />
              <Path d="M26 20l18 12-18 12V20z" fill="#FFF" opacity={0.15} />
            </Svg>
          </View>

          {/* Controls overlay */}
          {showControls && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation?.()}
              style={styles.controlsOverlay}
            >
              {/* Top bar */}
              <View style={styles.topGradient}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.playerTitle}>{title}</Text>
                  <Text style={styles.playerSubtitle}>EVA™ by Elite Vita</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { setPlaying(false); setPaused(false); setProgress(0); }}
                  style={styles.closeBtnLg}
                >
                  <CloseIcon size={14} />
                </TouchableOpacity>
              </View>

              {/* Centre controls */}
              <View style={styles.centreControls}>
                <TouchableOpacity
                  onPress={() => setProgress((p) => Math.max(0, p - 5))}
                  style={styles.skipBtn}
                >
                  <SkipBackIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPaused(!paused)} style={styles.playBtn}>
                  {paused ? <PlayIcon size={28} /> : <PauseIcon size={28} />}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setProgress((p) => Math.min(100, p + 5))}
                  style={styles.skipBtn}
                >
                  <SkipFwdIcon />
                </TouchableOpacity>
              </View>

              {/* Progress bar */}
              <View style={styles.bottomGradient}>
                <View style={styles.progressRow}>
                  <Text style={styles.timeLabel}>{fmt(elapsed)}</Text>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                  </View>
                  <Text style={[styles.timeLabel, { textAlign: "right" }]}>{duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Modal>

      {/* Thumbnail card */}
      <View style={[styles.card, { borderColor: t.b1, backgroundColor: t.s1 }]}>
        <TouchableOpacity
          onPress={() => { setPlaying(true); setPaused(false); setProgress(0); setShowControls(true); }}
          style={[styles.thumbnail, { backgroundColor: `${t.purple}18` }]}
          activeOpacity={0.85}
        >
          <View style={styles.thumbMeta}>
            <View style={[styles.playCircle, { backgroundColor: "rgba(255,255,255,0.9)" }]}>
              <PlayIcon color={t.purple} size={14} />
            </View>
            <View>
              <Text style={[styles.thumbTitle, { color: t.t1 }]}>{title}</Text>
              <Text style={[styles.thumbDur, { color: t.t3 }]}>{duration}</Text>
            </View>
          </View>
          {!permanent && (
            <TouchableOpacity
              onPress={(e) => { setDismissed(true); }}
              style={[styles.dismissBtn, { backgroundColor: `${t.t3}20` }]}
            >
              <CloseIcon size={10} color={t.t3} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  playerBg: {
    flex: 1,
    backgroundColor: "#000",
  },
  fakePoster: {
    flex: 1,
    backgroundColor: "#0a0a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topGradient: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: (Platform.OS === "android" ? StatusBar.currentHeight || 24 : 54) + 8,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  playerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  playerSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  closeBtnLg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  centreControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    flex: 1,
  },
  skipBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomGradient: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  timeLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "600",
    minWidth: 32,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
  minimisedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  minimisedText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  miniCloseBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
  },
  thumbnail: {
    height: 100,
    justifyContent: "flex-end",
    padding: 12,
  },
  thumbMeta: {
    position: "absolute",
    left: 16,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  playCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  thumbTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  thumbDur: {
    fontSize: 11,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  dismissBtn: {
    position: "absolute",
    right: 12,
    top: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VideoCard;
