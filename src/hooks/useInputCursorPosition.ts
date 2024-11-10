import { useEffect, useState } from 'react';

export const useInputCursorPosition = () => {
  const [position, setPosition] = useState(0);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef) {
      return;
    }

    const handle = () => {
      setPosition(inputRef.selectionStart ?? 0);
    };

    inputRef.addEventListener('focusout', handle);

    return () => {
      inputRef.removeEventListener('focusout', handle);
    };
  }, [inputRef]);

  return { position, setInputRef };
};
