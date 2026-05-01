import { useState, useCallback } from "react";
import themes from "./theme/tokens";
import { ThemeCtx } from "./context/ThemeContext";
import { ToastProvider } from "./components";
import { FONT, CSS } from "./assets/css";
import SCREENS from "./navigation/routes";

export default function EVAApp() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState([]);
  const [anim, setAnim] = useState("none");
  const [isDark, setIsDark] = useState(false);
  const [profileSection, setProfileSection] = useState(null);
  const [gender, setGender] = useState("male");
  const theme = isDark ? themes.dark : themes.light;

  const nav = useCallback(target => {
    if (target === "profile" && screen !== "profile") setProfileSection(null);
    setAnim("out");
    setHistory(h => [...h, screen]);
    setTimeout(() => { setScreen(target); setAnim("in"); setTimeout(() => setAnim("none"), 300); }, 180);
  }, [screen]);

  const back = useCallback(() => {
    if (!history.length) return;
    setAnim("outB");
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setTimeout(() => { setScreen(prev); setAnim("inB"); setTimeout(() => setAnim("none"), 300); }, 180);
  }, [history]);

  const cur = SCREENS[screen];
  const Comp = cur?.C;
  const as = {
    none: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-30px)", transition: "all .18s" },
    in: { opacity: 1, transform: "translateX(0)", transition: "all .3s cubic-bezier(.2,0,0,1)" },
    outB: { opacity: 0, transform: "translateX(30px)", transition: "all .18s" },
    inB: { opacity: 1, transform: "translateX(0)", transition: "all .3s cubic-bezier(.2,0,0,1)" },
  };

  return (
    <ThemeCtx.Provider value={theme}>
    <ToastProvider>
      <div style={{
        fontFamily: FONT,
        background: theme.bg,
        width: "100vw",
        height: "100dvh",
        minHeight: "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}>
        <style>{CSS}{`
          html, body { margin:0; padding:0; overflow:hidden;
          --sat: env(safe-area-inset-top, 0px);
          --sab: env(safe-area-inset-bottom, 0px); background:${theme.bg}; }
        `}</style>
        <div style={{ height: "100%", ...as[anim] }}>
          {Comp && (
            <Comp
              onNavigate={nav}
              onBack={history.length > 0 ? back : undefined}
              onNext={() => nav("welcome")}
              onToggleTheme={() => setIsDark(!isDark)}
              isDark={isDark}
              profileSection={profileSection}
              setProfileSection={setProfileSection}
              gender={gender}
              setGender={setGender}
            />
          )}
        </div>
      </div>
    </ToastProvider>
    </ThemeCtx.Provider>
  );
}

