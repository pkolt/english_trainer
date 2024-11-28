import { test, renderHook, vi, expect } from '@/test-utils';
import { useEffectNext } from '.';

test('test hook', () => {
  const effect = vi.fn();
  const condition = vi.fn(() => true);

  const props = {
    effect,
    condition,
    deps: [{}],
  };

  const { rerender } = renderHook(() => useEffectNext(props));

  expect(effect).toHaveBeenCalledTimes(0);
  expect(condition).toHaveBeenCalledTimes(1);

  // Update deps and run useEffect
  props.deps = [{}];
  rerender();
  expect(effect).toHaveBeenCalledTimes(1);
  expect(condition).toHaveBeenCalledTimes(2);

  // Update deps and run useEffect
  props.deps = [{}];
  rerender();
  expect(effect).toHaveBeenCalledTimes(2);
  expect(condition).toHaveBeenCalledTimes(3);
});
