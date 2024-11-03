import { Button, Stack } from '@mui/material';
import { Word, Question } from '@/services/words/types';

interface Props {
  data: Question;
  onClickAnswer: (word: Word) => void;
}

export const Answers = ({ data, onClickAnswer }: Props) => {
  return (
    <Stack spacing={2}>
      {data.answers.map((it, index) => {
        const isAnswered: boolean = !!data.userAnswer;
        const isSelected: boolean = data.userAnswer?.id === it.id;
        const isSuccess: boolean = it.id === data.question.id;
        return (
          <Button
            key={it.id}
            variant={isSelected ? 'contained' : 'outlined'}
            disableElevation
            onClick={() => onClickAnswer(it)}
            color={isSelected ? (isSuccess ? 'success' : 'error') : undefined}
            disabled={isAnswered && !isSuccess && !isSelected}
            size="large"
            sx={{ textTransform: 'none', justifyContent: 'flex-start', textAlign: 'left' }}>
            {index + 1}. {it.translate}
          </Button>
        );
      })}
    </Stack>
  );
};
