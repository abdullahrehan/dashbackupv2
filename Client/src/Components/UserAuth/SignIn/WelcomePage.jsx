import React,{useState,useRef} from 'react'
import {MdAccountCircle} from 'react-icons/md';
import sign from '../../../images/signs.png'
import "./Css/WelcomePage.css"

function WelcomePage({LoginDemoMessage}) {

    const greeting=useRef()        // Greeting Message Div Reference
   

    return (
        <div  id='DemoAccountDiv' ref={greeting}>
                
        <div id="accountIcon">
       
            <MdAccountCircle size={210}/>
            <h4 style={{paddingLeft:'11%'}}>Hello Sir/Mam!</h4>
       
        </div>
       
        <div id='welcomeLine'>
        
            Welcome to the <b>DataSharing App</b>
    
        </div>
        
        <div id='feedbackLine'>
        
            Kindly send us your feed back regerding this Website
        
        </div>
        
        <div style={{position:"relative",top:"1%",left:"1%"}}>
        
            <h4>From</h4>
            <img src={sign} />
        
        </div>
    
    </div>
    )
}

export default WelcomePage
