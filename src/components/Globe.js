import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

import * as THREE from 'three';

const Globe = (props) => {
    const earthRef = useRef();
    const cloudRef = useRef();
    const colorMap = useLoader(TextureLoader, 'textures/8k_earth_daymap.jpg');
    const normalMap = useLoader(
        TextureLoader,
        'textures/8k_earth_normal_map.jpg'
    );
    const specularMap = useLoader(
        TextureLoader,
        'textures/8k_earth_specular_map.jpg'
    );
    const cloudsMap = useLoader(TextureLoader, 'textures/8k_earth_clouds.jpg');

    return (
        <>
            <mesh ref={cloudRef} scale={20}>
                <sphereGeometry args={[1.002, 64, 64]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.12}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh
                {...props}
                ref={earthRef}
                rotation={[0, 4.713, 0]}
                scale={20}
                receiveShadow={true}
            >
                <sphereGeometry args={[1, 64, 64, 0]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    roughness={0.7}
                    metalness={0.4}
                />
            </mesh>
        </>
    );
};

export default Globe;
