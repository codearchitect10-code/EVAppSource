import { createContext, useContext } from "react";
import themes from "../theme/tokens";

const ThemeCtx = createContext(themes.dark);
const useTheme = () => useContext(ThemeCtx);

const ToastCtx = createContext({ show: () => {} });
const useToast = () => useContext(ToastCtx);

export { ThemeCtx, useTheme, ToastCtx, useToast };
export default themes;
