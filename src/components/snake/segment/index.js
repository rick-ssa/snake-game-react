import React from 'react';
import {FaSquare} from 'react-icons/fa'

import './style.css';

export default function SnakeHead({position}) {
   return (
    <FaSquare style = {position} className={`snake-segment`}
        size = {16}
    />
   )
}