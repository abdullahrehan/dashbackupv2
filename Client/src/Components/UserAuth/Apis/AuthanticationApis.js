import axios from 'axios'
import validator from 'email-validator'
import React from 'react'
import { useHistory  } from 'react-router-dom';


function AuthanticationApis() {
    
    const history=useHistory()

// ------------------------- First Sign Up button -------------------------// 

const firstSignupbtn=async(isValid,SignInPageContextState,SignInPageContextDispatch,setSignUpButtonClicked)=>{
    
    const {
        signinusername,
        signinuseremail,
        signinuserpassword,
        errorsigninusername,
        errorsigninuseremail,
        errorsigninuserpassword,
        allFieldMandatorySigninErrror,
        signinErrorsEmailDBCheck
    
    }=SignInPageContextState     


        if(signinusername=='' || signinuseremail=='' || signinuserpassword==''){
            
        console.log(signinusername);
            SignInPageContextDispatch({type:"changeAllFieldMandatorySigninErrror",AllFieldMandatorySigninErrror:true})
            
        }
        else {
            SignInPageContextDispatch({type:"changeAllFieldMandatorySigninErrror",AllFieldMandatorySigninErrror:false})

            if (!validator.validate(signinuseremail)){
                SignInPageContextDispatch({type:"changeErrorSigninUserEmail",ErrorSigninUseremail:true})
            }
            else{
                SignInPageContextDispatch({type:"changeErrorSigninUserEmail",ErrorSigninUseremail:false})

                if(!isValid){
                    SignInPageContextDispatch({type:"changeErrorSigninUserPassword",ErrorSigninUserpassword:true})
                }
                else {
                    SignInPageContextDispatch({type:"changeErrorSigninUserPassword",ErrorSigninUserpassword:false})
                    if(!allFieldMandatorySigninErrror && !errorsigninuseremail && !errorsigninuserpassword){
            
                        SignInPageContextDispatch({type:"changeconfirmCode",ConfirmCode:true})

                    await axios.post(`http://localhost:2000/emailverify`,{email:signinuseremail})
                        .then((res)=>{
                            if(res.data==='available'){
                                alert("available")
                                SignInPageContextDispatch({type:"signinErrorsEmailDBCheck",SigninErrorsEmailDBCheck:false})

                                axios.post(`http://localhost:2000/nameverify`,{name:signinusername})
                                .then((res)=>{
                                
                                if(res.data==='available'){
                                    alert("name available")
                                    SignInPageContextDispatch({type:"changeErrorSigninUserName",errorsigninusername:false})

                                
                                    
                                    if(!signinErrorsEmailDBCheck && !errorsigninusername){
                                        
                                        SignInPageContextDispatch({type:"changeErrorSigninUserPassword",ErrorSigninUserpassword:false})

                                            axios.post(`http://localhost:2000/user/sendConfirmation`,{name:signinusername,email:signinuseremail}, { withCredentials: true })                                                
                                                SignInPageContextDispatch({type:"changesignupmessage",Signupmessage:" "})
                                                history.push("/userauthentication/confirmationCode")
                                                return("ok")

                                            
                                    }
                                
                                }
                            
                                else{ 

                                    SignInPageContextDispatch({type:"changeErrorSigninUserName",errorsigninusername:true})

                                }})
                            }
                            else {
                                SignInPageContextDispatch({type:"signinErrorsEmailDBCheck",SigninErrorsEmailDBCheck:true})
                                
                             }
                        
                        
                        })}}}}  


}
const secoundSignupbtn=(userdetails,jwtfunction,Confirmation_Code,contextApiDispatch)=>{
        
    // -------- Creating new Model in Database for the User -------- //

    const useremail=userdetails.email;
    const username=userdetails.name;

    // -------- if Confirmation Code is Incomplete -------- //

    if(Confirmation_Code.length==4){ 
         
        contextApiDispatch({type:"changeinCompleteCodeError",InCompleteCodeError:false})
        contextApiDispatch({type:"changeconfirmCode",ConfirmCode:true})
     
    axios.post(`http://localhost:2000/user/SignIn`,userdetails, { withCredentials: true })
     .then(res=>{
    
     
     if(res.data=='Data Inserted'){

         axios.post(`http://localhost:2000/setMainfolder`,{email:useremail,name:username})
         jwtfunction()
    
     }
     else if(res.data=="Incorrect"){
         contextApiDispatch({type:"changesignupmessage",Signupmessage:`Confirmation code is incorect`})
     }
     
     contextApiDispatch({type:"changesignupmessage",Signupmessage:`Confirmation code is incorect`})
     console.log(res.data,"Incorrect")
    
 })
     
     // ------ Tells that ConfirmationCode is confirmed Now Remove The SignIn Div
     contextApiDispatch({type:"changeconfirmCode",ConfirmCode:true})

     
     }
     else{ 
         contextApiDispatch({type:"changeinCompleteCodeError",InCompleteCodeError:true})
         contextApiDispatch({type:"changesignupmessage",Signupmessage:""})

    } 
    

     
 }


const SignupWithDemoAccount=(SignInPart,setLoginDemoMessage,LoginDemoMessage,dispatch)=>{   
        
    const userdetailslogin={email:"Demo",password:"Demo"}   //---- Give email and password to the demo account ----//
    SignInPart.current.style.display='none'                 //---- Hidding SignIn/Login Page ----//
    setLoginDemoMessage(true)                               //---- Showing the Welcome Message ----//

    //---- Sending Api request to /user/login to Signup with demo account ----//

    axios.post(`/user/login`,userdetailslogin, { withCredentials: true })
    .then(res=>!LoginDemoMessage ? dispatch({type:"setAccountData",accData:res.data}):null )     
    
    //---- This code Removes the welcome message after 4 secounds ----//

    setTimeout(() => {
        setLoginDemoMessage(false)
        setTimeout(() => {
               
        }, 1000);
    }, 4000);

  
}

return ({firstSignupbtn,SignupWithDemoAccount,secoundSignupbtn})
}

export default AuthanticationApis;