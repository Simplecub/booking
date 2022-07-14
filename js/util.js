function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat(a, b, digits) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getShuffleArray = (arr, length) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor((Math.random()) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, length);
};

const getAvatar = (a, b) => {
  let res = getRandomPositiveInteger(a, b)
  if (res < 10) {
    res = `0${res}`
  }
  return res
}
const getElementsAmount = (array) => getRandomPositiveInteger(1, array.length);
export {getRandomPositiveInteger, getRandomPositiveFloat, getShuffleArray, getAvatar, getElementsAmount}
