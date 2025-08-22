// hooks/useFonts.ts
import { useContext } from 'react';
import { FontContext } from '../components/FontProvider';

export const useFonts = () => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error('useFonts must be used within a FontProvider');
    }
    return context;
};