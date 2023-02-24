import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

let a = 50;
let b = 70;

const Camera = (props) => {
    const ref = useRef();
    const [flag, setFlag] = useState(true);
    const vec = new THREE.Vector3();
    let width = window.innerWidth;

    if (width < 800 && flag) {
        a = 80;
        b = 120;
        setFlag(false);
    } else if (width > 800 && !flag) {
        a = 50;
        b = 70;
        setFlag(true);
    }

    useFrame(() => {
        width = window.innerWidth;
        if (props.lat) {
            ref.current.position.lerp(
                vec.set(
                    (a -
                        a *
                            Math.pow(
                                Math.sin(
                                    THREE.MathUtils.degToRad(
                                        Math.abs(props.lat)
                                    )
                                ),
                                4
                            )) *
                        Math.sin(THREE.MathUtils.degToRad(props.lon)),
                    (a +
                        2 *
                            Math.pow(
                                Math.abs(
                                    Math.sin(
                                        THREE.MathUtils.degToRad(props.lat)
                                    )
                                ),
                                1
                            )) *
                        Math.sin(THREE.MathUtils.degToRad(props.lat)),
                    (a -
                        a *
                            Math.pow(
                                Math.sin(
                                    THREE.MathUtils.degToRad(
                                        Math.abs(props.lat)
                                    )
                                ),
                                4
                            )) *
                        Math.cos(THREE.MathUtils.degToRad(props.lon))
                ),
                0.05
            );
        }
    });

    return (
        <>
            <PerspectiveCamera
                ref={ref}
                makeDefault
                position={[0, 0, b]}
                fov={40}
                onUpdate={(c) => c.updateProjectionMatrix()}
            />
            <OrbitControls target={[0, 0, 0]} enablePan={false} />
        </>
    );
};

export default Camera;
