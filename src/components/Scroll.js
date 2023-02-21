import React from 'react';

const Scroll = (props) => {
    return (
        <div
            style={{
                border: '0px solid white',
                width: '350px',
            }}
        >
            {props.children}
        </div>
    );
};

export default Scroll;
