import { useHotkeys, HotkeyCallback } from 'react-hotkeys-hook';
import { useGetWordList } from '@/services/words/hooks';
import { Word, Question } from '@/services/words/types';
import { filterWordsByTagIds, filterWordsByTypes, makeQuestions, renderWordTypes } from '@/services/words/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrainerRouteState } from '../Trainers/types';
import {
  saveWordProgressList,
  sortWordListByProgress,
  filterWordListByTodayProgress,
} from '@/services/wordProgress/utils';
import { useGetWordProgressList } from '@/services/wordProgress/hooks';
import { useGetTagList } from '@/services/tags/hooks';
import { renderTags } from '@/services/tags/utils';

export const useWordToTranslation = () => {
  const { data: tagList, isLoading: isLoadingTags } = useGetTagList();
  const { data: wordList, isLoading: isLoadingWordList } = useGetWordList();
  const { data: wordProgressList, isLoading: isLoadingWordProgressList } = useGetWordProgressList();
  const isLoading = isLoadingWordList || isLoadingWordProgressList || isLoadingTags;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [curIndex, setCurIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const refOnlyOnce = useRef(false);

  const stepNumber = curIndex + 1;
  const stepCount = questions.length;
  const question = questions.length > 0 ? questions[curIndex] : null;
  const isUserAnswered = !!question?.userAnswer;

  const routeState = (useLocation().state ?? {}) as TrainerRouteState;

  const filterText = useMemo(() => {
    const names: string[] = [];
    if (routeState.wordTypes && routeState.wordTypes.length > 0) {
      names.push(renderWordTypes(routeState.wordTypes));
    }
    if (tagList && routeState.tags && routeState.tags.length > 0) {
      names.push(renderTags(routeState.tags, tagList));
    }
    return names.filter(Boolean).join(', ');
  }, [routeState.tags, routeState.wordTypes, tagList]);

  const filteredWordList = useMemo(() => {
    if (wordList && wordProgressList) {
      let result = wordList;
      result = filterWordsByTypes(result, routeState.wordTypes ?? []);
      result = filterWordsByTagIds(result, routeState.tags ?? []);
      result = filterWordListByTodayProgress(result, wordProgressList);
      result = sortWordListByProgress(result, wordProgressList);
      return result;
    }
  }, [routeState.tags, routeState.wordTypes, wordList, wordProgressList]);

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
        saveWordProgressList(questions);
      }
    }
  }, [curIndex, isUserAnswered, questions]);

  const startQuiz = useCallback(() => {
    if (!filteredWordList) {
      return;
    }
    setIsFinished(false);
    setCurIndex(0);
    setQuestions(makeQuestions(filteredWordList));
  }, [filteredWordList]);

  useEffect(() => {
    if (filteredWordList && !refOnlyOnce.current) {
      refOnlyOnce.current = true;
      startQuiz();
    }
  }, [filteredWordList, startQuiz]);

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
    filterText,
  };
};
