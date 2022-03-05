import React,{useContext} from 'react'
// import SignInPageContext from './SignInFiles/SignInPageContext/Context'
// import Context from '../HooksFiles/Context'

const Shortcuts=(ev,keys,setKeys,
    // SignInPageContextState,SignInPageContextDispatch,
    AuthMainReducerState,AuthMainReducerDispatch)=> {
 
    // const {Keys}=AuthMainReducerState
    // let {signinInputNo}=SignInPageContextState;

    if(ev.key==="Alt" || ev.key==="1"|| ev.key==="2"){
        
        // alert(ev.key)
        if(ev.key==="Alt"){

            // AuthMainReducerDispatch({type:"changeKeys",Keys:['Alt']})
            setKeys(["Alt"])
            // alert(ev.key)
        
        }
        
        if(!keys.includes(ev.key)){

            if(keys.includes("Alt")){

                // AuthMainReducerDispatch({type:"changeKeys",Keys:[...keys,ev.key]})
                setKeys([...keys,ev.key])
                
            }
          
        }
        
        else if(ev.key==="Alt" && keys.includes("Alt")){

            AuthMainReducerDispatch({type:"changeKeys",Keys:['Alt']})
            setKeys(['Alt'])
             
        }
        
    }   
               
    // else if(ev.key==="Enter"){
    //     if (signinInputNo< 4){ 

    //         SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:signinInputNo+1})
            
    //         }
    // }     
}

export default Shortcuts
