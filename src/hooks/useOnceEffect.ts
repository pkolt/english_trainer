import { DependencyList, useEffect, useRef } from 'react';

interface HookEffectOnceProps {
  effect: () => void;
  condition?: () => boolean;
  /** skip first effect if perform condition */
  skipFirst?: boolean;
  deps: DependencyList;
}

export const useEffectOnce = ({ effect, condition, skipFirst, deps }: HookEffectOnceProps) => {
  const refCount = useRef(0);

  useEffect(() => {
    const isOk: boolean = condition ? condition() : true;
    const isFirst = refCount.current === 0;
    const isSecond = refCount.current === 1;

    if (!isOk) {
      return;
    }

    if (isFirst && skipFirst) {
      refCount.current += 1;
    } else if (skipFirst ? isSecond : isFirst) {
      effect();
      refCount.current += 1;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
