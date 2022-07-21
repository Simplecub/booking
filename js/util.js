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

const isEscapeKey = (evt) => {
  return evt.key === 'Escape'
}

//функция обновление списка элементов, подходящих под фильтры, -  не чаще, чем один раз в полсекунды.
const getDebounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function throttle(callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;
  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();
    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const getElementsAmount = (array) => getRandomPositiveInteger(1, array.length);
export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getShuffleArray,
  getAvatar,
  getElementsAmount,
  isEscapeKey,
  getDebounce
}
