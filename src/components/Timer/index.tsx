import { TimerControls } from "./TimerControls";

export function Timer() {
  return (
    <section className="my-[178px] flex flex-col items-center justify-center gap-4 w-[90%] max-w-[500px] mx-auto">
      <h2 className="sr-only">Timer controls</h2>

      <TimerControls initialTime={1000 * 60 * 2} />
    </section>
  );
}
