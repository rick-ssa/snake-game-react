import React from 'react';
import {FaSmile} from 'react-icons/fa'

import './style.css';

export default function SnakeHead({direction, position}) {
   return (
    <FaSmile style={position} className={`snake-head ${direction}`}
        size = {16}
    />
   )
}