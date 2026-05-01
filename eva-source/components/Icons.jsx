import { useTheme } from "../context/ThemeContext";

const PillIcon = ({size=22,color}) => { const t=useTheme(); const cl=color||t.emerald; return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="6" stroke={cl} strokeWidth="1.8" fill={`${cl}10`}/><line x1="6" y1="12" x2="18" y2="12" stroke={cl} strokeWidth="1.5"/><circle cx="12" cy="7" r="1.5" fill={cl}/></svg>; };

const InfoIcon = ({size=18,color}) => { const t=useTheme(); const cl=color||t.purple; return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke={cl} strokeWidth="1.5"/><path d="M9 5.5v.5M9 8v4.5" stroke={cl} strokeWidth="1.5" strokeLinecap="round"/></svg>; };

const CheckIcon = ({size=14,color}) => { const t=useTheme(); const cl=color||"#FFF"; return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M3 7.5l3 3 5-6" stroke={cl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>; };

const ChevronLeft = ({size=14,color}) => { const t=useTheme(); const cl=color||t.t3; return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M9 3l-4 4 4 4" stroke={cl} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; };

const ChevronRight = ({size=12,color}) => { const t=useTheme(); const cl=color||t.t4; return <svg width={size} height={size} viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={cl} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; };

const DNAEmojiIcon = ({size=28}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 28 28" fill="none"><path d="M9 2v24M19 2v24" stroke={t.purple} strokeWidth="1.5"/><path d="M9 7h10M9 14h10M9 21h10" stroke={t.purple} strokeWidth="1.2" strokeLinecap="round"/><circle cx="9" cy="2" r="1.5" fill={t.purple}/><circle cx="19" cy="2" r="1.5" fill={t.purple}/></svg>; };

const BloodDropIcon = ({size=28}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 28 28" fill="none"><path d="M14 3C14 3 6 13 6 18a8 8 0 0016 0c0-5-8-15-8-15z" stroke={t.red} strokeWidth="1.5" fill={`${t.red}10`}/></svg>; };

const ClipboardIcon = ({size=28}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 28 28" fill="none"><rect x="6" y="4" width="16" height="20" rx="2.5" stroke={t.emerald} strokeWidth="1.5"/><path d="M10 2h8v4H10z" fill={t.emerald} rx="1"/><path d="M10 12h8M10 16h5" stroke={t.emerald} strokeWidth="1.2" strokeLinecap="round"/></svg>; };

const EyeIcon = ({open,size=18,color}) => { const t=useTheme(); const cl=color||t.t3; return open ? <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke={cl} strokeWidth="1.5"/><circle cx="10" cy="10" r="2.5" stroke={cl} strokeWidth="1.5"/></svg> : <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke={cl} strokeWidth="1.5"/><path d="M3 17L17 3" stroke={cl} strokeWidth="1.5" strokeLinecap="round"/></svg>; };

const AppleIcon = ({size=20,color}) => { const t=useTheme(); return <svg width={size} height={size} viewBox="0 0 24 24" fill={color||t.t1}><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>; };

const GoogleIcon = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;

export { PillIcon, InfoIcon, CheckIcon, ChevronLeft, ChevronRight, DNAEmojiIcon, BloodDropIcon, ClipboardIcon, EyeIcon, AppleIcon, GoogleIcon };
