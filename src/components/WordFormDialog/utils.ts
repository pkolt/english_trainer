import { Word } from '@/services/words/types';
import { DateTime } from 'luxon';

export const getDefaultValues = (): Word => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    createdAt: today,
    updatedAt: today,
    types: [],
    word: '',
    translate: '',
    transcription: '',
    description: '',
    example: '',
    exampleTranslate: '',
    note: '',
    favorite: false,
  };
};

const EN_TO_RU: Record<string, string> = {
  q: 'й',
  w: 'ц',
  e: 'у',
  r: 'к',
  t: 'е',
  y: 'н',
  u: 'г',
  i: 'ш',
  o: 'щ',
  p: 'з',
  '[': 'х',
  ']': 'ъ',
  '|': '/',
  '`': 'ё',
  a: 'ф',
  s: 'ы',
  d: 'в',
  f: 'а',
  g: 'п',
  h: 'р',
  j: 'о',
  k: 'л',
  l: 'д',
  ';': 'ж',
  "'": 'э',
  z: 'я',
  x: 'ч',
  c: 'с',
  v: 'м',
  b: 'и',
  n: 'т',
  m: 'ь',
  ',': 'б',
  '.': 'ю',
};

const RU_TO_EN = Object.entries(EN_TO_RU).reduce(
  (accum, [key, val]) => {
    accum[val] = key;
    return accum;
  },
  {} as Record<string, string>,
);

const makeTranslator =
  (table: Record<string, string>) =>
  (input: string): string => {
    let output = input;
    if (input) {
      output = input
        .split('')
        .map((char) => {
          const charLowerCase = char.toLowerCase();
          const isUpperCase = charLowerCase !== char;
          const value = table[charLowerCase];
          if (value) {
            return isUpperCase ? value.toUpperCase() : value;
          }
          return char;
        })
        .join('');
    }
    return output;
  };

export const fixOnlyEnglish = makeTranslator(RU_TO_EN);
export const fixOnlyRussian = makeTranslator(EN_TO_RU);
