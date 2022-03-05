import React,{useState,useContext,useRef,useEffect,memo} from 'react'
import {BsFillEyeSlashFill as Eyecross} from "react-icons/bs";
import {BsFillEyeFill as Eye} from "react-icons/bs";
import {BiError} from "react-icons/bi";
import PagesContexts from '../Contexts/PagesContexts'
import userlogin from './LoginFunctions'
import MainContext from '../Contexts/MainContext'
import Context from '../../HooksFiles/Context'
import { useHistory } from 'react-router';
import "./Css/LoginPart.css"

function LoginPart({setKeys}) {

    let {state,dispatch}=useContext(Context)  
    let [loginInputNo,setloginInputNo]=useState(1);   
    let {AuthMainReducerState,AuthMainReducerDispatch}=useContext(MainContext) 
    let {LoginPageContextState,LoginPageContextDispatch}=useContext(PagesContexts) 
    let [allFieldMandatoryLoginErrror,setallFieldMandatoryLoginErrror]=useState(false)
   
    const {loginuseremail,loginuserpassword,emailIncorrectPageError,passwordIncorrectPageError}=LoginPageContextState
    const {showpassword,tab}=AuthMainReducerState
    const history=useHistory();

    // ------------------------- Login Styling  -------------------------//

    const LogIn = {display: tab=="login" ? "block" : "none", width:"100%", height:"53%" ,cursor: "pointer"}

    // ------------- References ----------------//
        
    const logInPasswordInputRef=useRef()
    const logInEmailInputRef=useRef() 

    // ------------------------- Log In button   -------------------------//

     const loginbtn=()=>{
            
        if(loginuseremail=='' || loginuserpassword==''){setallFieldMandatoryLoginErrror(true)}
       
        else{ 
        setallFieldMandatoryLoginErrror(false)
        loginuseremail.length<3 ? LoginPageContextDispatch({type:"changeEmailIncorrectPageError",EmailIncorrectPageError:true}) :LoginPageContextDispatch({type:"changeEmailIncorrectPageError",EmailIncorrectPageError:false})         
        loginuserpassword.length<3 ? LoginPageContextDispatch({type:"changePasswordIncorrectPageError",PasswordIncorrectPageError:true}) :LoginPageContextDispatch({type:"changePasswordIncorrectPageError",PasswordIncorrectPageError:false})
        }
      
        userlogin(LoginPageContextState,LoginPageContextDispatch,dispatch,history)
      
  
    }

    
    useEffect(() => {

      if(tab==="login"){

            if(loginInputNo===1) logInEmailInputRef.current.focus()    
            if(loginInputNo===2) logInPasswordInputRef.current.focus()
        }
    },[tab])



    return (
        <>
        <div style={LogIn} className='login-section'>

            <div className="login-email-input">
                
                <input 
                ref={logInEmailInputRef}
                type="text" 
                className="inputfield" placeholder="Email"
                value={loginuseremail} 
                onFocus={()=>{setloginInputNo(1);setKeys();AuthMainReducerDispatch({type:"changeKeys",Keys:[]})}}
                onChange={(e)=>LoginPageContextDispatch({type:"changeLoginUserEmail",LoginUseremail:e.target.value})}/>
            
                <div id='login_errors_email' style={{display: emailIncorrectPageError ? 'block' : "none" }}>
                    <BiError/> Email does not Match !
                </div>
            
            </div>
        
            <div className="login-password-field">
                    <input 
                    ref={logInPasswordInputRef}
                    type={showpassword ? "text" : "password" }
                    className="inputfield"
                    placeholder="Password"
                    value={loginuserpassword}
                    onFocus={()=>{setloginInputNo(2);setKeys()}} 
                    onChange={(e)=>LoginPageContextDispatch({type:"changeLoginUserPassword",LoginUserpassword:e.target.value})}/>
            
                <div id='login_errors_password' style={{display: passwordIncorrectPageError ? 'block' : "none" }}>
                
                    <BiError/>Password does not matched
                
                </div>
                
                <div id='show_password_icon_login'  onClick={()=> {return AuthMainReducerDispatch({type:"changeShowpassword",Showpassword:!showpassword})}}>
                    {showpassword ? <Eyecross/> :<Eye/>}
                </div>
            
            </div>

            <div className="login-errors-field">
                
                <a href="#" style={{color:'white',borderBottom:'1 px solid white'}}>Forget Password ?</a>
            
                <div id='login_fill_all_fields_error' style={{display: allFieldMandatoryLoginErrror ? 'block' : "none" }}>
                    <BiError/> All the fields are mandatory !
                </div>
            </div>
       
            <div className="signinfoam-divno15">
                <button className='btn btn-dark foambtn2' onClick={loginbtn}>Log In</button>
            </div>
            
        </div>        
    </>
    )
}

export default memo(LoginPart)
