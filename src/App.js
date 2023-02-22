import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Stars, Scroll, ScrollControls, Environment } from '@react-three/drei';
import Camera from './components/Camera';
import Globe from './components/Globe';
import Loader from './components/Loader';
import SearchBar from './components/SearchBar';
import WeatherOverlay from './components/WeatherOverlay';
import * as THREE from 'three';
import './App.css';

const Scene = (props) => {
    const lightRef = useRef();
    const date = new Date();
    console.log(date);
    let dayOfYear = Math.floor(
        (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    if (dayOfYear > 172) {
        dayOfYear -= (172 + 356) / 2;
        dayOfYear *= -1;
    } else {
        dayOfYear -= 172 / 2;
    }
    console.log(dayOfYear);
    // 172 until summer solstice
    // 356 until winter solstice
    // can devise function like x-172/2 % 172
    // tan (x/10) = 23.5
    // x=15.282
    // 86 <- Max
    // 86 -> 15.282 mapping
    // 5.6275 ratio

    // degree calculated from seconds of Greenwich time and placing sun

    useFrame(() => {
        const time = new Date();
        const seconds =
            3600 * time.getUTCHours() +
            60 * time.getUTCMinutes() +
            time.getUTCSeconds();
        const degree = ((seconds - 43200) / 86400) * 360;
        if (lightRef.current) {
            lightRef.current.position.x =
                -10 * Math.cos(THREE.MathUtils.degToRad(degree));
            lightRef.current.position.z =
                10 * Math.sin(THREE.MathUtils.degToRad(degree));
        }
    });
    return (
        <group>
            <Suspense fallback={<Loader />}>
                <Stars />
                <ambientLight intensity={0.2} />
                <directionalLight
                    ref={lightRef}
                    position={[10, dayOfYear / 5.6275, 10]}
                />
                <Camera {...props} />
                <Globe position={[0, 0, 0]} />
            </Suspense>
        </group>
    );
};

const App = () => {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [weatherDetails, setWeatherDetails] = useState();

    return (
        <>
            <SearchBar
                lat={lat}
                lon={long}
                setLat={setLat}
                setLong={setLong}
                setWeatherDetails={setWeatherDetails}
            />
            <Canvas style={{ position: 'absolute' }}>
                <Scene lat={lat} lon={long} />
            </Canvas>
            <WeatherOverlay weatherDetails={weatherDetails} />
        </>
    );
};

export default App;
