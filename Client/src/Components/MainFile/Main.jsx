import React, { useEffect, useContext, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import AuthPage from '../UserAuth/MainFiles/MainPage'
import Context from '../HooksFiles/Context'
import Header from '../HeaderFile/Main/Header.jsx'
import AboutUs from '../AdditionalFiles/AboutUs'
import Notes from '../Notes/NotesContextProvider'
import LogOut from '../AsideDataFiles/LogOut'
import Preloader from '../UserAuth/Preloader/Preloader'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import './main.css'

function Main() {

  const { state, dispatch } = useContext(Context)
  const [cookies] = useCookies(['jwt']);
  const [login,setLogin]=useState(false)
  const history = useHistory()
  const userValidation=Object.keys(state.accDataVerify).length!==0?true:false

  const routes = [
    { path: "/textDoc", component: Notes },
    { path: "/aboutus", component: AboutUs },
    { path: "/logout", component: LogOut },

  ]

  //------------------------------------------------------Login Through Cookies--------------------------------------------------------------

  const jwtfunction = () => {

    axios(`/jwt`, { withCredentials: true })
      .then(res => {
        if (res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        else {
          console.log(res.status); return res.data[0]
        }

      })
      .then((res2) => res2 !== undefined ?
        dispatch({ type: "setAccountData", accData: res2 }) : null)


  }


  const setTabs = () => {

    if (window.location.pathname === "/txt") {
      dispatch({ type: "setcurrentTab", setcurrentTab: "messages" })
    }
    else if (window.location.pathname === "/textDoc") {
      dispatch({ type: "setcurrentTab", setcurrentTab: "textDoc" })
    }
    else {
      dispatch({ type: "setcurrentTab", setcurrentTab: "imagefolder" })
    }
  }


  //------------------------------------------------------UseEffect Hook------------------------------------------------------------------------



  useEffect(() => {

    jwtfunction()
    setTabs()
    Object.keys(cookies).length===0 ? setLogin(false):setLogin(true)
  }, [])
  console.log(userValidation);
  //------------------------------------------------------Html Section----------------------------------------------------------------------------
 

  return (
    <div>

      {/*-------------------- Preloader Section ------------------------ */}

      <Preloader/>

      {/*-------------------------Main Section---------------------------- */}

      <div id="main_div" onLoad={() => !login && dispatch({type:"setloading",setloading:false})}>

        <Switch>
          <Route path='/' component={AuthPage} />
        </Switch>


        {/*-------------- Run after the excecution of JWTFuction --------------------*/}

        {state.accDataVerify.email_verified === true || state.accDataVerify.username !== undefined ?

          <>
            <div id='Header'><Header /></div>

            <div id='AsideData'>

              {state.accDataVerify.username !== history.push("/textDoc") ? null : history.push("/auth")}

              {/*----------------- Urls Generate After Authentication ---------------------*/}
              <Switch>

                {routes.map(data =>

                  <Route exact path={data.path} component={data.component} />

                )}

              </Switch>
            </div>
          </>

          : null}

      </div>
    </div>

  )
}

export default Main