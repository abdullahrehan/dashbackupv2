import { useLocation } from 'react-router-dom';

function CheckUrl() {
   
     
    const location=useLocation();
   
    const signinRoutes=[

        "/userauthentication/authpage/signin",
        "/userauthentication/authpage/signin/",

        "/userauthentication/confirmationCode",
        "/userauthentication/confirmationCode/",

        "/userauthentication/welcomepage",
        "/userauthentication/welcomepage/",

        "/terms/conditions",
        "/terms/conditions/"

    ]
    
       
    const loginRoutes=[

        "/userauthentication/authpage/login",
        "/userauthentication/authpage/login/",
        
    ]
    

    const checkUrl=(routes)=>{

        let returnvalue=false;
        for(let i=0;i<routes.length;i++){
            if(location.pathname===routes[i]){
                returnvalue=true;
                break; 
            }
        }
        return returnvalue
    }
    
    const checkSigninUrl=()=>{ return checkUrl(signinRoutes) }

    const checkLoginUrl=()=>{ return checkUrl(loginRoutes) }
    
    return ({checkSigninUrl,checkLoginUrl})
}


export default CheckUrl
