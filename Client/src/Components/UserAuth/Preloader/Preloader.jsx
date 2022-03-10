import React, { useEffect, useContext } from 'react'
import { IoMdSettings } from 'react-icons/io';
import dashTextImg from './images/dash text.png'
import Context from '../../HooksFiles/Context'
import "./Preloader.css"

function Preloader() {


  const { state, dispatch } = useContext(Context)
  const loading = state.loading

  const preloaderFunction = () => {
 
    if (!loading) {
 
      setTimeout(() => { document.getElementById('loading_Maindiv').style.display = 'none' }, 500);
 
    }
  }

  useEffect(() => {
 
    preloaderFunction()
 
  }, [loading])

 
  return (
    <div id="loading_Maindiv" style={{ opacity: loading ? 100 : 0, transition: '1s' }}>
      <div id='loading_Centered_Div'>
        <div id="loading_loader_div">
          <IoMdSettings id="loading_loader1" size={55} color={'white'} />
          <IoMdSettings id="loading_loader2" size={55} color={'white'} />
          <IoMdSettings id="loading_loader3" size={55} color={'white'} />
        </div>
        <div><img src={dashTextImg} className="dashTextImg" /></div>
        <span id="loading_textArea">Page is Loading . . . .</span>
      </div>
    </div>
  )
}

export default Preloader
