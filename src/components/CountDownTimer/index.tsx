import { useState } from "react";
import { useTimer } from "react-timer-hook";
import "./styles.scss";
import TimerStyled from "../TimerStyled";

const CountDownTimer = ({ onExpire }: { onExpire?: () => void }) => {
  const [timerStart, setTimerStart] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date | null>(null);

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: expiryTimestamp || new Date(),
    autoStart: false,
    onExpire: () => {
      setTimerStart(false);
      if (onExpire) onExpire();
    },
  });

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  const setTimerBtnHandler = () => {
    const time = new Date();
    const setupTimer =
      Number(hour) * 3600 + Number(second) + Number(minute) * 60;
    time.setSeconds(time.getSeconds() + setupTimer);
    setExpiryTimestamp(time);
    setTimerStart(true);
    restart(time, true);
  };

  return (
    <div className='countdown'>
      {timerStart ? (
        <div className='countdownRunning'>
          <div className='displayTime'>
            <TimerStyled seconds={seconds} minutes={minutes} hours={hours} />
          </div>
          <div className='controller'>
            <button className='buttonTimer' onClick={() => setTimerStart(false)}>
              Cancel
            </button>
            {isRunning ? (
              <button className='buttonTimer' onClick={pause}>
                Pause
              </button>
            ) : (
              <button className='buttonTimer' onClick={resume}>
                Resume
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='countdownNotRun'>
          <div className='input'>
            <input
              className='number-input'
              type='number'
              value={hour}
              onChange={(e) => setHour(+e.target.value)}
              max={24}
              min={0}
            />
            <span>hour</span>
            <input
              className='number-input'
              type='number'
              value={minute}
              onChange={(e) => setMinute(+e.target.value)}
              max={60}
              min={0}
            />
            <span>min</span>
            <input
              className='number-input'
              type='number'
              value={second}
              onChange={(e) => setSecond(+e.target.value)}
              max={60}
              min={0}
            />
            <span>sec</span>
          </div>
          <button className='buttonTimer setup' onClick={setTimerBtnHandler}>
            Set Timer
          </button>
        </div>
      )}
    </div>
  );
};

export default CountDownTimer;
