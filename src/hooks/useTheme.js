import { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";

// Custom hook to access theme context
export function useTheme() {
  return useContext(ThemeContext);
}
