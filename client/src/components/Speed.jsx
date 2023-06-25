import { ReactInternetSpeedMeter } from "react-internet-meter";
// import "react-internet-speed-meter/dist/index.css";

import React from "react";
import { useState } from "react";

const SpeedTest = () => {
    const [wifiSpeed, setwifiSpeed] = useState("Checking....");
  return (
    <div>
    <h2>Internet speed is {wifiSpeed }MB/s</h2>  
    <ReactInternetSpeedMeter
        txtSubHeading={+ wifiSpeed + " MB/s"}
        outputType="alert"
        customClassName={null}
        txtMainHeading="Network bandwidth"
        pingInterval={3000} 
        thresholdUnit="megabyte" 
        threshold={8}
        imageUrl="https://www.sammobile.com/wp-content/uploads/2019/03/keyguard_default_wallpaper_silver.png"
        downloadSize="2550420" 
        callbackFunctionOnNetworkDown={(speed) =>
          console.log(`Internet speed is ${speed}`)
        }
        callbackFunctionOnNetworkTest={(speed) => setwifiSpeed(speed)}
      />
      
    </div>
  );
};

export default SpeedTest;
