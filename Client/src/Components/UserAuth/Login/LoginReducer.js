const MainReducer=(state,action)=>{

    switch(action.type){
    
        // This will trigure when the user press the sign in button and save all the data of fields as well as confirmation code and signup message
       
       
        case"changeLoginUserData":return {
            ...state,
            loginuserimage:action.LoginUserimage,
            loginusername:action.LoginUsername,
            loginuseremail:action.LoginUseremail,
            loginuserpassword:action.LoginUserpassword,
            passwordIncorrectDiv:action.PasswordIncorrectDiv,
            passwordIncorrectPageError:action.PasswordIncorrectPageError        }   
       
        case"changeLoginUserImage":return {...state,loginuserimage:action.LoginUserimage}   
      
        case"changeLoginUserName":return {...state,loginusername:action.LoginUsername}   
        case"changeLoginUserEmail": return {...state,loginuseremail:action.LoginUseremail}
        case"changeLoginUserPassword": return {...state,loginuserpassword:action.LoginUserpassword}
      
        case"changePasswordIncorrectDiv":return {...state,passwordIncorrectDiv:action.PasswordIncorrectDiv}  
        case"changeEmailIncorrectPageError":return {...state,emailIncorrectPageError:action.EmailIncorrectPageError}    
        case"changePasswordIncorrectPageError":return {...state,passwordIncorrectPageError:action.PasswordIncorrectPageError}    
        case"changeAllFieldMandatoryLoginErrror":return {...state,allFieldMandatoryLoginErrror:action.AllFieldMandatoryLoginErrror}    
    
        
    }
    }
    export default MainReducer