import React,{useEffect} from 'react'
import {IoMdSettings} from 'react-icons/io'; 
import dashTextImg from './images/dash text.png'
import "./Preloader.css"


function Preloader({loading}) {
  const preloaderFunction=()=>{
    if(!loading){
  setTimeout(() => {
    document.getElementById('loading_Maindiv').style.display='none'
  }, 500);
    }
  }
  
  useEffect(() => {
    preloaderFunction()
  }, [loading])
  
  useEffect(() => {
  
    
  
    
  }, [])
    return (
        <div id="loading_Maindiv" style={{opacity:loading?100:0,transition:'1s'}}>
        <div id='loading_Centered_Div'>
          <div id="loading_loader_div">
            <IoMdSettings id="loading_loader1" size={55} color={'white'}/>
            <IoMdSettings id="loading_loader2" size={55} color={'white'}/>
            <IoMdSettings id="loading_loader3" size={55} color={'white'}/>
          </div>
          <div><img src={dashTextImg} className="dashTextImg"/></div>
          <span id="loading_textArea">Page is Loading . . . .</span>
        </div>
      </div>
    )
}

export default Preloader
