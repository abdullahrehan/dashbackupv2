import React,{useState,useContext,useRef,useEffect} from 'react'
import {BsFillEyeSlashFill as Eyecross} from "react-icons/bs";
import {BsFillEyeFill as Eye} from "react-icons/bs";
import {BiError} from "react-icons/bi";
import Inputs from '../Components/Inputs'
import PagesContexts from '../Contexts/PagesContexts'
import MainContext from '../Contexts/MainContext'
import usePasswordValidator from 'react-use-password-validator'
import AuthFuctions from '../Apis/AuthanticationApis'
import { useHistory } from 'react-router';
import "./Css/SignInPart.css"

function SigninPart({setKeys}) {

    const {firstSignupbtn}=AuthFuctions()

    const {SignInPageContextState,SignInPageContextDispatch}=useContext(PagesContexts)  
    const {AuthMainReducerState,AuthMainReducerDispatch}=useContext(MainContext) 

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

    let [SignUpButtonClicked,setSignUpButtonClicked]=useState(0)
 
    const {tab,showpassword}=AuthMainReducerState
    const {signinInputNo}=SignInPageContextState;                       // ----Stores the input to be focused when come back from other tab ----//
    const history=useHistory()

     // ------------- References ----------------//

     const signInFirstNameInputRef=useRef()
     const signInEmailInputRef=useRef() 
     const signInPasswordInputRef=useRef() 

    
    const SignIn= {display: tab==="login" ? "none": "block" , width:"100%", height:"53%" ,cursor: "pointer"}

    // ------------------------- States for SignIn Errors -------------------------// 

    let [ isValid, setIsValid ] = usePasswordValidator({
            digits: 2,
            lowercase: true,
            uppercase: 1,
            spaces: false
        })
    // ------------------------- First Sign Up button -------------------------//  
  
    const FirstSignupbtn=async()=>{
    
    // ----------- Sending parameter to the first button func ------------- //

    const firstSignupbtnResponse=await firstSignupbtn(isValid,SignInPageContextState,SignInPageContextDispatch,setSignUpButtonClicked)

    // ----------- Setting variables to send data to ConfirmationCode div  ------------- //
        
        setSignUpButtonClicked(SignUpButtonClicked+1)
        // history.push("/userauthentication/confirmationCode")

    }
    
    const SignInError=errorsigninusername||
    errorsigninuseremail||
    errorsigninuserpassword||
    allFieldMandatorySigninErrror

    const setInput=()=>{
    
        if(errorsigninusername){
            SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:1})
           
        }
        else if(errorsigninuseremail){
            SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:2})
    
        }
        else if(errorsigninuserpassword){
            SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:3})
        }
        else if(allFieldMandatorySigninErrror){
            SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:1})
            
        }
    }

    useEffect(() => {
    
        if(SignInError){   
    
            setInput()}
    
    }
    ,[SignUpButtonClicked])

    // ----------- This Code runs when the tab will change and set the focus where the focus where on the last time ------------- //
     
    useEffect(() => {

        if(tab==="signin"){
        
            if(signinInputNo===1 ) signInFirstNameInputRef.current.focus()        
            if(signinInputNo===2 ) signInEmailInputRef.current.focus()
            if(signinInputNo===3 ) signInPasswordInputRef.current.focus()
            if(signinInputNo===4 ) FirstSignupbtn()

        }
        
    },[tab,signinInputNo])

    useEffect(() => {
    
        signInFirstNameInputRef.current.focus()    
        
    }, [])

    return (
        <div style={SignIn}  className='signin-section'>
               
            <div className="signin-username-field">


                <Inputs 
                inputReference={signInFirstNameInputRef}
                inputType="text"
                inputClassName="inputfield"
                inputPlaceholder="First Name"
                inputValue={signinusername}
                inputOnchangeFunction={(e)=>SignInPageContextDispatch({type:"changeSigninUserName",SigninUsername:e.target.value})}
                inputOnfocusFunction={()=>{SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:1});setKeys();AuthMainReducerDispatch({type:"changeKeys",Keys:[]})}}
                inputMaxLength={3}
                inputMinLength={10}/>

                <div id='signin_errors_name' style={{display: errorsigninusername ? 'block' : "none" }}>
        
                    <BiError/> Name is already taken !
        
                </div>
            
            </div>

            <div className="signin-email-field">
                
                <Inputs 
                inputReference={signInEmailInputRef}
                inputType="text"
                inputClassName="inputfield"
                inputPlaceholder="Email"
                inputValue={signinuseremail}
                inputOnchangeFunction={(e)=>SignInPageContextDispatch({type:"changeSigninUserEmail",SigninUseremail:e.target.value})}
                inputOnfocusFunction={()=>{SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:2});setKeys()}}
                inputMaxLength={null}
                inputMinLength={null}/>


                <div id='signin_errors_email' style={{display: errorsigninuseremail ? 'block' : "none" }}>
                
                    <BiError className='signin_error_icon'/> Email Must Valid !
                
                </div>
        
                <div id='signin_errors_email' style={{display: signinErrorsEmailDBCheck ? 'block' : "none" }}>
                    
                    <BiError className='signin_error_icon'/> Account already available !
                    
                </div>
                
            </div>
            
            <div className="signin-password-field">
                
                 <Inputs 
                inputReference={signInPasswordInputRef}
                inputType={showpassword ? "text" : "password" } 
                inputClassName="inputstyl3"
                inputPlaceholder="Password"
                inputValue={signinuserpassword}
                inputOnchangeFunction={(e)=>{SignInPageContextDispatch({type:"changeSigninUserPassword",SigninUserpassword:e.target.value});setIsValid(e.target.value)}}
                inputOnfocusFunction={()=>{SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:3});setKeys()}}
                inputMaxLength={8}
                inputMinLength={20}/>

                <div id='signin_errors_password' style={{display: errorsigninuserpassword ? 'block' : "none" }}>
                    
                    <BiError id='signin_error_icon_password' className='signin_error_icon'/> 
                
                    <span style={{position:'absolute',left:"10%",top:"4%"}}>
                
                        Password must be a combination of digits (atleast 2) , lower and uppercase  letters without any spaces
                
                    </span>
                
                </div>
                
                <div id='show_password_icon'  onClick={()=> {AuthMainReducerDispatch({type:"changeShowpassword",Showpassword:!showpassword})}}>{showpassword ? <Eyecross/> :<Eye/>}</div>
                
            </div>
            
            <div className="recieve-welcome-email-section">
            
                <a className='receivemail' style={{marginTop:'4%',display:allFieldMandatorySigninErrror?'none':'block'}}>
               
                    <input type='checkbox' /> Receive welcome emails
               
                </a>
            
                <div id='signin_fill_all_fields_error' style={{display: allFieldMandatorySigninErrror ? 'block' : "none" }}>
               
                    <BiError/> All the fields are mandatory !
               
                </div>
            
            </div>
            
            <div className="signin-button-section">
                
                <button className='btn btn-dark formSigninBtn' onClick={FirstSignupbtn}>
               
                    Sign Up
               
                </button>
            
            </div>

    </div>
    )
}

export default SigninPart