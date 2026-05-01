import { useState } from "react";
import { Line } from "recharts";
import { useTheme, useToast } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { Btn, Card, Label, Title, TopBar } from "../components";

const SubscriptionScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const toast = useToast();
  const [showCancel, setShowCancel] = useState(false);
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px` }}>
      <TopBar onBack={onBack}/>
      <Title sub="Manage your EVA™ membership.">Subscription</Title>
      <div style={{ flex:1,overflowY:"auto" }}>
        <Card style={{ background:`${t.purple}06`,border:`1.5px solid ${t.purple}20`,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:t.purple,letterSpacing:1,marginBottom:4 }}>ACTIVE PLAN</div>
              <div style={{ fontSize:20,fontWeight:700,color:t.t1 }}>Core Package</div>
            </div>
            <div style={{ background:t.emerald,borderRadius:8,padding:"7px 15px",fontSize:12,fontWeight:700,color:"#FFF",letterSpacing:.5 }}>ACTIVE</div>
          </div>
          <div style={{ fontSize:14,color:t.t2,lineHeight:1.6 }}>DNA + Blood Panel + Clinician Review + Supplement Protocol + DEVA™ Daily Insights</div>
        </Card>
        <Label>Supplement Subscription</Label>
        <Card>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10 }}>
            <span style={{ fontSize:16,fontWeight:600,color:t.t1 }}>Monthly Supplements</span>
            <span style={{ fontSize:18,fontWeight:700,color:t.t1 }}>USD 199<span style={{ fontSize:12,color:t.t3,fontWeight:500 }}>/mo</span></span>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3,marginBottom:4 }}><span>Next renewal</span><span style={{ color:t.t1,fontWeight:500 }}>15 April 2025</span></div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3,marginBottom:4 }}><span>Payment method</span><span style={{ color:t.t1,fontWeight:500 }}>•••• 4242</span></div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:t.t3 }}><span>Member since</span><span style={{ color:t.t1,fontWeight:500 }}>February 2025</span></div>
        </Card>
        <Label>Payment History</Label>
        {[{d:"15 Mar 2025",a:"USD 199",s:"Supplements",st:"Paid"},{d:"15 Feb 2025",a:"USD 199",s:"Supplements",st:"Paid"},{d:"4 Feb 2025",a:"USD 1,999",s:"Elite Core",st:"Paid"}].map((p,i)=>(
          <Card key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:14 }}>
            <div><div style={{ fontSize:14,fontWeight:600,color:t.t1 }}>{p.s}</div><div style={{ fontSize:12,color:t.t3,marginTop:2 }}>{p.d}</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:15,fontWeight:700,color:t.t1 }}>{p.a}</div><div style={{ fontSize:11,color:t.emerald,fontWeight:600,marginTop:2 }}>{p.st}</div></div>
          </Card>
        ))}
        <div style={{ marginTop:16 }}>
          <Btn variant="secondary" onClick={()=>toast.show("Payment method updated","success")}>Update Payment Method</Btn>
          <div onClick={()=>setShowCancel(true)} style={{ textAlign:"center",padding:"16px 0",cursor:"pointer" }}><span style={{ fontSize:13,color:t.red,fontWeight:500 }}>Cancel Subscription</span></div>
        {showCancel&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div onClick={()=>setShowCancel(false)} style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(2px)"}}/><div style={{background:t.s1,borderRadius:20,padding:24,maxWidth:320,width:"100%",position:"relative",border:`1px solid ${t.b1}`,boxShadow:"0 16px 48px rgba(0,0,0,.2)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:17,fontWeight:700,color:t.t1}}>Cancel Subscription?</div><div onClick={()=>setShowCancel(false)} style={{width:32,height:32,borderRadius:16,background:t.s2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={t.t3} strokeWidth="1.5" strokeLinecap="round"/></svg></div></div><div style={{fontSize:14,color:t.t2,lineHeight:1.8,marginBottom:20}}>You will lose access to Daily DEVA insights, personalised protocols, clinician oversight, and wearable adjustments. Your data and reports remain accessible. Takes effect at end of billing period.</div><Btn onClick={()=>{setShowCancel(false);toast.show("Subscription cancelled.","success")}} style={{width:"100%",marginBottom:10}}>Confirm Cancellation</Btn><Btn variant="secondary" onClick={()=>setShowCancel(false)} style={{width:"100%"}}>Keep Subscription</Btn></div></div>}
        </div>
      </div>
    </div>
  );
};


export default SubscriptionScreen;
