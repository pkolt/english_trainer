export const mergeValues = <T extends Record<string, unknown>>(obj: Partial<T>, defVals: T): T => {
  return Object.keys(defVals).reduce((accum, key) => ({ ...accum, [key]: obj[key] ?? defVals[key] }), {} as T);
};
