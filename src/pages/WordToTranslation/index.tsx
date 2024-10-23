import { StepProgress } from '@/components/StepProgress';
import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Button, Stack, Typography } from '@mui/material';
import { WordCard } from './WordCard';
import { useWordToTranslation } from './hooks';

const WordToTranslation = () => {
  const { isLoading, stepNumber, stepCount, step, applyAnswer, nextStep, isFinished } = useWordToTranslation();

  return (
    <DashboardPagesLayout>
      <Stack direction="row" spacing={2} marginBottom={4} alignItems="center">
        <Typography variant="h4">Слово-перевод</Typography>
        {!isLoading && <StepProgress stepNumber={stepNumber} stepCount={stepCount} finished={isFinished} />}
      </Stack>
      {step && !isFinished && (
        <Stack sx={{ maxWidth: '80%' }} spacing={2}>
          <Stack direction="row" spacing={2}>
            <WordCard data={step.word} />
            <Stack spacing={2}>
              {step.answers.map((it, index) => {
                return (
                  <Button
                    key={it.id}
                    variant="outlined"
                    onClick={() => applyAnswer(it)}
                    color={
                      step.userAnswer && step.userAnswer.id === it.id
                        ? step.userAnswer.id === step.word.id
                          ? 'success'
                          : 'error'
                        : undefined
                    }>
                    {index + 1}. {it.translate}
                  </Button>
                );
              })}
            </Stack>
          </Stack>
          {step.userAnswer && (
            <Button variant="outlined" onClick={nextStep}>
              Дальше
            </Button>
          )}
        </Stack>
      )}
    </DashboardPagesLayout>
  );
};

export default WordToTranslation;
