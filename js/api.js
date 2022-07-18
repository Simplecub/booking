

const getData = async (onsuccess, onFail) => {
  try {
    const response = await fetch('https://26.javascript.pages.academy/keksobooking/data');
    if (!response.ok) {
      onFail('Не удалось загрузить фото');
    }
    const array = await response.json();
    onsuccess(array);
  } catch {
    onFail('Сервер не доступен');
  }
};


export {getData}
