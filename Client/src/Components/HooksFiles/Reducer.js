const Reducer=(state,action)=>{
const {url,pdf,notes,editNotes,accDataVerify,currentFolder,currentTab}=state

switch(action.type){

    case"ChangeUrl":
   // return {url:action.recdata,pdf:action.setpdffile,accDataVerify:accDataVerify,currentFolder:currentFolder,currentTab:currentTab,notes:notes,editNotes:editNotes}

   return {...state,url:action.recdata,pdf:action.setpdffile,}
        
        case"setpdf":
        return {...state,pdf:action.setpdffile,}

        case"setAccountData":
        return{...state,accDataVerify:action.accData }

        case"setFolder":
        return{...state,folders:action.setFolder}
      
        case"setcurrentFolder":
        return{...state,currentFolder:action.currentFolderValue}
      
        case"setcurrentTab":
        return{...state,currentTab:action.setcurrentTab}

        case"setCurrentTabData":
        return{...state,currentTabData:action.setCurrentTabData}
       
        case"setimage":
        return{...state,image:action.image}

        case"setnotes":
        return{...state,notes:action.notes}

        case"seteditNotes":
        return{...state,editNotes:action.editNotes}

        case"setreadOnlyText":
        return{...state,readOnlyText:action.readOnlyText}

        case"setselectMultiple":
        return{...state,selectMultiple:action.setselectMultiple}

        case"setmessages":
        return{...state,messages:action.setmessages}
        
        case"setviewAllImages":
        return{...state,viewAllImages:action.setviewAllImages}

        case"setshowFoldersDiv":
        return{...state,showFoldersDiv:action.setshowFoldersDiv}
    
        case"setshowHalfFoldersDiv":
        return{...state,showHalfFoldersDiv:action.setshowHalfFoldersDiv}
    
        case"setonEffect":
        return{...state,onEffect:action.setonEffect}
        
        case"setloading":
        return{...state,loading:action.setloading}
    }
}
export default Reducer