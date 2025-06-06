// import { useState } from "react";

import "./styles.scss";
import ModifierBoard from "../../components/ModifierBoard";
import RainToggleButton from "../../components/RainToggleButton";

import Footer from "../../layout/Footer";
import { RootState, useAppSelector } from "../../store/store";

// Helper function to show notification for Focus Mode
function showFocusCompleteNotification() {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification("Focus Mode Timer Complete!", {
        body: "Your focus session has ended.",
        icon: "/assets/icons/lofi-logo.gif"
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Focus Mode Timer Complete!", {
            body: "Your focus session has ended.",
            icon: "/assets/icons/lofi-logo.gif"
          });
        }
      });
    }
  }
}

const Home = () => {
  const daynight = useAppSelector((state: RootState) => state.mode);
  const rain = useAppSelector((state: RootState) => state.rain);
  const { mode } = daynight;
  const { rainMode } = rain;
  const combineMode = `${mode}-${rainMode}`;

  return (
    <>
      {/* Embedded the background video base on each state */}
      {/* Night */}
      <video
        className={combineMode === "night-clear" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Night-clear.mp4' type='video/mp4' />
      </video>
      <video
        className={combineMode === "night-rain" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Night-rainny.mp4' type='video/mp4' />
      </video>
      {/* Day */}
      <video
        className={combineMode === "day-clear" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Day-sunny.mp4' type='video/mp4' />
      </video>
      <video
        className={combineMode === "day-rain" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Day-rainny.mp4' type='video/mp4' />
      </video>
      <RainToggleButton />
      <ModifierBoard onFocusExpire={showFocusCompleteNotification} />
      <Footer />
    </>
  );
};

export default Home;
