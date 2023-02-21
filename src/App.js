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
    return (
        <>
            <SearchBar />
            <Canvas style={{ position: 'absolute' }}>
                <Scene />
            </Canvas>
            <WeatherOverlay />
        </>
    );
};

export default App;
