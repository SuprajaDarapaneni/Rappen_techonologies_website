/* eslint-disable linebreak-style */
/* eslint-disable indent */
import { useState, useEffect } from 'react';

function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(prefersDark.matches);

        const listener = (e) => setIsDarkMode(e.matches);
        prefersDark.addEventListener('change', listener);

        return () => {
            prefersDark.removeEventListener('change', listener);
        };
    }, []);

    return isDarkMode;
}

export default useDarkMode;
