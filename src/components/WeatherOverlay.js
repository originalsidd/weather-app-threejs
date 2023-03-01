import React, { useEffect, useState } from 'react';
import icons from './icons.jsx';
import country_names from '../utils/Countries';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const WeatherOverlay = (props) => {
    const [icon, setIcon] = useState(null);
    const [drop, setDrop] = useState(false);
    const [details, setDetails] = useState(null);
    const [day, setDay] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [dir, setDir] = useState('');

    const handleMouseMove = (e, card) => {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const timeCorrect = (s) => {
        if (s.length === 1) s = '0' + s;
        else if (s.length === 0) s = '00';
        return s;
    };

    useEffect(() => {
        document.getElementsByClassName('cards')[0].onmousemove = (e) => {
            for (const card of document.getElementsByClassName('card')) {
                handleMouseMove(e, card);
            }
        };
        document.getElementsByClassName('cards')[1].onmousemove = (e) => {
            for (const card of document.getElementsByClassName('card')) {
                handleMouseMove(e, card);
            }
        };
    }, []);

    useEffect(() => {
        setDetails(props.weatherDetails);
        if (details) {
            setIcon(icons[details.weather[0].icon]);
            setDrop(true);
            const dir = details?.wind?.deg;
            if (dir > 22.5 && dir < 67.5) setDir('NE');
            else if (dir > 67.5 && dir < 112.5) setDir('E');
            else if (dir > 112.5 && dir < 167.5) setDir('SE');
            else if (dir > 167.5 && dir < 202.5) setDir('S');
            else if (dir > 202.5 && dir < 247.5) setDir('SW');
            else if (dir > 247.5 && dir < 292.5) setDir('W');
            else if (dir > 292.5 && dir < 337.5) setDir('NW');
            else setDir('N');
        }
    }, [props.weatherDetails, details]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (details) {
                const date = new Date();
                const localTime = date.getTime();
                const localOffset = date.getTimezoneOffset() * 60000;
                const utc = localTime + localOffset;
                const atlanta = utc + 1000 * details.timezone;
                const new_date = new Date(atlanta);
                let h = new_date.getHours().toString();
                let m = new_date.getMinutes().toString();
                let s = new_date.getSeconds().toString();
                h = timeCorrect(h);
                m = timeCorrect(m);
                s = timeCorrect(s);
                const settime = h + ':' + m + ':' + s;
                setTime(settime);
                setDay(days[new_date.getDay()]);
                const setdate =
                    new_date.getDate().toString() +
                    '/' +
                    (new_date.getMonth() + 1).toString() +
                    '/' +
                    new_date.getFullYear().toString().slice(2);
                setDate(setdate);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [details]);

    return (
        <div className='weather-overlay'>
            <div className='card-container'>
                <div className='cards'>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='big-text'>
                                {Math.round(details?.main?.temp - 273.15)}°C
                            </div>
                            <div className='mid-text line'>{details?.name}</div>
                            <div className='mid-text'>
                                {country_names[details?.sys?.country]}
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='temp-text'>
                                {Math.round(details?.main?.feels_like - 273.15)}
                                °C
                            </div>
                            <div className='mid-text'>Feels Like</div>
                            <br />
                            <div className='temp-text'>
                                {details?.main?.humidity}%
                            </div>
                            <div className='mid-text'>Humidity</div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='temp-text'>
                                {Math.round(details?.main?.temp_max - 273.15)}
                                °C
                            </div>
                            <div className='mid-text'>Max Now</div>
                            <br />
                            <div className='temp-text'>
                                {Math.round(details?.main?.temp_min - 273.15)}
                                °C
                            </div>
                            <div className='mid-text'>Min Now</div>
                        </div>
                    </div>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='icon'>{icon}</div>
                            <div className='mid-text'>
                                {details?.weather[0]?.main}
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='temp-text'>{time}</div>
                            <div className='mid-text'>hh:mm:ss</div>
                            <br />
                            <div className='temp-text'>{date}</div>
                            <div className='mid-text'>{day}</div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='temp-text'>
                                {details?.wind?.speed}
                                {dir}
                            </div>
                            <div className='mid-text'>Wind Speed</div>
                            <br />
                            <div className='temp-text'>
                                {details?.visibility / 1000}km
                            </div>
                            <div className='mid-text'>Visibility</div>
                        </div>
                    </div>
                </div>
            </div>
            {drop && (
                <div className='loc-drop'>
                    <div className='circle1'></div>
                    <div className='circle2'></div>
                    <div className='circle3'></div>
                </div>
            )}
        </div>
    );
};

export default WeatherOverlay;
