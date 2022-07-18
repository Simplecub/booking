const getData = async (onsuccess, onFail) => {
  try {
    const response = await fetch('https://26.javascript.pages.academy/keksobooking/data');
    if (!response.ok) {
      onFail('Не удалось загрузить фото');
    }
    const array = await response.json();
    onsuccess(array);
  } catch {
    onFail('Сервер не доступен!');
  }
};

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
      onFail('Не удалось отправить форму. Попробуйте ещё');
    }
  } catch {
    onFail('Не удалось отправить форму');
  }
};


export {getData, sendData}
