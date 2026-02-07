import { useState, useEffect } from 'react';

export default function Typewriter({ words, period = 2000 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), period);
        }
      } else {
        // Deleting
        setText(currentWord.substring(0, text.length - 1));

        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, period]);

  return (
    <span className="inline-block">
      <span>{text}</span>
      <span className="border-r-2 border-primary cursor-blink ml-1">&nbsp;</span>
    </span>
  );
}
