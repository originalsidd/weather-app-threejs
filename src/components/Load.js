import React from 'react';
import {
    Stars,
    Scroll,
    ScrollControls,
    Environment,
    Html,
} from '@react-three/drei';

const Load = () => {
    return (
        <Html>
            <div className='water-container'>
                <div className='water'></div>
                <div className='water-text'>&nbsp;&nbsp;Loading...</div>;
            </div>
        </Html>
    );
};

export default Load;
