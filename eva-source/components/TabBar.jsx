import { useTheme } from "../context/ThemeContext";

const TabBar = ({ active = "today", onNavigate }) => {
  const t = useTheme();
  const TodayIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={c} strokeWidth="1.5"/><circle cx="10" cy="10" r="3" fill={c}/><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></svg>;
  const BioIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M10 2C10 2 4 8 4 12a6 6 0 0012 0c0-4-6-10-6-10z" stroke={c} strokeWidth="1.5" fill={`${c}15`}/><circle cx="10" cy="12" r="2" fill={c}/></svg>;
  const ProtoIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="5" stroke={c} strokeWidth="1.5" fill={`${c}10`}/><line x1="5" y1="10" x2="15" y2="10" stroke={c} strokeWidth="1.2"/><circle cx="10" cy="6" r="1.5" fill={c}/></svg>;
  const ProfIc = ({c}) => <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke={c} strokeWidth="1.5"/><path d="M3 18c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>;
  const tabs = [
    { id:"today", label:"Today", Ic:TodayIc },
    { id:"results-tab", label:"My Biology", Ic:BioIc },
    { id:"protocol", label:"Protocol", Ic:ProtoIc },
    { id:"profile", label:"Profile", Ic:ProfIc },
  ];
  return (
    <div style={{ display:"flex",justifyContent:"space-around",padding:"10px 0 28px",borderTop:`1px solid ${t.b1}`,background:t.bg,flexShrink:0 }}>
      {tabs.map(tab => {
        const isActive = active===tab.id;
        return (
        <div key={tab.id} onClick={() => onNavigate?.(tab.id)} style={{ textAlign:"center",cursor:"pointer",padding:"6px 16px",position:"relative" }}>
          <div style={{ marginBottom:5,display:"flex",justifyContent:"center",transform:isActive?"scale(1.15) translateY(-2px)":"scale(1) translateY(0)",transition:"transform .25s cubic-bezier(.34,1.56,.64,1)" }}><tab.Ic c={isActive?t.cyan:t.t4}/></div>
          <div style={{ fontSize:12,fontWeight:isActive?700:500,color:isActive?t.cyan:t.t4,letterSpacing:.5,transition:"color .2s, font-weight .2s" }}>{tab.label}</div>
        </div>
      );})}
    </div>
  );
};

// ══════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════


/* Mini DNA helix canvas — reusable identity element */

export default TabBar;
