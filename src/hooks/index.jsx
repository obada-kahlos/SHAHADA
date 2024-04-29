import { useState, useEffect, useRef } from "react";
import audioUrl1 from "/public/shahda-en-1.mp3";
import audioUrl2 from "/public/shahda-en-2.mp3";
import audioArUrl1 from "/public/shahda-ar-1.mp3";
import audioArUrl2 from "/public/shahda-ar-2.mp3";
import audioArUrl3 from "/public/shahda-ar-3.mp3";
import audioArUrl4 from "/public/shahda-ar-4.mp3";
import audioArUrl5 from "/public/shahda-ar-5.mp3";
import audioArUrl6 from "/public/shahda-ar-6.mp3";

const useAudioHandler = () => {
  const getLanguage = localStorage.getItem("lg")
    ? localStorage.getItem("lg")
    : "en";

  const [doneOrWrong, setDoneOrWrong] = useState("");
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const audioUrls =
    getLanguage === "en"
      ? [audioUrl1, audioUrl2]
      : [
          audioArUrl1,
          audioArUrl2,
          audioArUrl3,
          audioArUrl4,
          audioArUrl5,
          audioArUrl6,
        ];
  const shahadaPhrases = {
    en: [
      "I bear witness that there is no god but Allah",
      "And I bear witness that Muhammad is the Messenger of God",
    ],
    ar: [
      "ašhadu",
      "ʾan lā ʾilāha",
      "ʾilla -llāhu,",
      "wa-ʾašhadu ʾ",
      "ʾanna muḥammadan",
      "rasūlu -llāh",
    ],
  };

  const timeoutRef = useRef(null);
  const audioRef = useRef(new Audio(audioUrls[currentAudioIndex]));
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [transcriptColor, setTranscriptColor] = useState("black");
  const [isPlaying, setIsPlaying] = useState(false);
  const [styledTranscript, setStyledTranscript] = useState([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = getLanguage === "ar" ? "ar-SA" : "en-US";

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = transcript;

        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        if (getLanguage === "ar") {
          setTranscript(
            finalTranscript.replace(/\s+/g, "") +
              interimTranscript.replace(/\s+/g, "")
          );
        } else {
          setTranscript(finalTranscript + interimTranscript);
        }
      };

      recognitionRef.current.onstart = () => {
        setListening(true);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };

      recognitionRef.current.onerror = (error) => {
        alert("Speech recognition error: " + error.message);
      };
    } else {
      alert("Speech recognition not supported");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [getLanguage]);

  useEffect(() => {
    audioRef.current.src = audioUrls[currentAudioIndex];
    audioRef.current.onended = () => {
      recognitionRef.current?.start();
    };
  }, [currentAudioIndex]);

  useEffect(() => {
    if (transcript) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        recognitionRef.current?.stop();
        handleValidation();
      }, 5000);
    }
  }, [transcript]);

  const resetTranscript = () => {
    setTranscript("");
  };

  const startAudioAndListening = () => {
    setTranscriptColor("black");
    resetTranscript();
    audioRef.current.play();
    setIsPlaying(true);
  };

  const mapArabicToTransliteration = (arabicText) => {
    const mapping = {
      اشهد: "ašhadu",
      انلااله: "ʾan lā ʾilāha", // Ensure this key has no spaces
      الاالله: "ʾilla -llāhu,",
      واشهد: "wa-ʾašhadu ʾ",
      انمحمدا: "ʾanna muḥammadan",
      رسولالله: "rasūlu -llāh",
    };

    // Normalize by removing all spaces from the Arabic text before trying to map
    const normalizedArabic = arabicText.replace(/\s+/g, ""); // Remove all spaces

    return mapping[normalizedArabic] || arabicText;
  };

  const calculateMatchPercentage = (inputText, targetText) => {
    const inputWords = inputText.toLowerCase().trim().split(" ");
    const targetWords = targetText.toLowerCase().trim().split(" ");
    const matches = inputWords.filter((word) =>
      targetWords.includes(word)
    ).length;
    return (matches / targetWords.length) * 100;
  };

  const handleValidation = () => {
    setDoneOrWrong("");
    let transcriptMapped = transcript;
    if (getLanguage === "ar") {
      transcriptMapped = transcript
        .replace(/\s+/g, "")
        .split(" ")
        .map((word) => mapArabicToTransliteration(word))
        .join(" ");
    }

    console.log({ transcriptMapped });

    const matchPercentage = calculateMatchPercentage(
      transcriptMapped,
      shahadaPhrases[getLanguage][currentAudioIndex]
    );
    const requiredMatchPercentage = getLanguage === "ar" ? 55 : 85; // Different thresholds for languages

    if (matchPercentage >= requiredMatchPercentage) {
      setTranscriptColor("green");
      if (currentAudioIndex + 1 < audioUrls.length) {
        setCurrentAudioIndex(currentAudioIndex + 1);
        setTimeout(startAudioAndListening, 1000); // Wait before starting next audio
      } else {
        setDoneOrWrong("done"); // Indicate completion if it was the last phrase
      }
    } else {
      setTranscriptColor("red");
      setDoneOrWrong("wrong");
      setTimeout(startAudioAndListening, 1000); // Retry the same audio after a pause
    }
  };

  const stopAudioAndListening = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const updateStyledTranscript = () => {
    let inputWords = transcript.split(" "); // Changed `const` to `let` here
    let targetWords = shahadaPhrases[getLanguage][currentAudioIndex]
      .toLowerCase()
      .split(" ");

    if (getLanguage === "ar") {
      inputWords = inputWords.map(mapArabicToTransliteration); // Convert Arabic to transliteration before styling
      targetWords = targetWords.map(mapArabicToTransliteration); // Ensure target words are also transliterated
    }

    const styledWords = inputWords.map((word) => ({
      text: word,
      isCorrect: targetWords.includes(word.toLowerCase()),
    }));
    setStyledTranscript(styledWords);
  };

  useEffect(() => {
    updateStyledTranscript();
  }, [transcript, currentAudioIndex, getLanguage]); // Include getLanguage to react to language changes

  return {
    doneOrWrong,
    transcriptColor,
    listening,
    transcript,
    isPlaying,
    styledTranscript,
    startAudioAndListening,
    stopAudioAndListening,
  };
};

export default useAudioHandler;
