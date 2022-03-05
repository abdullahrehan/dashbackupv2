import React,{useContext} from 'react'
import '../../css/youtube.css'
import Main from '../Youtube/components/Main'
import NotesContext from './NotesContext/NotesContext'


function Youtube() {

    const {notesState,notesDispatch}=useContext(NotesContext)
    const {isFullScreen}=notesState
    
    return (
        <div className="youtube-main-div" style={{width:"1355px",height:"760px"}} >
            <Main/>
        </div>
    )
}

export default Youtube
