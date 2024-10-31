import { useHotkeys, HotkeyCallback } from 'react-hotkeys-hook';
import { useGetWordList } from '@/services/words/hooks';
import { Word } from '@/services/words/types';
import { getRandomItemOfArray, shuffle } from '@/utils/random';
import { useCallback, useEffect, useState } from 'react';
import { Question } from './types';

export const useWordToTranslation = () => {
  const { data: wordList, isLoading } = useGetWordList();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [curIndex, setCurIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const stepNumber = curIndex + 1;
  const stepCount = questions.length;
  const question = questions.length > 0 ? questions[curIndex] : null;
  const isUserAnswered = !!question?.userAnswer;

  const applyUserAnswer = useCallback(
    (word: Word) => {
      if (!isUserAnswered) {
        setQuestions((state) =>
          state.map((it) => {
            return it === question ? { ...it, userAnswer: word } : it;
          }),
        );
      }
    },
    [question, isUserAnswered],
  );

  const applyUserAnswerByKeyNumber: HotkeyCallback = useCallback(
    (event) => {
      const keyNumber = Number(event.key);
      const answer = question?.answers[keyNumber - 1];
      if (answer) {
        applyUserAnswer(answer);
      }
    },
    [applyUserAnswer, question?.answers],
  );

  const goToNextQuestion = useCallback(() => {
    if (isUserAnswered) {
      if (curIndex < questions.length - 1) {
        setCurIndex((state) => state + 1);
      } else {
        setIsFinished(true);
      }
    }
  }, [curIndex, isUserAnswered, questions.length]);

  const makeQuestions = useCallback(() => {
    if (!wordList) {
      return;
    }
    let array = [...wordList];
    const myStepList: Question[] = [];

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
        question: word,
        answers: shuffle(answers),
        userAnswer: null,
      });
    }

    setIsFinished(false);
    setCurIndex(0);
    setQuestions(myStepList);
  }, [wordList]);

  useEffect(makeQuestions, [makeQuestions]);

  useHotkeys('space,enter', isFinished ? makeQuestions : goToNextQuestion, { preventDefault: true });
  useHotkeys('1,2,3,4,5,6,7,8,9', applyUserAnswerByKeyNumber, { preventDefault: true });

  return {
    isLoading,
    stepNumber,
    stepCount,
    question,
    applyUserAnswer,
    goToNextQuestion,
    isFinished,
    questions,
    restart: makeQuestions,
    autoSpeak,
    setAutoSpeak,
  };
};
