import React from 'react';
import {FaSquare} from 'react-icons/fa'

import './style.css';

export default function SnakeHead({position}) {
   return (
    <FaSquare style = {{left: position.left + 'px', top: position.top + 'px'}} className={`snake-segment`}
        size = {16}
    />
   )
}