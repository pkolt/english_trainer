export const getRandomItemOfArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomInteger = (max: number): number => {
  return Math.floor(Math.random() * max); // Max value don't include in result.
};

export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];

  let currentIndex = result.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = getRandomInteger(currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }

  return result;
};
