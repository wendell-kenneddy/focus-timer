import { ReactNode, createContext, useState } from "react";

export type Theme = "dark" | "light";

export interface ThemeContextData {
  theme: Theme;
  switchTheme: () => void;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextData | null>(null);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  function handleSwitchTheme() {
    if (theme == "dark") return setTheme("light");
    setTheme("dark");
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme: () => handleSwitchTheme() }}>
      {children}
    </ThemeContext.Provider>
  );
}
