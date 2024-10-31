import { useSettings } from '@/store/settings';
import { SpeakButton } from '../SpeakButton';

interface Props {
  text: string;
  autoSpeak?: boolean;
}

export const SimpleSpeakButton = ({ text, autoSpeak }: Props) => {
  const [settings] = useSettings();
  return settings && <SpeakButton key={text} text={text} voiceURI={settings.voiceURI} autoSpeak={autoSpeak} />;
};
