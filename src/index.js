import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const AudioTranscriber = () => {
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  const initializeRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + ". ";
        } else {
          interimText += event.results[i][0].transcript;
        }
      }
      setTranscript((prev) => prev + finalText);
      setInterimTranscript(interimText);
    };

    recognition.onerror = (event) => {
      setError(`Error occurred in recognition: ${event.error}`);
    };

    recognitionRef.current = recognition;
  };

  const handleAudioPlay = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const handleAudioEnd = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = url;
      }
    }
  };

  useEffect(() => {
    initializeRecognition();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Audio to Text Converter
        </div><p>*it can transcript initial 30sec of the audio.</p>
        <div className="card-body">
          <input type="file" accept="audio/*" onChange={handleFileChange} />
          <audio ref={audioRef} controls onPlay={handleAudioPlay} onEnded={handleAudioEnd}></audio>
          <div className="transcript">
            <p>Transcript:</p>
            <p className="final-transcript">{transcript}</p>
            <p className="interim-transcript">{interimTranscript}</p>
          </div>
          {error && <p className="error">Error: {error}</p>}
        </div>
      </div>  
    </div>
  );
};

ReactDOM.render(<AudioTranscriber />, document.getElementById("root"));
