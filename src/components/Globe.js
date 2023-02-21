import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';

import * as THREE from 'three';
import { EnvironmentMap } from '@react-three/drei';

const Globe = (props) => {
    const earthRef = useRef();
    const nightRef = useRef();
    const cloudRef = useRef();
    const colorMap = useLoader(TextureLoader, 'textures/8k_earth_daymap.jpg');
    const colorMap2 = useLoader(
        TextureLoader,
        'textures/8k_earth_nightmap.jpg'
    );
    const normalMap = useLoader(
        TextureLoader,
        'textures/8k_earth_normal_map.jpg'
    );
    const specularMap = useLoader(
        TextureLoader,
        'textures/8k_earth_specular_map.jpg'
    );
    const cloudsMap = useLoader(TextureLoader, 'textures/8k_earth_clouds.jpg');

    const flakesTexture = new THREE.CanvasTexture(new FlakesTexture());
    flakesTexture.wrapS = THREE.RepeatWrapping;
    flakesTexture.wrapT = THREE.RepeatWrapping;
    flakesTexture.repeat.x = 10;
    flakesTexture.repeat.y = 6;

    // useFrame(() => {
    //     ref.current.rotation.y += 0.001;
    //     cloudRef.current.rotation.y += 0.0005;
    // });

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
            <mesh {...props} ref={earthRef} scale={20} receiveShadow={true}>
                <sphereGeometry args={[1, 64, 64, 0]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    roughness={0.7}
                    metalness={0.4}
                />
            </mesh>
            {/* <mesh
                {...props}
                scale={20}
                receiveShadow={true}
                position={[-0.15, -0.15, -0.15]}
            >
                <sphereGeometry ref={nightRef} args={[0.999, 64, 64, 0]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap2}
                    normalMap={normalMap}
                    roughness={0.7}
                    metalness={0.4}
                />
            </mesh> */}
        </>
    );
};

export default Globe;
