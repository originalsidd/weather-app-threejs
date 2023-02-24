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
    const [load, setLoad] = useState(false);

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
        setLoad(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`
        )
            .then((res) => {
                if (res.ok) return res.json();
                else if (res.status === 404) {
                    setMiss(true);
                    setLoad(false);
                    throw new Error('Invalid');
                }
            })
            .then((res) => {
                props.setLat(res.coord.lat);
                props.setLong(res.coord.lon);
                return res;
            })
            .then((res) => {
                props.setWeatherDetails(res);
                setLoad(false);
                return res;
            })
            .catch((error) => {
                console.log(error);
                setLoad(false);
            });

        setText('');
        setPlace('');
    };

    document.onkeydown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(text);
        }
    };

    const filteredPlaces = trie.search(place).splice(0, 10);

    useEffect(() => {
        if (miss) setMiss(false);
    }, [text]);

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
            {load && (
                <div className='lds-ellipsis'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
