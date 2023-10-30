import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const breakT = 5;
  const sessionT = 25;
  const [change, setChange] = useState(true);
  const [breakLength, setBreakLength] = useState(breakT * 60);
  const [sessionLength, setSessionLength] = useState(sessionT * 60);

  const [timeBreak, setTimeBreak] = useState(breakLength);
  const [timeSession, setTimeSession] = useState(sessionLength);

  const [play, setPlay] = useState(false);
  const [reset, setReset] = useState(false);

  const intervalRef = useRef();

  useEffect(() => {
    if (play) {
      intervalRef.current = setInterval(() => {
        if (change) {
          setTimeSession((prevTimer) => prevTimer - 1);
          if (timeSession === 0) {
            const audioElement = document.getElementById('beep');
            audioElement.play();
            setChange(false);
            setTimeSession(sessionT * 60);
          }
        } else {
          setTimeBreak((prevTimer) => prevTimer - 1);
          if (timeBreak === 0) {
            const audioElement = document.getElementById('beep');
            audioElement.play();
            setChange(true);
            setTimeBreak(breakT * 60);
          }
        }
      }, 1000);
  
      return () => {
        clearInterval(intervalRef.current);
      };
    } else {
      setPlay(false);
      clearInterval(intervalRef.current);
    }
  }, [play, change, timeSession, timeBreak]);

  const playCounter = () => {
    setPlay(!play);
  };

  const resetCounter = () => {
    setBreakLength(breakT * 60);
    setSessionLength(sessionT * 60);
    setTimeBreak(breakT * 60);
    setTimeSession(sessionT * 60);
    setChange(true);
    setPlay(false);
    setReset(true);
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  };

  useEffect(() => {
    setTimeBreak(breakT * 60);
    setTimeSession(sessionT * 60);
    setReset(false);
  }, [reset]);

  const handleBreak = (action) => {
    if (play === false ) {
      switch (action) {
        case "increment":
          if( breakLength < 60*60){setBreakLength((time) => time + 60);
          setTimeBreak((time) => time + 60);}
          break;
        case "decrement":
          if(breakLength > 60) {setBreakLength((time) => time - 60);
          setTimeBreak((time) => time - 60);}
          break;
      }
    }
  };

  const handleSession = (action) => {
    if (play === false) {
      switch (action) {
        case "increment":
          if(sessionLength < 60*60){setSessionLength((time) => time + 60);
          setTimeSession((time) => time + 60);}
          break;
        case "decrement":
          if(sessionLength > 60){setSessionLength((time) => time - 60);
          setTimeSession((time) => time - 60);}
          break;
      }
    }
  };

  return (
    <>
      <div className="bg-secondary  text-white p-4 rounded-5">
        <h1><u>Técnica Pomodoro</u></h1>
        <h1>25 + 5</h1>
        <div className="break-session-length">
          <h3 id="break-label">Tiempo de descanso</h3>
          <div className="d-flex align-items-center justify-content-center">
            <button
              id="break-increment"
              onClick={() =>
                breakLength === 60 * 60 ? "" : handleBreak("increment")
              }
              className="btn-focus"
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
            <h2 id="break-length" className="px-3">
              {breakLength / 60}
            </h2>
            <button
              id="break-decrement"
              onClick={() =>
                breakLength === 1 * 60 ? "" : handleBreak("decrement")
              }
              className="btn-focus"
            >
              <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>

          <h3 id="session-label">Tiempo de estudio</h3>
          <div className="d-flex align-items-center justify-content-center">
            <button
              id="session-increment"
              onClick={() =>
                sessionLength === 60 * 60 ? "" : handleSession("increment")
              }
              className="btn-focus"
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
            <h2 id="session-length" className="px-3">
              {sessionLength / 60}
            </h2>
            <button
              id="session-decrement"
              onClick={() =>
                sessionLength === 1 * 60 ? "" : handleSession("decrement")
              }
              className="btn-focus"
            >
              <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </div>

        <div className="timer wrapper">
          <div className="timer">
            <h3 className="mt-3" id="timer-label">{change ? 'Estudiar' : 'Descansar'}</h3>
            <h2 id="time-left">
              {change
                ? (Math.trunc(timeSession / 60) < 10
                    ? "0" + Math.trunc(timeSession / 60)
                    : Math.trunc(timeSession / 60)) +
                  ":" +
                  (timeSession % 60 < 10
                    ? "0" + (timeSession % 60)
                    : timeSession % 60)
                : (Math.trunc(timeBreak / 60) < 10
                    ? "0" + Math.trunc(timeBreak / 60)
                    : Math.trunc(timeBreak / 60)) +
                  ":" +
                  (timeBreak % 60 < 10
                    ? "0" + (timeBreak % 60)
                    : timeBreak % 60)}
            </h2>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <button id="start_stop" className="me-3 btn-focus" onClick={playCounter}>
              <i className="fa-solid fa-play"></i>{" "}
              <i className="fa-solid fa-pause"></i>
            </button>

            <button id="reset" onClick={resetCounter} className="btn-focus">
              <i className="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
        </div>
      </div>

      <div>
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    </>
  );
}

export default App;
