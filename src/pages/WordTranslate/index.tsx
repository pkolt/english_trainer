import { HiddenText } from '@/components/HiddenText';
import { SimpleSpeakButton } from '@/components/SimpleSpeakButton';
import { StepProgress } from '@/components/StepProgress';
import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

const WordTranslate = () => {
  const word = 'accountant';
  const translate = 'əˈkaʊntənt';
  const example = `My business is very small, so I don't employ an accountant.`;
  const exampleTranslate = `Мой бизнес очень маленький, поэтому я не нанимаю бухгалтера.`;

  return (
    <DashboardPagesLayout>
      <Stack direction="row" spacing={2} marginBottom={2} alignItems="center">
        <Typography variant="h4">Слово-перевод</Typography>
        <StepProgress stepNumber={6} stepCount={7} />
      </Stack>
      <Box sx={{ maxWidth: '50%' }}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SimpleSpeakButton text={word} />
                <Typography variant="h5">{word}</Typography>
                <Typography variant="body1" color="textSecondary">
                  [{translate}]
                </Typography>
              </Stack>
              {example && (
                <Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SimpleSpeakButton text={example} />
                    <Typography variant="body2">{example}</Typography>
                  </Stack>
                  {exampleTranslate && (
                    <Box paddingLeft={6}>
                      <HiddenText>
                        <Typography variant="body2">{exampleTranslate}</Typography>
                      </HiddenText>
                    </Box>
                  )}
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </DashboardPagesLayout>
  );
};

export default WordTranslate;
