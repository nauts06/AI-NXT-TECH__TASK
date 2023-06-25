import React, { useRef, useState } from "react";
import { useEffect } from "react";
import SpeedTest from "./Speed";

const WebcamRecorder = () => {
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [startKYC, setStartKYC] = useState(false);

  const [recordedChunks, setRecordedChunks] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(10);

  // geolocation
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  const handleSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleError = (error) => {
    console.log("Error acquiring location:", error.message);
  };

  console.log("isRecording", isRecording);
  const startRecording = () => {
    setIsRecording(true);
    setCountdown(10);
    recordedChunks.length = 0;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();

        console.log("countdown", countdown);
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

    setTimeout(() => {
      stopRecording();
    }, 12000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log("mediaRecorderRef", mediaRecorderRef);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(event.data));
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;

    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const capturedImageUrl = canvas.toDataURL("image/png");
      setCapturedImage(capturedImageUrl);
    }
  };

  const handleStopPlayback = () => {
    recordedVideoRef.current.currentTime = 0;
    recordedVideoRef.current.play();
  };

  let countdownInterval;
  const StopTimer = () => {
    setTimeout(() => {
      if (isRecording) {
        countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
      }
    }, 1500);
  };
  useEffect(() => {
    StopTimer();
    return () => clearInterval(countdownInterval);
  }, [isRecording]);

  return (
    <div className="drop-shadow-md rounded-lg bg-base-200 w-[100%]  self-center sm:w-[100%] md:w-[40%] h-[90%] m-auto ">
      {/* <video autoplay></video> */}
      {isRecording === true ? (
        <video className="py-2" ref={videoRef} autoPlay muted />
      ) : (
        recordedChunks.length > 0 && (
          <video className="py-2" ref={recordedVideoRef} controls>
            <source
              src={URL.createObjectURL(
                new Blob(recordedChunks, { type: "video/webm" })
              )}
              type="video/webm"
            />
          </video>
        )
      )}

      {/* {startKYC === true && isRecording ? (
        <div>{`Recording time remaining: ${countdown}s`}</div>
      ) : null} */}

      {startKYC === false ? (
        <button
          className="btn btn-success  self-center mt-[20%] ml-[35%] "
          onClick={() => setStartKYC(true)}
        >
          Start KYC
        </button>
      ) : (
        <>
          <button className="btn btn-primary ml-2" onClick={startRecording}>
            {!isRecording
              ? " Start Recording"
              : `time remaining: ${countdown}s`}
          </button>

          {!isRecording ? (
            <button
              className="btn btn-secondary"
              disabled
              onClick={stopRecording}
            >
              Stop Recording
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={stopRecording}>
              Stop Recording
            </button>
          )}
        </>
      )}
      {recordedChunks.length > 0 && (
        <div>
          <button className="btn btn-link " onClick={handleCapture}>
            Capture
          </button>
          {/* <button onClick={handleStopPlayback}>Stop Playback</button> */}
        </div>
      )}
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured Frame" />
        </div>
      )}

      {/* ------------------------Geo Location--------------------------------- */}
      {startKYC === true ? (
        <div className="mt-2 ml-[25%] ">
          <button className="btn btn-accent " onClick={handleGeolocation}>
            Get Geo Location
          </button>
          {latitude && longitude && (
            <div>
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
            </div>
          )}
        </div>
      ) : null}

      {/* ----------------rect speed meter---------------------- */}

      {startKYC === true ? (
        <div className="btn btn-neutral  mt-6  w-[100%]">
          <SpeedTest />
        </div>
      ) : null}
    </div>
  );
};

export default WebcamRecorder;
