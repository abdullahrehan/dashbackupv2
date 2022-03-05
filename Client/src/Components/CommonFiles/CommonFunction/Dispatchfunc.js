import react,{useContext} from 'react'
import Context from '../../HooksFiles/Context'

function Dispatchfunc() {

    const {state,dispatch}=useContext(Context)

    const dispatchfun=(dispatchName,data)=>{ 
        dispatch({type:dispatchName,[dispatchName]:data})
     }

    return ({dispatchfun})
}

export default Dispatchfunc
