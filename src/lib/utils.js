// src/lib/utils.ts
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
// Sound utility for different interactions
export const playButtonSound = () => {
    try {
        const audio = new Audio('/sounds/lock.wav');
        audio.volume = 0.4;
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    }
    catch (error) {
        console.log('Audio creation failed:', error);
    }
};
export const playOrbClickSound = () => {
    try {
        const audio = new Audio('/sounds/orb-click.wav'); // You'll need to add this file
        audio.volume = 0.3;
        audio.play().catch(e => {
            console.log('Orb click audio failed:', e);
        });
    }
    catch (error) {
        console.log('Orb click audio creation failed:', error);
    }
};
export const playZoomInSound = () => {
    try {
        const audio = new Audio('/sounds/zoom-in.wav'); // You'll need to add this file
        audio.volume = 0.3;
        audio.play().catch(e => {
            console.log('Zoom in audio failed:', e);
        });
    }
    catch (error) {
        console.log('Zoom in audio creation failed:', error);
    }
};
export const playZoomOutSound = () => {
    try {
        const audio = new Audio('/sounds/zoom-out.wav'); // You'll need to add this file
        audio.volume = 0.3;
        audio.play().catch(e => {
            console.log('Zoom out audio failed:', e);
        });
    }
    catch (error) {
        console.log('Zoom out audio creation failed:', error);
    }
};
export const playCoreClickSound = () => {
    try {
        const audio = new Audio('/sounds/core-click.wav'); // You'll need to add this file
        audio.volume = 0.4;
        audio.play().catch(e => {
            console.log('Core click audio failed:', e);
        });
    }
    catch (error) {
        console.log('Core click audio creation failed:', error);
    }
};
export const playSynthesisSound = () => {
    try {
        const audio = new Audio('/sounds/synthesis.wav'); // You'll need to add this file
        audio.volume = 0.5;
        audio.play().catch(e => {
            console.log('Synthesis audio failed:', e);
        });
    }
    catch (error) {
        console.log('Synthesis audio creation failed:', error);
    }
};
// Sound utility for button interactions
export const playLockSound = () => {
    try {
        const audio = new Audio('/sounds/lock.wav');
        audio.volume = 0.3; // Set volume to 30% to avoid being too loud
        audio.preload = 'auto'; // Preload the audio
        // Handle browser autoplay policies
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                console.log('Lock sound played successfully');
            })
                .catch(err => {
                console.log('Audio play failed (likely autoplay policy):', err);
                // Try to play on user interaction
                document.addEventListener('click', () => {
                    audio.play().catch(e => console.log('Still failed:', e));
                }, { once: true });
            });
        }
    }
    catch (error) {
        console.log('Audio not available:', error);
    }
};
