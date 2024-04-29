import React from "react";
import listeningImage from "/public/listening.png";
import talkImage from "/public/talk.png";
import activeImage from "/public/active.png";
import wrongImage from "/public/wrong.png";

import useAudioHandler from "../hooks";
import { GrCertificate } from "react-icons/gr";

export const ShahadaPage = () => {
  const getLanguage = localStorage.getItem("lg")
    ? localStorage.getItem("lg")
    : null;

  const {
    doneOrWrong,
    listening,
    transcript,
    isPlaying,
    styledTranscript,
    startAudioAndListening,
  } = useAudioHandler();

  if (getLanguage === null) {
    window.location.href = "/";
  }

  return (
    <React.Fragment>
      <div className="dark:bg-secondDarkBgColor bg-whiteLightBgColor min-h-screen md:px-[20px] md:pt-0 pt-20 w-full flex justify-center flex-col items-center text-[#fff]">
        <div className="flex justify-center items-center flex-col gap-1 mt-[20px]">
          <p className="dark:text-titleDarkColor text-titleLightColor cursor-pointer md:text-[64px] text-[26px] uppercase font-bold">
            Shahada
          </p>

          <p className="dark:text-paragraphDarkColor text-titleLightColor text-[500] md:text-[20px] text-[1rem]">
            {listening
              ? "repeat after me"
              : doneOrWrong === "done"
              ? "welcome to the new  phase of your life."
              : "Your first step on your path to Islam."}
          </p>

          <div className="mt-[90px] mb-8 overflow-hidden relative img-opacity">
            <img
              src={
                doneOrWrong === "done"
                  ? activeImage
                  : doneOrWrong === "wrong"
                  ? wrongImage
                  : listening
                  ? transcript
                    ? talkImage
                    : listeningImage
                  : listeningImage
              }
              alt="Listening Status"
              className="w-[230px] h-[230px] rounded-full"
            />
            <div className="overlay"></div>
          </div>

          {doneOrWrong === "done" ? (
            <div className="space-y-4">
              <button className="dark:bg-white bg-black dark:text-black text-white w-[240px] h-[60px] rounded-[8px] flex items-center justify-center gap-2">
                <GrCertificate color="gray" />
                Your certificate
              </button>
              <button className="border dark:border-white border-black dark:text-white text-black w-[240px] h-[60px] rounded-[8px] flex items-center justify-center gap-2">
                Learn more
              </button>
            </div>
          ) : null}

          {isPlaying ? null : (
            <button
              className="border mt-[20px] dark:border-white border-black dark:text-white text-black w-[120px] h-[30px] rounded-[4px]"
              onClick={startAudioAndListening}
            >
              Start
            </button>
          )}

          <p className="dark:text-paragraphDarkColor text-titleLightColor text-[500] md:text-[20px] text-[1rem] mt-10">
            {listening ? "I'm listening" : ""}
          </p>
          <p
            className={`text-[500] md:text-[20px] text-center md:w-[100%] w-[80%] text-[1rem] dark:text-paragraphDarkColor text-titleLightColor`}
          >
            {getLanguage === "ar" ? (
              <>
                {styledTranscript.map((word, index) => (
                  <span key={index} style={{ color: "gray" }}>
                    {word.text + " "}
                  </span>
                ))}
              </>
            ) : (
              <>
                {styledTranscript.map((word, index) => (
                  <span
                    key={index}
                    style={{ color: word.isCorrect ? "gray" : "red" }}
                  >
                    {word.text + " "}
                  </span>
                ))}
              </>
            )}
          </p>
        </div>
      </div>
      <style>
        {`
        div.img-opacity div.overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 210px;
          height: 210px;
          border-radius: 100%;
          background-color: rgba(255, 255, 255);
          opacity: 0.1;
          animation: ${
            transcript ? "opacityChange 2s infinite alternate" : ""
          } ;
        }
        
        /* Add this block */
        @keyframes opacityChange {
          0% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.4;
          }
        }
        
        `}
      </style>
    </React.Fragment>
  );
};
