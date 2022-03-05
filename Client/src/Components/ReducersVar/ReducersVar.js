const appMainReducer=
    {
      serverUrl:'http://localhost:2000',
      onEffect:0,
      url:null,
      image:null,
      selectMultiple:false,
      pdf:null,
      notes:null,
      messages:null,
      viewAllImages:false,
      showFoldersDiv:false,
      showHalfFoldersDiv:false,
      editNotes:true,
      readOnlyText:true,
      accDataVerify:[],
      folders:[],
      currentFolder:'MainFolder',
      currentTab:'imagefolder',
      currentTabData:[],
      pix:window.innerWidth>=320 && window.innerWidth<=768,
      loading:true

    }

    const authReducerVar={ 
    tab:"signin",
    showpassword:false,
    resetkeys:false,
    chooseContext:1,

    }

    const signinReducerVar={ 
    signinusername:"",
    signinuseremail:"",
    signinuserpassword:"",
    errorsigninusername:false,
    errorsigninuseremail:false,
    errorsigninuserpassword:false,
    allFieldMandatorySigninErrror:false,
    signinErrorsEmailDBCheck:false,
    confirmCode:false,
    confirmationCodeInput:{},
    signupmessage:null,
    inCompleteCodeError:false,
    signinInputNo:1,

}

const loginReducerVar={ 
    loginuserimage:"",
    loginusername:null,
    loginuseremail:null,
    loginuserpassword:null,
    passwordIncorrectDiv:false,
    emailIncorrectPageError:false,
    passwordIncorrectPageError:false,
    allFieldMandatoryLoginErrror:false
}


    const NotesReducerVar={
        Notes:[],
        isFullScreen:false,
        YtNotes:null,
        editIconColor:false,
        showYoutube:false,
        showSendToFolderMain:false,
        DeleteFilesConfirmation:false,
        SendToButton:null
    } 
export default appMainReducer;
export {authReducerVar,signinReducerVar,loginReducerVar,NotesReducerVar}