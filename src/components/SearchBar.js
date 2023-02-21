import React, { useState, useEffect } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import city_names from '../utils/Cities';
import Scroll from './Scroll';
import PlaceList from './PlaceList';

const apikey = '1df7b707355fdfc7ad8570e5bb9310e4';

const SearchBar = (props) => {
    const [text, setText] = useState('');
    const [places, setPlaces] = useState(city_names);

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleSearch = () => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}`
        )
            .then((city) => city.json())
            .then((city) => {
                props.setLat(city.coord.lat);
                props.setLong(city.coord.lon);
                return city;
            })
            .then((weather) => {
                props.setWeatherDetails(weather);
            })
            .catch((error) => console.log(error));

        setText('');
    };

    const filteredPlaces = places.filter(
        (place) =>
            text.length > 2 &&
            place.toLowerCase().includes(text.toLowerCase()) &&
            text != ''
    );

    return (
        <div className='search-container'>
            <div className='search'>
                <input
                    className='search-bar'
                    type='search'
                    onChange={handleInputChange}
                    value={text}
                />
                <div className='search-icon'>
                    <FaSearchLocation color='#eee' onClick={handleSearch} />
                </div>
            </div>
            {filteredPlaces.length ? (
                <Scroll>
                    <PlaceList places={filteredPlaces} setText={setText} />
                </Scroll>
            ) : (
                <></>
            )}
        </div>
    );
};

export default SearchBar;
