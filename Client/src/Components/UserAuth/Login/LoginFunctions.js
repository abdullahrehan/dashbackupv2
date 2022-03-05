import axios from 'axios'


function userlogin(LoginPageContextState,LoginPageContextDispatch,dispatch,history) {

    const {loginuseremail,loginuserpassword}=LoginPageContextState
    
    const userdetailslogin={email:loginuseremail,password:loginuserpassword}
       
        axios.post(`http://localhost:2000/user/login`,userdetailslogin, { withCredentials: true })
        
        .then(res=>{
        
            console.log(res.data)
            if(res.data.msg=='invalid email'){

                LoginPageContextDispatch({type:"changeEmailIncorrectPageError",EmailIncorrectPageError:true})
            }
            else if(res.data.msg=='password incorrect'){
              
                LoginPageContextDispatch({type:"changePasswordIncorrectPageError",PasswordIncorrectPageError:true})

                LoginPageContextDispatch({type:"changeLoginUserData",
                LoginUserimage:res.data.data[1].url,
                LoginUsername:res.data.data[0],
                LoginUseremail:loginuseremail,
                LoginUserpassword:loginuserpassword,
                PasswordIncorrectDiv:true,
                PasswordIncorrectPageError:true})

                history.push("/userauthentication/LoginPassIncorrect")

            }
            else{
                dispatch({type:"setAccountData",accData:res.data});
            }
            
        })        
      

}

export default userlogin
