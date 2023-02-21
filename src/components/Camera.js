import React, { useRef, useState, useEffect } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useScroll, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Camera = (props) => {
    const ref = useRef();

    return (
        <>
            <PerspectiveCamera
                ref={ref}
                makeDefault
                position={[0, 0, 70]}
                fov={40}
                onUpdate={(c) => c.updateProjectionMatrix()}
            />
            <OrbitControls target={[0, 1.5, 0]} />
        </>
    );
};

export default Camera;
