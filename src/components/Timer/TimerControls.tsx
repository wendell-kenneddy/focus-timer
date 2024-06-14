import {
  PlayCircle,
  PauseCircle,
  StopCircle,
  Timer,
  SpeakerNone,
  SpeakerHigh,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { millisToMinutesAndSeconds } from "../../utils/millisToMinutesAndSeconds";

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
  const [clockStatus, setClockStatus] = useState<"paused" | "running" | "ended">("ended");
  const [alarmStatus, setAlarmStatus] = useState<"muted" | "unmuted">("unmuted");
  const [totalTime, setTotalTime] = useState(initialTime);
  const { theme } = useTheme();
  const textColor = theme == "dark" ? "text-[#f8f8fc]" : "text-[#121214]";
  let intervalId = useRef(0);

  if (totalTime == -1000) {
    stopClock();
    setTotalTime(initialTime);
    alert("Timer ended!");
  }

  function openSettingsModal() {}

  function runClock() {
    if (clockStatus != "running") setClockStatus("running");
    intervalId.current = setInterval(() => {
      setTotalTime((prevTime) => prevTime - 1000);
    }, 1000);
  }

  function pauseClock() {
    clearInterval(intervalId.current);
    setClockStatus("paused");
  }

  function stopClock() {
    clearInterval(intervalId.current);
    setClockStatus("ended");
    setTotalTime(initialTime);
  }

  function handleClockButtonClick() {
    if (clockStatus == "running") return pauseClock();
    runClock();
  }

  function handleMiddleButtonClick() {
    if (clockStatus == "running" || clockStatus == "paused") return stopClock();
    openSettingsModal();
  }

  function handleAlarmButtonClick() {
    if (alarmStatus == "muted") return setAlarmStatus("unmuted");
    setAlarmStatus("muted");
  }

  return (
    <>
      <span className={`${textColor} font-bold text-8xl`}>
        {millisToMinutesAndSeconds(totalTime)}
      </span>

      <div className="flex items-center justify-center gap-4 rounded-full bg-[#242424] py-[22px] px-10">
        <button name="Pause or resume timer" onClick={handleClockButtonClick}>
          {clockStatus == "ended" || clockStatus == "paused" ? (
            <PlayCircle size={64} color="#42d3ff" weight="regular" />
          ) : (
            <PauseCircle size={64} color="#42d3ff" weight="regular" />
          )}
        </button>

        <button
          name="Stop ongoing timer or open options when no timer is running"
          onClick={handleMiddleButtonClick}
        >
          {clockStatus != "ended" ? (
            <StopCircle size={64} color="#42d3ff" weight="regular" />
          ) : (
            <Timer size={64} color="#42d3ff" weight="regular" />
          )}
        </button>

        <button name="Mute or unmute alarm" onClick={handleAlarmButtonClick}>
          {alarmStatus == "muted" ? (
            <SpeakerNone size={64} color="#42d3ff" weight="regular" />
          ) : (
            <SpeakerHigh size={64} color="#42d3ff" weight="regular" />
          )}
        </button>
      </div>
    </>
  );
}
