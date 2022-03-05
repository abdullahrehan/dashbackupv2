import react,{useContext} from 'react'
import NotesContext from '../NotesContext/NotesContext'

function NotesDispatchfunc() {

    const {notesState,notesDispatch}=useContext(NotesContext)

    const notesdispatchfun=(dispatchName,data)=>{ 
        notesDispatch({type:dispatchName,[dispatchName]:data})
     }

    return ({notesdispatchfun})
}

export default NotesDispatchfunc
