import React,{ useState,useContext, useRef,memo,useEffect} from 'react'
import NotesContext from '../Notes/NotesContext/NotesContext'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NotesFunc from '../Notes/NotesFunc/NotesFunc'
import {HiOutlineDownload} from 'react-icons/hi'; 
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md'; 
import { ImCross } from 'react-icons/im';  
import Context1 from '../HooksFiles/Context'
import Editor from './Editor.js'
import axios from 'axios' 
import '../../css/ImageUpload.css'   
import '../../css/notesUploads.css'   


import { EditorState,getCurrentContent,convertToRaw} from 'draft-js';


const initialstate= EditorState.createEmpty()

function NotesUploads({seteditIconColor}) {

    const {state,dispatch}=useContext(Context1)
    const [NotesData,setNotesData]=useState(initialstate);
    const [notesName,setnotesName]=useState('')
    const [emptyEditor,setemptyEditor]=useState(0)
    
    const {notesState,notesDispatch}=useContext(NotesContext)
    const readOnlyState=state.notes!==null ? state.editNotes :false
    const {deleteNotes}=NotesFunc()
    const {editIconColor,YtNotes}=notesState
    const NotesDataApi=notesState.Notes
    // useEffect(() => {
    //     if(YtNotes!==null && YtNotes!==undefined){
    //         setNotesData(YtNotes)
    //     }
    // })      
    const editorState = "JSON.stringify(convertToRaw(NotesData.getCurrentContent()))"
    console.log(NotesData)
    // console.log(NotesData.getCurrentContent())
    const FileSaver = require('file-saver');    
    const notesData=useRef()

    const NotesIndex=NotesDataApi!==undefined?NotesDataApi.findIndex(data=>data===state.notes):null
    const previewNotes=state.notes!==null?true:false

    const uploadNotes=()=>{
            
        if(notesName===''){alert('field Required')}
    
        else {
        axios.post(`/upload/notes`,
        {email:state.accDataVerify.email,
        header:notesName,
        data:editorState,
        folder:state.currentFolder
        })
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
        }
        setemptyEditor(emptyEditor+1);
        setnotesName("")
    }

    const saveNotes=(index)=>{
        
        const notes=state.notes
        
        axios.post("/notes/update",
        {email:state.accDataVerify.email,
        heading:notesName!==null && notesName!==undefined && notesName!=='' ? notesName : notes.heading ,
        body:editorState,
        currentFolder:state.currentFolder,
        oldheading:notes.heading,
        oldBody:notes.body})

        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
        dispatch({type:"seteditNotes",editNotes:true})  
        
    }
    
    const cross_btn_Notes_upload=()=>{
        setemptyEditor(emptyEditor+1);
        setnotesName('');
        dispatch({type:"setnotes",notes:null})
        dispatch({type:"seteditNotes",editNotes:true})
        notesDispatch({type:"seteditIconColor",seteditIconColor:editIconColor+1})
}

    const DownloadNotes=async(files,index)=>{
        
        var blob = new Blob([document.getElementById("notes_body").textContent], {type: "application/msword"});
        FileSaver.saveAs(blob, `${files.heading}.Docx`);
        
    }

    const editNotes=(index)=>{

        dispatch({type:"seteditNotes",editNotes:false})
        document.getElementById(`textDoc_editIcon${index}`).style.backgroundColor="cadetblue"

    }
console.log(NotesData);
    return (
        <div style={{display:"flex",flex:1}}>
            <div id='notesUpload_main_div' style={{backgroundColor:"#212529"}}  >
                <div id='Showing_upload_image_div_heading_text' style={{borderBottom:"none",height:"100%",transition:'1s'}}>
                    
                                {previewNotes ? '' :'Messages'}
                     

                </div>

                <div id="notes_mainDiv" style={{width :previewNotes ? "74.5%" :null }}>
               
                    <ImCross id='notes_preview_frame_cross_icon' color="white" size={30} 
                    onClick={cross_btn_Notes_upload}/>
               
                    <div id="editor_div" style={{height :previewNotes ? "79%" :null,width :previewNotes ? "12%" :null }}>
                
                        <Editor emptyEditor={emptyEditor} NotesData={NotesData} setNotesData={(value)=>setNotesData(value)}/>
                    
                    </div>
                    {state.notes!==null ?console.log(state.notes):null}
                    
                    <div id="icons_div" style={{display:previewNotes?"block":'none'}}>
                    
                    <AiFillDelete id='textDoc_delete' size={29} onClick={()=>deleteNotes(state.notes.heading,state.notes.body)}  style={{right:"0%",}}/>  
          
                    <MdEdit className='textDoc_editIcon' id={`textDoc_editIcon${NotesIndex}`} size={29}   onClick={()=>{editNotes(NotesIndex)}} style={{right:"0%",top:"16%"}}/>
           
                    <HiOutlineDownload id='textDoc_saveIcon' size={29}  onClick={()=>DownloadNotes(state.notes,NotesIndex)} style={{right:"0%",top:"31%"}}/>
        
                    </div>  
                
                </div> 
               
             
                <div id='Notes_upload_Name_area' style={{top : previewNotes? "17%" :null,position:previewNotes? "absolute" :null,left:previewNotes? "20%" :null }} >
                        <input 
                        type="text"
                        placeholder="Notes Name"
                        id="upload_input"
                        value={ notesName }
                        placeholder={state.notes!==null  ?  state.notes.heading:notesName }
                        readOnly={readOnlyState}
                        onChange={(e)=>setnotesName(e.target.value)}
                        style={{textAlign : previewNotes? "center" :null }}    
                       />
                        
                  {
                        !previewNotes ? 
                        <button style={{float:'right'}} onClick={()=>uploadNotes()} type="button" className="btn btn-dark">
                        Upload
                    </button>
                        :null}
                    </div>
                    {!state.editNotes && state.notes!==null ?

                                
                                    
                <button id="saveButton_notesUpload"  onClick={()=>saveNotes()} type="button" className="btn btn-dark">
                    Save
                </button>
                :null}
                            </div>
            </div>
    )
}

export default memo(NotesUploads)

 