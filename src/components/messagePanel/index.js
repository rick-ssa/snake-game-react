import React from 'react';
import {FaGrinHearts, FaGrinStars, FaEgg,FaFish, FaPepperHot,FaDrumstickBite, FaIceCream} from 'react-icons/fa'

import './style.css';

export default function MessagePanel({message, showImage, textOn}) {
    return (
        <div className="message-panel-container">
            {
                showImage  ?
                    <FaGrinHearts size={220}/>
                :
                textOn &&  <div className="message">{message}</div>
            }
        </div>
    )
}