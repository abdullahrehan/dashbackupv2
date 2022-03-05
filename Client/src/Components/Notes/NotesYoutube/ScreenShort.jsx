import React, { useState } from 'react';
import { ScreenCapture } from 'react-screen-capture';
import {VscScreenFull} from 'react-icons/vsc'; 
import {RiFullscreenFill} from 'react-icons/ri'; 
const ScreenShort=({mouseOverScreenShortIcon,setscreenCapture,setPictureCaptured})=> {

  const handleScreenCapture = (screenCapture) => {
    
    setscreenCapture(screenCapture)
    setPictureCaptured(true)

  };

    return (
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <div>
            <button onClick={onStartCapture} id="screenshort-btn">
            {mouseOverScreenShortIcon?
            <RiFullscreenFill size={25} id="notes-screenshort-icon"  color="white" size={40}/>
            :<VscScreenFull size={25} id="notes-screenshort-icon"  color="white" size={40}/>
}
</button>
          </div>
        )}
      </ScreenCapture>
    );
  
};

export default ScreenShort;















// import React, { useState } from 'react';
// import { ScreenCapture } from 'react-screen-capture';

// const ScreenShort=()=> {

//   const [screenCapture,setscreenCapture]=useState("")
//   const handleScreenCapture = (screenCapture) => {
    
//     setscreenCapture(screenCapture)

//   };

//   const handleSave = () => {
//     const screenCaptureSource = screenCapture;
//     const downloadLink = document.createElement('a');
//     const fileName = 'react-screen-capture.png';

//     downloadLink.href = screenCaptureSource;
//     downloadLink.download = fileName;
//     downloadLink.click();
//   };
 

//     return (
//       <ScreenCapture onEndCapture={handleScreenCapture}>
//         {({ onStartCapture }) => (
//           <div>
//             <button onClick={onStartCapture}>Capture</button>
//             <center>
//               <img src={screenCapture} alt='react-screen-capture' />
//               <p>
//                 {screenCapture && <button onClick={handleSave}>Download</button>}
//               </p>
//             </center>
//           </div>
//         )}
//       </ScreenCapture>
//     );
  
// };

// export default ScreenShort;