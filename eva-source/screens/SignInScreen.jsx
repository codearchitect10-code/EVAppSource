import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { SAFE_TOP } from "../assets/css";
import { AppleIcon, EVAFullLogo, EyeIcon, GoogleIcon, LoadingBtn, Title, TopBar } from "../components";

const SignInScreen = ({ onNavigate, onBack }) => {
  const t = useTheme();
  const [form, setForm] = useState({email:"",pass:""});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socialAuth, setSocialAuth] = useState(null);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const handleSignIn = () => { setLoading(true); setTimeout(()=>onNavigate("otp-verify"),300); };
  const handleSocial = (provider) => { setSocialAuth(provider); setTimeout(()=>onNavigate("welcome-back"),1500); };
  const u = (k,v) => setForm({...form,[k]:v});
  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",background:t.bg,padding:`${SAFE_TOP}px 24px 20px`,position:"relative" }}>
      <TopBar onBack={onBack}/>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:20 }}><EVAFullLogo width={70} /></div>
      <Title sub="Welcome back to your longevity journey.">Sign In</Title>
      <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>EMAIL</div>
          <input value={form.email} onChange={e=>u("email",e.target.value)} placeholder="you@example.com" type="email" style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 19px",border:`1px solid ${form.email.length>0?(emailValid?t.emerald:`${t.gold}80`):t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit",transition:"border .2s" }}/>
          {form.email.length>0&&!emailValid&&<div style={{ fontSize:12,color:t.gold,marginTop:6,fontWeight:500 }}>Please enter a valid email address</div>}
        </div>
        <div style={{ marginBottom:6 }}>
          <div style={{ fontSize:11,color:t.t3,marginBottom:12,letterSpacing:2,fontWeight:700 }}>PASSWORD</div>
          <div style={{ position:"relative" }}>
            <input value={form.pass} onChange={e=>u("pass",e.target.value)} placeholder="Enter your password" type={showPass?"text":"password"} style={{ width:"100%",boxSizing:"border-box",background:t.s2,borderRadius:12,padding:"17px 48px 17px 19px",border:`1px solid ${t.b2}`,fontSize:16,color:t.t1,outline:"none",fontFamily:"inherit" }}/>
            <div onClick={()=>setShowPass(!showPass)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer" }}><EyeIcon open={showPass}/></div>
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          {error&&<div style={{ fontSize:13,color:t.red,fontWeight:500,flex:1 }}>{error}</div>}
          <div onClick={()=>onNavigate("forgot-password")} style={{ fontSize:14,color:t.purple,cursor:"pointer",fontWeight:500,marginLeft:"auto" }}>Forgot password?</div>
        </div>
        <LoadingBtn loading={loading} onClick={handleSignIn}>Sign In</LoadingBtn>
        <div style={{ display:"flex",alignItems:"center",gap:14,margin:"16px 0" }}>
          <div style={{ flex:1,height:1,background:t.b2 }}/><span style={{ fontSize:13,color:t.t3,fontWeight:500 }}>or continue with</span><div style={{ flex:1,height:1,background:t.b2 }}/>
        </div>
        <div onClick={()=>handleSocial("Apple")} style={{ background:"#000",border:"1px solid #000",borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer",marginBottom:8 }}>
          <AppleIcon size={24} color="#FFF"/><span style={{ fontSize:15,fontWeight:600,color:"#FFF" }}>Continue with Apple</span>
        </div>
        <div onClick={()=>handleSocial("Google")} style={{ background:t.s2,border:`1px solid ${t.b2}`,borderRadius:14,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer" }}>
          <GoogleIcon size={18}/><span style={{ fontSize:15,fontWeight:600,color:t.t1 }}>Continue with Google</span>
        </div>
      </div>
      <div style={{ textAlign:"center",fontSize:14,color:t.t3,paddingBottom:12 }}>Don't have an account? <span style={{ color:t.cyan,cursor:"pointer",fontWeight:600 }} onClick={()=>onNavigate("create-account")}>Get Started</span></div>
      {socialAuth&&<div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:`${t.bg}F2`,zIndex:50,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"fadeUp .2s ease both" }}>
        <div style={{ width:56,height:56,borderRadius:"50%",background:socialAuth==="Apple"?"#000":t.s2,border:socialAuth==="Google"?`1px solid ${t.b2}`:"none",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}>
          {socialAuth==="Apple"?<AppleIcon size={24} color="#FFF"/>:<GoogleIcon size={24}/>}
        </div>
        <div style={{ fontSize:17,fontWeight:600,color:t.t1,marginBottom:8 }}>Signing in with {socialAuth}</div>
        <div style={{ width:32,height:32,borderRadius:"50%",border:`2.5px solid ${t.b2}`,borderTopColor:t.purple,animation:"spin 1s linear infinite" }}/>
      </div>}
    </div>
  );
};


export default SignInScreen;
