import React from "react";
import { useRef } from "react";

const Sore = () => {
  const videoRef = useRef(null);
  return (
    <div>
     
      <video width="300" height="200"  ref={videoRef} autoplay />
      <button>Play</button>
    </div>
  );
};

export default Sore;
