import React,{useState,useContext,useRef,useEffect,memo} from 'react'
import { Link, Route, Switch, useHistory  } from 'react-router-dom';
import AuthFuctions from '../Apis/AuthanticationApis'
import {RiAccountPinCircleFill} from "react-icons/ri";
import SigninPart from '../SignIn/SigninPart.jsx';
import MainContext from '../Contexts/MainContext'
import LoginPart from '../Login/LoginPart.jsx';
import Context from '../../HooksFiles/Context'
import Shortcuts from '../../Shortcuts.js'
import './Css/Authentication.css'

  

    function Authentication() {

        const {SignupWithDemoAccount}=AuthFuctions()
        //------------------------------------------Assigning States-----------------------------------------------//

        let {state,dispatch}=useContext(Context)  
        let {AuthMainReducerState,AuthMainReducerDispatch}=useContext(MainContext) 
        let [LoginDemoMessage,setLoginDemoMessage]=useState(false)              // ---- Login Greeting Message -----//

        const {tab}=AuthMainReducerState


        // ------------- User SignIn States ----------------//
        
        let login= tab=="login"                                              // ---- If login is true than login Page is Shown ----//
        let Sigin= tab=="signin"                                            // ---- If signin is true than sign Page is Shown ----//
        let [keys,setKeys]=useState([]);                                   // ---- Array stores the shortcut key Alt+1 or Alt+2 ----//

        const SignInPart=useRef()                                         // ---- SignIn Div Reference ----//      
        const history=useHistory()
        const SetKeys=()=>setKeys([])

    // ------------------------- Sign In With Demo Account   -------------------------//

    //---- Function to Move to the Signin Foam ----//

    const SetTab=(tabName)=>{ AuthMainReducerDispatch({type:"changeTab",Tab:tabName}) }

    //---- Function to Move to the login Foam ----//

    if(keys[0]==="Alt" && keys[1]==="1"){
        SetTab("signin");
        setKeys(['Alt']);
        history.push("/userauthentication/authpage/signin")
    }
        
    if(keys[0]==="Alt" && keys[1]==="2"){
        SetTab("login");
        setKeys(['Alt']);
        history.push("/userauthentication/authpage/login")   
    }       



    
         {/*------------------------------------------------------------ Html Section ------------------------------------------------------------*/}
  
    return (

        <div className='auth-page' onKeyDown={(ev)=>Shortcuts(ev,keys,setKeys,AuthMainReducerState,AuthMainReducerDispatch)}>

            <div className="auth-form" style={{zIndex:6}} >
         
            <div ref={SignInPart} style={{width:'100%',height:"100%",position:"inherit",zIndex:1}}>
                
            <div className="authform-firstdiv">
                <button className='btn btn-dark formBtnDesign' >
                   <span>Welcome to Dash</span>
                </button>
            </div>
    
            <div className="authform-secoundDiv">
                <div className='btn btn-dark formBtnDesign'  onClick={()=>SignupWithDemoAccount(SignInPart,setLoginDemoMessage,LoginDemoMessage,dispatch)}>
                        <RiAccountPinCircleFill size={32} className="ggl-icon" />Demo Account
                </div>
            </div>
    
            <div className="authform-thirdDiv">
                "SignIn with Demo Account as Login System is <wbr/>in testing phase"
            </div>


            <div className="authform-tabsDiv">
                <Link to="/userauthentication/authpage/signin"><div className="signin-title" id="signin-title" onClick={()=>{SetTab("signin")}} style={{ borderBottom: Sigin? '2px solid white' :'0px solid black', transition:'0.2s'}}>Sign In</div></Link>
                <Link to="/userauthentication/authpage/login"><div className="login-title" id="login-title" onClick={()=>{SetTab("login")}}  style={{ borderBottom: login? '2px solid white' :'0px solid black', transition:'.2s'}}> Log In</div></Link>
            </div>
        
            <Switch>
            
                <Route exact path="/userauthentication/authpage/signin">
                    <SigninPart setKeys={SetKeys}/>
                </Route>
                
                <Route exact path="/userauthentication/authpage/login">
                    <LoginPart setKeys={SetKeys}/>
                </Route>
            
            </Switch>

      
            </div>
           
            </div>


        </div>

        )
    }
    
    export default memo(Authentication) 