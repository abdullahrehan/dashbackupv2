import React, {useEffect,useContext,useState } from 'react'
import { Redirect, Route, Switch ,useHistory } from 'react-router-dom';
import AuthPage  from '../UserAuth/MainFiles/MainPage'
import Images from '../AsideDataFiles/Images'
import Messages from '../AsideDataFiles/Messages' 
import Context  from '../HooksFiles/Context'
import Header from '../HeaderFile/Main/Header.jsx'
import AboutUs from '../AdditionalFiles/AboutUs' 
import Notes from '../Notes/NotesContextProvider' 
import LogOut from '../AsideDataFiles/LogOut' 
import Preloader from '../UserAuth/Preloader/Preloader'
import axios from 'axios'
import  './main.css'

function Main() {
   
  const {state,dispatch}=useContext(Context)
  const [loading,setloading]=useState(true)
  const history=useHistory()
//------------------------------------------------------Login Through Cookies--------------------------------------------------------------
   
  const jwtfunction=()=>{ 
    
      axios(`/jwt`, { withCredentials: true })
      .then(res=>{
        if (res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        else{
          console.log(res.status) ;return res.data[0]
      }
      
      })
      .then((res2)=>res2!==undefined?
      dispatch({type:"setAccountData",accData:res2}):null)
    

  }

 
  const setTabs=()=>{
  
   if(window.location.pathname==="/txt"){
         dispatch({type:"setcurrentTab",setcurrentTab:"messages"})
  }
  else if(window.location.pathname==="/textDoc"){
         dispatch({type:"setcurrentTab",setcurrentTab:"textDoc"})
  }
  else{
    dispatch({type:"setcurrentTab",setcurrentTab:"imagefolder"})
  }
}


//------------------------------------------------------UseEffect Hook------------------------------------------------------------------------
 

 
    useEffect(() => {
    
      jwtfunction()
      setTabs()
   
   },[])

//------------------------------------------------------Html Section----------------------------------------------------------------------------


    return (
    <div>

  {/*-------------------- Preloader Section ------------------------ */}

  <Preloader loading={loading}/>

  {/*-------------------------Main Section---------------------------- */}

      <div id="main_div" onLoad={()=>setloading(false)}>

        <Switch>
            <Route path='/' component={AuthPage}/> 
        </Switch>  


     {/*-------------- Run after the excecution of JWTFuction --------------------*/}
 
{state.accDataVerify.imagefolder!==undefined ?
        
        // This Condition Check Weather The SignIN Through Google is Verified               
       state.accDataVerify.email_verified===true || state.accDataVerify.username!==undefined ?   
       
        <>
      <div id='Header'><Header/></div> 
         
        
        
          <div id='AsideData'>
           
      
      {/*----------------- Urls Generate After Authentication ---------------------*/}
            <Switch>

                <Route exact path="/">
                
                {state.accDataVerify.username!==history.push("/textDoc") ? null  : history.push("/auth")}
                </Route>
                <Route exact path='/textDoc'  component={Notes}/>
                <Route exact path='/aboutus'  component={AboutUs}/>
                <Route exact path='/logout'  component={LogOut}/>
  
            </Switch>
          </div>
        </>
       :null
      :null}  

  </div>
  </div>

)}

export default Main




