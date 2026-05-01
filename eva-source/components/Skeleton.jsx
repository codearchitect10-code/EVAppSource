import { useTheme } from "../context/ThemeContext";

const Skeleton = ({width="100%",height=16,radius=8,style={}}) => {
  const t = useTheme();
  return <div style={{width,height,borderRadius:radius,background:`linear-gradient(90deg,${t.s2} 25%,${t.s3||t.s2}88 50%,${t.s2} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.5s ease infinite",...style}}/>;
};

const SkeletonCard = () => {
  const t = useTheme();
  return <Card style={{padding:16}}>
    <Skeleton width="60%" height={14} style={{marginBottom:12}}/>
    <Skeleton width="100%" height={10} style={{marginBottom:12}}/>
    <Skeleton width="80%" height={10}/>
  </Card>;
};

// ── Empty State ──

export { Skeleton, SkeletonCard };
