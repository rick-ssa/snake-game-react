import React from 'react';
import SnakeHead from './head';
import Segment from './segment';

export default function Snake({coords, direction}) {
    return (
        <div className='snake'>
            <SnakeHead direction={direction} position = {coords[0]} />
            {
                coords.length > 1 ?
                coords.filter((p,index)=>index!==0).map((position, index)=>{
                    return <Segment position = {position} key = {index} />
                })

                :

                null
            }
        </div>
    )
}