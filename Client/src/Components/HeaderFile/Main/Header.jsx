import React, { useState, useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';
import AccountSettings from '../../AdditionalFiles/AccountSettings'
import Context from '../../HooksFiles/Context'
import ConfirmLogout from '../../AdditionalFiles/ConfirmLogout'
import dashLogo from '../Images/dash text header.png'
import TabsIcons from '../TabsIcons/TabsIcons'
import Settings from '../Settings/Settings'
import axios from 'axios'
import '../Css/Header.css'

function Header() {

  const [showConfirmLogout, setshowConfirmLogout] = useState(false)

  const [logOut, setlogOut] = useState(false)
  const [showSettings, setshowSettings] = useState(false)
  const [acoountImageRender, setacoountImageRender] = useState(0)
  const [settingsCard, setsettingsCard] = useState(false)
  const { state, dispatch } = useContext(Context)
  const username = state.accDataVerify.username
  const ProfileImage = state.accDataVerify.profile
  const [profilepic, setprofilepic] = useState()
  const history = useHistory()
  // ------------------------- Log Out Account  -------------------------//

  const logoutAccount = () => {
    axios.get("/logouts", { withCredentials: 'true' }).then(res => {
      console.log(res.data);
    })
    setshowConfirmLogout(false)
  }



  const logout = () => {
    setshowConfirmLogout(true)
  }

  const profile = () => {

    axios.post("/ProfilePicture", { email: state.accDataVerify.email })
      .then(res => { setprofilepic(res.data.url) })

  }

  useEffect(() => {
    profile()

  }, [acoountImageRender])

  {/*------------------- Html Section --------------------*/ }

  return (
    <>
      <header id='header'>

        {/*  --------- Redirect to Main on removing Cookie  -------- */}

        <Switch>
          <Route exact path="/">
            {logOut ? <Redirect to="/" /> : null}
          </Route>
        </Switch>


        {/*  ------------- Settings Section  -------------- */}

        <div id='header_username'>

          <div id="header_username_img_div" >

            {profilepic !== '' ? <img style={{ width: "100%", height: "100%" }} src={profilepic} /> : <MdAccountCircle size={38} />}

          </div>

          <div id="header_username_name_div">  {username ? username : 'User'} </div>


        </div>

        <div id='heading'>
          
          <img src={dashLogo} className="dashLogo" />
        
        </div>

        <div className="header-options-section">

          <TabsIcons />

          <div id='header_settings'>
            
            <IoMdSettings size={33} onClick={() => { setshowSettings(!showSettings) }} />
            <Settings showSettings={showSettings} setsettingsCard={setsettingsCard} logout={logout} />
          
          </div>

        </div>

      </header>

      <ConfirmLogout 
      showConfirmLogout={showConfirmLogout}
      logoutAccount={logoutAccount}
      setshowConfirmLogout={(value) => { setshowConfirmLogout(value) }}
      />

      <AccountSettings
      settingsCard={settingsCard}
      setsettingsCard={value => setsettingsCard(value)}
      acoountImageRender={acoountImageRender}
      setacoountImageRender={(value) => setacoountImageRender(value)}
      profilepic={profilepic}
      setprofilepic={(value) => setprofilepic(value)}
      />

    </>
  )
}

export default Header
