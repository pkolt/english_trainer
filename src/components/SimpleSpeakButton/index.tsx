import { useSettings } from '@/store/settings';
import { SpeakButton } from '../SpeakButton';

interface Props {
  text: string;
}

export const SimpleSpeakButton = ({ text }: Props) => {
  const [settings] = useSettings();
  return settings && <SpeakButton text={text} voiceURI={settings.voiceURI} />;
};
