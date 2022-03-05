import React from 'react'
import Gif from '../../images/const.png'
import "./UnderConstruction.css"

function UnderConstruction() {
    return (

    <div id="resolution_Message">
    
        <img src={Gif} id="resolution_Message_Image"/>
        
        <div id='resolution_Message_Text'>
        
            <span>Unfortunately ! This Area of Website is under under Construction<br/></span>
            <span>Your Screen Size Must Be Greater than 1300px</span> 
        
        </div>   

    </div>
     )
}

export default UnderConstruction
