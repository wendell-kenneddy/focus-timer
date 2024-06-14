import { TimerData } from "../components/Timer/TimerControls";

type ActionType =
  | "activate-clock"
  | "tick-clock"
  | "inactivate-clock"
  | "pause-clock"
  | "mute-alarm"
  | "unmute-alarm"
  | "set-total-duration";

type Action = { type: ActionType; args?: any };

function clearTimer(intervalId?: number) {
  if (typeof intervalId != "number") throw new Error("No intervalId provided.");
  clearInterval(intervalId);
}

export function timerReducer(state: TimerData, action: Action): TimerData {
  switch (action.type) {
    case "activate-clock":
      return { ...state, clockStatus: "running" };
    case "tick-clock":
      return { ...state, currentDuration: state.currentDuration - 1000 };
    case "inactivate-clock":
      clearTimer(action.args);
      document.title = "Focus Timer";
      return { ...state, clockStatus: "inactive", currentDuration: state.totalDuration };
    case "pause-clock":
      clearTimer(action.args);
      document.title = "Focus Timer | Paused";
      return { ...state, clockStatus: "paused" };
    case "mute-alarm":
      return { ...state, alarmStatus: "muted" };
    case "unmute-alarm":
      return { ...state, alarmStatus: "unmuted" };
    case "set-total-duration":
      if (!action.args || typeof action.args != "number")
        throw new Error("No new duration provided.");
      return {
        ...state,
        totalDuration: action.args,
        currentDuration: action.args,
      };
  }
}
