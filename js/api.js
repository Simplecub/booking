const getData = async () => {
  const response = await fetch('https://26.javascript.pages.academy/keksobooking/data');
  if (!response.ok) {
    throw new Error('Не удалось загрузить фото');
  }
  return await response.json();
}

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      ' https://26.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      },
    );
    if (response.ok) {
      onSuccess();   //нужно закрыть окно (удалить евент листенер, добавить хидден) //разблочить кнопку отправки
    } else {
      onFail(`Не удалось отправить форму. Попробуйте ещё`);
    }
  } catch (e) {
    console.log(e)
    onFail(`Не удалось отправить форму`);
  }
};


export {getData, sendData}
