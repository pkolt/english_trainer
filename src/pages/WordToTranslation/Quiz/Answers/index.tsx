import { Button, Stack } from '@mui/material';
import { Word, QuizItem } from '@/services/words/types';

interface Props {
  item: QuizItem;
  onClickAnswer: (word: Word) => void;
}

export const Answers = ({ item, onClickAnswer }: Props) => {
  return (
    <Stack spacing={2}>
      {item.answers.map((it, index) => {
        const isAnswered: boolean = !!item.userAnswer;
        const isSelected: boolean = item.userAnswer?.id === it.id;
        const isSuccess: boolean = it.id === item.question.id;
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
