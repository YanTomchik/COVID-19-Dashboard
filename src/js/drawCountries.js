import {
  period, unit, typeOfCase,
} from './list-of-countries.js';
import { search, changeVisibilityOnSearch } from './list-of-countries-search.js';
import { synchGraph } from './synchGraph.js';
import { drawMap } from './map.js';
import { drawTableByCountries } from './drawTableByCountries.js';

// const dataByWorld = [];
const dataByCountries = [];
const countriesWrapper = document.querySelector('.list_countries');

let countriesPop;
let clickTargetItem;

// Request for data
function requestForDataOnStart() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const summaryInfoFromAPI = JSON.parse(result);
      const currentDate = summaryInfoFromAPI.Date;

      setCurrentDate(currentDate);
      summaryInfoFromAPI.Countries.forEach((item) => {
        dataByCountries.push(item);
      });
      return dataByCountries;
    })
    .then((dataByCountries) => loadSpecialInfoAboutCountries(dataByCountries))
    .then((dataByCountries) => {
      drawCountries(dataByCountries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed));
      numbersSiplify();
    })
    .catch((error) => console.error(error));
}

// fetch specila data by countries

function loadSpecialInfoAboutCountries() {
  return fetch('https://restcountries-v1.p.rapidapi.com/all', {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dff3f6ecf5msh467d09f8b76ad6fp1925f3jsn302ab0e2c420',
      'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
    },
  })
    .then((response) => response.text())
    .then((result) => {
      countriesPop = JSON.parse(result);
      setPopAndCountryCode();
      return dataByCountries;
    })
    .catch((err) => {
      console.error(err);
    });
}

// draw Countries
function drawCountries(arr) {
  countriesWrapper.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    const countryItem = document.createElement('div');

    countryItem.classList.add('list_item');
    countryItem.innerHTML = `<div class="list_info">
            <div class="item_flag"><img src="https://www.countryflags.io/${arr[i].CountryCode}/flat/64.png" alt=""></div>
            <h3 class="list_item_name" data-pop="${arr[i].population}" data-code="${arr[i].CountryCode}">${arr[i].Country}</h3>
            </div>`;

    if (period) {
      countryItem.innerHTML = `${countryItem.innerHTML}
            <div class="item_case item_case-diseased item_case-active">${arr[i].NewConfirmed.toFixed(1)}</div>
            <div class="item_case item_case-recovered">${arr[i].NewRecovered.toFixed(1)}</div>
            <div class="item_case item_case-dead">${arr[i].NewDeaths.toFixed(1)}</div>`;
    } else {
      countryItem.innerHTML = `${countryItem.innerHTML}
            <div class="item_case item_case-diseased item_case-active">${arr[i].TotalConfirmed.toFixed(1)}</div>
            <div class="item_case item_case-recovered">${arr[i].TotalRecovered.toFixed(1)}</div>
            <div class="item_case item_case-dead">${arr[i].TotalDeaths.toFixed(1)}</div>`;
    }

    if (clickTargetItem === arr[i].CountryCode) {
      countryItem.classList.add('list_item-active');
    }

    countryItem.addEventListener('click', (event) => {
      clickTargetItem = event.target.closest('.list_item').childNodes[0].childNodes[3].attributes[2].textContent;
      event.target.closest('.list_item').classList.add('list_item-active');
      clearChosenCountryOnOtheClick(clickTargetItem);
      synchGraph(clickTargetItem, undefined, period, unit);
      drawTableByCountries(clickTargetItem, undefined, period, unit);
    });
    countriesWrapper.append(countryItem);
  }

  if (search.value !== '') {
    const listItems = document.querySelectorAll('.list_item');
    changeVisibilityOnSearch(listItems);
  }

  drawMap(dataByCountries, unit, period, typeOfCase);
}

// search pop and flag of each country
function setPopAndCountryCode() {
  for (let i = 0; i < dataByCountries.length; i++) {
    for (let j = 0; j < countriesPop.length; j++) {
      if (dataByCountries[i].CountryCode === countriesPop[j].alpha2Code) {
        dataByCountries[i].population = countriesPop[j].population;
        dataByCountries[i].latlng = countriesPop[j].latlng;
      }
    }
  }
}

// clear chosen country on click at new item
function clearChosenCountryOnOtheClick(clickTargetItem) {
  const countriesInTable = document.querySelectorAll('.list_item');
  countriesInTable.forEach((item) => {
    if (item.childNodes[0].childNodes[3].attributes[2].textContent !== clickTargetItem) {
      item.classList.remove('list_item-active');
    }
  });
}

// spaces between numbers
function numbersSiplify() {
  const listItems = document.querySelectorAll('.list_item');

  listItems.forEach((item) => {
    item.childNodes[2].innerText = `${parseFloat(item.childNodes[2].innerText).toLocaleString(undefined, { maximumFractionDigits: 1 })}`;
    item.childNodes[4].innerText = `${parseFloat(item.childNodes[4].innerText).toLocaleString(undefined, { maximumFractionDigits: 1 })}`;
    item.childNodes[6].innerText = `${parseFloat(item.childNodes[6].innerText).toLocaleString(undefined, { maximumFractionDigits: 1 })}`;
  });
}

// set current date
function setCurrentDate(date) {
  date = new Date(date);

  const dateWrapper = document.querySelector('.last_date');
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  dateWrapper.innerText = `${day}.${month + 1}.${year}`;
}
export {
  drawCountries, dataByCountries, numbersSiplify, requestForDataOnStart,
};
