import React, { useContext, useRef, useState,useEffect } from 'react'
import close from '../../../images/close.png'
import ScreenShort from './ScreenShort'
import {BiNote} from 'react-icons/bi'; 
import { EditorState,convertFromRaw} from 'draft-js';
import {FiSend} from 'react-icons/fi'; 
import './NotesYoutubeEditor.css'
import NotesContext from '../../Notes/NotesContext/NotesContext'
import Context from '../../HooksFiles/Context'
import YtEditor from '../YtEditor'



// import { EditorState,Modifier,getDefaultKeyBinding ,KeyBindingUtil,ContentState,RichUtils,convertFromRaw,readOnly } from 'draft-js';

const initialstate= EditorState.createEmpty()

function NotesYoutubeEditor({ytNotes,setytNotes}) {

    const {state,dispatch}=useContext(Context)
    // const {notesState,notesDispatch}=useContext(NotesContext)
    const [NotesData,setNotesData]=useState(initialstate);
    const [notesName,setnotesName]=useState('')
    const [emptyEditor,setemptyEditor]=useState(0)
    const [notesActiveYoutube,setnotesActiveYoutube]=useState(false)
    const [screenCapture,setscreenCapture]=useState("")
    const [NotesContent,setNotesContent]=useState("")
    const [mouseOverPushBtn,setmouseOverPushBtn]=useState(false)
    const [PushBtnText,setPushBtnText]=useState("")
    const notesIcon=useRef()
    const notesDiv=useRef()
    const crossIcon=useRef()
    const notesIconColor=useRef()
    const screenShortIcon=useRef()
    const pushButton=useRef()
    const {notesState,notesDispatch}=useContext(NotesContext)
    const {isFullScreen}=notesState
    // const [ytNotes,setytNotes]=useState("")

    let [PictureCaptured,setPictureCaptured]=useState(screenCapture!=="")
    
    const [mouseOverScreenShortIcon,setmouseOverScreenShortIcon]=useState(false)


    const notesIconMove=()=>{
        notesDiv.current.style.backgroundColor="#0009"
        setnotesActiveYoutube(true)
        
       
        setTimeout(() => {
        notesIcon.current.style.backgroundColor="black"
        notesIcon.current.style.border="2px solid cadetblue"
        notesIcon.current.style.transform="rotate(90deg)"        
        pushButton.current.style.display="block"
        pushButton.current.style.width="50px"
        pushButton.current.style.left="260px"
        notesDiv.current.style.width="311px"
        notesDiv.current.style.height="560px"
        crossIcon.current.style.display="block"
        crossIcon.current.style.transitionDuration="0.2s"
        screenShortIcon.current.style.display="block"
        document.getElementsByClassName('rdw-editor-main')[0].style.display="block"


        const as=EditorState.createWithContent(convertFromRaw(JSON.parse(NotesData)))
        console.log(as);


        setTimeout(() => {

           
        crossIcon.current.style.left="290px"
        screenShortIcon.current.style.left="233px"
        crossIcon.current.style.opacity=1 
        screenShortIcon.current.style.opacity=1
    
    }, 50);
        },200)
    }
    const moveBack=()=>{
        setnotesActiveYoutube(false)
        notesIcon.current.style.transform="rotate(0deg)"
        notesIcon.current.style.backgroundColor="cadetblue"
        notesIcon.current.style.border="none"        
        notesDiv.current.style.width="10px"
        notesDiv.current.style.height="10px"
        notesDiv.current.style.backgroundColor="red"
        notesDiv.current.style.border="none"
        screenShortIcon.current.style.display="none"
        crossIcon.current.style.left="120px"
        crossIcon.current.style.opacity=1
        screenShortIcon.current.style.opacity=0
        screenShortIcon.current.style.left="20px"
        pushButton.current.style.display="none"
        // pushButton.current.style.width="50px"
        // pushButton.current.style.left="260px"
        document.getElementsByClassName('rdw-editor-main')[0].style.display="none"

        
        setTimeout(() => {crossIcon.current.style.display="none"}, 100);
        // alert(ytNotes)
    }

    const showAddNotes=()=>{
        if(!notesActiveYoutube){

        }
    }

    const toolbar=document.getElementsByClassName("ytp-expand-pause-overlay")[0]
    
    if(toolbar!==undefined){
        toolbar.style.display="none"
    }

    const show=()=>{

        setscreenCapture(null);setPictureCaptured(false)
        const text=document.getElementById("notes-yt-notesDiv")
        if(text!==null){

            const image=document.createElement("img")
            image.src=`${screenCapture}`
            image.style.width="40%"
            image.style.height="20%"
            text.appendChild(image)

        }
    }

    const keydown=(ev)=>{
        if(ev.keyCode == 27) {alert("esc")}
    }
    
    const mouseEnterPushButton=()=>{
        setmouseOverPushBtn(true);
        setTimeout(() => {
            setPushBtnText(" Push to Editor")
        }, 200) 
    }
    const mouseLeavePushButton=()=>{
        setmouseOverPushBtn(false)
        setPushBtnText("")
    }

    // const data2=EditorState.createWithContent(convertFromRaw(JSON.parse(state.notes.body)))




useEffect(() => {
    document.getElementsByClassName('rdw-editor-toolbar')[0].style.display="none"
    document.getElementsByClassName('rdw-editor-main')[0].style.display="none"
    
}, [])
console.log(NotesData);
    return (
        <div id="yt-notes" onKeyDown={keydown}>
             <div id="note-yt-cross" onClick={moveBack} ref={crossIcon}>
                <img src={close}  id="note-yt-cross-icon"/>
            </div>

            <div id="notes-screenshort" ref={screenShortIcon} onMouseEnter={()=>setmouseOverScreenShortIcon(true)} onMouseLeave={()=>setmouseOverScreenShortIcon(false)}>
            
            <ScreenShort mouseOverScreenShortIcon={mouseOverScreenShortIcon} setscreenCapture={setscreenCapture} setPictureCaptured={setPictureCaptured}/>
            </div>
            
            <div id="notes-yt_icon-div" ref={notesIcon} onClick={notesIconMove}>            
                <BiNote size={40} id="note-yt-icon" style={{color:notesActiveYoutube?"white":"black"}}  />
            </div>          
            
            <div 
            id="notes-yt-notesDiv"
            ref={notesDiv}
            // contentEditable={true}
            spellCheck={false}
            onInput={(event)=>{setNotesContent(event.currentTarget.textContent)}}>

              {isFullScreen?<YtEditor 
                emptyEditor={emptyEditor}
                 NotesData={NotesData}
                setNotesData={(value)=>{setNotesData(value);console.log(value);}}/>
:null}
            </div>

            <div id="push-to-editor"
            ref={pushButton}
            style={{width:mouseOverPushBtn?"150px":"50px",left:mouseOverPushBtn?"164px":"260px"}}
            onClick={()=>{notesDispatch({type:"setYtNotes",setYtNotes:{heading:"",body:EditorState.createWithContent(convertFromRaw(JSON.parse(NotesData)))}})}}
            onMouseEnter={mouseEnterPushButton}
            onMouseLeave={mouseLeavePushButton}>
                <FiSend size={30}/>
                {PushBtnText}
            
            </div>
            
            
            <div id="check-screenshort-image-div" style={{display:PictureCaptured?"flex":"none"}}>
                <img src={close} id="screenshort-close-icon" onClick={()=>{setscreenCapture(null);setPictureCaptured(false)}} style={{position:'absolute'}}/>
                <img src={screenCapture} id="screenshort-image"/>
            </div>  

            <button onClick={show} className="btn btn-dark" id="screenshort-upload-btn" style={{display:PictureCaptured?"block":"none"}}>Upload</button>      

        </div>
    )
}

export default NotesYoutubeEditor