const MainReducer=(state,action)=>{

    switch(action.type){
    
        // This will trigure when the user press the sign in button and save all the data of fields as well as confirmation code and signup message
        
        case"setSignInData":
        return {
            ...state,
            signinusername:action.SigninUsername,
            signinuseremail:action.SigninUseremail,
            signinuserpassword:action.SigninUserpassword,
            confirmCode:action.ConfirmCode,
            confirmationCodeInput:action.ConfirmationCodeInput,
            signupmessage:action.Signupmessage,
            inCompleteCodeError:action.InCompleteCodeError,
            signinInputNo:action.SigninInputNo
        }   
        case"changeSigninUserName":return {...state,signinusername:action.SigninUsername}   
        case"changeSigninUserEmail": return {...state,signinuseremail:action.SigninUseremail}
        case"changeSigninUserPassword": return {...state,signinuserpassword:action.SigninUserpassword}
        
        
        case"changeErrorSigninUserName":return {...state,errorsigninusername:action.ErrorSigninUsername}   
        case"changeErrorSigninUserEmail": return {...state,errorsigninuseremail:action.ErrorSigninUseremail}
        case"changeErrorSigninUserPassword": return {...state,errorsigninuserpassword:action.ErrorSigninUserpassword}
        case"changeAllFieldMandatorySigninErrror": return {...state,allFieldMandatorySigninErrror:action.AllFieldMandatorySigninErrror}

        case"changeConfirmationCodeInput": return {...state,confirmationCodeInput:action.ConfirmationCodeInput}
        case"changeconfirmCode": return {...state,confirmCode:action.ConfirmCode}
        case"changesignupmessage": return {...state,signupmessage:action.Signupmessage}
        case"changeinCompleteCodeError": return {...state,inCompleteCodeError:action.InCompleteCodeError}        
        case"changeSigninInputNo": return {...state,signinInputNo:action.signinInputNo}
        case"signinErrorsEmailDBCheck": return {...state,signinErrorsEmailDBCheck:action.SigninErrorsEmailDBCheck}
    

    }
    }
    export default MainReducer