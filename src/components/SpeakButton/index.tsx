import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useCallback, useEffect, useState } from 'react';
import { getReadySpeak, speakEnglishText } from '@/utils/speak';
import styles from './index.module.css';
import cn from 'classnames';

interface Props {
  text: string;
}

export const SpeakButton = ({ text }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = useCallback(() => {
    setIsSpeaking(true);
    speakEnglishText(text).finally(() => setIsSpeaking(false));
  }, [text]);

  useEffect(() => {
    getReadySpeak().then(setIsReady);
  }, []);

  return (
    <IconButton
      color={isSpeaking ? 'warning' : 'primary'}
      onClick={handleClick}
      disabled={!isReady}
      className={cn(isSpeaking && styles.speaking)}>
      <VolumeUpIcon />
    </IconButton>
  );
};
