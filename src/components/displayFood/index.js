import React from 'react';
import {FaAppleAlt, FaCarrot, FaEgg,FaFish, FaPepperHot,FaDrumstickBite, FaIceCream} from 'react-icons/fa'

import './style.css';

export default function DisplayFood ({area,foodType,position, color,size}) {
    function food () {
        switch (foodType) {
            case 'carrot':
                return <FaCarrot size={size} color = {color} style={{position: 'absolute', left: position.left + 'px', top: position.top + 'px'}}/>
            case 'egg':
                return <FaEgg size={size} color = {color} style={{position: 'absolute', left: position.left + 'px', top: position.top + 'px'}}/>
            case 'fish':
                return <FaFish size={size} color = {color} style={{position: 'absolute', left: position.left + 'px', top: position.top + 'px'}}/>
            case 'pepper':
                return <FaPepperHot size={size} color = {color} style={{position: 'absolute', left: position.left + 'px', top: position.top + 'px'}}/>
            case 'chicken':
                return <FaDrumstickBite size={size} color = {color} style={{position: 'absolute', left: position.left + 'px', top: position.top + 'px'}}/>
            case 'icecream':
                return <FaIceCream size={size} color = {color} style={{position: 'absolute', left: position.left + 'px', top: position.top + 'px'}}/>
            default:
                return <FaAppleAlt size={size} color = {color} style={{position: 'absolute', left: position.left + 'px', top: position.top + 'px'}}/>
        }
    }
    return (
        <div style = {{width: area.width, height: area.height}} className = 'display-food-container'>
            {
                food()
            }
        </div>
    )
}