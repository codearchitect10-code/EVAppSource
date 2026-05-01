import { useTheme } from "../context/ThemeContext";

const MiniDEVA = ({size=48}) => {
  const t = useTheme();
  const r = 100, circ = 2 * Math.PI * r, gap = 6;
  const segArc = circ / 9;
  const segs = [
    { c: t.purple, pct: 85 },
    { c: t.gold, pct: 75 },
    { c: t.emerald, pct: 90 },
    { c: t.purple, pct: 70 },
    { c: t.gold, pct: 88 },
    { c: t.emerald, pct: 82 },
    { c: t.purple, pct: 78 },
    { c: t.gold, pct: 92 },
    { c: t.emerald, pct: 80 },
  ];
  return (
    <div style={{ width:size, height:size }}>
      <style>{`@keyframes devaRingSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <svg width={size} height={size} viewBox="0 0 240 240">
        <g style={{ transformOrigin:"120px 120px", animation:"devaRingSpin 60s linear infinite" }}>
          {segs.map((seg, i) => {
            const available = segArc - gap;
            const filled = available * (seg.pct / 100);
            const rotation = -90 + i * 40 + (gap / circ) * 180;
            return (
              <g key={i} transform={"rotate(" + rotation + " 120 120)"}>
                <circle cx="120" cy="120" r={r} fill="none" stroke={t.mode==="dark"?t.s2:t.b1} strokeWidth="11" strokeDasharray={available + " " + (circ - available)} />
                <circle cx="120" cy="120" r={r} fill="none" stroke={seg.c} strokeWidth="11" strokeLinecap="round" strokeDasharray={filled + " " + (circ - filled)}>
                  <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur={2 + i * 0.3 + "s"} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MiniDEVA;
