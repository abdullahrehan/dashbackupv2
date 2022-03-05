import React from 'react'
import {ImCross} from 'react-icons/im';
import {HiOutlineLogout} from 'react-icons/hi'; 
import {Link} from 'react-router-dom';
import  './Css/ConfirmLogout.css'

function ConfirmLogout({showConfirmLogout,logoutAccount,setshowConfirmLogout}) {
    return (
        <div id='confirm_logout_background_fade_div' style={{display:showConfirmLogout ?"block":"none"}}>
        <div id='confirm_logout_div' >
            <a id='confirm_logout_cross' style={{cursor:'pointer'}} onClick={()=>{return setshowConfirmLogout(false)}}><ImCross/></a>
            <a id='confirm_logout_text'>Sir/Mam ! are you confirm to logOut from this site  <HiOutlineLogout id='confirm_logout_icon' size={119}/></a>
            <a href='/userauthentication/authpage/login'  id='confirm_logout_btn' className="btn btn-dark" onClick={logoutAccount}>Confirm Log Out</a>
        </div>
    </div>
    )
}

export default ConfirmLogout
