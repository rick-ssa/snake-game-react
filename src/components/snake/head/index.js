import React from 'react';
import {FaSmile} from 'react-icons/fa'

import './style.css';

export default function SnakeHead({direction, position}) {
   return (
    <FaSmile style={{left: position.left + 'px', top: position.top + 'px'}} className={`snake-head ${direction}`}
        size = {16}
    />
   )
}