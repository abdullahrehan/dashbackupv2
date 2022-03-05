import React, { useContext, memo } from 'react'
import { IoMdArrowRoundBack as Back } from "react-icons/io";
import { BsFillEyeFill as Eye } from "react-icons/bs";
import { BsFillEyeSlashFill as Eyecross } from "react-icons/bs";
import MainContext from '../Contexts/MainContext'
import PagesContexts from '../Contexts/PagesContexts'
import userlogin from './LoginFunctions'
import Context from '../../HooksFiles/Context'
import { useHistory } from 'react-router';
import "./Css/LoginPassIncorrect.css"

function LoginPassIncorrect() {

    let { AuthMainReducerState, AuthMainReducerDispatch } = useContext(MainContext)
    let { LoginPageContextState, LoginPageContextDispatch } = useContext(PagesContexts)
    let { state, dispatch } = useContext(Context)


    const { loginuserimage, loginusername, loginuserpassword, passwordIncorrectPageError } = LoginPageContextState
    const { showpassword } = AuthMainReducerState
    const history = useHistory()

    const changeLoginPasswordInput = (e) => {
        LoginPageContextDispatch({ type: "changeLoginUserPassword", LoginUserpassword: e.target.value })
    }
    const loginAgain = () => {
        userlogin(LoginPageContextState, LoginPageContextDispatch, dispatch, history)

    }
    return (
        <div id='passwordIncorrectDiv'>
            <Back onClick={() => { history.goBack() }} size={30} style={{ cursor: "pointer", position: 'absolute' }} />
            <img src={loginuserimage} id="passwordIncorrectUserImg" />
            <span id='passwordIncorrectText'>Hello {loginusername} ! </span>
            <span id="passwordIncorrectText" style={{ display: passwordIncorrectPageError ? "block" : "none" }}><br /> Password didn't match </span>
            <div className="passwordIncorrectPasswordDiv">
                <input
                    type={showpassword ? "text" : "password"}
                    className="passwordIncorrectPasswordInput"
                    placeholder="Password"
                    value={loginuserpassword}
                    onChange={changeLoginPasswordInput}
                />
                <div id='show_passwordIncorrect_icon_login' onClick={() => { return AuthMainReducerDispatch({ type: "changeShowpassword", Showpassword: !showpassword }) }} style={{ bottom: '55%', cursor: "pointer" }}>{showpassword ? <Eyecross /> : <Eye />}</div>
            </div>
            <button className="btn btn-dark" id="passwordIncorrectLogonBtn" onClick={loginAgain}>Login</button>
            <a href='/' id='passwordIncorrectForgetText'>Forget Password</a>
        </div>
    )
}

export default memo(LoginPassIncorrect)
