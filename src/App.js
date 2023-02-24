import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Camera from './components/Camera';
import Globe from './components/Globe';
import Load from './components/Load';
import SearchBar from './components/SearchBar';
import WeatherOverlay from './components/WeatherOverlay';
import * as THREE from 'three';
import './App.css';

const Scene = (props) => {
    const lightRef = useRef();
    const date = new Date();
    let dayOfYear = Math.floor(
        (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    if (dayOfYear > 172) {
        dayOfYear -= (172 + 356) / 2;
        dayOfYear *= -1;
    } else {
        dayOfYear -= 172 / 2;
    }
    let lightAxisAngle = dayOfYear / 5.6275;
    // 172 until summer solstice
    // 356 until winter solstice
    // can devise function like x-172/2 % 172
    // tan (x/10) = 23.5
    // x=15.282
    // 86 <- Max
    // 86 -> 15.282 mapping
    // 5.6275 ratio

    // degree calculated from seconds of Greenwich time and placing sun overhead

    useFrame(() => {
        const time = new Date();
        const seconds =
            3600 * time.getUTCHours() +
            60 * time.getUTCMinutes() +
            time.getUTCSeconds();
        const degree = ((seconds - 43200) / 86400) * 360;
        if (lightRef.current) {
            lightRef.current.position.x =
                -10 * Math.sin(THREE.MathUtils.degToRad(degree));
            lightRef.current.position.z =
                10 * Math.cos(THREE.MathUtils.degToRad(degree));
        }
    });
    return (
        <group>
            <Stars />
            <ambientLight intensity={0.4} />
            <directionalLight
                ref={lightRef}
                position={[10, lightAxisAngle, 0]}
                intensity={1}
            />
            <Camera {...props} />
            <Globe position={[0, 0, 0]} />
        </group>
    );
};

const App = () => {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [weatherDetails, setWeatherDetails] = useState(null);

    return (
        <div className='main'>
            <SearchBar
                lat={lat}
                lon={long}
                setLat={setLat}
                setLong={setLong}
                setWeatherDetails={setWeatherDetails}
            />

            {weatherDetails === null ? (
                <div className='intro'>EARTH</div>
            ) : (
                <></>
            )}

            <Suspense fallback={<Load desc={'Earth'} />}>
                <Canvas style={{ position: 'absolute' }}>
                    <Scene lat={lat} lon={long} />
                </Canvas>
            </Suspense>

            {weatherDetails !== null ? (
                <WeatherOverlay weatherDetails={weatherDetails} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default App;
