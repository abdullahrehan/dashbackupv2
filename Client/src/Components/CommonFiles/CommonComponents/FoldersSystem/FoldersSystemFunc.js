import { useContext,useCallback } from 'react'
import Context from '../../../HooksFiles/Context'
import axios from 'axios' 


function FoldersSystemFunc(decreaseFolderDiv) {

    const {state,dispatch}=useContext(Context) 
    const tabs=state.currentTabData

// -----------------Requesting to Delete Folder----------------//

const Drop_FolderDelete_icon=(folder_delete_icon,dragedFoldertoDelete,setdeleteSecureFolderPassword)=>{
        
    const deleteFromRecentFolder=tabs.findIndex(data=>data.name===dragedFoldertoDelete.name)
    const index=tabs.findIndex(data=>data.name===dragedFoldertoDelete.name)
    const folder=tabs[index+1] 

    if(dragedFoldertoDelete.secure){
    
        setdeleteSecureFolderPassword(true)

    }
    
    else{
    
        axios.post("/deleteFolder",
        {email:state.accDataVerify.email,
        folderName:dragedFoldertoDelete.name,
        currentFolder:state.currentFolder,
        currentTab:state.currentTab})

        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})

        if(deleteFromRecentFolder!==-1){

            axios.post("/deletRecentFolders",
            {email:state.accDataVerify.email,
            folderName:dragedFoldertoDelete.name,
            currentTab:state.currentTab
            })

        
            if(index+1!==tabs.length){dispatch({type:"setcurrentFolder",currentFolderValue:folder.name})}
            else if (index+1===tabs.length){dispatch({type:"setcurrentFolder",currentFolderValue:"MainFolder"})} 
    
        }
    
    }
    folder_delete_icon.current.style.color="red";

}



    
// ---------------------------Fuction call when User want to Expand the Folder Div---------------------------
    
const expandDiv=useCallback((folderDiv,folders_main_div,arrow_to_increase_folder_div_area,arrow_to_decrease_folder_div_area,create_new_folder,folder_text,folder_delete_icon,deleteFolderText)=>{
    
    folderDiv.current.style.width="49.7%";
    folders_main_div.current.style.display="flex";
    folders_main_div.current.style.flexFlow="wrap";
    arrow_to_increase_folder_div_area.current.style.display='none';
    arrow_to_decrease_folder_div_area.current.style.display='block';
    create_new_folder.current.style.top="-3.8%";
    create_new_folder.current.style.paddingRight="83%";
    folder_text.current.style.display="block";
    folder_text.current.style.position="absolute";
    folder_text.current.style.top="25%";
    folder_text.current.style.right="38%";
    folder_text.current.style.fontSize="2.5vw";
    folderDiv.current.style.zIndex=2;
    folder_delete_icon.current.style.display="block";
    deleteFolderText.current.style.display="block";
    
    },[state.showHalfFoldersDiv])

    const enterFolder=(folder_datass,EffectOn,setEffectOn,setImagesDataApi)=>{
    
        axios.post("/recentFolders",
        {email:state.accDataVerify.email,
        folderName:folder_datass.name,
        currentTab:state.currentTab,
        secure:folder_datass.secure
        })
        .then(res=>{setEffectOn(EffectOn+1)}) 

        setImagesDataApi([])
        dispatch({type:"setcurrentFolder",currentFolderValue:folder_datass.name})
        dispatch({type:"setonEffect",setonEffect:state.onEffect+1})
    }

    
// ---------------------------Fuction call when User want to Close the Folder Div---------------------------
    
const shrinkDivfunc=useCallback((folderDiv,folder_text,deleteFolderText,folder_delete_icon,arrow_to_decrease_folder_div_area,arrow_to_increase_folder_div_area,folders_main_div,create_new_folder)=>{
    
    folderDiv.current.style.width="9.2%";
    folder_text.current.style.display="none";
    deleteFolderText.current.style.display="none";
    folder_delete_icon.current.style.display="none";
    arrow_to_decrease_folder_div_area.current.style.display='none';

    setTimeout(() => {
    
    arrow_to_increase_folder_div_area.current.style.display='block';
    
    }, 450);
 
    setTimeout(() => {
    
    folders_main_div.current.style.display="block";      
    create_new_folder.current.style.top="-1.9%";
    create_new_folder.current.style.paddingRight="0%";
    folder_text.current.style.right="0%";

    }, 600);
    
    },[decreaseFolderDiv])
    


    return ({Drop_FolderDelete_icon,expandDiv,enterFolder,shrinkDivfunc})
}

export default FoldersSystemFunc
