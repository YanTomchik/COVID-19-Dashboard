import { keyboard } from './keyboard.js';

const search = document.querySelector('.list_search_item');

search.addEventListener('focus', () => {
  const listItems = document.querySelectorAll('.list_item');
  search.addEventListener('input', () => {
    changeVisibilityOnSearch(listItems);
  });
  keyboard.addEventListener('click', () => {
    changeVisibilityOnSearch(listItems);
  });
});

function changeVisibilityOnSearch(listItems) {
  for (let i = 0; i < listItems.length; i++) {
    if (!listItems[i].childNodes[0].childNodes[3].innerText.toLowerCase().includes(search.value.trim().toLowerCase())) {
      listItems[i].classList.add('list_item-hiden');
    } else {
      listItems[i].classList.remove('list_item-hiden');
    }
  }
  if (search.value.trim() === '') {
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove('list_item-hiden');
    }
  }
}

export { search, changeVisibilityOnSearch };
