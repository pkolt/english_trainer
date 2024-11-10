import { HiddenText } from '@/components/HiddenText';
import { SimpleSpeakButton } from '@/components/SimpleSpeakButton';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { Word } from '@/services/words/types';
import { renderWordTypes } from '@/services/words/utils';
import { useMemo } from 'react';

interface Props {
  data: Word;
  autoSpeak: boolean;
}

export const Question = ({ data, autoSpeak }: Props) => {
  const wordTypesAsStr = useMemo(() => renderWordTypes(data.types), [data.types]);
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2, justifyContent: 'space-between' }}>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <SimpleSpeakButton text={data.word} autoSpeak={autoSpeak} />
            <Typography variant="h4">{data.word}</Typography>
            {data.transcription && (
              <Typography variant="body1" color="textSecondary">
                [{data.transcription}]
              </Typography>
            )}
          </Stack>

          <Box paddingLeft={6}>
            {wordTypesAsStr && (
              <Typography variant="caption" color="success">
                ({wordTypesAsStr})
              </Typography>
            )}
          </Box>
        </Box>

        {data.example && (
          <>
            <Divider />
            <Stack spacing={1}>
              <Typography variant="body2">Пример:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <SimpleSpeakButton text={data.example} />
                <Typography variant="body2">{data.example}</Typography>
              </Stack>
              {data.exampleTranslate && (
                <Box paddingLeft={6}>
                  <HiddenText>
                    <Typography variant="body2">{data.exampleTranslate}</Typography>
                  </HiddenText>
                </Box>
              )}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};
