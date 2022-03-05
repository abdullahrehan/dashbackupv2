import React, { useState,useContext } from 'react';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import NotesContext from '../../Notes/NotesContext/NotesContext'

import cross from '../close.png'

function App() {
    const [videos,setvideos]=useState([])
    const {notesState,notesDispatch}=useContext(NotesContext)
    const {isFullScreen}=notesState
    const [selectedVideo,setselectedVideo]=useState("")
    const [videoplaying,setvideoplaying]=useState(false)

    const handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        setvideos(response.data.items)
    };
    const handleVideoSelect = (video) => {
        setselectedVideo(video)
        setvideoplaying(true)
    }
    const Crossfunc=()=>{
        setvideoplaying(false)
        setselectedVideo(null)
    }

    if(videoplaying){
        
    const player=document.getElementsByClassName("html5-video-player")[0]
    console.log(player)
    }

        return (
            <div className='ui container' style={{marginTop: '12px',marginLeft:isFullScreen?"-15px":"2px"}}>
                <SearchBar handleFormSubmit={handleSubmit} videoplaying={videoplaying}/>
                <div className='ui grid' style={{marginLeft:isFullScreen?"0px":null}}>
                    <div className="ui row" style={{marginLeft:isFullScreen?"0px":null}}>
                        <div className="eleven wide column">
                            <img src={cross} style={{width:"22px",marginLeft:"593px",display:selectedVideo?"block":"none",cursor:"pointer"}} onClick={Crossfunc}/> 
                            <VideoDetail video={selectedVideo} videoplaying={videoplaying} selectedVideo={selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList handleVideoSelect={handleVideoSelect} videos={videos} videoplaying={videoplaying}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default App;