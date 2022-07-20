const swap = <T>(
  array: T[],
  fistElementIdx: number,
  secondElementIdx: number
) => {
  const temp = array[fistElementIdx];
  array[fistElementIdx] = array[secondElementIdx];
  array[secondElementIdx] = temp;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const randomNumber = (minValue: number, maxValue: number) =>
  Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

const randomArr = (
  minValue: number,
  maxValue: number,
  minLen: number,
  maxLen: number
) =>
  Array.from(Array(randomNumber(minLen, maxLen)), () =>
    randomNumber(minValue, maxValue)
  );

export { swap, sleep, randomArr };
