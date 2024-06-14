import { TimerControls } from "./TimerControls";

export function Timer() {
  return (
    <section className="my-[178px] flex flex-col items-center justify-center gap-4 w-[90%] max-w-[500px] mx-auto">
      <TimerControls initialTime={1000 * 60 * 25} />
    </section>
  );
}
