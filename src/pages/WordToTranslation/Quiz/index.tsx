import { Question as QuestionType } from '../types';
import { Button, Grid2 as Grid } from '@mui/material';
import { Question } from './Question';
import { Answers } from './Answers';
import { Word } from '@/services/words/types';

interface Props {
  question: QuestionType;
  onClickAnswer: (answer: Word) => void;
  onGoToNextQuestion: () => void;
}

export const Quiz = ({ question, onClickAnswer, onGoToNextQuestion }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid size={6} sx={{ display: 'flex' }}>
        <Question data={question.question} />
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
