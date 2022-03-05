const MainReducer=(state,action)=>{


    switch(action.type){
    
        // This will trigure when the user press the sign in button and save all the data of fields as well as confirmation code and signup message
        
        case"setMainData":
        return {
            ...state,
            userimage:action.UserImage,
            username:action.Username,
            useremail:action.Useremail,
            userpassword:action.Userpassword,
            showpassword:action.Showpassword,
            
        }   
        case"changeTab":return {...state,tab:action.Tab}       
        case"changeUserImage":return {...state,userimage:action.UserImage}       
        case"changeUserName":return {...state,username:action.Username}   
        case"changeUserEmail": return {...state,useremail:action.Useremail}
        case"changeUserPassword": return {...state,userpassword:action.Userpassword}
        case"changeShowpassword": return {...state,showpassword:action.Showpassword}
        case"changeKeys": return {...state,Keys:action.Keys}
        case"changeChooseContext": return {...state,chooseContext:action.ChooseContext}
    
    
    
    }
    }
    export default MainReducer