import React, { useState, useEffect } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import Scroll from './Scroll';
import PlaceList from './PlaceList';
import trie from '../utils/trie';

const apikey = '1df7b707355fdfc7ad8570e5bb9310e4';

const SearchBar = (props) => {
    const [text, setText] = useState('');
    const [place, setPlace] = useState('');
    const [miss, setMiss] = useState(false);

    const handleInputChange = (event) => {
        let city = event.target.value;
        setText(city);
        city = city.toLowerCase();
        city = city.split(',');
        city = city.join('');
        city = city.split(' ');
        city = city.join('');
        setPlace(city);
    };

    const handleSearch = (place) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`
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
            .catch((error) => {
                console.log(error);
                setMiss(true);
            });

        setText('');
        setPlace('');
    };

    document.onkeydown = (e) => {
        if (e.key == 'Enter') {
            handleSearch(text);
        }
    };

    const filteredPlaces = trie.search(place).sort();

    useEffect(() => {
        if (miss) setMiss(false);
    }, [text]);

    useEffect(() => {
        handleSearch('Delhi');
    }, []);

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
                    <FaSearchLocation
                        color='#eee'
                        onClick={handleSearch.bind(this, text)}
                    />
                </div>
            </div>
            {filteredPlaces.length ? (
                <Scroll>
                    <PlaceList
                        places={filteredPlaces}
                        setText={setText}
                        handleSearch={handleSearch}
                    />
                </Scroll>
            ) : (
                <></>
            )}
            {miss && <div className='error'>Invalid Name: Try Again</div>}
        </div>
    );
};

export default SearchBar;
