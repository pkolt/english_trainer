import { useHotkeys, HotkeyCallback } from 'react-hotkeys-hook';
import { useGetWordList } from '@/services/words/hooks';
import { Word, Question } from '@/services/words/types';
import { filterWordsByTagIds, filterWordsByTypes, makeQuestions } from '@/services/words/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrainerRouteState } from '../Trainers/types';

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

  const routeState = (useLocation().state ?? {}) as TrainerRouteState;
  const filteredWordList = useMemo(() => {
    if (wordList) {
      let result = wordList;
      result = filterWordsByTypes(result, routeState.wordTypes ?? []);
      result = filterWordsByTagIds(result, routeState.tags ?? []);
      return result;
    }
  }, [routeState.tags, routeState.wordTypes, wordList]);

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

  const startQuiz = useCallback(() => {
    if (!filteredWordList) {
      return;
    }

    setIsFinished(false);
    setCurIndex(0);
    setQuestions(makeQuestions(filteredWordList));
  }, [filteredWordList]);

  useEffect(startQuiz, [startQuiz]);

  useHotkeys('space,enter', isFinished ? startQuiz : goToNextQuestion, { preventDefault: true });
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
    startQuiz,
    autoSpeak,
    setAutoSpeak,
  };
};
