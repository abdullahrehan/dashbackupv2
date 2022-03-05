import React,{useContext} from 'react'
import Context from '../../HooksFiles/Context'
import Dispatchfunc from '../../CommonFiles/CommonFunction/Dispatchfunc'
import NotesContext from '../NotesContext/NotesContext'
import NotesDispatchfunc from '../NotesFunc/NotesDispatchfunc'
import axios from 'axios'

function NotesFunc() {
   
    const {state,dispatch}=useContext(Context)
    const {notesState,notesDispatch}=useContext(NotesContext)
    const {notesdispatchfun}=NotesDispatchfunc()
    const {dispatchfun}=Dispatchfunc()
    const {Notes}=notesState

    
    const FilesData=()=>{
        
        const apidata={email:state.accDataVerify.email,folder:state.currentFolder}
        axios.post('/notes',apidata)
        .then(res=>notesdispatchfun("setNotes",res.data.value))
        .then(res3=>dispatchfun("setloading",false))
        
    }
    
    // -----------------Requesting to Delete Files -----------------//


    const deleteNotes=(header,body)=>{

    axios.post(`/delete/notes`,
    {email:state.accDataVerify.email,
    header:header,
    data:body,
    folder:state.currentFolder})
    .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
    }
    
        // -----------------Sending File to another Folder -----------------//

    
        const sendFileFunction=(folderName,header,body,index)=>{
        

            const dataApi={ email:state.accDataVerify.email,
                            folder:folderName.name,
                            header:header,
                            body:body,
                            currentFolder:state.currentFolder,
                            currentTab:state.currentTab,
                            sendtofile:true}

            const dataApi2={email:state.accDataVerify.email,
                            header:header,
                            data:body,
                            folder:state.currentFolder}                            
            
                            
            axios.post("/sendtofoldersNotes",dataApi)
        
            .then(res=> axios.post(`/delete/notes`,dataApi2)
            
            .then(res=> dispatchfun("setonEffect",state.onEffect+1)))
    
        }
        

        const showAdvanceFeatures=()=>{
            const array=[]
            if(Notes!==undefined ){ 
                Notes.map((data,index)=>{
                    if(index!==0){
                        if(document.getElementsByClassName(`checkbox${index}`)[0]!==undefined && document.getElementsByClassName(`checkbox${index}`)[0].checked){
                            array.push(data)
                        }
                    }
                }
            )
            }
        }

        const ExpandMultipleFiles=(value)=>{

                const filtered=Notes.filter((data,index)=>
                    index!==0? document.getElementsByClassName(`checkbox${index}`)[0].checked===true :null

                    )
    
                console.log(filtered.length)
            
                if(filtered.length!==0){
                    // setshowSendToFolderMain(true)
                    notesdispatchfun("setshowSendToFolderMain",true)
                    notesdispatchfun("setSendToButton",value)

                    // setSendToButton(value)
                }
                else{
                    alert('you have not selected any Item')
                }
    
            
        }
    
        const displayDeleteFileDiv=()=>{
    
            const filtered=Notes.filter((data,index)=>index!==0? document.getElementsByClassName(`checkbox${index}`)[0].checked===true :null)
    
            console.log(filtered.length)
        
            if(filtered.length!==0){
            // setDeleteFilesConfirmation(true)
            notesdispatchfun("setDeleteFilesConfirmation",true)

            }
            else{
                alert('you have not selected any Item')
            }
    
        }
    
    
        
    
        const selectAllFunc=()=>{
    
            for(let i=1; i<Notes.length; i++){
            const element=document.getElementsByClassName(`checkbox${i}`)[0]
            console.log(element.checked)
            const selectAllButton=document.getElementById('checkbox_Icon_Main').checked
            element.checked=selectAllButton
            document.getElementsByClassName(`select_div_text${i}`)[0].innerText=selectAllButton ?"Selected" :'Select Image'
        }
        }

        
    const selectMultipleNotes=(selectedFolder,setprogress,setshowprogress,setonLoad_message)=>{
            
        const array2=[]
        setonLoad_message('Files Sended')

        setshowprogress(true)
        Notes.map((data,index)=>{
                if(index!==0){
                    if(document.getElementsByClassName(`checkbox${index}`)[0]!==undefined && document.getElementsByClassName(`checkbox${index}`)[0].checked){
                        array2.push(data)
                    }
                }
        })
        const options={
            onUploadProgress:(progressEvent) =>{
                const {loaded,total}=progressEvent;
                let percent=Math.floor((loaded * 100) /total)
                setprogress(percent)
                console.log(`${loaded}kb of ${total}kb ${percent}%`)
                if(percent===100){ 
                    setTimeout(() => {
                        setshowprogress(false)  
                        
                    }, 1000);}

            }
        }

        axios.post("/sendMultipleFiles/notes",
        {email:state.accDataVerify.email,
        folder:selectedFolder,
        file:array2,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab,
        sendtofile:true},options)
        .then(res=>dispatch({type:"setonEffect",setonEffect:state.onEffect+1}))
        
    // setshowSendToFolderMain(false)
    notesDispatch({type:"setshowSendToFolderMain",setshowSendToFolderMain:false})
    dispatch({type:"setselectMultiple",setselectMultiple:false})
    
    }

    return ({FilesData,deleteNotes,sendFileFunction,showAdvanceFeatures,ExpandMultipleFiles,displayDeleteFileDiv,selectAllFunc,selectMultipleNotes})
}

export default NotesFunc
