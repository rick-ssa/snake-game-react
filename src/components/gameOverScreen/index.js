import React from 'react';

import './style.css';

export default function gameOverScreen ({onClick}) {
    return (
        <div onClick={onClick} className="gameover_container">
            <div className="gameover_text">Game Over</div>
        </div>
    )
}