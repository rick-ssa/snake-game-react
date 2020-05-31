import React from 'react';

import './style.css';

export default function Rank({image,name,points}) {
    return (
        <div className="rank-cells-container">
            <img src={image} alt="user"/>
            <div className="text-container">
                <p className="name">{name}</p>
                <p className="points">Points: {points}</p>
            </div>
        </div>
    )
}