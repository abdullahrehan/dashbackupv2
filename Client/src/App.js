import React,{useState} from 'react'
import Main from './Components/MainFile/Main.jsx'
import Context from './Components/HooksFiles/Context'
import Reducer from './Components/HooksFiles/Reducer'
import { useImmerReducer } from "use-immer";
import appMainReducer from './Components/ReducersVar/ReducersVar'
import './css/App.css'

function App() {

  const [state,dispatch]=useImmerReducer(Reducer,appMainReducer)
  

  return (
  <>

<div id='App_mainDiv'  >

<div >
    <Context.Provider value={{state,dispatch}}>
       <Main/> 
    </Context.Provider>     
  </div>
</div>


 </>
 
)}

export default App