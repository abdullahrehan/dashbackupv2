import React, { useState } from 'react';
import '../style/Searchbar.css'
function Searchbar(props){

    const {handleFormSubmit,videoplaying}=props
    const [term,setTerm]=useState()

    const handleChange = (event) => {

        setTerm(event.target.value);
    };
    const handleSubmit = event => {
        event.preventDefault();
        handleFormSubmit(term);
    }

        return (
            <div className='search-bar ui segment' style={{display:videoplaying?"none":"block"}}>
                <p id="youtube-text">Youtube</p>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div className='field'>
                        <input onChange={handleChange} placeholder="search.." id="video-search" name='video-search' type="text" value={term}/>
                    </div>
                </form>
            </div>
        )
    }

    export default Searchbar;