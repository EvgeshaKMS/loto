export const createRandomArray = (originalLength: number, outputLength: number) => {
  const array = Array.from(Array(originalLength), (_, i) => {
    return i + 1;
  });
  const res: number[] = [];
  let counter = outputLength;

  while (counter > 0) {
    res.push(...array.splice(Math.random() * array.length, 1));
    counter--;
  }
  return res;
};
