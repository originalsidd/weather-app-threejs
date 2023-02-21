import React, { useEffect, useState } from 'react';

const WeatherOverlay = (props) => {
    const weather = props.weatherDetails;
    console.log(weather);
    const handleMouseMove = (e, card) => {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
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

    return (
        <div className='weather-overlay'>
            <div className='card-container'>
                <div className='cards'>
                    <div className='card'>
                        <div className='card-content'>{weather.main.temp}</div>
                    </div>
                    <div className='card'>
                        <div className='card-content'></div>
                    </div>
                    <div className='card'>
                        <div className='card-content'></div>
                    </div>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <div className='card-content'></div>
                    </div>
                    <div className='card'>
                        <div className='card-content'></div>
                    </div>
                    <div className='card'>
                        <div className='card-content'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherOverlay;
