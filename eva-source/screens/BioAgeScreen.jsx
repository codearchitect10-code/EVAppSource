import { useState, useEffect, useRef } from "react";
import { Line } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Card, TopBar, VideoCard } from "../components";

const BioAgeScreen = ({ onBack, onNavigate }) => {
  const t = useTheme();
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [openMarker, setOpenMarker] = useState(null);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => setPhase(4), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);
  const bio=34, chron=38, diff=chron-bio, pace=0.88, pacePos=((pace+1)/4)*100;
  const sc = t.emerald;
  const hist = [{d:"Feb",v:36},{d:"May",v:35},{d:"Aug",v:34.5},{d:"Nov",v:34}];
  const minV=30, maxV=42;
  const mks = [
    {n:"hs-CRP",lb:"Inflammation",s:"improving",pct:50,info:"Measures systemic inflammation. Trending down with Omega-3 protocol. Target: below 1.0 mg/L."},
    {n:"HbA1c",lb:"Blood Sugar",s:"optimal",pct:85,info:"Average blood sugar over 3 months. Healthy glucose metabolism. Maintained with chromium and berberine."},
    {n:"Vitamin D",lb:"Immune",s:"improving",pct:62,info:"Supports immune function, bone health, mood. Your VDR variant needs higher doses. Currently on 4,000 IU D3 + K2."},
    {n:"Testosterone",lb:"Hormones",s:"optimal",pct:90,info:"Key androgen for muscle, energy, mood. Levels within optimal range. No intervention needed."},
    {n:"Triglycerides",lb:"Heart",s:"optimal",pct:88,info:"Blood fat linked to cardiovascular risk. Levels healthy, supported by Omega-3 and dietary guidance."},
    {n:"eGFR",lb:"Kidney",s:"optimal",pct:92,info:"Estimated kidney filtration rate. Kidney function is excellent. No concerns."},
  ];

  /* Canvas DNA helix */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || phase < 2) return;
    const ctx = canvas.getContext("2d");
    const W = 340, H = 180;
    canvas.width = W; canvas.height = H;
    const cy=H/2, amp=60, numPts=60, twists=1.5;
    const emerald=t.emerald, gold=t.gold, cyan=t.cyan;
    let f=0, raf;
    const draw = () => {
      f++;
      const rot = f * 0.003;
      ctx.clearRect(0, 0, W, H);
      const s1=[], s2=[];
      for (let i=0; i<numPts; i++) {
        const frac=i/(numPts-1), x=frac*W, a1=frac*Math.PI*2*twists+rot;
        s1.push({x, y:cy+Math.sin(a1)*amp, z:(Math.cos(a1)+1)/2});
        s2.push({x, y:cy+Math.sin(a1+Math.PI)*amp, z:(Math.cos(a1+Math.PI)+1)/2});
      }
      const drawStrand = (pts, col) => {
        for (let i=0; i<pts.length-1; i++) {
          const a=pts[i], b=pts[i+1], z=(a.z+b.z)/2;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=col; ctx.lineWidth=1+z*3; ctx.globalAlpha=0.08+z*0.75; ctx.lineCap="round"; ctx.stroke();
        }
      };
      drawStrand(s1, emerald); drawStrand(s2, gold);
      for (let i=3; i<numPts-3; i+=4) {
        const a=s1[i], b=s2[i], avgZ=(a.z+b.z)/2;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=i%8===0?gold:emerald; ctx.lineWidth=0.8+avgZ*1.5; ctx.globalAlpha=0.06+avgZ*0.3; ctx.stroke();
        [{pt:a,col:emerald},{pt:b,col:gold}].forEach(({pt,col})=>{
          ctx.beginPath(); ctx.arc(pt.x,pt.y,1.2+pt.z*2.5,0,Math.PI*2);
          ctx.fillStyle=col; ctx.globalAlpha=0.15+pt.z*0.7; ctx.fill();
        });
      }
      const eI1=Math.floor((f*0.008)%numPts), eI2=Math.floor((f*0.008+numPts/2)%numPts);
      [s1[eI1],s2[eI2]].forEach(pt=>{
        if(!pt)return; ctx.beginPath(); ctx.arc(pt.x,pt.y,1.5+pt.z*2,0,Math.PI*2);
        ctx.fillStyle=cyan; ctx.globalAlpha=0.2+pt.z*0.5; ctx.fill();
      });
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return ()=>cancelAnimationFrame(raf);
  }, [phase>=2, t.emerald, t.gold, t.cyan]);

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg }}>
      <div style={{ padding:`${SAFE_TOP}px 24px 0`,flexShrink:0 }}>
        <TopBar onBack={onBack}/>
      </div>
      <div style={{ flex:1,overflowY:"auto",scrollbarWidth:"none" }}>

        {/* DNA HELIX HERO */}
        <div style={{ position:"relative",width:"100%",height:180,marginBottom:4,overflow:"hidden" }}>
          <div style={{ position:"absolute",top:0,bottom:0,left:0,width:40,background:"linear-gradient(90deg, "+t.bg+", transparent)",zIndex:3 }}/>
          <div style={{ position:"absolute",top:0,bottom:0,right:0,width:40,background:"linear-gradient(90deg, transparent, "+t.bg+")",zIndex:3 }}/>
          <canvas ref={canvasRef} style={{ width:340,height:180,display:"block",margin:"0 auto",opacity:phase>=2?1:0,transition:"opacity 2s ease",willChange:"contents" }}/>
          <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:4 }}>
            <div style={{ textAlign:"center",position:"relative",opacity:phase>=1?1:0,transform:phase>=1?"scale(1)":"scale(0.4)",filter:phase>=1?"blur(0)":"blur(12px)",transition:"all 1s cubic-bezier(.2,0,.2,1)" }}>
              <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:140,height:90,borderRadius:"50%",background:t.bg,filter:"blur(28px)",opacity:0.9,zIndex:0 }}/>
              <div style={{ position:"relative",zIndex:1,fontSize:52,fontWeight:800,color:sc,letterSpacing:-3,lineHeight:1 }}>{bio}</div>
              <div style={{ position:"relative",zIndex:1,fontSize:11,color:sc,fontWeight:900,letterSpacing:3,marginTop:5 }}>EVA™ AGE</div>
            </div>
          </div>
        </div>

        {/* Years younger */}
        <div style={{ textAlign:"center",marginBottom:14,opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(10px)",transition:"all .8s ease .5s" }}>
          <span style={{ fontSize:16,fontWeight:700,color:sc }}>{diff} years younger</span>
        </div>

        {/* TRAJECTORY CARD */}
        <div style={{ margin:"0 24px",background:t.s1,borderRadius:18,border:"1px solid "+t.b1,overflow:"hidden",opacity:phase>=3?1:0,transform:phase>=3?"translateY(0)":"translateY(20px)",transition:"all .8s ease" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px 0" }}>
            <div>
              <div style={{ fontSize:13,fontWeight:700,color:t.t1 }}>Your Trajectory</div>
              <div style={{ fontSize:10,color:t.t3,marginTop:2 }}>Trending younger each quarter</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:20,fontWeight:800,color:t.gold,lineHeight:1 }}>{chron}</div>
              <div style={{ fontSize:8,fontWeight:700,color:t.t4,letterSpacing:1.5,marginTop:3 }}>ACTUAL AGE</div>
            </div>
          </div>
          <div style={{ position:"relative",height:120,padding:"8px 16px 0" }}>
            <svg style={{ position:"absolute",top:16,left:16,right:16,width:"calc(100% - 32px)",height:2 }}><line x1="0" y1="1" x2="100%" y2="1" stroke={t.gold} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/></svg>
            <svg width="100%" height="120" viewBox="0 0 280 120" preserveAspectRatio="none">
              <defs><linearGradient id="trajFill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={sc} stopOpacity="0.15"/><stop offset="100%" stopColor={sc} stopOpacity="0"/></linearGradient></defs>
              {phase>=3&&(()=>{const pts=hist.map((h,i)=>({x:20+(i/(hist.length-1))*240,y:12+((maxV-h.v)/(maxV-minV))*85}));const pathD=pts.map((pt,i)=>(i===0?"M":"L")+pt.x+" "+pt.y).join(" ");return <path d={pathD+" L"+pts[pts.length-1].x+" 100 L"+pts[0].x+" 100 Z"} fill="url(#trajFill2)" opacity={1} style={{transition:"opacity .8s ease"}}/>;})()}
              {hist.map((h,i)=>{const x=20+(i/(hist.length-1))*240;const y=12+((maxV-h.v)/(maxV-minV))*85;const isLast=i===hist.length-1;return(<g key={i}>{hist[i+1]&&<line x1={x} y1={y} x2={20+((i+1)/(hist.length-1))*240} y2={12+((maxV-hist[i+1].v)/(maxV-minV))*85} stroke={sc} strokeWidth="2.5" strokeLinecap="round" opacity={phase>=3?1:0} style={{transition:"opacity .5s ease "+(0.3+i*0.2)+"s"}}/>}<circle cx={x} cy={y} r={isLast?6:4} fill={isLast?sc:t.s1} stroke={sc} strokeWidth={isLast?2.5:1.5} opacity={phase>=3?1:0} style={{transition:"opacity .5s ease "+(0.3+i*0.2)+"s"}}>{isLast&&<animate attributeName="r" values="6;8;6" dur="2.5s" repeatCount="indefinite"/>}</circle><text x={x} y={y-12} textAnchor="middle" fill={isLast?sc:t.t3} fontSize={isLast?"13":"11"} fontWeight={isLast?"800":"600"} opacity={phase>=3?1:0} style={{transition:"opacity .5s ease "+(0.4+i*0.2)+"s"}}>{h.v}</text><text x={x} y="115" textAnchor="middle" fill={t.t4} fontSize="9" fontWeight="500">{h.d}</text></g>);})}
            </svg>
          </div>
          <div style={{ display:"flex",justifyContent:"center",gap:20,padding:"12px 16px 14px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:5 }}><div style={{ width:14,height:2.5,borderRadius:2,background:sc }}/><span style={{ fontSize:9,color:t.t3,fontWeight:600 }}>EVA™ Age</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:5 }}><div style={{ width:14,height:0,borderTop:"1.5px dashed "+t.gold,opacity:0.6 }}/><span style={{ fontSize:9,color:t.t3,fontWeight:600 }}>Actual Age ({chron})</span></div>
          </div>
        </div>

        {/* PACE OF AGING */}
        <div style={{ padding:"16px 24px 0",opacity:phase>=3?1:0,transform:phase>=3?"translateY(0)":"translateY(20px)",transition:"all .8s ease .1s" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8 }}>
            <span style={{ fontSize:10,fontWeight:700,color:t.t3,letterSpacing:2 }}>PACE OF AGING</span>
            <span style={{ fontSize:22,fontWeight:800,color:sc }}>{pace}x</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ fontSize:9,color:t.t4 }}>Slow</span>
            <div style={{ flex:1,position:"relative",height:5,borderRadius:3,background:t.s2 }}>
              <div style={{ position:"absolute",left:0,top:0,height:"100%",borderRadius:3,width:phase>=3?pacePos+"%":"0%",background:`linear-gradient(90deg,${sc},${t.cyan})`,transition:"width 2s cubic-bezier(.25,.1,.25,1) .3s" }}/>
              <div style={{ position:"absolute",top:-4,left:phase>=3?pacePos+"%":"0%",transform:"translateX(-50%)",width:13,height:13,borderRadius:"50%",background:sc,border:"2.5px solid "+t.bg,boxShadow:"0 0 8px "+sc+"50",transition:"left 2s cubic-bezier(.25,.1,.25,1) .3s" }}/>
            </div>
            <span style={{ fontSize:9,color:t.t4 }}>Fast</span>
          </div>
        </div>

        {/* POWERED BY YOUR BLOOD */}
        <div style={{ background:t.s1,borderRadius:14,border:"1px solid "+t.b1,padding:"14px 12px",margin:"16px 24px 14px",opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .3s" }}>
          <div style={{ fontSize:10,fontWeight:700,color:t.t3,letterSpacing:2,marginBottom:12 }}>POWERED BY YOUR BLOOD</div>
          {mks.map((m,i)=>{
            const bc=m.s==="optimal"?sc:t.gold;
            const isOpen=openMarker===i;
            return(<div key={i} style={{ marginBottom:i<5?4:0 }}><div onClick={()=>setOpenMarker(isOpen?null:i)} style={{ cursor:"pointer",padding:"6px 0" }}><div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3 }}><div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:12,fontWeight:600,color:t.t1 }}>{m.n}</span><span style={{ fontSize:10,color:t.t3 }}>{m.lb}</span></div><div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:9,fontWeight:600,color:bc,textTransform:"uppercase" }}>{m.s}</span><svg width="10" height="10" viewBox="0 0 10 10" style={{transform:isOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}><path d="M2 3.5l3 3 3-3" stroke={t.t3} strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg></div></div><div style={{ height:3,borderRadius:2,background:t.s2 }}><div style={{ height:"100%",borderRadius:2,background:bc,width:phase>=4?m.pct+"%":"0%",transition:"width 1.5s cubic-bezier(.25,.1,.25,1) "+(0.5+i*0.1)+"s" }}/></div></div>{isOpen&&<div style={{ padding:"8px 0",fontSize:12,color:t.t2,lineHeight:1.7,borderBottom:"1px solid "+t.b1 }}>{m.info}</div>}</div>);
          })}
        </div>

        {/* HOW IT WORKS */}
        <div style={{ padding:"0 24px" }}>
          <Card style={{ marginBottom:14,opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .45s" }}>
            <div style={{ fontSize:15,fontWeight:700,color:t.t1,marginBottom:8 }}>How EVA™ Calculates This</div>
            <div style={{ fontSize:13,color:t.t2,lineHeight:1.8 }}>Your EVA™ Age comes directly from your blood — not a wearable estimate. We use the Klemera–Doubal Method, trained on the NHANES dataset, combining markers from metabolism, inflammation, cardiovascular health, and organ function.</div>
          </Card>
          <VideoCard title="The Biological Age Reality Check" duration="0:40"/>
          <Card style={{ marginBottom:14,opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .6s" }}>
            <div style={{ fontSize:15,fontWeight:700,color:t.t1,marginBottom:12 }}>EVA™ vs. Wearable Ages</div>
            <div style={{ display:"flex",gap:10 }}>
              <div style={{ flex:1,background:t.s2,borderRadius:12,padding:14 }}>
                <div style={{ fontSize:11,fontWeight:700,color:t.t3,letterSpacing:1,marginBottom:6 }}>WEARABLES</div>
                <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>Surface signals — sleep, heart rate, steps. Helpful but short-term noise.</div>
              </div>
              <div style={{ flex:1,background:sc+"08",borderRadius:12,padding:14,border:"1px solid "+sc+"18" }}>
                <div style={{ fontSize:11,fontWeight:700,color:sc,letterSpacing:1,marginBottom:6 }}>EVA™ AGE</div>
                <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>70+ internal blood markers. True long-term health trajectory.</div>
              </div>
            </div>
          </Card>
          <Card style={{ marginBottom:14,opacity:phase>=4?1:0,transform:phase>=4?"translateY(0)":"translateY(20px)",transition:"all .8s ease .75s" }}>
            <div style={{ fontSize:15,fontWeight:700,color:t.t1,marginBottom:12 }}>Why It Matters</div>
            <div style={{ background:sc+"08",borderRadius:12,padding:14,marginBottom:10,border:"1px solid "+sc+"15" }}>
              <div style={{ fontSize:13,fontWeight:700,color:sc,marginBottom:4 }}>Younger than actual age</div>
              <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>Your body is performing like someone {diff} years younger. Strong foundation for long-term health.</div>
            </div>
            <div style={{ background:t.red+"08",borderRadius:12,padding:14,border:"1px solid "+t.red+"15" }}>
              <div style={{ fontSize:13,fontWeight:700,color:t.red,marginBottom:4 }}>Older than actual age</div>
              <div style={{ fontSize:12,color:t.t2,lineHeight:1.7 }}>Added physiological stress — but an opportunity to intervene. Exactly what EVA™ addresses.</div>
            </div>
          </Card>
          <VideoCard title="Biological Age vs. Chronological Age" duration="0:55"/>
          <div style={{ fontSize:11,color:t.t3,textAlign:"center",lineHeight:1.6,fontStyle:"italic",paddingBottom:20 }}>EVA™ Age is a directional signal, not a diagnosis.</div>
        </div>
      </div>
    </div>
  );
};


export default BioAgeScreen;
