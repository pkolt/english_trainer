import { StepProgress } from '@/components/StepProgress';
import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { Question } from './Question';
import { useWordToTranslation } from './hooks';
import { Answers } from './Answers';
import { Report } from './Report';

const WordToTranslation = () => {
  const {
    isLoading,
    stepNumber,
    stepCount,
    question,
    applyUserAnswer,
    goToNextQuestion,
    isFinished,
    questions,
    restart,
  } = useWordToTranslation();

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
      {question && !isFinished && (
        <Grid container spacing={4}>
          <Grid size={6} sx={{ display: 'flex' }}>
            <Question data={question.question} />
          </Grid>
          <Grid size={6}>
            <Answers data={question} onClickAnswer={applyUserAnswer} />
          </Grid>
          <Grid offset={6} size={6}>
            {question.userAnswer && (
              <Button variant="outlined" onClick={goToNextQuestion} size="large">
                Дальше
              </Button>
            )}
          </Grid>
        </Grid>
      )}
      {isFinished && <Report data={questions} />}
    </DashboardPagesLayout>
  );
};

export default WordToTranslation;
