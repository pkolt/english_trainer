import { DependencyList, useEffect, useRef } from 'react';

interface HookEffectOnceProps {
  effect: () => void;
  condition?: () => boolean;
  deps: DependencyList;
}

export const useEffectOnce = ({ effect, condition, deps }: HookEffectOnceProps) => {
  const refFlag = useRef(true);

  useEffect(() => {
    const isOk: boolean = condition ? condition() : true;

    if (isOk && refFlag.current) {
      effect();
      refFlag.current = false;
    }

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
