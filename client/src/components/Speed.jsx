import { ReactInternetSpeedMeter } from "react-internet-meter";
// import "react-internet-speed-meter/dist/index.css";

import React from "react";
import { useState } from "react";

const SpeedTest = () => {
    const [wifiSpeed, setwifiSpeed] = useState("Checking ... ");
  return (
    <div>
    {/* <h2>Internet speed is {wifiSpeed}  </h2>   */}
    <ReactInternetSpeedMeter
        txtSubHeading={+ wifiSpeed + " MB/s"}
        outputType="alert"
        customClassName={null}
        txtMainHeading="Network bandwidth"
        pingInterval={3000} // milliseconds
        thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
        threshold={8}
        imageUrl="https://www.sammobile.com/wp-content/uploads/2019/03/keyguard_default_wallpaper_silver.png"
        downloadSize="2550420" //bytes
        callbackFunctionOnNetworkDown={(speed) =>
          console.log(`Internet speed is ${speed}`)
        }
        callbackFunctionOnNetworkTest={(speed) => setwifiSpeed(speed)}
      />
      
    </div>
  );
};

export default SpeedTest;
