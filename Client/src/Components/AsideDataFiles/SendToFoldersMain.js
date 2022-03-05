import React,{useContext, useState} from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'; 
import {FaRegFolderOpen} from 'react-icons/fa';
import  '../../css/SendToFoldersMain.css'
import { BsShieldLock } from 'react-icons/bs'; 
import NotesContext from '../Notes/NotesContext/NotesContext'
import Folder from '../../images/folder.png'
import Context from '../HooksFiles/Context'
import NotesFunc from '../Notes/NotesFunc/NotesFunc'
import CommonFunctions from '../CommonFiles/CommonFunction/CommonFunctions'
import axios from 'axios'



function SendToFoldersMain() {

        const [selectedFolder,setselectedFolder]=useState("select a Folder")
        const {notesState,notesDispatch}=useContext(NotesContext)
        const {state,dispatch}=useContext(Context)
        const [progress,setprogress]=useState(0)
        const [showprogress,setshowprogress]=useState(false)
        const [onLoad_message,setonLoad_message]=useState('')
        const folderName=state.folders
        const {selectMultipleNotes}=NotesFunc()
        const {selectFolder}=CommonFunctions()
        const mappingData=folderName
        const {showSendToFolderMain,Notes}=notesState



    return (
        <div id="SendToFoldersMain" style={{width:showSendToFolderMain?"100%":"0%"}}>
            <div  style={{display:showSendToFolderMain?'block':'none'}}>

            
            <div 
            onClick={()=>notesDispatch({type:"setshowSendToFolderMain",setshowSendToFolderMain:!showSendToFolderMain})}
            id="SendToFoldersMain_backArrow">
            
                <AiOutlineArrowLeft size={34} color="white"/>
                </div>
                <div id="SendToFoldersMain_Header">
                    Select the Folder To Send Files
                </div>

                               
                <div id="selectedFolder_Name">{selectedFolder}</div>
                <div id="SendToFoldersMain_mappingFolders">
                {mappingData!==undefined ?mappingData.map((folder_datass,index)=>
                     <figure key={index} id='folder_image_figure' className={`folder_image_figure${index}`}  style={{height:"27%"}} onClick={()=>selectFolder(setselectedFolder,folder_datass,index)}>

                     {/* --------------------- Folders Images Section ----------------   */}
         
                                     <div>
                                   
                                         <div id="folder_image_div"  >
                                             <FaRegFolderOpen key={index+1} id='folders_icon_images' size={70}/>
                                             <BsShieldLock id="folders_secure_icon" size={30} style={{display:folder_datass.secure===true ? 'block' : 'none',marginTop:'-16%',left:"68%"}}/>  
                                         </div>
         
                                         
                                     </div>
         
                     {/* --------------------------- Folders Images Caption -------------------------   */}
         
                                     <figcaption key={index+2} id="folders_icon_images_name" style={{display:'flex',justifyContent:'center'}}>
                                         {folder_datass.name}
                                     </figcaption>
                                 
                                 </figure>  
                ):null}
               
            </div>
            <div id="sendFiles_buttonDiv">
                <button className="btn btn-dark" style={{width:'100%',height:"100%"}} onClick={()=>selectMultipleNotes(selectedFolder,setprogress,setshowprogress,setonLoad_message)}> Send </button>
         </div>
            </div>
          
        </div>
    )
}

export default SendToFoldersMain
