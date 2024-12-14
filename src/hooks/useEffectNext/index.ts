import { DependencyList, useEffect, useRef } from 'react';

interface HookEffectNextProps {
  effect: () => void;
  condition?: () => boolean;
  deps: DependencyList;
}

/** Skip first effect */
export const useEffectNext = ({ effect, condition, deps }: HookEffectNextProps) => {
  const refFlag = useRef(false);

  useEffect(() => {
    const isOk: boolean = condition ? condition() : true;

    if (isOk) {
      if (refFlag.current) {
        effect();
      } else {
        refFlag.current = true;
      }
    }

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
