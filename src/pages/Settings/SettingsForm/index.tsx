import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Settings, SettingsSchema } from '../../../store/settings/schema';
import { Button, Stack, Typography } from '@mui/material';
import { FormTextField } from '@/components/Form/FormTextField';
import { getReadySpeak } from '@/utils/speak';
import { mergeValues } from '@/utils/form';
import { FormSelectField } from '@/components/Form/FormSelectField';
import { Choice } from '@/types';
import { SpeakButton } from '@/components/SpeakButton';
import { useSettings } from '@/store/settings';

type FormData = Settings & {
  textExample: string;
};

const LANG_CODES = ['en-US', 'en-GB'];
const DEFAULT_TEXT_EXAMPLE = 'You can choose language for study English.';
const DEFAULT_VALUES: FormData = {
  textExample: DEFAULT_TEXT_EXAMPLE,
  voiceURI: '',
};

export const SettingsForm = () => {
  const [settings, setSettings] = useSettings();
  const [voiceChoices, setVoiceChoices] = useState<Choice[]>([]);
  const [defaultValues] = useState<Settings>(mergeValues(settings ?? {}, DEFAULT_VALUES));

  const {
    formState: { isDirty, isValid },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(SettingsSchema),
    defaultValues,
  });

  const textExample = watch('textExample');
  const voiceURI = watch('voiceURI');

  const onSubmit = (data: Settings) => {
    setSettings(data);
    reset(mergeValues(data, DEFAULT_VALUES));
  };

  useEffect(() => {
    getReadySpeak().then(() => {
      const voices = speechSynthesis
        .getVoices()
        .filter((it) => LANG_CODES.includes(it.lang))
        .toSorted((a, b) => b.lang.localeCompare(a.lang));
      const choices: Choice[] = voices.map((it) => {
        const label = `${it.name} / ${it.lang} / ${it.localService ? 'локальный' : 'удаленный'}`;
        return { label, value: it.voiceURI };
      });
      setVoiceChoices(choices);
    });
  }, []);

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} maxWidth="50%">
      <Typography variant="body1">Настройки произношения:</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <SpeakButton text={textExample} voiceURI={voiceURI} />
        <FormTextField control={control} name="textExample" label="Пример текста" autoFocus fullWidth />
      </Stack>
      <FormSelectField control={control} name="voiceURI" label="Выбрать голос" choices={voiceChoices} fullWidth />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" type="submit" disabled={!isValid || !isDirty}>
          Сохранить
        </Button>
        <Button variant="outlined" onClick={() => reset(defaultValues)} disabled={!isDirty}>
          Очистить
        </Button>
      </Stack>
    </Stack>
  );
};
