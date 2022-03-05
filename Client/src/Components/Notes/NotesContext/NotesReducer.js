const NotesReducer=(state,action)=>{


    switch(action.type){
    
       case"setNotes":return {...state,Notes:action.setNotes}       
       
    
       case"seteditIconColor":return {...state,editIconColor:action.seteditIconColor}       
       
       case"setshowYoutube":return {...state,showYoutube:action.setshowYoutube}       
    
       case"setshowSendToFolderMain":return {...state,showSendToFolderMain:action.setshowSendToFolderMain}       
     
       case"setDeleteFilesConfirmation":return {...state,DeleteFilesConfirmation:action.setDeleteFilesConfirmation}       

       case"setSendToButton":return {...state,SendToButton:action.setSendToButton}       
       
       case"setYtNotes":return {...state,YtNotes:action.setYtNotes}       

       case"setisFullScreen":return {...state,isFullScreen:action.setisFullScreen}       

    }
    }
    export default NotesReducer