import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useCallback, useEffect, useState } from 'react';
import { getReadySpeak, speakText } from '@/utils/speak';
import styles from './index.module.css';
import cn from 'classnames';

interface Props {
  text: string;
  voiceURI: string;
  autoSpeak?: boolean;
}

export const SpeakButton = ({ text, voiceURI, autoSpeak }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = useCallback(() => {
    if (isReady && !isSpeaking) {
      setIsSpeaking(true);
      speakText(text, voiceURI)
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsSpeaking(false);
        });
    }
  }, [isReady, isSpeaking, text, voiceURI]);

  useEffect(() => {
    getReadySpeak().then(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady && autoSpeak) {
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSpeak, isReady]);

  return (
    <IconButton
      color={isSpeaking ? 'warning' : 'primary'}
      onClick={handleClick}
      disabled={!isReady || !text || !voiceURI}
      className={cn(isSpeaking && styles.speaking)}>
      <VolumeUpIcon />
    </IconButton>
  );
};
