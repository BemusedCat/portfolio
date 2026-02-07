import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export default function useKonamiCode(callback) {
  const [inputSequence, setInputSequence] = useState([]);

  const handleKeyDown = useCallback((e) => {
    setInputSequence((prev) => {
      const newSequence = [...prev, e.code].slice(-KONAMI_CODE.length);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        callback?.();
        return [];
      }

      return newSequence;
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return inputSequence;
}
