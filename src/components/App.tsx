import { useTheme } from "../hooks/useTheme";
import { Header } from "./Header";
import { Timer } from "./Timer";

export function App() {
  const { theme } = useTheme();
  const bgColor = theme == "light" ? "bg-[#f8f8fc]" : "bg-[#121214]";
  const textColor = theme == "dark" ? "text-[#f8f8fc]" : "text-[#121214]";

  return (
    <div className={`${bgColor} ${textColor} w-screen h-screen`}>
      <Header />

      <main>
        <Timer />
      </main>
    </div>
  );
}
