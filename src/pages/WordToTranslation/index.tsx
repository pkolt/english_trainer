import { StepProgress } from '@/components/StepProgress';
import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Button, Stack, Typography } from '@mui/material';
import { useWordToTranslation } from './hooks';
import { FinalReport } from './FinalReport';
import { Quiz } from './Quiz';

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
    autoSpeak,
    setAutoSpeak,
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
      {isFinished && <FinalReport data={questions} />}
      {!isFinished && question && (
        <Quiz
          question={question}
          onClickAnswer={applyUserAnswer}
          onGoToNextQuestion={goToNextQuestion}
          autoSpeak={autoSpeak}
          onChangeAutoSpeak={setAutoSpeak}
        />
      )}
    </DashboardPagesLayout>
  );
};

export default WordToTranslation;
