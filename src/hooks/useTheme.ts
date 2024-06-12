import { useContext } from "react";
import { ThemeContext, ThemeContextData } from "../contexts/ThemeContext";

export function useTheme() {
  return useContext(ThemeContext) as ThemeContextData;
}
