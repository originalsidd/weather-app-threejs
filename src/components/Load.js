import React from 'react';

const Load = (props) => {
    return (
        <div className='water-container'>
            <div className='water'></div>
            <div className='water-text'>Loading {props.desc}</div>;
        </div>
    );
};

export default Load;
