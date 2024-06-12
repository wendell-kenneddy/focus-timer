import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "../../hooks/useTheme";

export function SwitchThemeButton() {
  const { theme, switchTheme } = useTheme();

  return (
    <button onClick={switchTheme} name="Change page theme">
      {theme == "dark" ? (
        <Sun color="#f8f8fc" size={32} weight="bold" />
      ) : (
        <Moon color="#121214" size={32} weight="bold" />
      )}
    </button>
  );
}
