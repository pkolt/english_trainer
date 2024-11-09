import { Button, FormControlLabel, Grid2 as Grid, Switch, Typography } from '@mui/material';
import { Question } from './Question';
import { Answers } from './Answers';
import { Word, Question as QuestionType } from '@/services/words/types';

interface Props {
  question: QuestionType;
  onClickAnswer: (answer: Word) => void;
  onGoToNextQuestion: () => void;
  autoSpeak: boolean;
  onChangeAutoSpeak: (value: boolean) => void;
}

export const Quiz = ({ question, onClickAnswer, onGoToNextQuestion, autoSpeak, onChangeAutoSpeak }: Props) => {
  return (
    <Grid container rowSpacing={4} columnSpacing={8}>
      <Grid size={12} textAlign="right">
        <FormControlLabel
          control={
            <Switch size="small" checked={autoSpeak} onChange={(event) => onChangeAutoSpeak(event.target.checked)} />
          }
          label={<Typography variant="body2">Автопроизношение</Typography>}
        />
      </Grid>
      <Grid size={6} sx={{ display: 'flex' }}>
        <Question data={question.question} autoSpeak={autoSpeak} />
      </Grid>
      <Grid size={6}>
        <Answers data={question} onClickAnswer={onClickAnswer} />
      </Grid>
      <Grid offset={6} size={6}>
        {question.userAnswer && (
          <Button variant="outlined" onClick={onGoToNextQuestion} size="large">
            Дальше
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
