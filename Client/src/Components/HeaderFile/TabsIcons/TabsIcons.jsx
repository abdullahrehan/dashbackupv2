import React, {  useContext } from 'react'
import { Link,NavLink } from 'react-router-dom';
import Context from '../../HooksFiles/Context'
import notesIcon from '../Images/notesImage.png'
import messageIcon from '../Images/messageIcon.png'
import imageIcon from '../Images/imageIcon.png'
import fileIcon from '../Images/fileIcon.png'
import '../Css/TabsIcons.css'


function AsideData() {

const {state,dispatch}=useContext(Context) 

const previewImage=state.url!==null?true:false

const previewNotes=state.notes!==null?true:false

const currentfolder=(folder)=>{
    dispatch({type:"setcurrentFolder",currentFolderValue:'MainFolder'})
    dispatch({type:"setcurrentTab",setcurrentTab:folder})
    dispatch({type:"setnotes",notes:null})
    dispatch({type:"ChangeUrl",recdata:null})
    if(state.currentTab!==folder){
    dispatch({type:"setloading",setloading:true})}
}

return (
      
    <aside id="tabIcons">
        <div className='icons-div'>
            <NavLink className="links" activeClassName="active" to='/textDoc'><img src={notesIcon} className="notesIcon" onClick={()=>currentfolder('textDoc')}/></NavLink>
            <NavLink className="links" activeClassName="active" to='/txt'><img src={messageIcon} className="messageIcon" onClick={()=>currentfolder('messages')}/></NavLink>
            <NavLink className="links" activeClassName="active" to='/img'><img src={imageIcon} className="imageIcon" onClick={()=>currentfolder('imagefolder')}/></NavLink>
            <NavLink className="links" activeClassName="active" to='/file'><img src={fileIcon} className="fileIcon" onClick={()=>currentfolder('imagefolder')}/></NavLink>
        </div>
    </aside>
    )}

export default AsideData
