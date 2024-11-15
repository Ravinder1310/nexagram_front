import React, { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

const FireworksEffect = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const fireworks = new Fireworks(containerRef.current, {
            rocketsPoint: 50,
            speed: 4,
            acceleration: 1.05,
            particles: 100,
            explosion: 5,
        });

        fireworks.start();

        // Stop fireworks after 5 seconds
        const timeout = setTimeout(() => {
            fireworks.stop();
        }, 5000);

        return () => {
            clearTimeout(timeout);
            fireworks.stop();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                marginTop: "100px",
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        />
    );
};

export default FireworksEffect;
