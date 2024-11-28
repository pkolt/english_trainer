import { useHotkeys, HotkeyCallback } from 'react-hotkeys-hook';
import { useGetWordList } from '@/services/words/hooks';
import { Word, QuizItem } from '@/services/words/types';
import {
  filterWordsByTagIds,
  filterWordsByTypes,
  makeQuizItems,
  renderWordTypes,
  updateQuizItems,
} from '@/services/words/utils';
import { useCallback, useMemo, useState } from 'react';
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
import { useEffectOnce } from '@/hooks/useEffectOnce';
import { useEffectNext } from '@/hooks/useEffectNext';

export const useWordToTranslation = () => {
  const { data: tagList, isLoading: isLoadingTags } = useGetTagList();
  const { data: wordList, isLoading: isLoadingWordList } = useGetWordList();
  const { data: wordProgressList, isLoading: isLoadingWordProgressList } = useGetWordProgressList();
  const isLoading = isLoadingWordList || isLoadingWordProgressList || isLoadingTags;

  const [items, setItems] = useState<QuizItem[]>([]);
  const [curIndex, setCurIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const stepNumber = curIndex + 1;
  const stepCount = items.length;
  const curItem = items.length > 0 ? items[curIndex] : null;
  const isUserAnswered = !!curItem?.userAnswer;

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
        setItems((state) =>
          state.map((it) => {
            return it === curItem ? { ...it, userAnswer: word } : it;
          }),
        );
      }
    },
    [curItem, isUserAnswered],
  );

  const applyUserAnswerByKeyNumber: HotkeyCallback = useCallback(
    (event) => {
      const keyNumber = Number(event.key);
      const answer = curItem?.answers[keyNumber - 1];
      if (answer) {
        applyUserAnswer(answer);
      }
    },
    [applyUserAnswer, curItem?.answers],
  );

  const goToNextQuestion = useCallback(() => {
    if (isUserAnswered) {
      if (curIndex < items.length - 1) {
        setCurIndex((state) => state + 1);
      } else {
        setIsFinished(true);
        saveWordProgressList(items);
      }
    }
  }, [curIndex, isUserAnswered, items]);

  const startQuiz = useCallback(() => {
    if (!filteredWordList) {
      return;
    }
    setIsFinished(false);
    setCurIndex(0);
    setItems(makeQuizItems(filteredWordList));
  }, [filteredWordList]);

  useEffectOnce({
    effect: startQuiz,
    condition: () => !!filteredWordList,
    deps: [filteredWordList, startQuiz],
  });

  // Update items after changed word list
  useEffectNext({
    effect: () => setItems((state) => updateQuizItems(state, wordList!)),
    condition: () => !!wordList,
    deps: [wordList],
  });

  useHotkeys('space,enter', isFinished ? startQuiz : goToNextQuestion, { preventDefault: true });
  useHotkeys('1,2,3,4,5,6,7,8,9', applyUserAnswerByKeyNumber, { preventDefault: true });

  return {
    isLoading,
    stepNumber,
    stepCount,
    curItem,
    applyUserAnswer,
    goToNextQuestion,
    isFinished,
    items,
    startQuiz,
    autoSpeak,
    setAutoSpeak,
    filterText,
  };
};
