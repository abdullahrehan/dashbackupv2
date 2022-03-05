import React,{useContext,memo} from 'react'
import Context from '../HooksFiles/Context'
import CommonFunctions from '../CommonFiles/CommonFunction/CommonFunctions'
import {ImShrink2} from 'react-icons/im'; 
import {FaExpandAlt} from 'react-icons/fa'; 
import '../../css/ViewAllFiles.css'

function ViewAllFiles() {
    
    const {state,dispatch}=useContext(Context)
    const ViewAllImages=state.viewAllImages
    const {setViewAllMode}=CommonFunctions()

    // if(window.innerWidth)

    return (
        <div id="view_all_button">
        <button className="btn btn-dark" id="view_btn" styles={{marginLeft:"10px"}} onClick={()=>{dispatch({type:"setviewAllImages",setviewAllImages:!ViewAllImages});setViewAllMode(!ViewAllImages)}}>
            {ViewAllImages?
            <FaExpandAlt size={25} color={'white'}/>:
            <ImShrink2 size={25} color={'white'}/>}
        </button> 
        </div>
    )
}

export default memo(ViewAllFiles)
