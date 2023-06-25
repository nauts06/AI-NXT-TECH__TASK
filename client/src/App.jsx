import React from "react";
import WebcamRecorder from "./components/Final";
import SpeedTest from "./components/Speed";
import Sore from "./components/Sore";

const App = () => {
  return (
    <div className="bg-gray-200 h-screen"> <div className="flex items-stretch sm:w-[100%] md:w-[60%]" style={{  height: "99%" , margin:"auto" ,   }}>
    <WebcamRecorder />

    
  </div></div>
   
  );
};

export default App;
