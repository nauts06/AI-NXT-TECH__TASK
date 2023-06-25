import React from "react";
import WebcamRecorder from "./components/Final";
import SpeedTest from "./components/Speed";
import Sore from "./components/Sore";

const App = () => {
  return (
    <div className="bg-gray-400 h-screen "> <div className="flex items-stretch " style={{ width: "60%", height: "99%" , margin:"auto" ,   }}>
    <WebcamRecorder />

    {/* <SpeedTest/> */}
  </div></div>
   
  );
};

export default App;
