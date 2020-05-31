import React from 'react';
import RankCell from '../ranckCell'

import './style.css';

export default function Rank() {
    return (
        <div className="rank-container">
            <p className="title">Rank</p>
            <RankCell image="https://randomuser.me/api/portraits/med/men/75.jpg" name="Ricardo" points={1000} />
            <RankCell image="https://randomuser.me/api/portraits/med/men/81.jpg" name="Ricardo" points={1000} />
            <RankCell image="https://randomuser.me/api/portraits/med/men/26.jpg" name="Ricardo" points={1000} />
            <RankCell image="https://randomuser.me/api/portraits/med/men/12.jpg" name="Ricardo" points={1000} />
            <RankCell image="https://randomuser.me/api/portraits/med/men/18.jpg" name="Ricardo" points={1000} />
        </div>
    )
}