import React from 'react'
import "./Css/AuthHeader.css"

function AuthHeader() {

    return (
        <header id='header' style={{height:"11vh",position:'absolute',zIndex:2}}>  
             
            <div id='header_username' style={{width:"16%",height:'85%'}}></div>
            
            <div id='heading'> Share your Data 
            </div>


            <div style={{display:"flex",flex:2,justifyContent:'space-around',alignItems:"center"}}> </div>
            
        </header>
    )
}

export default AuthHeader
