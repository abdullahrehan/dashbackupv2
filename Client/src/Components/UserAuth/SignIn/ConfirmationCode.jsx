import React,{useState,useContext} from 'react'
import {BiError} from "react-icons/bi";
import {IoMdArrowRoundBack as Back} from "react-icons/io";
import AuthFuctions from '../Apis/AuthanticationApis'
import axios from 'axios'
import Context from '../../HooksFiles/Context'
import PagesContexts from '../Contexts/PagesContexts'
import { useHistory } from 'react-router';
import "./Css/ConfirmationCode.css"
function ConfirmationCode() {

  const {secoundSignupbtn}=AuthFuctions()
    
    const {SignInPageContextState,SignInPageContextDispatch}=useContext(PagesContexts)
    const {signinusername,signinuseremail,signinuserpassword,confirmCode,signupmessage,inCompleteCodeError}=SignInPageContextState
    const history=useHistory();
    let {state,dispatch}=useContext(Context)  
    let [ConfirmationCodeInput,setconfirmationCodeInput]=useState({inputOne:"",inputTwo:"",inputThree:"",inputFour:""}) // ---- Confirmation Code Inputs which get the code ----//
    let Confirmation_Code=ConfirmationCodeInput.inputOne+ConfirmationCodeInput.inputTwo+ConfirmationCodeInput.inputThree+ConfirmationCodeInput.inputFour
    let userdetails={name:signinusername,email:signinuseremail,password:signinuserpassword,confirmation_Code:Confirmation_Code}   


  // ------------------------- Confirm Sign Up button   -------------------------//

  const jwtfunction=()=>{ 
    
    axios("/jwt",{withCredentials: true})
    
    .then(res=>{

      if (res.status !== 200) { console.log('Looks like there was a problem. Status Code: ' + res.status); }

      else{ return res.data[0] }
    
    })
    
    .then(res2=> res2!==undefined ? dispatch({type:"setAccountData",accData:res2}) : null )
  

}


    return (
        <>
        <div id='confirmation_code'>
        <Back onClick={()=>history.goBack()} size={30} style={{cursor:"pointer"}}/>
       
        <div id='confirmation_code_header_text' >
        <a style={{fontSize:'1.2em'}}>We have sent an activation code on your email</a>
        <a > Write the received code in the section below </a>
        </div>

         <div id='confirmation_code_inputs_maindiv'>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...ConfirmationCodeInput,inputOne:e.target.value})}}/>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...ConfirmationCodeInput,inputTwo:e.target.value})}}/>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...ConfirmationCodeInput,inputThree:e.target.value})}}/>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...ConfirmationCodeInput,inputFour:e.target.value})}}/>
        </div> 
       
        <button id='confirmation_code_submit_btn' className='btn btn-dark' onClick={()=>secoundSignupbtn(userdetails,jwtfunction,Confirmation_Code,SignInPageContextDispatch)} >Submit</button>
     
        <div id="confirmation_code_incorrect_error">{signupmessage}</div>
        <div id='confirmation_code_incomplete_error' style={{display: inCompleteCodeError ? "block" : "none"}}><BiError/>  All the filds Are Mandatory</div>
        <div id='confirmation_code_resend_email_text'>If you haven't received any email yet .<br/>Click this Link :<a href='/'> Resend Email </a> </div>
   
        
        </div>
        <h1 style={{display:confirmCode ? 'block' : 'block'}}>
            Hello
        </h1>
    </>)
}

export default ConfirmationCode
