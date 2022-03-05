import React,{useContext} from 'react'
import Context from '../../HooksFiles/Context'
import Dispatchfunc from './Dispatchfunc'
import axios from 'axios'

function CommonFunctions() {

    const {state,dispatch}=useContext(Context)
    const {currentTab,accDataVerify,selectMultiple,folders}=state
    const {dispatchfun}=Dispatchfunc()

    //--Open the folders div--//
    
    const openFolder=()=>{ dispatchfun("setshowFoldersDiv",!state.showFoldersDiv) }

    
    //--display the sendto folders  div of individual file--//
    
    const displaySendToDiv=(index)=>{ document.getElementsByClassName(`sendToDiv${index}`)[0].style.display='block'}

    //--For selecting Multiple--//

    const selectMultipleFunc=()=>{ dispatchfun("setselectMultiple",!selectMultiple) }

    
    const ViewAllMode=(value)=>{ 
        const apidata={email:state.accDataVerify.email,data:value}
        axios.post("/ViewAllMode",apidata, { withCredentials: true })
        .then(res=>{dispatch({type:"setviewAllImages",setviewAllImages:res.data})})   
        
    }
    
    const ViewAllMode2=(value)=>{ 
    
        const apidata={email:state.accDataVerify.email,data:value}
        let viewAllDB=null
        axios.post("/ViewAllMode",apidata, { withCredentials: true })
        .then(res=>{viewAllDB=res.data})   
        
        return viewAllDB;
    
    }
    const setViewAllMode=(value)=>{ 
        
        const apidata={email:state.accDataVerify.email,data:value}
        axios.post("/setViewAllMode",apidata, { withCredentials: true })       
    
    }
    
    //--set the recent Folders array in the appMainReducer global variable--//
    
    const recentFoldersData=()=>{
       
        let apidata={email:accDataVerify.email,currentTab:currentTab}
        axios.post("/recentFoldersData",apidata)
        .then(res=>{ dispatchfun("setCurrentTabData",res.data) 
        }) 
    }

    const foldersData=()=>{
     
        let apidata={email:accDataVerify.email,tab:currentTab}    
        axios.post('/folders',apidata)  
        .then(res=>dispatchfun("setFolder",res.data))
    
    }

    const selectFolder=(setselectedFolder,folder_datass,index)=>{
    
        setselectedFolder(folder_datass.name)
        folders.map((data,indexs)=>{
            document.getElementsByClassName(`folder_image_figure${indexs}`)[0].style.backgroundColor="#0000"
            document.getElementsByClassName(`folder_image_figure${indexs}`)[0].style.color="white"

        })
        document.getElementsByClassName(`folder_image_figure${index}`)[0].style.backgroundColor="#212529"


    }


    return ({openFolder,displaySendToDiv,recentFoldersData,selectMultipleFunc,foldersData,ViewAllMode,ViewAllMode2,setViewAllMode,selectFolder})
}

export default CommonFunctions
