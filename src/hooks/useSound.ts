import { useCallback } from 'react';
import { Howl } from 'howler';

// Sound assets maps (placeholders)
const SOUNDS = {
    click: new Howl({ src: ['/sounds/click.mp3'] }),
    decision: new Howl({ src: ['/sounds/decision.mp3'] }),
    fanfare: new Howl({ src: ['/sounds/fanfare.mp3'] }),
};

export const useSound = () => {
    const play = useCallback((soundName: keyof typeof SOUNDS) => {
        // Check if sound exists and play
        if (SOUNDS[soundName]) {
            SOUNDS[soundName].play();
        }
    }, []);

    return { play };
};
