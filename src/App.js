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
    return (
        <group>
            <Suspense fallback={<Loader />}>
                <Stars />
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 10]} />
                <Camera />
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
