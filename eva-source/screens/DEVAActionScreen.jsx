import { useEffect } from "react";

const DEVAActionScreen = ({ onNavigate, onBack }) => {
  useEffect(() => { onNavigate("deva-insight"); }, []);
  return null;
};


export default DEVAActionScreen;
