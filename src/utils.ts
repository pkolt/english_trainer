export const mergeDefaultValues = <T extends Record<string, unknown>>(obj: T, defVals: T): T => {
  return Object.keys(defVals).reduce((accum, key) => ({ ...accum, [key]: obj[key] ?? defVals[key] }), {} as T);
};
