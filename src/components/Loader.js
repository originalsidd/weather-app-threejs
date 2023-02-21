import { Sphere, Plane } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

const Loader = () => {
    const ref = useRef();
    useFrame((state, delta) => {
        ref.current.scale.x -= 20 * delta;
        ref.current.scale.y -= 20 * delta;
    });
    return <Plane ref={ref} position={[0, 0, 0]} scale={10} />;
};

export default Loader;
