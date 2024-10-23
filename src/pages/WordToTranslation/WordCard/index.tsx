import { HiddenText } from '@/components/HiddenText';
import { SimpleSpeakButton } from '@/components/SimpleSpeakButton';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { Word } from '@/services/words/types';

interface Props {
  data: Word;
}

export const WordCard = ({ data }: Props) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SimpleSpeakButton text={data.word} />
            <Typography variant="h5">{data.word}</Typography>
            <Typography variant="body1" color="textSecondary">
              [{data.transcription}]
            </Typography>
          </Stack>
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
        </Stack>
      </CardContent>
    </Card>
  );
};
