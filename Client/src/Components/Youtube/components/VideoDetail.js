import React, { useState,useEffect,useContext,memo,useCallback } from 'react'
import  '../style/video.css'
import {FullScreen} from '@chiragrupani/fullscreen-react'
import { AiOutlineYoutube } from 'react-icons/ai'; 
import Context from '../../HooksFiles/Context'
import NotesYoutubeEditor from '../../Notes/NotesYoutube/NotesYoutubeEditor'
import NotesContext from '../../Notes/NotesContext/NotesContext'


const VideoDetail = ({video,videoplaying,selectedVideo}) => {
    // let [isFullScreen, setFullScreen] = React.useState(false);
    const {notesState,notesDispatch}=useContext(NotesContext)
    const {isFullScreen}=notesState
    const {state,dispatch}=useContext(Context)
    const [ytNotes,setytNotes]=useState("")


    if (!video) {
        return <div>
            {/* Loading ... */}
            </div>
    }
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    const notesMode=false

    const fullscreenbtn=(e) => {
      if(isFullScreen)console.log(ytNotes)
      // setFullScreen(!isFullScreen);
      notesDispatch({type:"setisFullScreen",setisFullScreen:!isFullScreen})
    }

    const keydown=(ev)=>{
      if(ev.keyCode == 27) {alert("esc")}
      if(ev.key == "Esc") {alert("esc")}
      alert('ok')
  }

    return (
      //   <FullScreen
      //   isFullScreen={isFullScreen}
      //   onChange={(isFull) => {
      //     // setFullScreen(isFull);
      //     notesDispatch({type:"setisFullScreen",setisFullScreen:isFull})

      //   }}
      //   onKeyDown={keydown}

      // >
      <>
        <div 
        style={{width:isFullScreen?"100vw":notesMode?"321px":"655px",height:isFullScreen?"100vh":"475px",marginTop:isFullScreen?"0px":"10px",marginLeft:isFullScreen?null:notesMode?"-50px":"-47px",display:selectedVideo?"block":"none"}}>
           
            <div className='ui embed' style={{marginTop:isFullScreen?"0px":"3px",marginLeft:isFullScreen?"0px":"15px"}}>
              <div style={{display:isFullScreen?"block":"none",position:"absolute"}}>
             {isFullScreen?   <NotesYoutubeEditor ytNotes={ytNotes} setytNotes={setytNotes}/>
                :null}</div>
                <iframe onDoubleClick={()=>alert("!isFullScreen")} src={videoSrc} allowFullScreen title='Video player' id="iframe" allowTransparency={false}/>
            </div>
            <div className='ui segment'  style={{display:videoplaying?"none":"block"}}>
                <h4 className='ui header'>{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>
        {/* <video id="rightVideo"  type="video/mp4"/> */}
        <AiOutlineYoutube  style={{right:isFullScreen?"53%":"53%",bottom:isFullScreen?"0%":"6%",}} size={30} color={"white"} onClick={fullscreenbtn} id="full-screen-btn"/>
</>
        // </FullScreen>

    )
}

export default VideoDetail;