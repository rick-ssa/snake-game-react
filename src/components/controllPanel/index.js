import React from 'react';
import {FaPlayCircle, FaPauseCircle, FaStopCircle} from 'react-icons/fa'

import './style.css';

export default function ControllPanel({onPlay, onPause, onStop,top}) {
    return (
        <div id='controll-panel' style={{top}} className="controll-panel-container">
            <button onClick = {onPlay} className="play">
                <FaPlayCircle size = {25}/>
            </button>
            <button onClick = {onPause} className="pause">
                <FaPauseCircle size = {25}/>
            </button>
            <button onClick = {onStop} className="stop">
                <FaStopCircle size = {25}/>
            </button>
        </div>
    )
}