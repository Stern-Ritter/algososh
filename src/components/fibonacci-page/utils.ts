const getFibonacciNumbers = (count: number) => {
  const array = [] as number[];
  for (let i = 0; i <= count; i += 1) {
    if (i > 1) {
      array.push(array[array.length - 1] + array[array.length - 2]);
    } else {
      array.push(1);
    }
  }
  return array;
};

export { getFibonacciNumbers };
