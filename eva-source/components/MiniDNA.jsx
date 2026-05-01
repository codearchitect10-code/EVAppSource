import { useEffect, useRef } from "react";

const MiniDNA = ({w=60,h=40,emerald,gold,cyan}) => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = w; canvas.height = h;
    const cy=h/2, amp=h*0.35, numPts=30, twists=1;
    let f=0, raf;
    const draw = () => {
      f++;
      const rot = f * 0.003;
      ctx.clearRect(0, 0, w, h);
      const s1=[], s2=[];
      for (let i=0; i<numPts; i++) {
        const frac=i/(numPts-1), x=frac*w, a1=frac*Math.PI*2*twists+rot;
        s1.push({x, y:cy+Math.sin(a1)*amp, z:(Math.cos(a1)+1)/2});
        s2.push({x, y:cy+Math.sin(a1+Math.PI)*amp, z:(Math.cos(a1+Math.PI)+1)/2});
      }
      const drawS = (pts, col) => {
        for (let i=0; i<pts.length-1; i++) {
          const a=pts[i], b=pts[i+1], z=(a.z+b.z)/2;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=col; ctx.lineWidth=0.6+z*1.8; ctx.globalAlpha=0.1+z*0.7; ctx.lineCap="round"; ctx.stroke();
        }
      };
      drawS(s1, emerald); drawS(s2, gold);
      for (let i=2; i<numPts-2; i+=5) {
        const a=s1[i], b=s2[i], avgZ=(a.z+b.z)/2;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=emerald; ctx.lineWidth=0.4+avgZ*0.8; ctx.globalAlpha=0.05+avgZ*0.2; ctx.stroke();
      }
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return ()=>cancelAnimationFrame(raf);
  }, [w,h,emerald,gold,cyan]);
  return <canvas ref={ref} style={{ width:w,height:h,display:"block" }}/>;
};

/* DEVA™ segment arcs — 6 segments, 3 colours, matching Opt3 exactly */

export default MiniDNA;
