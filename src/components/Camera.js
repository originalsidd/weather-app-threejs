import React, { useRef, useState, useEffect } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import {
    PerspectiveCamera,
    useScroll,
    OrbitControls,
    lerp,
} from '@react-three/drei';
import * as THREE from 'three';

const Camera = (props) => {
    const ref = useRef();
    const [flag, setFlag] = useState(true);
    const vec = new THREE.Vector3();

    useFrame(() => {
        if (props.lat) {
            ref.current.position.lerp(
                vec.set(
                    (50 -
                        50 *
                            Math.pow(
                                Math.sin(
                                    THREE.MathUtils.degToRad(
                                        Math.abs(props.lat)
                                    )
                                ),
                                4
                            )) *
                        Math.sin(THREE.MathUtils.degToRad(props.lon)),
                    50 * Math.sin(THREE.MathUtils.degToRad(props.lat)),
                    (50 -
                        50 *
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
                position={[0, 0, 70]}
                fov={40}
                onUpdate={(c) => c.updateProjectionMatrix()}
            />
            <OrbitControls target={[0, 0, 0]} />
        </>
    );
};

export default Camera;
