import React from 'react'
import back from '../../../images/g.jpg'
import './Css/BlurBackground.css'

function BlurBackground() {
    return (
        <>
        <img id="blured_background_image" src={back}  alt={"Image loading"}/>
        <div id="blured_background_mainDiv"></div>
    </>
    )
}

export default BlurBackground
