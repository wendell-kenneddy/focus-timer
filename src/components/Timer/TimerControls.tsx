import {
  PlayCircle,
  PauseCircle,
  StopCircle,
  Timer,
  SpeakerNone,
  SpeakerHigh,
} from "@phosphor-icons/react";
import { useReducer, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { millisToMinutesAndSeconds } from "../../utils/millisToMinutesAndSeconds";
import { TimerDialog } from "./TimerDialog";
import { spawnNotification } from "../../utils/spawnNotification";
import { timerReducer } from "../../reducers/timerReducer";

interface TimerControlsProps {
  initialTime: number;
}

export interface TimerData {
  clockStatus: ClockStatus;
  alarmStatus: AlarmStatus;
  totalDuration: number;
  currentDuration: number;
}
export type ClockStatus = "paused" | "running" | "inactive";
export type AlarmStatus = "muted" | "unmuted";

export function TimerControls({ initialTime }: TimerControlsProps) {
  const [timerData, dispatchTimer] = useReducer(timerReducer, {
    clockStatus: "inactive",
    alarmStatus: "unmuted",
    currentDuration: initialTime,
    totalDuration: initialTime,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const alarmRef = useRef(document.getElementById("alarm") as HTMLAudioElement);
  const intervalId = useRef(0);
  const formattedTime = millisToMinutesAndSeconds(timerData.currentDuration);
  const { theme } = useTheme();
  const textColor = theme == "dark" ? "text-grayish-white" : "text-light-black";

  if (timerData.clockStatus == "running") {
    document.title = `Focus Timer | ${formattedTime}`;
  }

  if (timerData.currentDuration < 0) {
    playAlarm();
    dispatchTimer({ type: "inactivate-clock", args: intervalId.current });
    spawnNotification("Timer ended!", {
      body: "Shall we go for another round?",
    });
  }

  function changeTotalDuration(newDuration: number) {
    clearInterval(intervalId.current);
    dispatchTimer({ type: "set-total-duration", args: newDuration });
  }

  function playAlarm() {
    if (alarmRef.current.HAVE_ENOUGH_DATA && timerData.alarmStatus == "unmuted") {
      alarmRef.current.play();
    }
  }

  function runClock() {
    if (timerData.clockStatus != "running") dispatchTimer({ type: "activate-clock" });
    intervalId.current = setInterval(() => dispatchTimer({ type: "tick-clock" }), 1000);
  }

  async function handleClockButtonClick() {
    if (window.Notification && Notification.permission != "denied") {
      await Notification.requestPermission();
    }
    if (timerData.clockStatus == "running")
      return dispatchTimer({ type: "pause-clock", args: intervalId.current });
    runClock();
  }

  function handleMiddleButtonClick() {
    if (timerData.clockStatus != "inactive")
      return dispatchTimer({ type: "inactivate-clock", args: intervalId.current });
    setIsModalOpen(true);
  }

  function handleAlarmButtonClick() {
    if (timerData.alarmStatus == "muted") return dispatchTimer({ type: "unmute-alarm" });
    dispatchTimer({ type: "mute-alarm" });
  }

  return (
    <>
      <h2 className="sr-only">Timer controls</h2>

      <span className={`${textColor} font-bold text-8xl`}>{formattedTime}</span>

      <div className="flex items-center justify-center gap-4 rounded-full bg-surface-black py-[22px] px-10">
        <button name="Pause or resume timer" onClick={handleClockButtonClick}>
          {timerData.clockStatus == "inactive" || timerData.clockStatus == "paused" ? (
            <PlayCircle size={64} color="#42d3ff" weight="regular" />
          ) : (
            <PauseCircle size={64} color="#42d3ff" weight="regular" />
          )}
        </button>

        <button
          name="Stop ongoing timer or open options when no timer is running"
          onClick={handleMiddleButtonClick}
        >
          {timerData.clockStatus != "inactive" ? (
            <StopCircle size={64} color="#42d3ff" weight="regular" />
          ) : (
            <Timer size={64} color="#42d3ff" weight="regular" />
          )}
        </button>

        <button name="Mute or unmute alarm" onClick={handleAlarmButtonClick}>
          {timerData.alarmStatus == "muted" ? (
            <SpeakerHigh size={64} color="#42d3ff" weight="regular" />
          ) : (
            <SpeakerNone size={64} color="#42d3ff" weight="regular" />
          )}
        </button>

        <TimerDialog
          isModalOpen={isModalOpen}
          onSubmit={changeTotalDuration}
          onOpenChange={setIsModalOpen}
        >
          <button className="sr-only">Open settings</button>
        </TimerDialog>
      </div>
    </>
  );
}
