import { useGetWordList } from '@/services/words/hooks';
import { Word } from '@/services/words/types';
import { getRandomItemOfArray, shuffle } from '@/utils/random';
import { useCallback, useEffect, useState } from 'react';
import { Step } from './types';

export const useWordToTranslation = () => {
  const { data: wordList, isLoading } = useGetWordList();
  const [stepList, setStepList] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const stepNumber = stepIndex + 1;
  const stepCount = stepList.length;
  const step = stepList[stepIndex];

  const applyAnswer = useCallback(
    (word: Word) => {
      if (step.userAnswer) {
        return;
      }

      setStepList((state) =>
        state.map((it) => {
          return it === step ? { ...it, userAnswer: word } : it;
        }),
      );
    },
    [step],
  );

  const nextStep = useCallback(() => {
    if (stepIndex < stepList.length - 1) {
      setStepIndex((state) => state + 1);
    } else {
      setIsFinished(true);
    }
  }, [stepIndex, stepList.length]);

  const makeQuestions = useCallback(() => {
    if (!wordList) {
      return;
    }
    let array = [...wordList];
    const myStepList: Step[] = [];

    for (let i = 0; i < 7; i++) {
      const word = getRandomItemOfArray(array);
      const answers: Word[] = [word];
      array = array.filter((it) => it.id !== word.id);

      for (let j = 0; j < 4; j++) {
        const answer = getRandomItemOfArray(array);
        array = array.filter((it) => it.id !== answer.id);
        answers.push(answer);
      }
      myStepList.push({
        word,
        answers: shuffle(answers),
        userAnswer: null,
      });
    }

    setIsFinished(false);
    setStepIndex(0);
    setStepList(myStepList);
  }, [wordList]);

  useEffect(makeQuestions, [makeQuestions]);

  return {
    isLoading,
    stepNumber,
    stepCount,
    step,
    applyAnswer,
    nextStep,
    isFinished,
    stepList,
    restart: makeQuestions,
  };
};
