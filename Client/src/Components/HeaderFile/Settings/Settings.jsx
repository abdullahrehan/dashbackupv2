import React from 'react'
import UserImg from '../Images/user2.png'
import aboutus from '../Images/aboutus black.png'
import { FiLogOut } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineContacts } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import "./Settings.css"

function Settings({showSettings,setsettingsCard,setshowSettings,logout}) {
  
    const log=()=>console.log("ok");

    const settingsItems=[
        {label:"About us",componnet:<Link to='/aboutus'><img src={aboutus} alt="About Us"/></Link>,func:log},
        {label:"LogOut",componnet:<FiLogOut size={32} className="logout-icon" />,func:logout},
        {label:"Settings",componnet: <IoMdSettings size={32} className="logout-icon" /> ,func:log},
        {label:"Contacts",componnet:<AiOutlineContacts size={32} className="logout-icon" />,func:log},
        
    ] 

    return (
        <div className="settings-main-div" style={{display:showSettings?"block":"none"}}>
           
           {settingsItems.map(data=>
<>            <div className="settings-items" onClick={()=>data.func()}>
                <div className="settings-items-heading"> {data.label} </div>
                 <div id='settings_aboutUs'> {data.componnet} </div>    
            </div>
       
</>
)}


        </div>
    )
}

export default Settings
