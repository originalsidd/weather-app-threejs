import React from 'react';

const PlaceList = (props) => {
    const placeArray = props.places.map((place) => {
        return (
            <div className='place' onClick={() => props.setText(place)}>
                {place}
            </div>
        );
    });

    return <div className='place-list'>{placeArray}</div>;
};

export default PlaceList;
