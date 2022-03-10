import React, { useState,useEffect,useContext,memo,useCallback, useReducer } from 'react'
import Context from '../HooksFiles/Context'
import axios from 'axios' 
import {MdSelectAll} from 'react-icons/md'; 
import {BiSend} from 'react-icons/bi'; 
import {AiTwotoneDelete} from 'react-icons/ai'
import { useImmer } from "use-immer";
import { AiOutlineYoutube } from 'react-icons/ai'; 
import NotesData from './NotesData'
import Youtube from './Youtube'
import FolderSystem from '../CommonFiles/CommonComponents/FoldersSystem/FoldersSystem'
import Securepopup from '../AsideDataFiles/Securepopup'
import TabsHeading from '../AsideDataFiles/TabsHeading'
import ViewAllFiles from '../AsideDataFiles/ViewAllFiles'
import NotesUploads from '../UploadingFiles/NotesUploads'
import AsideData  from '../AsideDataFiles/AsideData'
import LoadingDiv from '../AsideDataFiles/LoadingDiv'
import SendToFoldersMain from '../AsideDataFiles/SendToFoldersMain'
import CommonFunctions from '../CommonFiles/CommonFunction/CommonFunctions'
import NotesFunc from './NotesFunc/NotesFunc'
import NotesReducer from './NotesContext/NotesReducer'
import {NotesReducerVar} from '../ReducersVar/ReducersVar'
import NotesContext from './NotesContext/NotesContext'
import SelectMultiple from '../CommonFiles/CommonComponents/SelectMultiple/SelectMultiple'
import Tabs from '../CommonFiles/CommonComponents/Tabs/Tabs.jsx'
import '../../css/DefaultTab.css'
import '../../css/youtube.css'
import '../../css/Images.css'
import './Css/Notes.css'
import {FullScreen} from '@chiragrupani/fullscreen-react'


function Notes() {
 
    const {state,dispatch}=useContext(Context)
    const [viewAllDB,setviewAllDB]=useImmer()
    const folderName=state.folders
    const [ImagesDataApi,setImagesDataApi]=useImmer()
    const [EffectOn,setEffectOn]=useImmer(0)
    const [tabs,settabs]=useImmer([]) 
    const previewNotes=state.notes!==null?true:false
    const [showYoutube,setShowYoutube]=useState(false)
    const [ytNotes,setytNotes]=useState("")
    const foldersDiv=state.showFoldersDiv
    const LoadingNotes=state.loading 

    const {notesState,notesDispatch}=useContext(NotesContext)
    const {isFullScreen}=notesState


    const {openFolder,recentFoldersData,selectMultipleFunc,foldersData,ViewAllMode,ViewAllMode2,setViewAllMode}=CommonFunctions()


    
    useEffect(() => {

        
        foldersData()
        recentFoldersData()
        // ImagesDataApi
    
    },[EffectOn,state.onEffect])

    
    useEffect(() => {
        ViewAllMode()
        
    }, [])
    
    useEffect(() => {
        setviewAllDB(ViewAllMode2())
        
    }, [state.url])
    
    const a=()=>{
        if(state.notes!==null){
            dispatch({type:"setviewAllImages",setviewAllImages:true})
    
        }
        else if(state.notes===null ){

            if(viewAllDB===true){
                dispatch({type:"setviewAllImages",setviewAllImages:true})
    
            }
            else{
            dispatch({type:"setviewAllImages",setviewAllImages:false})
            }
        }
    
    
    }


    const ShowYoutubeFunc=()=>{
        setShowYoutube(!showYoutube)
    }
    

    useEffect(() => {
        a()    
    },
    [state.notes])

    
return (
    <FullScreen isFullScreen={isFullScreen} onChange={(isFull) => { notesDispatch({type:"setisFullScreen",setisFullScreen:isFull}) }}  style={{display:"flex"}} >

    <div id='NotesData-Main-div' onLoad={()=>  dispatch({type:"setloading",setloading:false}) }>
    {/* {!isFullScreen?

    <div id="NotesUploads" style={{flex:previewNotes? 3 :1}}>
        <NotesUploads />
    </div>
    :null} */}
    
    <div id="blur_div" style={{display:foldersDiv?'block':"none"}} onClick={openFolder}></div>
     
        <div id="NotesData" style={{width:showYoutube?"52%":"50%",flex:showYoutube?2:1}}>
        

        {!isFullScreen?

        <div style={{display:showYoutube?"none":"flex"}} className="tabs_div">

        <Tabs  
        setImagesDataApi={(value)=>setImagesDataApi(value)}
        EffectOn={EffectOn}
        setEffectOn={(value)=>setEffectOn(value)}
        />
        </div>
        :null}
            {!isFullScreen?

        <div style={{display:showYoutube?"none":"flex",flex:1}}>
        
        <TabsHeading ImagesDataApi={ImagesDataApi!==undefined ? ImagesDataApi:undefined }/>
        </div>
:null}
        {previewNotes?null:
        <>   

        <SelectMultiple showYoutube={showYoutube}/>    
        {!isFullScreen?

<div style={{display:showYoutube?"none":"flex"}}>

        <FolderSystem 
        EffectOn={EffectOn}
        openFolder={openFolder}
        setEffectOn={(value)=>setEffectOn(value)}
        setImagesDataApi={(value)=>setImagesDataApi(value)}
        />  
        
        <SendToFoldersMain/>
 
        </div>
        :null}

    </> }
    
    <div id="messages-data"  >

{/* 
{!isFullScreen?

    <div style={{display:showYoutube?"none":"flex",flex:1}}>
            {previewNotes?
        <div style={{flex:1,marginLeft:"1px"}}/>:
        <ViewAllFiles />
        }
</div>
:null} */}

<AiOutlineYoutube size={50} id="youtube-icon" onClick={ShowYoutubeFunc}/>
<div style={{display:showYoutube?"block":"none",overflow:"hidden"}}>
    <Youtube />
    </div>
    {!isFullScreen?

        <NotesData/>
:null}
        {/* <div id='loader' style={{display:LoadingNotes?'block':'none'}}>

            <LoadingDiv/>

        </div> */}

    </div>
    
    </div>
        
        </div>  
        
</FullScreen>
)}

export default memo(Notes)
