import { StepProgress } from '@/components/StepProgress';
import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { WordCard } from './WordCard';
import { useWordToTranslation } from './hooks';
import { Answers } from './Answers';
import { Report } from './Report';

const WordToTranslation = () => {
  const { isLoading, stepNumber, stepCount, step, applyAnswer, nextStep, isFinished, stepList, restart } =
    useWordToTranslation();

  return (
    <DashboardPagesLayout>
      <Stack direction="row" spacing={2} marginBottom={4} alignItems="center">
        <Typography variant="h4">Слово-перевод</Typography>
        {!isLoading &&
          (isFinished ? (
            <Button variant="outlined" onClick={restart}>
              Продолжить
            </Button>
          ) : (
            <StepProgress stepNumber={stepNumber} stepCount={stepCount} />
          ))}
      </Stack>
      {step && !isFinished && (
        <Grid container spacing={4}>
          <Grid size={6} sx={{ display: 'flex' }}>
            <WordCard data={step.word} />
          </Grid>
          <Grid size={6}>
            <Answers data={step} onClickAnswer={applyAnswer} />
          </Grid>
          <Grid offset={6} size={6}>
            {step.userAnswer && (
              <Button variant="outlined" onClick={nextStep} size="large">
                Дальше
              </Button>
            )}
          </Grid>
        </Grid>
      )}
      {isFinished && <Report data={stepList} />}
    </DashboardPagesLayout>
  );
};

export default WordToTranslation;
