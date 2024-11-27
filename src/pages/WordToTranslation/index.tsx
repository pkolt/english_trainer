import { StepProgress } from '@/components/StepProgress';
import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Button, Stack, Typography } from '@mui/material';
import { useWordToTranslation } from './hooks';
import { FinalReport } from './FinalReport';
import { Quiz } from './Quiz';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

const WordToTranslation = () => {
  const {
    isLoading,
    stepNumber,
    stepCount,
    curItem,
    applyUserAnswer,
    goToNextQuestion,
    isFinished,
    items,
    startQuiz: restart,
    autoSpeak,
    setAutoSpeak,
    filterText,
  } = useWordToTranslation();

  return (
    <DashboardPagesLayout>
      <Stack marginBottom={4}>
        <Stack direction="row" spacing={2} alignItems="center">
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
        {filterText && (
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterAltRoundedIcon fontSize="small" color="secondary" />
            <Typography variant="body1" color="secondary">
              {filterText}
            </Typography>
          </Stack>
        )}
      </Stack>
      {isFinished && <FinalReport data={items} />}
      {!isFinished && curItem && (
        <Quiz
          item={curItem}
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
