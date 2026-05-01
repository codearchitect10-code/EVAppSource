import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";

const SafetyGateAlert = ({level="red",marker="hs-CRP",value="22.4 mg/L",threshold="Critical: > 20.0 mg/L",onBook,onDismiss}) => {
  const t = useTheme();
  const isRed = level==="red";
  const color = isRed ? "#DC2626" : "#F59E0B";
  const bgColor = isRed ? "#DC262608" : "#F59E0B08";
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ background:bgColor,borderBottom:`2px solid ${color}`,padding:`${SAFE_TOP}px 24px 16px`,display:"flex",alignItems:"center",gap:14 }}>
        <div style={{ width:36,height:36,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L1 16h16L9 2z" fill="none" stroke="#FFF" strokeWidth="1.8"/><path d="M9 7v4M9 13v1" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </div>
        <div>
          <div style={{ fontSize:14,fontWeight:800,color:color,letterSpacing:1,textTransform:"uppercase" }}>{isRed?"CRITICAL ALERT":"URGENT ALERT"}</div>
          <div style={{ fontSize:13,color:t.t2,marginTop:2 }}>{isRed?"Immediate medical attention required":"Physician review within 48–72 hours"}</div>
        </div>
      </div>
      <div style={{ flex:1,padding:"28px 28px",overflowY:"auto" }}>
        <div style={{ fontSize:22,fontWeight:700,color:t.t1,marginBottom:12,lineHeight:1.3 }}>{marker} is outside safe range</div>
        <div style={{ fontSize:15,color:t.t2,lineHeight:1.6,marginBottom:20 }}>Your result requires {isRed?"immediate":"prompt"} medical evaluation. All optimisation recommendations for this marker have been paused.</div>
        <Card style={{ border:`1.5px solid ${color}30`,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8 }}>
            <span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>{marker}</span>
            <span style={{ fontSize:20,fontWeight:700,color:color }}>{value}</span>
          </div>
          <div style={{ height:6,background:t.bg,borderRadius:3 }}>
            <div style={{ width:"95%",height:"100%",background:color,borderRadius:3 }}/>
          </div>
          <div style={{ fontSize:12,color:color,fontWeight:600,marginTop:6 }}>{threshold}</div>
        </Card>
        <Card style={{ background:`${color}06`,padding:16 }}>
          <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8 }}>WHAT THIS MEANS</div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.7 }}>{isRed?"This result is in the critical range and may indicate a serious condition requiring emergency evaluation. Please contact your physician or visit an emergency facility.":"This result is significantly outside optimal range and needs medical assessment. Our clinical team has been notified and will review your case within 48–72 hours."}</div>
        </Card>
        <Card style={{ padding:16 }}>
          <div style={{ fontSize:12,fontWeight:700,color:t.t3,letterSpacing:1.5,marginBottom:8 }}>OPTIMISATION STATUS</div>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:color }}/>
            <div style={{ fontSize:14,color:t.t2 }}>All supplement recommendations for {marker} are <span style={{ fontWeight:600,color:color }}>paused</span> until cleared by your physician.</div>
          </div>
        </Card>
      </div>
      <div style={{ padding:"0 24px 16px",display:"flex",flexDirection:"column",gap:12 }}>
        <Btn onClick={onBook} style={{ background:color }}>{isRed?"Call Physician Now":"Book Physician Consultation"}</Btn>
        {!isRed&&onDismiss&&<Btn variant="muted" onClick={onDismiss}>I understand — remind me later</Btn>}
      </div>
    </div>
  );
};

export default SafetyGateAlert;
