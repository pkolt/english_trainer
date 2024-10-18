import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useCallback, useEffect, useState } from 'react';
import { getReadySpeak, speakText } from '@/utils/speak';
import styles from './index.module.css';
import cn from 'classnames';

interface Props {
  text: string;
  voiceURI: string;
}

export const SpeakButton = ({ text, voiceURI }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = useCallback(() => {
    setIsSpeaking(true);
    speakText(text, voiceURI).finally(() => setIsSpeaking(false));
  }, [text, voiceURI]);

  useEffect(() => {
    getReadySpeak().then(setIsReady);
  }, []);

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
