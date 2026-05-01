import { useTheme } from "../context/ThemeContext";
import Btn from "./Btn";

const LoadingBtn = ({children,onClick,loading,variant="primary",style={},...props}) => {
  const t = useTheme();
  if (loading) return <Btn variant={variant} style={{...style,opacity:.7}} {...props}><span style={{display:"inline-flex",gap:6}}><span style={{animation:"pulse 1s ease infinite"}}>.</span><span style={{animation:"pulse 1s ease .2s infinite"}}>.</span><span style={{animation:"pulse 1s ease .4s infinite"}}>.</span></span></Btn>;
  return <Btn variant={variant} onClick={onClick} style={style} {...props}>{children}</Btn>;
};

// ── Skeleton Loader ──

export default LoadingBtn;
