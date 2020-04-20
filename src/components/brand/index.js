import React from 'react';

import './style.css';

export default function Brand({href,text}) {
    return (
        <a 
            href={href}
            target='_blank'
            className = 'brand-link'
            rel="noopener noreferrer"   
        >
            {text}
        </a>
    )
}