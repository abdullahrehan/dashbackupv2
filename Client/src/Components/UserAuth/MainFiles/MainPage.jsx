import {authReducerVar,signinReducerVar,loginReducerVar} from '../../ReducersVar/ReducersVar'
import { Redirect, Route, Switch, useHistory, useLocation  } from 'react-router-dom'
import TermsAndConditions from '../SignIn/TermsAndConditions'
import BlurBackground from './BlurBackground.jsx'
import LoginPassIncorrect from '../Login/LoginPassIncorrect'
import ConfirmationCode from '../SignIn/ConfirmationCode'
import PagesContexts from '../Contexts/PagesContexts'
import Authentication from './Authentication.jsx'
import WelcomePage from '../SignIn/WelcomePage'
import Context from '../../HooksFiles/Context'
import ContextApi from '../Contexts/MainContext'
import MainReducer from '../Contexts/MainReducer'
import SignInReducer from '../SignIn/SignInReducer'
import LoginReducer from '../Login/LoginReducer'
import { useImmerReducer } from "use-immer";
import React,{useContext} from 'react'
import AuthHeader from './AuthHeader'
import Ads from '../Login/Ads'
import CheckUrl from './CheckUrl'


function MainPage() {
    
    const {state,dispatch}=useContext(Context)    
    const emailverify=state.accDataVerify.email
    const signinurl=CheckUrl().checkSigninUrl()
    const loginurl=CheckUrl().checkLoginUrl()

    const [AuthMainReducerState,AuthMainReducerDispatch]=useImmerReducer(MainReducer,authReducerVar)

    const [SignInPageContextState,SignInPageContextDispatch]=useImmerReducer(SignInReducer,signinReducerVar)
        
    const [LoginPageContextState,LoginPageContextDispatch]=useImmerReducer(LoginReducer,loginReducerVar)
    
    const ContextArray=[{SignInPageContextState,SignInPageContextDispatch},{LoginPageContextState,LoginPageContextDispatch}]
   
    
    const setTabs=()=>{

        if(signinurl){ AuthMainReducerDispatch({type:"changeTab",Tab:"signin"}) }

        else if(loginurl){ AuthMainReducerDispatch({type:"changeTab",Tab:"login"}) }

    }

return (
    <div onLoad={()=>setTabs()}>

        <ContextApi.Provider value={{AuthMainReducerState,AuthMainReducerDispatch}}>
       
            <PagesContexts.Provider value={ContextArray[signinurl?0:1]} >

                <div style={{display:emailverify !==undefined  ? "none" : "block"}} >
                 
                    <AuthHeader/> 

                    <BlurBackground/>
                   
                    <Switch>
                      
                        <Redirect exact from="/" to="/userauthentication/authpage/signin"/>
                        <Route path="/userauthentication/authpage" component={Authentication}/>
                        <Route exact path="/userauthentication/confirmationCode" component={ConfirmationCode}/>
                        <Route exact path="/userauthentication/LoginPassIncorrect" component={LoginPassIncorrect}/>
                        <Route exact path="/userauthentication/welcomepage" component={WelcomePage}/>
                        <Route exact path="/terms/conditions" component={TermsAndConditions}/>
                        <Route exact path="/ads" component={Ads}/>


                    </Switch> 
                </div>
            
            </PagesContexts.Provider>

        </ContextApi.Provider>
     </div>       
    )
}

export default MainPage